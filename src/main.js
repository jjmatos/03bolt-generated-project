import { fetchCSV, parseCSV } from './csvUtils.js';
    import {
      generateForm,
      handleSave,
      createDynamicTable,
      addField,
      saveTableToTXT,
      loadTableFromTXT,
      clearTable,
    } from './formUtils.js';
    
    async function handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const csvText = e.target.result;
          const data = parseCSV(csvText);
          const container = document.getElementById('form-container');
          container.innerHTML = '';
          generateForm(data, container);
          createDynamicTable();
        };
        reader.readAsText(file);
      }
    }
    
    async function loadCSV() {
      const container = document.getElementById('form-container');
      const csvText = await fetchCSV('data.csv');
      const data = parseCSV(csvText);
      container.innerHTML = '';
      generateForm(data, container);
      createDynamicTable();
    }
    
    function init() {
      const loadCsvButton = document.getElementById('loadCsvButton');
      loadCsvButton.addEventListener('click', loadCSV);
    
      const csvFileInput = document.getElementById('csvFileInput');
      csvFileInput.addEventListener('change', handleFileSelect);
    
      const addFieldButton = document.getElementById('addFieldButton');
      addFieldButton.addEventListener('click', () => {
        const form = document.querySelector('#form-container form');
        if (form) {
          addField(form);
        } else {
          console.error('Form not found!');
        }
      });
    
      const saveTableButton = document.getElementById('saveTableButton');
      saveTableButton.addEventListener('click', saveTableToTXT);
    
      const loadTableInput = document.getElementById('loadTableInput');
      const loadTableButton = document.getElementById('loadTableButton');
      loadTableButton.addEventListener('click', () => {
        const file = loadTableInput.files[0];
        if (!file) {
          return;
        }
        if (file) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const text = e.target.result;
            loadTableFromTXT(text);
          };
          reader.readAsText(file);
        } else {
          console.error('No file selected!');
        }
      });
    
      const clearTableButton = document.getElementById('clearTableButton');
      clearTableButton.addEventListener('click', clearTable);
    }
    
    init();
