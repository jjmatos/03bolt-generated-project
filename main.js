async function fetchCSV(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length === headers.length) {
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }
      data.push(entry);
    }
  }
  return data;
}

function generateForm(data, container) {
  const form = document.createElement('form');
  data.forEach(item => {
    for (const key in item) {
      const label = document.createElement('label');
      label.textContent = `${key}:`;
      const input = document.createElement('input');
      input.type = 'text';
      input.name = key;
      input.value = item[key];
      form.appendChild(label);
      form.appendChild(input);
    }
  });
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  form.appendChild(submitButton);
  form.addEventListener('submit', handleSubmit);
  container.appendChild(form);
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  console.log('Form Data:', formObject);
}

async function init() {
  const container = document.getElementById('form-container');
  const csvText = await fetchCSV('data.csv');
  const data = parseCSV(csvText);
  generateForm(data, container);
}

init();
