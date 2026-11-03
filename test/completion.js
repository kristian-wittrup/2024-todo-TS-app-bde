import { Selector } from 'testcafe';

fixture('Task completion')
  .page('http://localhost:5173');

test('Mark a task as completed', async t => {
  const input = Selector('#todo-input');
  const addButton = Selector('.todo-form button');
  const task = Selector('.todo-item').withText('Buy milk');
  const checkbox = task.find('input[type="checkbox"]');

  // Add a task before checking its status.
  await t
    .typeText(input, 'Buy milk')
    .click(addButton)
    .expect(checkbox.checked).notOk();

  // Mark the task as completed.
  await t
    .click(checkbox)
    .expect(checkbox.checked).ok();

  // Add another task to check that the status survives a list update.
  await t
    .typeText(input, 'Buy bread')
    .click(addButton)
    .expect(checkbox.checked).ok();
});

test('Mark a completed task as active', async t => {
  const input = Selector('#todo-input');
  const addButton = Selector('.todo-form button');
  const task = Selector('.todo-item').withText('Buy milk');
  const checkbox = task.find('input[type="checkbox"]');

  // Add a task and mark it as completed.
  await t
    .typeText(input, 'Buy milk')
    .click(addButton)
    .click(checkbox)
    .expect(checkbox.checked).ok();

  // Mark the task as active again.
  await t
    .click(checkbox)
    .expect(checkbox.checked).notOk();

  // Check that the task stays active after a list update.
  await t
    .typeText(input, 'Buy bread')
    .click(addButton)
    .expect(checkbox.checked).notOk();
});