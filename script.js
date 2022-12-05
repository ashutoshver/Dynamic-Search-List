const searchBox = document.querySelector("#search_box").value;
const dynamicList = document.querySelector("#dynamic_List");
const Container = document.querySelector("#container");
const nameInput = dynamicList['name'];
const panInput = dynamicList['pan'];
const ageInput = dynamicList['age'];
const qualificationInput = dynamicList['qualification'];
const searchPan = document.querySelector("#search_pan")
const Select = document.querySelector("#sorting");


const list = JSON.parse(localStorage.getItem("list")) || [];  //Empty array where we store all data

const addList = (name, pan, age, qualification) => {
  list.push({
    name,
    pan,
    age,
    qualification,
  });

  localStorage.setItem("list", JSON.stringify(list));
  return { name, pan, age, qualification };
}
//create Element
const createListElement = ({ name, pan, age, qualification }) => {
  const listDiv = document.createElement("div");
  const listName = document.createElement("h2");
  const listPan = document.createElement("h3");
  const listAge = document.createElement("p");
  const listQualification = document.createElement("p");

  listName.innerText = "Name: " + name;
  listPan.innerText = "Pan Number: " + pan;
  listAge.innerText = "Age: " + age;
  listQualification.innerText = "Highest Qualification: " + qualification;

  listDiv.append(listName, listPan, listAge, listQualification);
  Container.appendChild(listDiv);

  console.log(listDiv)

};

list.forEach(createListElement);

dynamicList.onsubmit = e => {
  e.preventDefault();

  const newList = addList(
    nameInput.value,
    panInput.value,
    ageInput.value,
    qualificationInput.value,
  );
  createListElement(newList);
  nameInput.value = "";
  panInput.value = "";
  ageInput.value = "";
  qualificationInput.value = "";
};

//Serached User Data
let Filter = [...list];
const displayUser = () => {
  if (Filter.length < 1) {
    Container.innerHTML = `<h5>No User Data Found</h5>`;
    return;
  }
  Container.innerHTML = Filter.map(list => {
    const { name, pan, age, qualification } = list;
    return `
    <h2><span>Name:</span>${name}</h2>
    <h3><span>Pan Number:</span>${pan}</h3>
    <p><span>Age:</span>${age}</p>
    <p><span>Highest Qualification:</span>${qualification}</p>`;
  })
}

//add EventListner to search Input
searchPan.addEventListener('keyup', e => {
  e.preventDefault();
  const input = searchPan.value;
  Filter = list.filter(list => {
    return list.pan.includes(input);
  })
  displayUser();
})

//SORTING

//Ascending order
const sortAscending = function () {
  list.sort(function (a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
}

//Descending

const sortDescending = function () {
  list.sort(function (a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  })
}

//render sorted data
const renderSort = function (ele) {
  Container.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    Container.innerHTML += `
    <h2><span>Name:</span>${list[i].name}</h2>
    <h3><span>Pan Number:</span>${list[i].pan}</h3>
    <p><span>Age:</span>${list[i].age}</p>
    <p><span>Highest Qualification:</span>${list[i].qualification}</p>`;
  }
}

//event on select

Select.addEventListener('change', function (ele) {
  ele.preventDefault();
  if (Select.value === 'A-Z') {
    sortAscending();
    renderSort();
  }
  if (Select.value === 'Z-A') {
    sortDescending();
    renderSort();
  }
})





