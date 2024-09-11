'use strict';

const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemListEl = document.getElementById('item-list');



const addItem = (e) => {
  e.preventDefault();

  const item = document.createTextNode(itemInput.value);
  const li = document.createElement('li');

  li.appendChild(item);

  const btn = getButton('remove-item btn-link text-red');
  li.appendChild(btn);

  itemListEl.appendChild(li);

  console.log(li);
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

itemForm.addEventListener('submit', addItem);
