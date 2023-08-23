"use strict"

const balanceElement = document.querySelector(".balance .value")
const totalIncome = document.querySelector(".income-total")
const totalOutcome = document.querySelector(".outcome-total")

const incomeElement = document.querySelector(".income-tab")
const expense = document.querySelector(".expense-tab")

const incomeList = document.querySelector(".income-tab .list")
const expenseList = document.querySelector(".expense-tab .list")

const expensesButton = document.querySelector(".tab1")
const incomeButton = document.querySelector(".tab2")

const addExpense = document.querySelector(".add-expense")
const expenseTitle = document.querySelector(".expense-title-input")
const expenseAmount = document.querySelector(".expense-amount-input")

const addIncome = document.querySelector(".add-income")
const incomeTitle = document.querySelector(".income-title-input")
const incomeAmount = document.querySelector(".income-amount-input")


//SWITCHING BETWEEN TABS
expensesButton.addEventListener("click", () => {
  expense.classList.remove("hidden")
  incomeElement.classList.add("hidden")
  expensesButton.classList.add("clicked")
  incomeButton.classList.remove("clicked")
})

incomeButton.addEventListener("click", () => {
  incomeElement.classList.remove("hidden")
  expense.classList.add("hidden")
  expensesButton.classList.remove("clicked")
  incomeButton.classList.add("clicked")
})

// incomeList.addEventListener("click", deleteOrEdit)
// expenseList.addEventListener("click", deleteOrEdit)

incomeList.addEventListener("click", function (e) {
  deleteOrEdit(e)
  localStorage.setItem("entry_list", JSON.stringify(entry_list))
})

expenseList.addEventListener("click", function (e) {
  deleteOrEdit(e)
  localStorage.setItem("entry_list", JSON.stringify(entry_list))
})

// let entry_list = []
let entry_list = JSON.parse(localStorage.getItem("entry_list")) || []

window.addEventListener("DOMContentLoaded", () => {
  renderDisplay()
  addValues()
})

//ADD EXPENSE TO entry_list ARRAY
addExpense.addEventListener("click", () => {
  if (expenseTitle.value == "" || expenseAmount.value == "") {
    return
  }
  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: expenseAmount.value,
  }
  entry_list.push(expense)
  clearLists()
  renderDisplay()
  clearExpense()
  addValues()
  localStorage.setItem("entry_list", JSON.stringify(entry_list))
})

//ADD INCOME TO entry_list ARRAY
addIncome.addEventListener("click", () => {
  if (incomeTitle.value == "" || incomeAmount.value == "") {
    return
  }
  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: incomeAmount.value,
  }
  entry_list.push(income)
  clearLists()
  renderDisplay()
  clearIncome()
  addValues()
  localStorage.setItem("entry_list", JSON.stringify(entry_list))
})

//UPDATE PAGE WITH LI COMPONENT
const renderDisplay = () => {
  clearLists()
  entry_list.forEach((entry, index) => {
    if (entry.type == "expense") {
      displayList(expenseList, entry.type, entry.title, entry.amount, index)
    } else {
      displayList(incomeList, entry.type, entry.title, entry.amount, index)
    }
  })
  if (entry_list.length === 0) {
    balanceElement.innerHTML = 0
    totalIncome.innerHTML = 0
    totalOutcome.innerHTML = 0
  }
}

//CREATE LI COMPONENT
const displayList = (list, type, title, amount, id) => {
  const entry = `<li id = "${id}" class= "${type}">
    <div class = "entry">${title}: $${amount}</div>
    <div class="icon-container">
    <div class = "edit" id=${id}></div>
    <div class ="delete" id=${id}></div>
    </div>
    </li>`
  const position = "afterbegin"
  list.insertAdjacentHTML(position, entry)
}

// CLEAR LIST AFTER PRESSING ADD BUTTON
const clearLists = () => {
  expenseList.innerHTML = ""
  incomeList.innerHTML = ""
}

//CLEAR INPUT VALUES AFTER ADDING INPUTS
const clearExpense = () => {
  expenseTitle.value = ""
  expenseAmount.value = ""
}
const clearIncome = () => {
  incomeTitle.value = ""
  incomeAmount.value = ""
}

//ADD INPUT VALUES TO INCOMES/EXPENSES/BALANCE
const addValues = () => {
  let sum = 0
  let income = 0
  let outcome = 0
  entry_list.forEach((list) => {
    if (list.type == "expense") {
      sum -= list.amount
      outcome -= list.amount
    } else if (list.type == "income") {
      sum += Number(list.amount)
      income += Number(list.amount)
    }
    balanceElement.innerHTML = "$" + sum
    totalIncome.innerHTML = "$" + income
    totalOutcome.innerHTML = "$" + outcome
  })
}

// DETERMINE IF BUTTON IS EDIT OR DELETE
function deleteOrEdit(e) {
  const targetButton = e.target
  const entry = targetButton.parentNode.parentNode
  if (targetButton.classList == "delete") {
    deleteEntry(entry)
  } else if (targetButton.classList == "edit") {
    editEntry(entry)
  }
}

// //DELETE FUNCTION
const deleteEntry = (entry) => {
  entry_list.splice(entry.id, 1)
  entry.parentNode.innerHTML = ""
  renderDisplay()
  addValues()
}

// EDIT FUNCTION
const editEntry = (entry) => {
  let Entry = entry_list[entry.id]
  if (entry.type == "income") {
    incomeAmount.value = Entry.amount
    incomeTitle.value = Entry.title
  } else if (entry.type == "expense") {
    expenseAmount.value = Entry.amount
    expenseTitle.value = Entry.title
  }
  deleteEntry(entry)
}
