import { fetchData } from "./FetchDataSheet.js";
const Branch_ = document.getElementById("Branch");
const Bloodtype = document.getElementById("Blood_Type");
const Search = document.getElementById("search");
const Avail_Or_Not = document.getElementById("Avail_Or_Not");
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
    }
  }
  Search.addEventListener("click", () => {
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
