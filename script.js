const sheet_id = "1MLobdItp0ySFPteZipSz-96SOG_8PB82MARFbYAFEnc";
const sheet_title = "sample_db";
const sheet_range = "A1:M52";
const url = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?sheet=${sheet_title}&range=${sheet_range}`;

fetch(url)
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
      // console.log(tableData);
    });

    const Bloodtype_opt = [];
    const Branch = [];

    tableData.forEach((x, y) => {
      Bloodtype_opt.push(x.BloodGroup);
      Branch.push(x.Branch);
      console.log(x);
    });
    const Blood_Type_opt = [...new Set(Bloodtype_opt)];
    const Branch_opt = [...new Set(Branch)];
    Branch_opt.forEach((x) => {
      const Branch_ = document.getElementById("Branch");
      const option = document.createElement("option");
      option.innerHTML = x;
      option.className = "option";
      Branch_.appendChild(option);
    });
    Blood_Type_opt.forEach((x) => {
      const Bloodtype = document.getElementById("Blood_Type");
      const option = document.createElement("option");
      option.innerHTML = x;
      option.className = "option";
      Bloodtype.appendChild(option);
    });
    console.log(Blood_Type_opt, Branch_opt);
  });
