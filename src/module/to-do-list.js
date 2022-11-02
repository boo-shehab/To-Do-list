import LocalStorageList from './data-localstorage.js';
import '../../node_modules/@fortawesome/fontawesome-free/js/all.min.js';

const listContaner = document.querySelector('.card-list');

export default class {
    list;

    nextIndex = 0;

    storage = new LocalStorageList();

    constructor() {
      if (this.storage.git('to-do-list')) {
        this.list = JSON.parse(this.storage.git('to-do-list'));
        this.nextIndex = this.list.length === 0 ? 0 : this.list[this.list.length - 1].index;
        this.listView();
      } else {
        this.list = [];
      }
    }

    add(description) {
      const itme = {
        index: this.nextIndex += 1,
        completed: false,
        description,
      };
      this.list.push(itme);
      this.storage.sit('to-do-list', JSON.stringify(this.list));
      this.listView();
    }

    remove(id) {
      this.list = this.list.filter((ele) => ele.index !== id);
      this.storage.sit('to-do-list', JSON.stringify(this.list));
      this.listView();
    }

    // eslint-disable-next-line class-methods-use-this
    addItem(itme) {
      const mainBox = document.createElement('div');
      mainBox.classList.add('box');
      mainBox.addEventListener('click', () => {
        document.querySelectorAll('.box').forEach((ele) => ele.classList.remove('active'));
        mainBox.classList.add('active');
      });
      const check = document.createElement('i');
      if (itme.completed) {
        check.classList.add('fa-regular');
        check.classList.add('fa-square-check');
      } else {
        check.classList.add('fa-regular');
        check.classList.add('fa-square');
      }
      const boxText = document.createElement('div');
      boxText.classList.add('boxText');
      boxText.appendChild(check);
      const description = document.createElement('input');
      description.value = itme.description;
      boxText.appendChild(description);
      mainBox.appendChild(boxText);
      const savgDiv = document.createElement('div');
      const dots = document.createElement('i');
      dots.classList.add('fa-solid');
      dots.classList.add('fa-ellipsis-vertical');
      mainBox.appendChild(dots);
      const deletIcon = document.createElement('i');
      savgDiv.addEventListener('click', () => {
        this.remove(itme.index);
      });
      deletIcon.classList.add('fa-solid');
      deletIcon.classList.add('fa-trash-can');
      savgDiv.appendChild(deletIcon);
      mainBox.appendChild(savgDiv);
      listContaner.appendChild(mainBox);
    }

    listView() {
      listContaner.innerHTML = '';
      for (let i = 0; i < this.list.length; i += 1) {
        this.addItem(this.list[i]);
      }
    }
}