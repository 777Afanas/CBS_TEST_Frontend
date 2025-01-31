import { authors } from "./authors.js";

let authorList = document.querySelector("#authorList");
let saveButton = document.querySelector("#saveButton");
let selectAuthor = null;
let form = document.querySelector('#output'); 

// const STORAGE_KEY = "authors-item";
let keykey = Date.now();

const catalog = [];
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  console.log(formData);
  let data = Object.fromEntries(formData.entries());
  console.log(data);

  event.currentTarget.reset();
  // const catalog = [];

  // console.log(nums);
  const nums = catalog.push(data);
  // localStorage.setItem(keykey, JSON.stringify(catalog));

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

  console.log(catalog);
  for (var key in catalog) {
    // console.log(data[key]);
    // const { surname, nameA, patronymic, dob } = data;
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${surname}</td>
    <td>${nameA}</td>
    <td>${patronymic}</td>
    <td>${dob}</td> `;
    document.querySelector('.authors').appendChild(row);
  }
  event.currentTarget.reset();
  // form.reset();
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


  if (e.target.tagName != "LI") return;
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


// const form = document.querySelector('.js-register-form');

// authorList.addEventListener('submit', onFormSubmit);


// function onFormSubmit(event) {
//   event.preventDefault();

// console.dir(event.currentTarget.elements);


//   const formData = new FormData(event.currentTarget);

//   console.log(formData);

//   formData.forEach((value, name) => {
//     console.log('onFormSubmit -> name', name);
//     console.log('onFormSubmit -> value', value);
//   });
// }