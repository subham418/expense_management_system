document.getElementById("submit").addEventListener("click", async function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const address = document.getElementById("address").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    let gender = "";
    if (document.getElementById("male").checked) {
        gender = "Male";
    } else if (document.getElementById("female").checked) {
        gender = "Female";
    } else if (document.getElementById("other").checked) {
        gender = "Other";
    } else {
        gender = "Not Selected";
    }

    // name validation
    if(name ===""){
        alert("Name can't be empty");
        return;
    }
    if(/\d/.test(name)){
        alert("Name can't contains digit");
        return;
    }

    // email validation
    if(email === ""){
        alert("Email can't be empty");
        return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format! Email should be in this format xyz@gmail.com");
        return;
    }

    // gender validation 
    if(gender === "Not Selected"){
        alert("Please select your gender")
        return;
    }

    // age validation 
    if (age === "") {
        alert("Age cannot be empty!");
        return;
    }

    if (isNaN(age)) {
        alert("Age must be a valid number!");
        return;
    }
    const ageNum = Number(age);
    if (!Number.isInteger(ageNum)) {
        alert("Age must be a whole number!");
        return;
    }
    if (ageNum < 18 || ageNum > 100) {
        alert("Age must be between 18 and 100!");
        return;
    }

    // address validation
    if(address === ""){
        alert(" Adress can't be empty");
        return;
    }

    // username validation
    if (username === "") {
        alert("Username cannot be empty!");
        return;
    }
    if (username.length < 5) {
        alert("Username must be at least 5 characters long!");
        return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        alert("Username can only contain letters, numbers, and underscores (_)");
        return;
    }

    // password validation 
    if(password === ""){
        alert("Password can't be empty");
        return;
    }
    if (password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return;
    }
    if (!/[A-Z]/.test(password)) {
        alert("Password must contain at least one uppercase letter (A-Z)!");
        return;
    }
    if (!/[a-z]/.test(password)) {
        alert("Password must contain at least one lowercase letter (a-z)!");
        return;
    }
    if (!/[0-9]/.test(password)) {
        alert("Password must contain at least one number (0-9)!");
        return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        alert("Password must contain at least one special character (!@#$%^&* etc.)!");
        return;
    }

    // confirm password validation 
    if(confirmPassword === ""){
        alert("Confirm password can't be empty");
        return;
    }
    if(password !== confirmPassword){
        alert("Password mismatch");
        return;
    }

    // now working with api call 
    const requestBody = {
        name: name,
        email: email,
        gender: gender,
        age: age,
        address: address,
        username: username,
        password: password,
    };
    try {
        const response = await fetch("http://localhost:8080/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            alert("Registration Successful!");
            window.location.href = "home.html";
        }
        else {
            alert("Registration failed! Please try again.");
        }
    } 
    catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
});

document.getElementById("back").addEventListener("click",function(){
    window.location.href = "home.html";
});