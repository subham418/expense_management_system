
const token = localStorage.getItem("token");
const baseUrl = "http://localhost:8080/expense";

function toggleValueInput() {
    let filterType = document.getElementById("filterType").value;
    filterType = filterType.charAt(0).toUpperCase() + filterType.slice(1);
    let filterValueInput = document.getElementById("filterValue");

    if (filterType === "showAll") {
        filterValueInput.style.display = "none";
    } else {
        filterValueInput.style.display = "inline";
    }
}

async function getExpenses() {
    let filterType = document.getElementById("filterType").value;
    filterType = filterType.charAt(0).toUpperCase() + filterType.slice(1);
    let filterValue = document.getElementById("filterValue").value.trim();
    let url = `${baseUrl}/get`;

    if (filterType !== "showAll" && filterValue) {
        url = `${baseUrl}/filter/${filterType}/${filterValue}`;
    }
    console.log(url);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        populateTable(data);
    } catch (error) {
        alert(`Error fetching expenses: ${error.message}`);
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
                </tr>`;
        tableBody.innerHTML += row;
    });
}

function clearScreen() {
    document.querySelector("#expenseTable tbody").innerHTML = "";
}