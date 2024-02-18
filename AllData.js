const sheet_id = "1MLobdItp0ySFPteZipSz-96SOG_8PB82MARFbYAFEnc";
const sheet_title = "sample_db";
const sheet_range = "A1:M52";
const url = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?sheet=${sheet_title}&range=${sheet_range}`;

fetch(url)
  .then((res) => res.text())
  .then((rep) => {
    const data = JSON.parse(rep.substr(47).slice(0, -2));
    const tbody = document.getElementById("tbody");
    const thead = document.getElementById("thead");

    // Clear table body and header before repopulating
    tbody.innerHTML = "";
    thead.innerHTML = "";

    data.table.cols.forEach((col) => {
      thead.insertAdjacentHTML("beforeend", `<th class="">${col.label}</th>`);
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

    // Add pagination after populating table
    addPagination();
  });

function displayPage(pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const tableRows = document.querySelectorAll("#tbody tr");

  tableRows.forEach((row, index) => {
    if (index >= startIndex && index < endIndex) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
}

function addPagination() {
  const paginationElement = document.querySelector("#pagination");
  paginationElement.innerHTML = "";

  const totalPages = Math.ceil(
    document.querySelectorAll("#tbody tr").length / pageSize
  );

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = "btn";
    button.addEventListener("click", () => {
      displayPage(i, pageSize);
    });
    paginationElement.appendChild(button);
    if (i == 1) {
      button.click();
    }
  }
}

const pageSize = 10; // Set as needed
document.getElementById("back").addEventListener("click", () => {
  location.replace("index.html");
});
