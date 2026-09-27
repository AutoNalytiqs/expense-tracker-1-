// =========================
// LOAD SAVED DATA
// =========================

let totalSpent =
    Number(localStorage.getItem("totalSpent")) || 0;

let budget =
    Number(localStorage.getItem("budget")) || 0;

let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];


// =========================
// SAVE DATA
// =========================

function saveData() {

    localStorage.setItem(
        "totalSpent",
        totalSpent
    );

    localStorage.setItem(
        "budget",
        budget
    );

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}


// =========================
// SET MONTHLY BUDGET
// =========================

function setBudget() {

    const budgetInput =
        Number(
            document.getElementById("budgetInput").value
        );


    if (budgetInput <= 0) {

        alert("Please enter a valid budget.");

        return;
    }


    budget = budgetInput;


    saveData();

    updateScreen();


    document.getElementById(
        "budgetInput"
    ).value = "";
}


// =========================
// ADD EXPENSE
// =========================

function addExpense() {

    const name =
        document
            .getElementById("expenseName")
            .value
            .trim();


    const amount =
        Number(
            document.getElementById(
                "expenseAmount"
            ).value
        );


    const category =
        document.getElementById(
            "expenseCategory"
        ).value;


    // Check that the information is valid

    if (name === "" || amount <= 0) {

        alert(
            "Please enter a valid expense."
        );

        return;
    }


    // Create a new expense

    const expense = {

        name: name,

        amount: amount,

        category: category

    };


    // Add expense to the list

    expenses.push(expense);


    // Increase total spending

    totalSpent += amount;


    // Save everything

    saveData();


    // Update the screen

    updateScreen();


    // Clear the input fields

    document.getElementById(
        "expenseName"
    ).value = "";


    document.getElementById(
        "expenseAmount"
    ).value = "";
}


// =========================
// DELETE EXPENSE
// =========================

function deleteExpense(index) {

    // Remove the expense amount
    // from the total

    totalSpent -=
        expenses[index].amount;


    // Remove the expense
    // from the array

    expenses.splice(index, 1);


    // Save the new data

    saveData();


    // Refresh the screen

    updateScreen();
}


// =========================
// UPDATE SCREEN
// =========================

function updateScreen() {

    // -------------------------
    // UPDATE BUDGET
    // -------------------------

    document.getElementById(
        "budget"
    ).textContent = budget;


    // -------------------------
    // UPDATE TOTAL SPENT
    // -------------------------

    document.getElementById(
        "totalSpent"
    ).textContent = totalSpent;


    // -------------------------
    // UPDATE REMAINING
    // -------------------------

    document.getElementById(
        "remaining"
    ).textContent =
        budget - totalSpent;


    // -------------------------
    // CALCULATE BUDGET USAGE
    // -------------------------

    let percentage = 0;


    if (budget > 0) {

        percentage =
            (totalSpent / budget) * 100;
    }


    // Do not allow the progress bar
    // to become wider than 100%

    if (percentage > 100) {

        percentage = 100;
    }


    // -------------------------
    // UPDATE PROGRESS BAR
    // -------------------------

    document.getElementById(
        "progressFill"
    ).style.width =
        percentage + "%";


    // -------------------------
    // UPDATE PROGRESS TEXT
    // -------------------------

    document.getElementById(
        "progressText"
    ).textContent =
        Math.round(percentage) + "%";


    // -------------------------
    // GET EXPENSE LIST
    // -------------------------

    const list =
        document.getElementById(
            "expenseList"
        );


    // Clear the old list

    list.innerHTML = "";


    // -------------------------
    // DISPLAY EACH EXPENSE
    // -------------------------

    expenses.forEach(
        function(expense, index) {

            const item =
                document.createElement(
                    "li"
                );


            // If an old expense does
            // not have a category,
            // use "Other"

            const category =
                expense.category ||
                "Other";


            // Display the expense

            item.textContent =
                category +
                " - " +
                expense.name +
                " - KSh " +
                expense.amount +
                " ";


            // -------------------------
            // CREATE DELETE BUTTON
            // -------------------------

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.textContent =
                "Delete";


            // What happens when
            // Delete is clicked

            deleteButton.onclick =
                function() {

                    deleteExpense(index);

                };


            // Add button to expense

            item.appendChild(
                deleteButton
            );


            // Add expense to the list

            list.appendChild(
                item
            );

        }
    );
}


// =========================
// LOAD APP
// =========================

// Run this when the application
// first opens

updateScreen();