import './style.css';
import ToDoList from './module/to-do-list.js';

const listInsertInput = document.querySelector('input');
const listInsertSubmit = document.querySelector('form');
const removeAll = document.querySelector('.card-footer span');

const list = new ToDoList();
listInsertSubmit.addEventListener('submit', (ele) => {
  ele.preventDefault();
  list.add(listInsertInput.value);
  listInsertInput.value = '';
});

removeAll.addEventListener('click', () => list.removeAll());