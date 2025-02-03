import { authors } from './authors.js';

let formAuthor = document.querySelector('#input-author');
let formInput = document.querySelector('#input');

let result = document.querySelector('.books');
let resultAuth = document.querySelector('.authors');
// let tableAuth = document.querySelector('.record-author');


// /////////////////////////////////////////////////////////////////
let catalog1 = [];  

// if (localStorage.getItem('author')) {
//   catalog1 = JSON.parse(localStorage.getItem('author'));
//   //  функція
  
//   resultAuth.innerHTML = `<table class="record-author"> 
//   <thead class="recd-auth">
//     <tr>
//       <th data-type="string">Автори</th>
//       <th data-type="number">Книг в базе</th>
//     </tr>
//     </thead>
//     <tbody class="rec-auth"></tbody>
//     </table>`;
//   for (let i = 0; i < catalog1.length; i++) {
//     let row = document.createElement('tr');          
//     row.id = `text`;
//     row.className = `note`;    
//     row.innerHTML = `    
//     <td>${catalog1[i].initials}</td>
//     <td>${catalog1[i].collection}</td>            
//     <input name="del-auth" type="button" value="видалити"/>`;

//     document.querySelector('.rec-auth').appendChild(row);
//   }  
// }


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
  localStorage.setItem('author', JSON.stringify(catalog1));

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

  //  СОРТУВАННЯ в таблиці  '.record-author"
  let tableAuth = document.querySelector('.record-author');
  // console.log(resultAuth);
  console.log(tableAuth);

  console.log(catalog1);

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
    console.log(row);
    row.innerHTML = `    
    <td>${value[i].initials}</td>
    <td>${value[i].collection}</td>            
    <input name="del-auth" type="button" value="видалити"/>`;
  
    document.querySelector('.rec-auth').appendChild(row);

    let els = document.getElementsByName('del-auth');
   
    console.log(els);
    
    els.forEach(function (item) {
      console.log(item);
      item.addEventListener('click', function (e) { 

        console.log(e.target);
        let del = e.target;
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

