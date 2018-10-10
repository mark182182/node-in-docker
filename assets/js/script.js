'use strict';

window.onload = () => {
  fetch('/books', {
    method: 'get'
  }).then((response) => {
    response.json().then((books) => {
      const getList = document.querySelector('#list');
      for (let index = 0; index < books.length; index++) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${books[index].book_id} ${books[index].title} ${books[index].author}`;
        getList.appendChild(listItem);
      }
    })
  });

  const getSubmit = document.querySelector('#submit');
  getSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const getForm = document.querySelector('#book-form'),
      { title, author } = getForm;
    fetch('/add', {
      method: 'post',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ title: title.value, author: author.value })
    });
    location.reload();
  });
};