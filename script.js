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
          `<th class="">${data.table.cols[i].label}</th>`
        );
    }
    // console.log(data.table.rows);
    // console.log(data.table.rows[9]);
    // console.log(JSON.stringify(data.table.rows[11].c[10].v));
    for (let i = 0; i < data.table.rows.length; i++) {
      //   console.log(data.table.rows[i].c[i].v);
      //   console.warn("===================");

      let tr = document.createElement("tr");

      for (let j = 0; j < data.table.rows[i].c.length; j++) {
        if (JSON.stringify(data.table.rows[i].c[j].v).slice(1, 5) === "Date") {
          tr.insertAdjacentHTML(
            "beforeend",
            `<td class="">${data.table.rows[i].c[j].f}</td>`
          );
          document.getElementById("tbody").appendChild(tr);
        } else {
          if (
            JSON.stringify(data.table.rows[i].c[j].v).slice(1, 10) ===
            "not avail"
          ) {
            tr.insertAdjacentHTML(
              "beforeend",
              `<td class="" style="color:red">${data.table.rows[i].c[j].v}</td>`
            );
          } else if (
            JSON.stringify(data.table.rows[i].c[j].v).slice(1, 6) === "avail"
          ) {
            tr.insertAdjacentHTML(
              "beforeend",
              `<td class="" style="color:green" >${data.table.rows[i].c[j].v}</td>`
            );

            // console.log(data.table.rows[i].c[j].v);
          } else {
            tr.insertAdjacentHTML(
              "beforeend",
              `<td class="">${data.table.rows[i].c[j].v}</td>`
            );
            document.getElementById("tbody").appendChild(tr);
          }
        }
      }
    }
    console.log(data.table.rows);

    // console.log(data.table.rows[0].c.length);
  });
