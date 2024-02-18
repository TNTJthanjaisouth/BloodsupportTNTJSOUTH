import { fetchData } from "./FetchDataSheet.js";
const Branch_ = document.getElementById("Branch");
const Bloodtype = document.getElementById("Blood_Type");
const Search = document.getElementById("search");
const Avail_Or_Not = document.getElementById("Avail_Or_Not");
const tbody = document.getElementById("tbody");
const thead = document.getElementById("thead");
//--------------------function-------------------
function AddFilterinHtml(filteredData) {
  const headings = Object.keys(filteredData[0]);
  headings.forEach((col) => {
    thead.insertAdjacentHTML("beforeend", `<th class="">${col}</th>`);
    // console.log(col);
  });
  filteredData.forEach((row, index) => {
    row.SNo = index + 1;

    const values = Object.values(row);
    const tr = document.createElement("tr");
    values.forEach((rows) => {
      let tdContent = rows;

      const td = document.createElement("td");
      td.textContent = tdContent;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    // console.log(Object.values(row));
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
  function SearchData(id1, id2, id3) {
    let value1 = id1.value;
    let value2 = id2.value;
    let value3 = id3.value;
    if (value1 === "all" && value2 == "all" && value3 == "all") {
      console.log(tableData);
      location.replace("donarList.html");
    } else if (
      value1 === "A +ve" ||
      value1 === "O +ve" ||
      value1 === "AB +ve" ||
      value1 === "B +ve" ||
      value1 === "A -ve" ||
      value1 === "O -ve"
    ) {
      if (
        (value2 === "all" && value3 === "all") ||
        (value2 === "all" && value3 === "avail")
      ) {
        function filterObjects(array, condition) {
          return array.filter((item) => condition(item));
        }

        // Define the condition for filtering (age less than 30 in this example)
        const filteredArray = filterObjects(
          tableData,
          (item) => item.AvailableOrNot === value3
        );

        console.log(filteredArray);
        AddFilterinHtml(filteredArray);
        return;
      }
      function filterObjects(array, condition) {
        return array.filter((item) => condition(item));
      }

      // Define the condition for filtering (age less than 30 in this example)
      const filteredArray = filterObjects(
        tableData,
        (item) => item.BloodGroup === value1
      );

      console.log(filteredArray);
      AddFilterinHtml(filteredArray);
      return;
    } else if (value1 == "" || value2 == "" || value3 == "") {
      alert("Please select all given fields");
      return;
    }
    // } else if (
    //   (value1 === "A +ve" && value2 === "all" && value3 === "avail") ||
    //   (value1 === "O +ve" && value2 === "all" && value3 === "avail") ||
    //   (value1 === "AB +ve" && value2 === "all" && value3 === "avail") ||
    //   (value1 === "B +ve" && value2 === "all" && value3 === "avail") ||
    //   (value1 === "A -ve" && value2 === "all" && value3 === "avail") ||
    //   (value1 === "O -ve" && value2 === "all" && value3 === "avail")
    // ) {
    //   function filterObjects(array, condition) {
    //     return array.filter((item) => condition(item));
    //   }

    //   // Define the condition for filtering (age less than 30 in this example)
    //   const filteredArray = filterObjects(
    //     tableData,
    //     (item) => item.AvailableOrNot === value3
    //   );

    //   console.log(filteredArray);
    //   AddFilterinHtml(filteredArray);
    // }
  }
  Search.addEventListener("click", () => {
    // console.log(Bloodtype.value);
    SearchData(Bloodtype, Branch_, Avail_Or_Not);
  });
});
// console.log(Blood_Type_opt, Branch_opt);

Branch_.addEventListener("change", () => {
  console.log(Branch_.value);
});
function Listener(variable, eL) {
  variable.addEventListener(`${eL}`, () => {
    console.log(variable.value);
  });
}
Listener(Branch_, "change");
Listener(Bloodtype, "change");
Listener(Avail_Or_Not, "change");
