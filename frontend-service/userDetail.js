const token = localStorage.getItem("token"); // Fetch token from localStorage
fetch("http://localhost:8080/user/details", {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` }
})
    .then(response => response.text()) // Since backend is sending plain text
    .then(data => {
        console.log("Raw Response:", data); // Debugging Purpose
        // Convert text to JSON format manually
        const jsonData = JSON.parse(data.replace(/(\w+)=/g, '"$1":').replace(/'/g, '"'));
        document.getElementById("userDetails").innerHTML = `
        <p><strong>Name:</strong> ${jsonData.name}</p>
        <p><strong>Gender:</strong> ${jsonData.gender}</p>
        <p><strong>Age:</strong> ${jsonData.age}</p>
        <p><strong>Address:</strong> ${jsonData.address}</p>
        `;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("userDetails").innerHTML = "<p style='color:red;'>Failed to fetch details.</p>";
    });