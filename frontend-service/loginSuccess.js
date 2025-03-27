document.getElementById("greetUser").addEventListener("click", function () {
    window.location.href = "userGreet.html";
});

document.getElementById("getUserDetails").addEventListener("click", function () {
    window.location.href = "userDetail.html";
});

document.getElementById("logout").addEventListener("click", async function () {
    const token = localStorage.getItem("token");

    console.log("Logging out..."); // ✅ Debugging

    try {
        if (token) {
            await fetch("http://localhost:8080/user/logout", {  // ✅ Backend ko logout request bhejna
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });
        }

        localStorage.removeItem("token"); // ✅ Token clear karo
        sessionStorage.clear(); // ✅ Agar sessionStorage use ho raha hai toh yeh bhi clear karna

        alert("Logged out successfully!");
        window.location.href = "home.html"; // ✅ Redirect to login page
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong while logging out!");
    }
});
document.getElementById("expense").addEventListener("click",function(){
    window.location.href="expenses.html";
});
document.getElementById("filter").addEventListener("click",function(){
    window.location.href="filterExpense.html";
});
