import LocalStorageList from '../data-localstorage.js';
import '../../../node_modules/@fortawesome/fontawesome-free/js/all.min.js';
// import StatusUpdates from '../status-updates.js';

document.body.innerHTML = '<div class=\'card-list\'> </div>';

const listContaner = document.querySelector('.card-list');

export default class {
    list = [];

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
      return this.list;
    }

    remove(id) {
      this.list = this.list.filter((ele) => ele.index !== id);
      for (let i = 0; i < this.list.length; i += 1) {
        this.list[i].index = i + 1;
      }
      this.storage.sit('to-do-list', JSON.stringify(this.list));
      this.listView();
      return this.list;
    }

    removeChecked() {
      this.list = this.list.filter((ele) => !ele.completed);
      for (let i = 0; i < this.list.length; i += 1) {
        this.list[i].index = i + 1;
      }
      this.storage.sit('to-do-list', JSON.stringify(this.list));
      this.listView();
    }

    addItem(item) {
      const mainBox = document.createElement('div');
      mainBox.classList.add('box');
      mainBox.addEventListener('click', () => {
        document.querySelectorAll('.box').forEach((ele) => ele.classList.remove('active'));
        mainBox.classList.add('active');
      });
      const checkDiv = document.createElement('div');
      const check = document.createElement('svg');
      if (item.completed) {
        check.classList.add('fa-regular');
        check.classList.add('fa-square-check');
      } else {
        check.classList.add('fa-regular');
        check.classList.add('fa-square');
      }
      checkDiv.addEventListener('click', () => {
        this.updatesCheck(item);
        this.listView();
      });
      const boxText = document.createElement('div');
      boxText.classList.add('boxText');
      checkDiv.appendChild(check);
      boxText.appendChild(checkDiv);
      const description = document.createElement('input');
      description.value = item.description;
      description.addEventListener('input', () => {
        this.edit(item.index, description.value);
      });
      boxText.appendChild(description);
      mainBox.appendChild(boxText);
      const savgDiv = document.createElement('div');
      const dots = document.createElement('i');
      dots.classList.add('fa-solid');
      dots.classList.add('fa-ellipsis-vertical');
      mainBox.appendChild(dots);
      const deletIcon = document.createElement('i');
      savgDiv.addEventListener('click', () => {
        this.remove(item.index);
      });
      deletIcon.classList.add('fa-solid');
      deletIcon.classList.add('fa-trash-can');
      savgDiv.appendChild(deletIcon);
      mainBox.appendChild(savgDiv);
      listContaner.appendChild(mainBox);
    }

    edit(itemIndex, value) {
      this.list.forEach((ele) => {
        if (ele.index === itemIndex) ele.description = value;
      });
      this.storage.sit('to-do-list', JSON.stringify(this.list));
      return this.list;
    }

    listView() {
      listContaner.innerHTML = '';
      for (let i = 0; i < this.list.length; i += 1) {
        this.addItem(this.list[i]);
      }
    }

    updatesCheck(index) {
      this.list.forEach((ele) => {
        if (ele.index === index) ele.completed = !ele.completed;
      });
      this.storage.sit('to-do-list', JSON.stringify(this.list));
      return this.list;
    }
}
