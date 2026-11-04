import { Selector } from 'testcafe';

fixture('Task progress')
  .page('http://localhost:5173');

test('Update progress when tasks change', async t => {
  const input = Selector('#todo-input');
  const addButton = Selector('.todo-form button');
  const milk = Selector('.todo-item').withText('Buy milk');
  const bread = Selector('.todo-item').withText('Buy bread');
  const progress = Selector('#task-progress');
  const text = Selector('#progress-text');

  // An empty list starts at zero.
  await t
    .expect(progress.getAttribute('value')).eql('0')
    .expect(text.innerText).eql('Completed: 0%');

  // Completing the only task gives 100%.
  await t
    .typeText(input, 'Buy milk')
    .click(addButton)
    .click(milk.find('input[type="checkbox"]'))
    .expect(progress.getAttribute('value')).eql('100')
    .expect(text.innerText).eql('Completed: 100%');

  // Adding an unfinished task lowers progress to 50%.
  await t
    .typeText(input, 'Buy bread')
    .click(addButton)
    .expect(progress.getAttribute('value')).eql('50')
    .expect(text.innerText).eql('Completed: 50%');

  // Marking the first task as active returns progress to zero.
  await t
    .click(milk.find('input[type="checkbox"]'))
    .expect(progress.getAttribute('value')).eql('0')
    .expect(text.innerText).eql('Completed: 0%');

  // Remove the unfinished task after completing the first one.
  await t
    .click(milk.find('input[type="checkbox"]'))
    .click(bread.find('button').withText('Remove'))
    .expect(progress.getAttribute('value')).eql('100')
    .expect(text.innerText).eql('Completed: 100%');

  // Removing the last task returns progress to zero.
  await t
    .click(milk.find('button').withText('Remove'))
    .expect(progress.getAttribute('value')).eql('0')
    .expect(text.innerText).eql('Completed: 0%');
});

test('Keep the same progress when switching filters', async t => {
  const input = Selector('#todo-input');
  const addButton = Selector('.todo-form button');
  const milk = Selector('.todo-item').withText('Buy milk');
  const progress = Selector('#task-progress');
  const text = Selector('#progress-text');

  // Complete one of three tasks to check rounding.
  await t
    .typeText(input, 'Buy milk')
    .click(addButton)
    .typeText(input, 'Buy bread')
    .click(addButton)
    .typeText(input, 'Buy apples')
    .click(addButton)
    .click(milk.find('input[type="checkbox"]'))
    .expect(progress.getAttribute('value')).eql('33')
    .expect(text.innerText).eql('Completed: 33%');

  // Progress uses all tasks, regardless of the selected filter.
  await t
    .click('#filter-active')
    .expect(progress.getAttribute('value')).eql('33')
    .expect(text.innerText).eql('Completed: 33%')
    .click('#filter-completed')
    .expect(progress.getAttribute('value')).eql('33')
    .expect(text.innerText).eql('Completed: 33%')
    .click('#filter-all')
    .expect(progress.getAttribute('value')).eql('33')
    .expect(text.innerText).eql('Completed: 33%');
});