export async function fetchCSV(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  }
  const text = await response.text();
  return text;
}

export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length === headers.length) {
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].trim();
        let value = values[j].trim();
        let type = 'text';

        if (!isNaN(value) && value !== '') {
          type = 'number';
          value = parseFloat(value);
        } else if (value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          type = 'email';
        }

        entry[header] = { value, type };
      }
      data.push(entry);
    }
  }
  return data;
}
