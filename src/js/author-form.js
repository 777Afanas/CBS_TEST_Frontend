import { authors } from './authors.js';

// let authorList = document.querySelector('#authorList');
// let saveButton = document.querySelector('#saveButton');
// let selectAuthor = null;

let formAuthor = document.querySelector('#input-author');
let formInput = document.querySelector('#input');

let form = document.querySelector('#output');
let bookForm = document.querySelector('#book');

let result = document.querySelector('.books');
let resultAuth = document.querySelector('.authors');
// let tableAuth = document.querySelector('.record-author');

// let catalog = [];

// /////////////////////////////////////////////////////////////////
let catalog1 = [];  
if (localStorage.getItem('author')) {
  catalog1 = JSON.parse(localStorage.getItem('author'));
  //  функція  
}


let bibliography1 = [];

formAuthor.addEventListener('submit', onFormAuthorSubmit);
formInput.addEventListener('submit', onFormInputSubmit);

function onFormAuthorSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  console.log(formData);
  let data = Object.fromEntries(formData.entries());
  console.log(data);

  catalog1.push(data);
  console.log(catalog1);

  // localStorage
  // localStorage.setItem('author', JSON.stringify(catalog1));

  // resultAuth.innerHTML = `<table class="record-author"></table>`;
  resultAuth.innerHTML = `<table class="record-author"> 
  <thead class="recd-auth">
    <tr>
      <th data-type="string">Автори</th>
      <th data-type="number">Книг в базе</th>
    </tr>
    </thead>
    <tbody class="rec-auth"></tbody>
    </table>`;

  createAuthorsIn(catalog1);

  let tableAuth = document.querySelector('.record-author');
  // console.log(resultAuth);
  console.log(tableAuth);

  tableAuth.onclick = function (e) {
    if (e.target.tagName != 'TH') return;
    let th = e.target;
    sortTable(th.cellIndex, th.dataset.type);
  };

  function sortTable(colNum, type) {
    let tbody = tableAuth.querySelector('tbody');
    let rowsArray = Array.from(tbody.rows);
    let compare;
    switch (type) {
      case 'number':
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        };
        break;
      case 'string':
        compare = function (rowA, rowB) {
          return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
            ? 1
            : -1;
        };
        break;
    }
    rowsArray.sort(compare);
    tbody.append(...rowsArray);
  }
} 

function createAuthorsIn(value) {
  console.log(value);
  for (let i = 0; i < value.length; i++) {
    let row = document.createElement('tr');
    row.id = `text`;
    row.className = `note`;
    row.innerHTML = `    
    <td>${value[i].initials}</td>
    <td>${value[i].collection}</td>            
    <input name="del-auth" type="button" value="видалити"/>`;

    document.querySelector('.rec-auth').appendChild(row);

    let els = document.getElementsByName('del-auth');
    console.log(els);
    els.forEach(function (item) {
      console.log(item);
      item.addEventListener('click', function () {
        console.log(item);
        item.parentNode.parentNode.removeChild(item.parentNode);
      });
    }); 

    document.getElementById('initials').value = ' ';
    document.getElementById('collection').value = '0';     
  }
}



function onFormInputSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  console.log(formData);
  let data = Object.fromEntries(formData.entries());
  console.log(data);

  bibliography1.push(data); //   
  console.log(bibliography1);

  // localStorage;
  // localStorage.setItem('contex', JSON.stringify(bibliography1));
 
  result.innerHTML = `<table class="record"></table>`;
  console.log(result);
  createBooksIn(bibliography1);

  // event.currentTarget.reset();

  console.log(event.currentTarget);
}

function createBooksIn(value) {
  console.log(value);
  for (let i = 0; i < value.length; i++) {
    let row = document.createElement('tr');
    row.id = `text`;
    row.className = `note`;
    row.innerHTML = `
    <td>${value[i].title}</td>     
    <td>${value[i].genre}</td>  
    <input name="del" type="button" value="видалити"/>`; 
    // <td>${value[i].title}</td>
    // <td>${value[i].paging}</td>     
    // <td>${value[i].genre}</td>  
    // <input name="del" type="button" value="удалить"/>`; 



    document.querySelector('.record').appendChild(row);

    let els = document.getElementsByName('del');
    els.forEach(function (item) {
      item.addEventListener('click', function () {
        item.parentNode.parentNode.removeChild(item.parentNode);
      });
    });
    document.getElementById('title').value = ' ';
    document.getElementById('paging').value = '0';
    // document.getElementById('genre').value = ' ';
    console.log(value);
  }
}

// /////////////////////////////////////////////////////////////////////////
// let bibliography = [];

// form.addEventListener('submit', onFormSubmit);
// bookForm.addEventListener('submit', onBookFormSubmit);

// function onFormSubmit(event) {
//   event.preventDefault();

//   const formData = new FormData(event.currentTarget);
//   console.log(formData);
//   let data = Object.fromEntries(formData.entries());
//   console.log(data);

//   const num = catalog.push(data);
//   console.log(catalog);
//   localStorage.setItem('author', JSON.stringify(catalog));

//   document.querySelector(
//     '.content'
//   ).innerHTML = `<table class="authors"></table>`;

//   // const { surname, nameA, patronymic, dob } = data;
//   // let row = document.createElement('tr');
//   // row.innerHTML = `
//   // <td>${surname}</td>
//   // <td>${nameA}</td>
//   // <td>${patronymic}</td>
//   // <td>${dob}</td> `;
//   // document.querySelector('.authors').appendChild(row);

