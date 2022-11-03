import LocalStorage from './data-localstorage.js';

const storage = new LocalStorage();

export default (index) => {
  const list = JSON.parse(storage.git('to-do-list'));
  list.forEach((ele) => {
    if (ele.index === index) ele.completed = !ele.completed;
  });
  storage.sit('to-do-list', JSON.stringify(list));
  return list;
};