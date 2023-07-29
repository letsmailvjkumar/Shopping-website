// Write your script here

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user data from local storage
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        document.getElementById("fname").value = userData.firstName;
        document.getElementById("lname").value = userData.lastName;
    } else {
        alert("User data not found. Please sign up first.");
    }
});

function saveInfo() {
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;

    // Update user data in local storage
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        userData.firstName = firstName;
        userData.lastName = lastName;
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("Profile information updated successfully.");
    } else {
        alert("User data not found. Please sign up first.");
    }
}

function changePassword() {
    const oldPassword = document.getElementById("opswd").value;
    const newPassword = document.getElementById("npswd").value;
    const confirmPassword = document.getElementById("cpswd").value;

    // Update password only if new password and confirm password match
    if (newPassword === confirmPassword) {
        // Retrieve user data from local storage
        const userDataString = localStorage.getItem("userData");
        if (userDataString) {
            const userData = JSON.parse(userDataString);

            // Check if the old password matches the stored password
            if (oldPassword === userData.password) {
                userData.password = newPassword;
                localStorage.setItem("userData", JSON.stringify(userData));
                alert("Password changed successfully.");
            } else {
                alert("Old password is incorrect. Please try again.");
            }
        } else {
            alert("User data not found. Please sign up first.");
        }
    } else {
        alert("New password and confirm password do not match. Please try again.");
    }
}

function logout() {
    // Clear user data from local storage
    localStorage.removeItem("userData");
    alert("Logged out successfully.");
    // Redirect to the login page
    window.location.href = "../login.html";
}