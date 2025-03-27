window.onload = async function () {
    const token = localStorage.getItem("token");
    if (!token) { 
        alert("Session expired! Please login again."); 
        window.location.href = "home.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/user/validate-token", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await response.text();

        // 🛑 Agar API se "Invalid Token" mila, toh session expire message dikhao
        if (data === "Invalid Token") {  
            alert("Your session has expired! Please login again.");  
            localStorage.removeItem("token");  
            window.location.href = "home.html";  
            return;  
        }

        // 🛑 Agar backend ne error response diya (401/403), toh bhi session expired ka message dikhao
        if (!response.ok) {  
            console.log("Backend Error:", response.status, data);
            alert("Unauthorized access! Please login again.");
            localStorage.removeItem("token");
            window.location.href = "home.html";
            return;
        }

    } catch (error) {  
        // 🔥 Catch block sirf **server down, API error ya network issue** ke liye chalega
        console.error("Catch Block Error:", error);
        alert("Server issue! Please try again later.");
    }
};