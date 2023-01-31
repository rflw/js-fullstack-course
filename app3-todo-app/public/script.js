function editItemHandler() {
  console.log('edit item handler');
  const newValue = prompt('Enter new text');

  fetch('/update-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: newValue })
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.text();
  }).then(data => {
    console.log('data', data);
  }).catch(error => {
    console.error('Fetch error', error);
  })

}

function deleteItemHandler() {
  console.log('delete item handler');
}