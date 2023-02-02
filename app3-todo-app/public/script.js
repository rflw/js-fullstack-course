const requestHeaders = {
  'Content-Type': 'application/json'
};

async function submitHandler(event) {
  event.preventDefault();
  const newItemValue = new FormData(event.target).get('newItem');
  await addItemHandler(newItemValue);
  event.target.reset();
}

async function addItemHandler(newValue) {
  fetch('/create-item', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({ text: newValue })
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  }).then((itemData) => {
    document.getElementById('items-list')
      .insertAdjacentHTML('afterbegin', itemTemplate(itemData));
  }).catch(error => {
    console.error('Fetch error', error);
  })
}

function editItemHandler(id) {
  const listItem = getListItemElementText(id);
  const newValue = prompt('Enter new text', listItem.innerText);

  if (!newValue) {
    alert('No value');
    return;
  }

  fetch('/update-item', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({ id, text: newValue })
  }).then(response => {
    console.log('edit item - before response')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.text();
  }).then(() => {
    console.log('after response');
    listItem.innerText = newValue;
  }).catch(error => {
    console.error('Fetch error', error);
  })
}

function deleteItemHandler(id) {
  const listItem = getListItemElement(id);
  const isAccept = confirm('Do you really want to delete this item?');

  if (!isAccept) {
    return;
  }

  fetch('/delete-item', {
    method: 'DELETE',
    headers: requestHeaders,
    body: JSON.stringify({ id })
  }).then(response => {
    console.log('edit item - before response')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.text();
  }).then(() => {
    listItem.remove();
  })
  .catch(error => {
    console.error('Fetch error', error);
  })
}

function getListItemElementText(id) {
  return getListItemElement(id).getElementsByClassName('itemText')[0];
}

function getListItemElement(id) {
  return document.getElementById(id);
}

function itemTemplate(item) {
  return `
  <li id="${item._id}">
    <span class="itemText">${item.text}</span>
    <button onclick="editItemHandler('${item._id}')">Edit</button>
    <button onclick="deleteItemHandler('${item._id}')">Delete</button>
  </li>`;
}