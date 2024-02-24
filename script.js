import { fetchData, orderedData } from "./FetchDataSheet.js";
const Branch_ = document.getElementById("Branch");
const Bloodtype = document.getElementById("Blood_Type");
const Search = document.getElementById("search");
const Avail_Or_Not = document.getElementById("Avail_Or_Not");
const tbody = document.getElementById("tbody");
const thead = document.getElementById("thead");

let array = [{ name: "john", Branch: "thiruvallur" }];

//--------------------function-------------------
function AddFilterinHtml(filteredData) {
  thead.innerHTML = "";
  tbody.innerHTML = "";

  const { ...headings } = filteredData[0];
  thead.insertAdjacentHTML(
    "beforeend",
    Object.keys(headings)
      .map((col) => `<th class="">${col}</th>`)
      .join("")
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

//------------------------------------------------------
fetchData().then((td) => {
  console.log(td);
  const tableData = td;
  // console.log(tableData);
  const Bloodtype_opt = [];
  const Branch = [];

  tableData.forEach((x, y) => {
    Bloodtype_opt.push(x.BloodGroup);
    Branch.push(x.Branch);
    // console.log(x);
  });

  const Blood_Type_opt = [...new Set(Bloodtype_opt)];
  const Branch_opt = [...new Set(Branch)];
  Branch_opt.forEach((val) => {
    const option = document.createElement("option");
    option.innerHTML = val;
    option.value = val;

    option.className = "option";
    Branch_.appendChild(option);
  });
  Blood_Type_opt.forEach((val) => {
    const option = document.createElement("option");
    option.innerHTML = val;
    option.className = "option";
    option.value = val;
    Bloodtype.appendChild(option);
  });
  //-------------------------------------------------------
  function error(id, errMess) {
    document.getElementById(`${id}`).innerHTML = "";
    document.getElementById(`${id}`).removeAttribute("class");

    setTimeout((e) => {
      document.getElementById(`${id}`).innerHTML = errMess;
      document.getElementById(`${id}`).className = "Error";
    }, 1000);
  }
  // ----------------------------------------------
  function SearchData(id1, id2, id3) {
    const value1 = id1.value;
    const value2 = id2.value;
    const value3 = id3.value;

    if (value1 === "" || value2 === "" || value3 === "") {
      alert("Please select all given fields");
      return;
    }

    let filter;
    if (value2 === "all" && value3 === "all") {
      filter = orderedData(tableData, value1, "BloodGroup");
    } else if (value2 === "all") {
      filter = orderedData(tableData, value1, "BloodGroup");
      filter = orderedData(filter, value2, "Branch");
      filter = orderedData(filter, value3, "AvailableOrNot");
    } else if (value3 == "all") {
      filter = orderedData(tableData, value1, "BloodGroup");
      filter = orderedData(filter, value2, "Branch");
      filter = orderedData(filter, value3, "AvailableOrNot");
    } else {
      filter = orderedData(tableData, value1, "BloodGroup");
      filter = orderedData(filter, value2, "Branch");
      filter = orderedData(filter, value3, "AvailableOrNot");
    }
    // console.table(filter);
    if (filter.length > 0) {
      AddFilterinHtml(filter);
      document.getElementById("dd").innerHTML = "";
      document.getElementById("dd").removeAttribute("class");
    } else {
      thead.innerHTML = "";
      tbody.innerHTML = "";
      error("dd", "No Record Found !");
    }
  }
  Search.addEventListener("click", () => {
    console.log(Bloodtype.value);
    console.log(Branch_.value);
    console.log(Avail_Or_Not.value);

    SearchData(Bloodtype, Branch_, Avail_Or_Not);
  });
});
// console.log(Blood_Type_opt, Branch_opt);

function Listener(variable, eL) {
  variable.addEventListener(`${eL}`, () => {
    console.log(variable.value);
  });
}
// Listener(Branch_, "change");
// Listener(Bloodtype, "change");
// Listener(Avail_Or_Not, "change");
