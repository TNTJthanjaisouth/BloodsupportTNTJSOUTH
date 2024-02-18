const sheet_id = "1MLobdItp0ySFPteZipSz-96SOG_8PB82MARFbYAFEnc";
const sheet_title = "sample_db";
const sheet_range = "A1:M52";
const url = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?sheet=${sheet_title}&range=${sheet_range}`;

// Define a function to fetch data and return a Promise
function fetchData() {
  return fetch(url)
    .then((res) => res.text())
    .then((rep) => {
      const data = JSON.parse(rep.substr(47).slice(0, -2));
      const tableData = [];

      data.table.rows.forEach((row) => {
        const rowData = {};
        row.c.forEach((cell, index) => {
          const value = cell.v;
          const header = data.table.cols[index].label;
          rowData[header] = value;
        });
        tableData.push(rowData);
      });
      return tableData; // Return tableData once it's populated
    });
}

// Call fetchData and then use the returned data

// You cannot access tableData here directly as it's an asynchronous operation
// console.log(tableData.length); // This will not work here

// If you need to use tableData in another function, you should call that function within the .then() block

export { fetchData };
