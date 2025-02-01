import { authors } from './authors.js';

let authorList = document.querySelector('#authorList');
let saveButton = document.querySelector('#saveButton');
let selectAuthor = null;
let form = document.querySelector('#output');
let bookForm = document.querySelector('#book');

// const STORAGE_KEY = "authors-item";
let key = Date.now();

const catalog = [];
const bibliography = [];
form.addEventListener('submit', onFormSubmit);
bookForm.addEventListener('submit', onBookFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  console.log(formData);
  let data = Object.fromEntries(formData.entries());
  console.log(data);

  const nums = catalog.push(data);
  localStorage.setItem(key, JSON.stringify(catalog));

  document.querySelector(
    '.content'
  ).innerHTML = `<table class="authors"></table>`;

  // const { surname, nameA, patronymic, dob } = data;
  // let row = document.createElement('tr');
  // row.innerHTML = `
  // <td>${surname}</td>
  // <td>${nameA}</td>
  // <td>${patronymic}</td>
  // <td>${dob}</td> `;
  // document.querySelector('.authors').appendChild(row);

  for (let i = 0; i < catalog.length; i++) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${catalog[i].surname}</td>
    <td>${catalog[i].nameA}</td>
    <td>${catalog[i].patronymic}</td>
    <td>${catalog[i].dob}</td> `;

    document.querySelector('.authors').appendChild(row);
  }
  // }

  event.currentTarget.reset();
  // form.reset();
}

function onBookFormSubmit(event) {
  event.preventDefault();

const formData = new FormData(event.currentTarget);
console.log(formData);
let data = Object.fromEntries(formData.entries());
console.log(data);

const nums = bibliography.push(data);
// localStorage.setItem(key, JSON.sringify(catalog));

document.querySelector(
  '.books'
  ).innerHTML = `<table class="record"></table>`;
  
  for (let i = 0; i < bibliography.length; i++) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${bibliography[i].title}</td>
    <td>${bibliography[i].paging}</td>     
    <td>${bibliography[i].genre}</td> `;

    document.querySelector('.record').appendChild(row);
  }
  // }

  event.currentTarget.reset();

}
// const makeAuthorsTableRowMarkup = data => {
// const { surname, nameA, patronymic, dob } = data;

//   return `
//   <tr>
//     <td>${surname}</td>
//     <td>${nameA}</td>
//     <td>${patronymic}</td>
//     <td>${dob}</td>
//   </tr>
//   `;
// };

// console.log(authors);
// const tableEl = document.querySelector('.authors-table');
// const transactionTableRowsMarkup = authors
//   .map(makeAuthorsTableRowMarkup)
//   .join('');

// tableEl.insertAdjacentHTML('beforeend', transactionTableRowsMarkup);

// console.log(transactionTableRowsMarkup);

for (let index = 0; index < authors.length; index++) {
  const currentAuthor = authors[index];
  let li = document.createElement('li');
  li.textContent = currentAuthor.surname + ' ' + currentAuthor.nameA;
  li.dataset.authorNumber = index;
  authorList.append(li);
  // console.log(li);
}

// Встановлення обробників
authorList.addEventListener('click', function (e) {
  if (e.target.tagName != 'LI') return;
  selectAuthor = authors[e.target.dataset.authorNumber];

  fillForm(selectAuthor);
  selectListItem(e.target);
});

saveButton.addEventListener('click', function () {
  updateAuthor(selectAuthor);
});

// Логіка
function selectListItem(element) {
  deselectAllListItems();
  element.classList.add('selected');
}

function deselectAllListItems() {
  let selectedItems = document.querySelectorAll('li.selected');
  for (let i = 0; i < selectedItems.length; i++) {
    const element = selectedItems[i];
    element.classList.remove('selected');
  }
}

function fillForm(selectAuthor) {
  const form = document.forms[0];

  form.surname.value = selectAuthor.surname;
  form.nameA.value = selectAuthor.nameA;
  form.patronymic.value = selectAuthor.patronymic;
  form.dob.value = selectAuthor.dob;
  //   form.email.value = selectAuthor.email;
  //   form.age.value = selectAuthor.age;
}

function updateAuthor(selectAuthor) {
  const form = document.forms[0];

  selectAuthor.surname = form.surname.value;
  selectAuthor.nameA = form.nameA.value;
  selectAuthor.patronymic = form.patronymic.value;
  selectAuthor.dob = form.dob.value;
  //   selectAuthor.email = form.email.value;
  //   selectAuthor.age = form.age.value;
}
