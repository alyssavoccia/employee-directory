const searchBox = document.querySelector('.search-box');
const modalOverlay = document.querySelector('.modal-overlay');
let employeeBoxes = [];
// Variable to hold array of employee data
let employees = [];
let numberOfEmployees = 0;

// FUNCTION TO ABBREVIATE EMPLOYEE STATE
function abbrState(input, to){
  var states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arizona', 'AZ'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
  ];
  if (to == 'abbr'){
    input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    for(i = 0; i < states.length; i++){
      if(states[i][0] == input){
        return(states[i][1]);
      }
    }    
  }
}

// Function to capitalize the first letter of every word
function titleCase(str) {
  var splitStr = str.toString().toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

// GETS DATA FOR EMPLOYEE AND CREATES AN ARRAY OF EMPLOYEE OBJECTS
function getEmployeeData(employeeArr) {
  numberOfEmployees = employeeArr.length;
  let listOfEmployees = employeeArr.map(employee => 
    ({
      image: employee.picture.large,
      name: `${employee.name.first.toUpperCase()} ${employee.name.last.toUpperCase()}`,
      email: employee.email,
      street: titleCase(employee.location.street),
      city: titleCase(employee.location.city),
      state: abbrState(employee.location.state, 'abbr'),
      zip: employee.location.postcode,
      cell: employee.cell,
      birthdate: employee.dob.date,
      username: employee.login.username
    })
  );
  return listOfEmployees;
}

// GENERATES THE HTML TO CREATE THE BOX FOR EACH EMPLOYEE
function generateEmployeeHTML(employees) {
  for (let i = 0; i <employees.length; i++) {
    let employeeBox = document.createElement('div');
    employeeBox.className = `employee-box`;
    employeeBox.id = `${i}`;
    employeeBox.innerHTML = 
      `
        <img src="${employees[i].image}" class="employee-img">
        <div class="box-info">
          <p class="employee-name">${employees[i].name}</p>
          <p class="employee-username">${employees[i].username}</p>
          <p class="employee-email">${employees[i].email}</p>
          <p class="employee-city">${employees[i].city}</p>
        </div>
      `;
    document.querySelector('.inner-wrapper').appendChild(employeeBox);
  }

  // ADD AN EVENT LISTENER TO GENERATE A MODAL FOR EMPLOYEE WHEN THEIR BOX IS CLICKED
  employeeBoxes = [].slice.call(document.querySelectorAll('.employee-box'));
  for (let i = 0; i < employeeBoxes.length; i++) {
    employeeBoxes[i].addEventListener('click', (e) => {
      modalOverlay.style.display = 'block';
      generateModalHTML(employees[i], i);
    });
  }
}

// FUNCTION TO CREATE A MODAL WHEN USER IS CLICKED
function generateModalHTML(employeeData, i) {
  const employee = employeeData;
  let index = i;

  // Format employee birthday
  let birthday = new Date(`${employee.birthdate}`);
  let dd = birthday.getDate();
  let mm = birthday.getMonth() + 1;
  let year = birthday.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  let employeeBirthday = `${mm}/${dd}/${year}`;

  let modalHTML = 
  `
    <div class="modal-popup">
      <div class="buttons">
        <i class="fas fa-times close-btn"></i>
        <i class="fas fa-chevron-left left-btn"></i>
        <i class="fas fa-chevron-right right-btn"></i>
      </div>
      <div class="modal-info">
        <img class="modal-img" src="${employee.image}">
        <p class="modal-name">${employee.name}</p>
        <p class="modal-email">${employee.email}</p>
        <p class="modal-city">${employee.city}</p>
        <p class="modal-cell">${employee.cell}</p>
        <p class="modal-street">${employee.street}, ${employee.state} ${employee.zip}</p>
        <p class="modal-birthday">Birthday: ${employeeBirthday}</p>
      </div>
    </div>
  `;
  modalOverlay.innerHTML = modalHTML;
  
  // Button variables
  const closeBtn = document.querySelector('.close-btn');
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');

  // Event listener for the close button
  closeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });

  // Checks to see the index of the user to determine left & right arrows visability
  if (index <= 0) {
    leftBtn.style.display = 'none';
  } else {
    leftBtn.style.display = '';
  }

  if (index >= 11) {
    rightBtn.style.display = 'none';
  } else {
    rightBtn.style.display = '';
  }

  // Event listeners for left and right arrows
  rightBtn.addEventListener('click', () => {
    index += 1;
    generateModalHTML(employees[index], index);
  });

  leftBtn.addEventListener('click', () => {
    index -= 1;
    generateModalHTML(employees[index], index);
  })

}

// FETCHES DATA FROM RANDOM USER API
fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(response => response.json())
  .then(data => {
    // Pass JSON data to function to create new array of objects with data
    employees = getEmployeeData(data.results);
    // Pass employee array to create html
    generateEmployeeHTML(employees);
  });
  

// ADD EVENT LISTENER FOR SEARCH BOX TO FILTER USRES BY NAME AND USERNAME
searchBox.addEventListener('input', (e) => {
  // GETS THE SEARCH VALUE AND SELECTS ALL OF THE DIVS WITH THE EMPLOYEE BOX CLASS
  let searchValue = e.target.value.toLowerCase();
  let employeesArray = [].slice.call(document.querySelectorAll('.employee-box'));
  for (let i = 0; i < employeesArray.length; i++) {
    // TRAVERSES THE DIVS TO SELECT ONLY THE EMPLOYEES NAME & USERNAME
    let employeeName = employeesArray[i].childNodes[3].childNodes[1].innerHTML;
    let employeeUsername = employeesArray[i].childNodes[3].childNodes[3].innerHTML;
    // CHECKS TO SEE IF THE EMPLOYEES NAME MATCHES THE SEARCH INPUT
    if (employeeName.toLowerCase().indexOf(searchValue) > -1 || employeeUsername.toLowerCase().indexOf(searchValue) > -1) {
      employeesArray[i].style.display = '';
    } else {
      employeesArray[i].style.display = 'none';
    }
  }
});