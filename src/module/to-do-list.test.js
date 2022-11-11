/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/extensions
import TodoList from "./to-do-list";

jest.mock("./to-do-list.js");

const todoList = new TodoList();

describe("adding tests", () => {
  test("Add first new item to the list", () => {
    const length = todoList.add("test 1");
    expect(length.length).toBe(1);
  });
  test("Add more new item to the list", () => {
    todoList.add("test 2");
    todoList.add("test 3");
    todoList.add("test 4");
    const length = todoList.add("test 5");
    expect(length.length).toBe(5);
  });
});

describe("removing tests", () => {
  test("remove one new item to the list", () => {
    const length = todoList.remove(1);
    expect(length.length).toBe(4);
  });
});

describe("editing | updating | Clear ", () => {
  // the index of 1 have is have description 'test 2' coz we deleted the first one
  const testing = 1;
  describe("editing", () => {
    // editing
    test("editing test ", () => {
      todoList.edit(testing, "new test 2");
      const index2 = todoList.list.filter((ele) => ele.index === testing);
      expect(index2[0].description).toBe("new test 2");
    });
    // editing
    test("editing test ", () => {
      const list = JSON.parse(localStorage.getItem("to-do-list"));
      const item = list.filter((ele) => ele.index === testing);
      expect(item[0].description).toBe("new test 2");
    });
  });
  describe("updating", () => {
    // updating
    test("check item 2", () => {
      todoList.updatesCheck(testing);
      const updated = todoList.list.filter((ele) => ele.index === testing);
      expect(updated[0].completed).toBe(true);
    });
  });
  describe("clear the checkes", () => {
    // Clearing
    test("clear only item 2", () => {
      /*
          the todoList.list have 4 objects now one of them have completed true
          so after the clearChecked it should be having 3 objects
        */
      expect(todoList.list.length).toBe(4);
      todoList.removeChecked();
      expect(todoList.list.length).toBe(3);
      /*
          we alrady delete the first object that have description: test 1 and useing
          removeChed() we deleted the object that have description: test 2
          so th array well have test 3, test 4, test 5 objects
          the indexs should be index 1, index 2 and index 3
        */
      expect(todoList.list).toEqual([
        { completed: false, description: "test 3", index: 1 },
        { completed: false, description: "test 4", index: 2 },
        { completed: false, description: "test 5", index: 3 },
      ]);
    });
  });
});
