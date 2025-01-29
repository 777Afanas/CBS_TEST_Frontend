import { authors } from "./authors.js";

let authorList = document.querySelector("#authorList");
let saveButton = document.querySelector("#saveButton");
let selectAuthor = null;

// console.log(authors);
// console.log(authorList);
// console.log(selectAuthor);
// console.log(authors.length); 
// console.log(authors[0]);

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
