import { getName } from "country-list";

const convertToCSV = (array) => {
    const headers = Object.keys(array[0]);
    const csvRows = [];
    
    // Add the headers row
    csvRows.push(headers.join(','));
  
    // Add the data rows
    for (const row of array) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
  
    return csvRows.join('\n');
  };
  

  export const downloadCSV = (data, filename = 'data.csv') => {
    let array = data.map(entity => {
      return {
        "name": entity.name,
        "country": getName(entity.country),
        "type": entity.type,
        "region": entity.region,
        "status": entity.status,
        "account_manager": entity.accountManager?.name,
        "point_contact": entity.pointContact?.name,
        "parent": entity.name,
    }
    })
    const csv = convertToCSV(array);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };