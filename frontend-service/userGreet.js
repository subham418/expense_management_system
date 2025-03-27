const token = localStorage.getItem("token"); // ✅ Token storage

// ✅ Greeting Message Fetch (Initial Load)
fetch("http://localhost:8080/user/check", {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` }
})
    .then(response => response.text()) // ✅ Backend sends plain text
    .then(data => {
        document.getElementById("greeting").textContent = data;
    })
    .catch(error => {
        document.getElementById("greeting").textContent = "Failed to fetch greeting.";
        console.error("Error:", error);
    });

// ✅ Update Message
function updateMessage() {
    const newMessage = document.getElementById("newMessage").value.trim();

    if (!newMessage) {
        alert("Please enter a message!");
        return;
    }

    fetch("http://localhost:8080/message/update", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: newMessage }) // ✅ Update me body jayega
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Update failed!");
        }
        return response.text();
    })
    .then(data => {
        alert(data); // ✅ Backend response alert karega
        document.getElementById("greeting").textContent = newMessage; // ✅ UI update karega
    })
    .catch(error => {
        alert("Failed to update message!");
        console.error("Error:", error);
    });
}

// ✅ Delete Message
function deleteMessage() {
    fetch("http://localhost:8080/message/delete", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Delete failed!");
        }
        return response.text();
    })
    .then(data => {
        alert(data); // ✅ Backend response alert karega
        document.getElementById("greeting").textContent = "Hello User, Welcome!"; // ✅ UI update karega
    })
    .catch(error => {
        alert("Failed to delete message!");
        console.error("Error:", error);
    });
}