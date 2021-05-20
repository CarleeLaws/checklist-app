// add checklist items to the items box
// const item = document.createElement("input");
let shopItems = [];

const form = document.querySelector("#shoppingItemForm");

const listsArea = document.querySelector("#listsBox");
const ulList = document.createElement("ul");
listsArea.appendChild(ulList);

// create new check box Item
function newCheckbox() {
  ulList.innerHTML = "";

  for (let [i, item] of shopItems.entries()) {
    let itemCheckbox = item[0];
    let quan = item[1];
    let value = item[2];

    newListItem(value, quan, i, itemCheckbox);
  }
}

function submitForm(event) {
  event.preventDefault();

  //   our response to be printed to the itemBox
  const quan = document.querySelector("#quantity");
  const type = document.querySelector("#shoppinglist");

  // refocuses to the quan box
  quan.focus();

  // if there isn't a value entered into the shopping item box
  if (type.value == "") {
    alert("No item entered");
    return null;
  }

  //   //   put item in the shopItems array
  const shopItem = [false, quan.value, type.value];

  shopItems.push(shopItem);

  newCheckbox();

  //   resetting the form fields
  type.value = "";
  quan.value = "";
}

form.addEventListener("submit", submitForm);

function newListItem(value, quan, i, itemCheckbox) {
  // create list and add a class name
  const shoppingLi = document.createElement("li");

  // create a form input and add the attributes
  let checkBox = document.createElement("input");
  // add type attribute
  checkBox.setAttribute("type", "checkbox");
  // add an id with the name of the item
  checkBox.setAttribute("id", `${i}`);
  //   check if checked and add class name

  if (itemCheckbox === true) {
    // check if the checkbox is ticked
    checkBox.checked = true;
    // add the classname to apply strikethrough and color change when checked
    shoppingLi.classList.add("checked");
  }

  // function to evoke when checkbox is clicked
  function onCheckboxClick() {
    // check if its true and set it to false
    if (shopItems[i][0] === true) {
      shopItems[i][0] = false;
    } else {
      shopItems[i][0] = true;
    }
    newCheckbox();
  }
  checkBox.addEventListener("change", onCheckboxClick);

  // add the label for the form inputs
  let checkboxLabel = document.createElement("label");
  checkboxLabel.setAttribute("for", `${value}`);
  checkboxLabel.textContent = ` ${quan} - ${value}`;

  ulList.appendChild(shoppingLi);
  shoppingLi.appendChild(checkBox);
  shoppingLi.appendChild(checkboxLabel);
}

// Delete all items when button clicked and prompted to confirm
function deleteEverything() {
  // refocuses to the quan box
  const quan = document.querySelector("#quantity");
  quan.focus();

  const els = document.querySelectorAll("li");
  const result = window.confirm("Are you sure you want to delete your list?");
  if (result === true) {
    for (let el of els) el.remove();
  } else if (result === false) {
    console.log("Nope");
  }
  shopItems = [];
}
const deleteButton = document.querySelector(".deleteAll");
deleteButton.addEventListener("click", deleteEverything);
