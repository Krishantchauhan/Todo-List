'use strict';

const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');

// todo:fetching from local and display
const displayItems = () => {
  const items = getItemFromStroage();

  items.forEach((item) => {
    addItemToDOM(item);
  });

  checkUI();
};

//Todo:Adding Item
const OnAddItemSubmit = (e) => {
  e.preventDefault();

  // console.log(itemInput);
  // const newItem = document.createTextNode(itemInput.value);
  const newItem = itemInput.value;
  if (itemInput.value === '') {
    alert('Please add an item !');
    return;
  }

  addItemToDOM(newItem);
  addItemToLocal(newItem);

  itemInput.value = '';

  checkUI();
};

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const btn = getButton('remove-item btn-link text-red');
  li.appendChild(btn);

  itemList.appendChild(li);

  // console.log(li);
}

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

//todo:Add an item to localStorage
const addItemToLocal = (item) => {
  // console.log(item.parentElement);
  const itemFromStroage = getItemFromStroage();

  itemFromStroage.push(item);

  localStorage.setItem('items', JSON.stringify(itemFromStroage));
};
//get an item from local Stroage
function getItemFromStroage() {
  let itemFromStroage;
  if (localStorage.getItem('items') === null) {
    itemFromStroage = [];
  } else {
    itemFromStroage = JSON.parse(localStorage.getItem('items'));
  }
  return itemFromStroage;
}

// Todo: RemoveItem

const onClickItems = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }
};

function removeItem(item) {
  // console.log(item.textContent);

  if (confirm('Are you Sure?')) {
    //Remove from DOM
    item.remove();
    //remove from Local Stroage
    removeFromStroage(item.textContent);
    checkUI();
  }
}

function removeFromStroage(item) {
  let itemFromStroage = getItemFromStroage();

  itemFromStroage = itemFromStroage.filter((txt) => txt !== item);
  localStorage.setItem('items', JSON.stringify(itemFromStroage));

  console.log(itemFromStroage);
}

const clearItems = (e) => {
  // console.log(itemList);
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  //clear from local Stroage
  localStorage.removeItem('items');
  checkUI();
  // console.log(e.target);
};

//todo:Filter Items
const doFilter = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = 'flex';
      // console.log(item);
    } else {
      item.style.display = 'none';
    }
  });

  console.log(e.target.value);
};

// TODO:UI;
const checkUI = () => {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearBtn.style.display = 'block';
  }
};

itemForm.addEventListener('submit', OnAddItemSubmit);
itemList.addEventListener('click', onClickItems);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', doFilter);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();