//   for (let i = 0; i < catalog.length; i++) {
//     let row = document.createElement('tr');
//     row.innerHTML = `
//     <td>${catalog[i].surname}</td>
//     <td>${catalog[i].nameA}</td>
//     <td>${catalog[i].patronymic}</td>
//     <td>${catalog[i].dob}</td> `;

//     document.querySelector('.authors').appendChild(row);
//   }
//   // }

//   event.currentTarget.reset();
//   // form.reset();
// }

// function onBookFormSubmit(event) {
//   event.preventDefault();

//   const formData = new FormData(event.currentTarget);
//   console.log(formData);
//   let data = Object.fromEntries(formData.entries());
//   console.log(data);

//   bibliography.push(data); //   ЛИШНЯЯ  ПЕРЕМЕННАЯ
//   console.log(bibliography);

//   // localStorage.setItem('key', JSON.sringify(bibliography));

//   // document.querySelector(
//   //   '.books'
//   //   ).innerHTML = `<table class="record"></table>`;

//   result.innerHTML = `<table class="record"></table>`;

//   console.log(result);
//   // for (let i = 0; i < bibliography.length; i++) {
//   //   let row = document.createElement('tr');
//   //   row.innerHTML = `
//   //   <td>${bibliography[i].title}</td>
//   //   <td>${bibliography[i].paging}</td>
//   //   <td>${bibliography[i].genre}</td> `;

//   //   document.querySelector('.record').appendChild(row);
//   // }
//   console.log(bibliography);
//   createBooks(bibliography);

//   console.log(bibliography);

//   // bibliography.forEach(function (item, i) {
//   //   let row = document.createElement('tr');
//   //   row.innerHTML = `
//   //   <td>${bibliography[i].title}</td>
//   //   <td>${bibliography[i].paging}</td>
//   //   <td>${bibliography[i].genre}</td> `;

//   //   document.querySelector('.record').appendChild(row);
//   // });
//   event.currentTarget.reset();
// }

// let delButton = document.querySelector('.btn');
// let bookItem = document.querySelector('tr');

// delButton.addEventListener('click', e => {
//   console.log(bookItem);
// });

// function createBooks(value) {
//   console.log(value);
//   for (let i = 0; i < value.length; i++) {
//     let row = document.createElement('tr');
//     row.id = `text`;
//     row.className = `note`;
//     row.innerHTML = `
//     <td>${value[i].title}</td>
//     <td>${value[i].paging}</td>     
//     <td>${value[i].genre}</td>  

//     <input name="del" type="button" value="удалить"/>`;
//     // <button class="btn">удалить</button>`;
//     // <input name="del" type="button" value="удалить"/>`;

//     //  <button class="btn">удалить</button>`;

//     //  <label for="size">Size</label>
//     // <select id="size" name="size">
//     // <option value="xs">Extra Small</option>
//     // <option value="s">Small</option>
//     // <option value="m" selected>Medium</option>
//     // <option value="l">Large</option>
//     // </select>

//     document.querySelector('.record').appendChild(row);
//     //  let tab = document.querySelector('.record');
//     //  let tabRows = document.querySelector('.note');
//     //  let delButton = document.querySelector('.btn');

//     // console.log(tab);
//     // console.log(tabRows);
//     //  console.log(delButton);

//     //  delButton.addEventListener('click', e => {
//     //    for (let row of tabRows) {
//     //      elem.remove();
//     //    }

//     let els = document.getElementsByName('del');
//     els.forEach(function (item) {
//       item.addEventListener('click', function () {
//         item.parentNode.parentNode.removeChild(item.parentNode);
//       });
//     });

//     //  let delButton = document.querySelector('.btn');
//     //  delButton.addEventListener('click', (e) => {
//     //   //  console.log(bookItem);
//     //   let note = document.getElementById(`text`);
//     //    note.removeChild(note.lastElementChild);
//     //  })
//   }
// } 

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

// for (let index = 0; index < authors.length; index++) {
//   const currentAuthor = authors[index];
//   let li = document.createElement('li');
//   li.textContent = currentAuthor.surname + ' ' + currentAuthor.nameA;
//   li.dataset.authorNumber = index;
//   authorList.append(li);
//   // console.log(li);
// }

// Встановлення обробників 

// authorList.addEventListener('click', function (e) {
//   if (e.target.tagName != 'LI') return;
//   selectAuthor = authors[e.target.dataset.authorNumber];

//   fillForm(selectAuthor);
//   selectListItem(e.target);
// });

// saveButton.addEventListener('click', function () {
//   updateAuthor(selectAuthor);
// });

// Логіка 

// function selectListItem(element) {
//   deselectAllListItems();
//   element.classList.add('selected');
// }

// function deselectAllListItems() {
//   let selectedItems = document.querySelectorAll('li.selected');
//   for (let i = 0; i < selectedItems.length; i++) {
//     const element = selectedItems[i];
//     element.classList.remove('selected');
//   }
// }

// function fillForm(selectAuthor) {
//   const form = document.forms[0];

//   form.surname.value = selectAuthor.surname;
//   form.nameA.value = selectAuthor.nameA;
//   form.patronymic.value = selectAuthor.patronymic;
//   form.dob.value = selectAuthor.dob;
//   //   form.email.value = selectAuthor.email;
//   //   form.age.value = selectAuthor.age;
// }

// function updateAuthor(selectAuthor) {
//   const form = document.forms[0];

//   selectAuthor.surname = form.surname.value;
//   selectAuthor.nameA = form.nameA.value;
//   selectAuthor.patronymic = form.patronymic.value;
//   selectAuthor.dob = form.dob.value;
//   //   selectAuthor.email = form.email.value;
//   //   selectAuthor.age = form.age.value;
// }
