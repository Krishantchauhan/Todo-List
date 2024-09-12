'use strict';

const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

//Todo:Adding Item
const addItem = (e) => {
  e.preventDefault();

  const item = document.createTextNode(itemInput.value);
  const li = document.createElement('li');

  li.appendChild(item);

  const btn = getButton('remove-item btn-link text-red');
  li.appendChild(btn);

  itemList.appendChild(li);

  console.log(li);

  itemInput.value = '';
};

function getButton(classes) {
  const btn = document.createElement('button');
  btn.className = 'remove-item btn-link text-red';
  const icon = getIcon('fa-solid fa-xmark');
  btn.appendChild(icon);
  return btn;
}

function getIcon(classes) {
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';
  return icon;
}

// Todo: RemoveItem

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    e.target.parentElement.parentElement.remove(); //targetting li
  }
};

const clearItems = (e) => {
  // console.log(itemList);
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  // console.log(e.target);
};

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
