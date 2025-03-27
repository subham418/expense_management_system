const token = localStorage.getItem("token");
const baseUrl = "http://localhost:8080/expense";

async function getExpenses() {
    document.getElementById("status").textContent = "Fetching expenses...";
    try {
        const response = await fetch(`${baseUrl}/get`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log("Response Status:", response.status);
        const responseBody = await response.text();
        console.log("Response Body:", responseBody);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = JSON.parse(responseBody);
        document.getElementById("status").textContent = "Expenses fetched successfully!";
        populateTable(data);
    }
    catch (error) {
        document.getElementById("status").textContent = `Error fetching expenses: ${error.message}`;
        console.error(error);
    }
}

function populateTable(data) {
    const tableBody = document.querySelector("#expenseTable tbody");
    tableBody.innerHTML = "";
    data.forEach((expense, index) => {
        const row = `<tr>
                    <td>${index + 1}</td>
                    <td>${expense.category}</td>
                    <td>${expense.subcategory}</td>
                    <td>${expense.quantity}</td>
                    <td>${expense.price}</td>
                    <td>${expense.consumer}</td>
                    <td>${expense.necessity}</td>
                    <td>${expense.date}</td>
                    <td>${expense.time}</td>
                    <td>
                        <button onclick="deleteExpense('${expense.time}')">Delete</button>
                        <button onclick="editExpense(${index})">Edit</button>
                    </td>
                </tr>`;
        tableBody.innerHTML += row;
    });
}

async function deleteExpense(time) {
    try {
        const response = await fetch(`${baseUrl}/delete/${time}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const result = await response.text();
        alert(result);
        getExpenses(); // Refresh list after deletion
    } catch (error) {
        alert("Error deleting expense: " + error.message);
    }
}

function editExpense(index) {
    const row = document.querySelector(`#expenseTable tbody`).rows[index];
    let cells = row.cells;
    for (let i = 1; i <= 6; i++) {
        let value = cells[i].innerText;
        cells[i].innerHTML = `<input type='text' value='${value}'>`;
    }
    cells[9].innerHTML = `<button onclick='updateExpense(${index})'>Save</button>`;
}

async function updateExpense(index) {
    const row = document.querySelector(`#expenseTable tbody`).rows[index];
    let inputs = row.querySelectorAll("input");
    const expense = {
        category: inputs[0].value,
        subcategory: inputs[1].value,
        quantity: inputs[2].value,
        price: parseFloat(inputs[3].value),
        consumer: inputs[4].value,
        necessity: inputs[5].value,
        date: row.cells[7].innerText,
        time: row.cells[8].innerText
    };
    try {
        const response = await fetch(`${baseUrl}/update`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        });
        const result = await response.text();
        alert(result);
        getExpenses();
    } catch (error) {
        alert("Error updating expense: " + error.message);
    }
}

async function saveExpense() {
    const expense = {
        category: document.getElementById("category").value,
        subcategory: document.getElementById("subcategory").value,
        quantity: document.getElementById("quantity").value,
        price: parseFloat(document.getElementById("price").value),
        consumer: document.getElementById("consumer").value,
        necessity: document.getElementById("necessity").value
    };
    try {
        const response = await fetch(`${baseUrl}/save`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expense)
        });
        const result = await response.text();
        alert(result);
        getExpenses();
    } catch (error) {
        alert("Error saving expense: " + error.message);
    }
}