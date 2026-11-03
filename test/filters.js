import { Selector } from 'testcafe';

fixture('Task filters')
  .page('http://localhost:5173');

test('Filter tasks by status', async t => {
  const input = Selector('#todo-input');
  const addButton = Selector('.todo-form button');
  const tasks = Selector('.todo-item');
  const milk = tasks.withText('Buy milk');
  const bread = tasks.withText('Buy bread');

  // Add two tasks and complete one.
  await t
    .typeText(input, 'Buy milk')
    .click(addButton)
    .typeText(input, 'Buy bread')
    .click(addButton)
    .click(milk.find('input[type="checkbox"]'));

  // Active shows only the unfinished task.
  await t
    .click('#filter-active')
    .expect(tasks.count).eql(1)
    .expect(bread.exists).ok()
    .expect(milk.exists).notOk()
    .expect(Selector('.filters .selected').id).eql('filter-active');

  // Completed shows only the finished task.
  await t
    .click('#filter-completed')
    .expect(tasks.count).eql(1)
    .expect(milk.exists).ok()
    .expect(bread.exists).notOk()
    .expect(Selector('.filters .selected').id).eql('filter-completed');

  // All brings both tasks back.
  await t
    .click('#filter-all')
    .expect(tasks.count).eql(2)
    .expect(milk.exists).ok()
    .expect(bread.exists).ok()
    .expect(Selector('.filters .selected').id).eql('filter-all');
});

test('Update the filtered list when a task changes status', async t => {
  const input = Selector('#todo-input');
  const addButton = Selector('.todo-form button');
  const tasks = Selector('.todo-item');
  const milk = tasks.withText('Buy milk');

  await t
    .typeText(input, 'Buy milk')
    .click(addButton)
    .click('#filter-active');

  // A completed task leaves the Active list.
  await t
    .click(milk.find('input[type="checkbox"]'))
    .expect(tasks.count).eql(0);

  // The task is still available in Completed.
  await t
    .click('#filter-completed')
    .expect(milk.exists).ok()
    .expect(milk.find('input[type="checkbox"]').checked).ok();

  // An unfinished task leaves the Completed list.
  await t
    .click(milk.find('input[type="checkbox"]'))
    .expect(tasks.count).eql(0);

  await t
    .click('#filter-active')
    .expect(tasks.count).eql(1)
    .expect(milk.exists).ok()
    .expect(milk.find('input[type="checkbox"]').checked).notOk();
});