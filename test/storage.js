import { Selector } from 'testcafe';

fixture('Local Storage')
  .page('http://localhost:5173')
  .beforeEach(async t => {
    // Start each test without saved tasks.
    await t.eval(() => localStorage.removeItem('todos'));
    await t.navigateTo('http://localhost:5173');
  });

test('Keep task changes after reloading', async t => {
  const input = Selector('#todo-input');
  const addButton = Selector('.todo-form button');
  const tasks = Selector('.todo-item');
  const milk = tasks.withText('Buy milk');
  const bread = tasks.withText('Buy bread');
  const progress = Selector('#progress-text');

  // Save two tasks and complete one.
  await t
    .typeText(input, 'Buy milk')
    .click(addButton)
    .typeText(input, 'Buy bread')
    .click(addButton)
    .click(milk.find('input[type="checkbox"]'))
    .navigateTo('http://localhost:5173')
    .expect(tasks.count).eql(2)
    .expect(milk.exists).ok()
    .expect(bread.exists).ok()
    .expect(milk.find('input[type="checkbox"]').checked).ok()
    .expect(progress.innerText).eql('Completed: 50%');

  // Change the task text through the Edit prompt.
  await t
    .setNativeDialogHandler(() => 'Buy oat milk')
    .click(milk.find('button').withText('Edit'))
    .navigateTo('http://localhost:5173')
    .expect(tasks.withText('Buy oat milk').exists).ok()
    .expect(milk.exists).notOk();

  // A removed task must not return after reloading.
  await t
    .click(bread.find('button').withText('Remove'))
    .navigateTo('http://localhost:5173')
    .expect(tasks.count).eql(1)
    .expect(bread.exists).notOk()
    .expect(progress.innerText).eql('Completed: 100%');

  // Changing a task back to active is also saved.
  await t
    .click(tasks.find('input[type="checkbox"]'))
    .navigateTo('http://localhost:5173')
    .expect(tasks.find('input[type="checkbox"]').checked).notOk()
    .expect(progress.innerText).eql('Completed: 0%');
});

test('Handle invalid saved data', async t => {
  const tasks = Selector('.todo-item');
  const progress = Selector('#progress-text');

  // Broken JSON should not stop the app.
  await t.eval(() => {
    localStorage.setItem('todos', 'broken JSON');
  });

  await t
    .navigateTo('http://localhost:5173')
    .expect(tasks.count).eql(0)
    .expect(progress.innerText).eql('Completed: 0%');

  // Valid JSON with missing task fields is also rejected.
  await t.eval(() => {
    localStorage.setItem('todos', '[{"text":"Missing fields"}]');
  });

  await t
    .navigateTo('http://localhost:5173')
    .expect(tasks.count).eql(0);

  // The user can still add and save a new task.
  await t
    .typeText('#todo-input', 'Buy milk')
    .click('.todo-form button')
    .navigateTo('http://localhost:5173')
    .expect(tasks.count).eql(1)
    .expect(tasks.withText('Buy milk').exists).ok();
});