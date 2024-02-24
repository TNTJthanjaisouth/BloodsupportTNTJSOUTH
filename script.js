import { fetchData, orderedData } from "./FetchDataSheet.js";

const Branch_ = document.getElementById("Branch");
const Bloodtype = document.getElementById("Blood_Type");
const Search = document.getElementById("search");
const Avail_Or_Not = document.getElementById("Avail_Or_Not");
const tbody = document.getElementById("tbody");
const thead = document.getElementById("thead");

// Function to add filtered data to HTML
function AddFilterinHtml(filteredData) {
  thead.innerHTML = "";
  tbody.innerHTML = "";

  const headings = Object.keys(filteredData[0]);
  thead.insertAdjacentHTML(
    "beforeend",
    headings.map((col) => `<th class="">${col}</th>`).join("")
  );

  filteredData.forEach((row, index) => {
    row.SNo = index + 1;

    const tr = document.createElement("tr");
    const tdContent = Object.values(row)
      .map((value) => `<td>${value}</td>`)
      .join("");
    tr.innerHTML = tdContent;
    tbody.appendChild(tr);
  });
}

// Fetch data and populate dropdowns
fetchData().then((td) => {
  console.log(td);
  const tableData = td;
  const Bloodtype_opt = [];
  const Branch = [];

  tableData.forEach((x, y) => {
    Bloodtype_opt.push(x.BloodGroup);
    Branch.push(x.Branch);
  });

  const Blood_Type_opt = [...new Set(Bloodtype_opt)];
  const Branch_opt = [...new Set(Branch)];

  Branch_opt.forEach((val) => {
    addOptionToDropdown(Branch_, val);
  });

  Blood_Type_opt.forEach((val) => {
    addOptionToDropdown(Bloodtype, val);
  });

  function addOptionToDropdown(dropdown, value) {
    const option = document.createElement("option");
    option.innerHTML = value;
    option.value = value;
    option.className = "option";
    dropdown.appendChild(option);
  }

  // Function to handle error message display
  function displayError(id, errMess) {
    const elem = document.getElementById(id);
    elem.innerHTML = "";
    elem.removeAttribute("class");

    setTimeout(() => {
      elem.innerHTML = errMess;
      elem.className = "Error";
    }, 200);
  }

  // Function to handle search functionality
  function searchRecords() {
    const value1 = Bloodtype.value;
    const value2 = Branch_.value;
    const value3 = Avail_Or_Not.value;

    if (value1 === "" || value2 === "" || value3 === "") {
      alert("Please select all given fields");
      return;
    }

    let filter;
    if (value2 === "all" && value3 === "all") {
      filter = orderedData(tableData, value1, "BloodGroup");
    } else {
      filter = orderedData(tableData, value1, "BloodGroup");
      filter = orderedData(filter, value2, "Branch");
      filter = orderedData(filter, value3, "AvailableOrNot");
    }

    if (filter.length > 0) {
      AddFilterinHtml(filter);
      document.getElementById("err").innerHTML = "";
      document.getElementById("err").removeAttribute("class");
    } else {
      thead.innerHTML = "";
      tbody.innerHTML = "";
      displayError("err", "No Record Found !");
    }
  }

  Search.addEventListener("click", searchRecords);
});
