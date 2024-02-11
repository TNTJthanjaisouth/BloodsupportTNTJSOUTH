let sheet_id = "1MLobdItp0ySFPteZipSz-96SOG_8PB82MARFbYAFEnc";
let sheet_title = "sample_db";
let sheet_range = "A1:L52";
let url = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?sheet=${sheet_title}&range=${sheet_range}`;
// console.log(url);
fetch(url)
  .then((res) => res.text())
  .then((rep) => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    // console.log(data.table.rows[0].length);
    for (let i = 0; i < data.table.cols.length; i++) {
      //   let th = document.createElement("th");
      document
        .getElementById("thead")
        .insertAdjacentHTML(
          "beforeend",
          `<th>${data.table.cols[i].label}</th>`
        );
    }
    // console.log(data.table.rows);
    console.log(data.table.rows[9]);

    for (let i = 0; i < data.table.rows.length; i++) {
      //   console.log(data.table.rows[i].c[i].v);
      //   console.warn("===================");

      let tr = document.createElement("tr");

      for (let j = 0; j < data.table.rows[i].c.length; j++) {
        if (JSON.stringify(data.table.rows[i].c[j].v).slice(1, 5) === "Date") {
          tr.insertAdjacentHTML(
            "beforeend",
            `<td>${data.table.rows[i].c[j].f}</td>`
          );
          document.getElementById("tbody").appendChild(tr);
        } else {
          tr.insertAdjacentHTML(
            "beforeend",
            `<td>${data.table.rows[i].c[j].v}</td>`
          );
          document.getElementById("tbody").appendChild(tr);
          // console.log(data.table.rows[i].c[j].v);
        }
      }
    }
    console.log(data.table.rows);

    // console.log(data.table.rows[0].c.length);
  });
