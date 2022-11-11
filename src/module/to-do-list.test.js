/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/extensions
import TodoList from './to-do-list';

jest.mock('./to-do-list.js');

const todoList = new TodoList();

describe('adding tests', () => {
  test('Add first new item to the list', () => {
    const length = todoList.add('test 1');
    expect(length.length).toBe(1);
  });
  test('Add more new item to the list', () => {
    todoList.add('test 2');
    todoList.add('test 3');
    todoList.add('test 4');
    const length = todoList.add('test 5');
    expect(length.length).toBe(5);
  });
});

describe('removing tests', () => {
  test('remove one new item to the list', () => {
    const length = todoList.remove(1);
    expect(length.length).toBe(4);
  });
});

describe('editing | updating | Clear ', () => {
  // the index of 1 have is have description 'test 2' coz we deleted the first one
  const testing = 1;
  describe('editing', () => {
    // editing
    test('editing test ', () => {
      todoList.edit(testing, 'new test 2');
      const index2 = todoList.list.filter((ele) => ele.index === testing);
      expect(index2[0].description).toBe('new test 2');
    });
    // editing
    test('editing test ', () => {
      const list = JSON.parse(localStorage.getItem('to-do-list'));
      const item = list.filter((ele) => ele.index === testing);
      expect(item[0].description).toBe('new test 2');
    });
  });
  describe('updating', () => {
  // updating
    test('check item 2', () => {
      todoList.updatesCheck(testing);
      const updated = todoList.list.filter((ele) => ele.index === testing);
      expect(updated[0].completed).toBe(true);
    });
  });
});