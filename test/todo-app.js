import { Selector } from "testcafe";

fixture('Todo App Tests')
  .page('https://dominikgraphic.com/');

test('App should load and show the main page', async t => {
  await t.wait(3000);
  await t.expect(Selector('body').exists).ok();
});

test('User can see the todo input field', async t => {
  await t.wait(1000);
  const input = Selector('input[type="text"]');
  await t.expect(input.exists).ok();
});

test('User can click the add button', async t => {
  await t.wait(1000);
  const button = Selector('button').withText('Add');
  await t.expect(button.exists).ok();
});