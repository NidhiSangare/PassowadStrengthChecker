function checkPassword() {

    let password = document.getElementById("password").value;

    let result = document.getElementById("result");

    let suggestions = document.getElementById("suggestions");

    let score = 0;

    let suggestionList = [];


    // Empty password

    if (password.length === 0) {

        result.innerHTML = "Please enter a password";

        suggestions.innerHTML = "";

        return;
    }


    // Check length

    if (password.length >= 8) {

        score += 20;

    }
    else {

        suggestionList.push("Use at least 8 characters");

    }


    // Check uppercase

    if (/[A-Z]/.test(password)) {

        score += 20;

    }
    else {

        suggestionList.push("Add at least one uppercase letter");

    }


    // Check lowercase

    if (/[a-z]/.test(password)) {

        score += 20;

    }
    else {

        suggestionList.push("Add at least one lowercase letter");

    }


    // Check number

    if (/[0-9]/.test(password)) {

        score += 20;

    }
    else {

        suggestionList.push("Add at least one number");

    }


    // Check special character

    if (/[^A-Za-z0-9]/.test(password)) {

        score += 20;

    }
    else {

        suggestionList.push("Add at least one special character");

    }


    // Repeated pattern check

    let repeatedPattern = checkRepeatedPattern(password);


    if (repeatedPattern) {

        score -= 20;

        suggestionList.push(
            "Avoid repeated patterns like " + repeatedPattern
        );

    }


    // Prevent negative score

    if (score < 0) {

        score = 0;

    }


    // Password strength

    let strength;


    if (score <= 40) {

        strength = "Weak";

    }
    else if (score <= 70) {

        strength = "Medium";

    }
    else {

        strength = "Strong";

    }


    // Display score and strength

    result.innerHTML =
        "Password Strength: " + strength +
        "<br>Security Score: " + score + "/100";


    // Display suggestions

    if (suggestionList.length > 0) {

        suggestions.innerHTML =
            "<b>Suggestions:</b>" +
            "<ol>" +
            suggestionList.map(function(item) {

                return "<li>" + item + "</li>";

            }).join("") +
            "</ol>";

    }
    else {

        suggestions.innerHTML =
            "<b>Suggestions:</b>" +
            "<ol>" +
            "<li>Your password has good strength!</li>" +
            "</ol>";

    }

}


// Repeated Pattern Detection

function checkRepeatedPattern(password) {


    // Check same character repeated

    if (/^(.)\1+$/.test(password)) {

        return "repeated characters";

    }


    // Check repeated blocks like abcabc, 123123, ababab

    for (let size = 1; size <= password.length / 2; size++) {

        let part = password.substring(0, size);

        let repeated = true;


        for (let i = size; i < password.length; i += size) {

            if (
                password.substring(i, i + size) !== part
            ) {

                repeated = false;

                break;

            }

        }


        if (repeated && password.length % size === 0) {

            return part + part;

        }

    }


    return null;

}


// Show / Hide Password

function togglePassword() {

    let password = document.getElementById("password");


    if (password.type === "password") {

        password.type = "text";

    }
    else {

        password.type = "password";

    }

}


// Password Requirements

document.getElementById("password").addEventListener("input", function () {

    let password = this.value;


    // Length

    if (password.length >= 8) {

        document.getElementById("length").innerHTML =
            "At least 8 characters";

        document.getElementById("length").className = "valid";

    }
    else {

        document.getElementById("length").innerHTML =
            "At least 8 characters";

        document.getElementById("length").className = "invalid";

    }


    // Uppercase

    if (/[A-Z]/.test(password)) {

        document.getElementById("uppercase").innerHTML =
            "Uppercase letter";

        document.getElementById("uppercase").className = "valid";

    }
    else {

        document.getElementById("uppercase").innerHTML =
            "Uppercase letter";

        document.getElementById("uppercase").className = "invalid";

    }


    // Lowercase

    if (/[a-z]/.test(password)) {

        document.getElementById("lowercase").innerHTML =
            "Lowercase letter";

        document.getElementById("lowercase").className = "valid";

    }
    else {

        document.getElementById("lowercase").innerHTML =
            "Lowercase letter";

        document.getElementById("lowercase").className = "invalid";

    }


    // Number

    if (/[0-9]/.test(password)) {

        document.getElementById("number").innerHTML =
            "Number";

        document.getElementById("number").className = "valid";

    }
    else {

        document.getElementById("number").innerHTML =
            "Number";

        document.getElementById("number").className = "invalid";

    }


    // Special character

    if (/[^A-Za-z0-9]/.test(password)) {

        document.getElementById("special").innerHTML =
            "Special character";

        document.getElementById("special").className = "valid";

    }
    else {

        document.getElementById("special").innerHTML =
            "Special character";

        document.getElementById("special").className = "invalid";

    }

});

function resetPassword() {

    document.getElementById("password").value = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("suggestions").innerHTML = "";

    document.getElementById("length").innerHTML =
        "At least 8 characters";
    document.getElementById("length").className = "invalid";

    document.getElementById("uppercase").innerHTML =
        "Uppercase letter";
    document.getElementById("uppercase").className = "invalid";

    document.getElementById("lowercase").innerHTML =
        "Lowercase letter";
    document.getElementById("lowercase").className = "invalid";

    document.getElementById("number").innerHTML =
        "Number";
    document.getElementById("number").className = "invalid";

    document.getElementById("special").innerHTML =
        "Special character";
    document.getElementById("special").className = "invalid";
}
