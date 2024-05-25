let name = document.getElementById('name');
let amount = document.getElementById('amount');
const form = document.getElementById('form');
const subtotalAmount = document.getElementById("subtotalmoney");
const clearAlbtn = document.querySelector("#clearAll");

let expenseListsContainer = document.querySelector('.expences__lists');

// Retrieve stored expenses from localStorage or initialize an empty array
let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

let editIndex = -1; // Flag to indicate the index of the item being edited

// Function to calculate the subtotal
function calculateSubtotal() {
  return expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );
}

// Event listener for the clear all button
clearAlbtn.addEventListener("click", () => {
  console.log("clicked...");
  expenses = []; // Clear the expenses array
  localStorage.setItem('expenses', JSON.stringify(expenses)); // Update localStorage
  displayExpenses(); // Refresh the displayed list
});

// Function to display expenses on the page
function displayExpenses() {
  expenseListsContainer.innerHTML = ''; // Clear the current list
  if (expenses.length === 0) {
    expenseListsContainer.innerHTML =
      '<p class="no__expense__text">No Expenses Added</p>';
    subtotalAmount.textContent = 0;
    return;
  }
  expenses.forEach((expense, index) => {
    let html = `<div class="expense__list" data-index="${index}">
            <p class="itemName">${expense.name}</p>
            <div class="acion__box">
                <p class="amount"><span>₹</span><span class="itemAmount">${expense.amount}</span></p>
                <div class="edit__delete__box">
                    <button type="button" class="edit" onclick="editExpense(${index})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button type="button" class="delete" onclick="deleteExpense(${index})"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
        </div>`;
    let newExpenseElement = document.createElement('div');
    newExpenseElement.innerHTML = html;
    expenseListsContainer.appendChild(newExpenseElement.firstChild);
  });

  // Update the subtotal in the UI
  subtotalAmount.textContent = calculateSubtotal().toFixed(2);
}

// Function to edit an expense
function editExpense(index) {
  editIndex = index;
  name.value = expenses[index].name;
  amount.value = expenses[index].amount;
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1); // Remove the expense from the array
  localStorage.setItem('expenses', JSON.stringify(expenses)); // Update localStorage
  displayExpenses(); // Refresh the displayed list
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(name.value, amount.value);
  if(name.value === "" || amount.value ===""){
    name.classList.add("error");
    amount.classList.add("error")
    return
  }
  else{
    name.classList.remove("error");
    amount.classList.remove("error")

  }

  if (editIndex > -1) {
    // Edit existing expense
    expenses[editIndex] = { name: name.value, amount: amount.value };
    editIndex = -1; // Reset the edit index
  } else {
    // Add new expense
    expenses.push({ name: name.value, amount: amount.value });
  }

  // Save the updated array to localStorage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Display the updated list
  displayExpenses();

  // Clear the input fields
  name.value = '';
  amount.value = '';
});

// Display the expenses when the page loads
displayExpenses();
