const sheet_id = "1MLobdItp0ySFPteZipSz-96SOG_8PB82MARFbYAFEnc";
const sheet_title = "sample_db";
const sheet_range = "A1:M52";
const url = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?sheet=${sheet_title}&range=${sheet_range}`;

fetch(url)
  .then((res) => res.text())
  .then((rep) => {
    const data = JSON.parse(rep.substr(47).slice(0, -2));
    const tbody = document.getElementById("tbody");

    data.table.cols.forEach((col) => {
      document
        .getElementById("thead")
        .insertAdjacentHTML("beforeend", `<th class="">${col.label}</th>`);
    });

    data.table.rows.forEach((row) => {
      const tr = document.createElement("tr");
      row.c.forEach((cell) => {
        let tdContent = cell.v;
        if (typeof tdContent === "string" && tdContent.startsWith("Date")) {
          tdContent = cell.f;
        }
        const td = document.createElement("td");
        td.textContent = tdContent;
        if (typeof tdContent === "string" && tdContent.includes("not avail")) {
          td.style.color = "red";
        } else if (
          typeof tdContent === "string" &&
          tdContent.includes("avail")
        ) {
          td.style.color = "green";
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  });
