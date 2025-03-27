document.getElementById("login").addEventListener("click", async function () {
    const username = document.querySelector(".username input").value.trim();
    const password = document.querySelector(".password input").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    const apiUrl = `http://localhost:8080/user/login`;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            alert("Invalid Credentials! Try again.");
            window.location.href="error.html";
            return;
        }

        const token = await response.text();  // ✅ Get JWT token as plain text
        console.log("Received Token:", token);
        // alert("Received Token: " + token); 

        if (!token || token.trim() === "") {  
            alert("Login failed! No token received.");
            return;
        }

        // ✅ Check if localStorage is available before using it
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("token", token);
            console.log("Stored Token in Local Storage:", localStorage.getItem("token"));
            // alert("Stored Token: " + localStorage.getItem("token"));
        } else {
            alert("Local Storage is not supported! Enable it in your browser.");
            return;
        }

        // ✅ Delay before redirecting to ensure token is stored
        setTimeout(() => {
            window.location.href = "loginSuccess.html";
        }, 100); 

    } catch (error) {
        console.error("🚨 Fetch Error:", error);
        alert("Something went wrong! Check console for details.");
    }
});

// ✅ Redirect to signup page when "Sign Up" is clicked
document.getElementById("signup").addEventListener("click", function() {
    window.location.href = "signUp.html";
});
