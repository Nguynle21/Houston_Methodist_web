/*
    Name: Le Nguyen Thai
    Date created: 02/07/2025
    Date last edited: 05/02/2025
    Version: 4.0
    Description: Homework 4 JavaScript
*/


// Slider display
function displaySlider() {
    let sliderValue = document.getElementById("range").value;
    document.getElementById("slider-value").innerHTML = sliderValue;
    return true;
}

document.getElementById("range").addEventListener("input", displaySlider);

document.addEventListener("DOMContentLoaded", function () {
    displaySlider();
    addListeners();
});

function addListeners() {
    const fields = [
        "fname", "minit", "lname", "dob", "ssn", "address1", "city", "zipcode",
        "email", "phone", "uid", "pword", "repword"
    ];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", enableSubmitButton);
            el.addEventListener("blur", enableSubmitButton);
        }
    });
}

function enableSubmitButton() {
    const submitButton = document.querySelector("input[type='submit']");
    submitButton.disabled = !(
        validateFname() &&
        validateMinit() &&
        validateLname() &&
        validateDob() &&
        validateSsn() &&
        validateAddr1() &&
        validateCity() &&
        validateZcode() &&
        validateEmail() &&
        validatePhone() &&
        validateUid() &&
        validatePword() &&
        confirmPword()
    );
}

function validateField(id, regex, errorId, errorMsg, optional = false) {
    const val = document.getElementById(id).value.trim();
    const errorBox = document.getElementById(errorId);
    if (val === "" && optional) {
        errorBox.innerHTML = "";
        return true;
    }
    if (!regex.test(val)) {
        errorBox.innerHTML = errorMsg;
        return false;
    }
    errorBox.innerHTML = "";
    return true;
}

function validateFname() {
    const val = document.getElementById("fname").value.trim();
    if (val.length < 1 || val.length > 30 || !/^[a-zA-Z'-]+$/.test(val)) {
        document.getElementById("fname-error").innerHTML = "Invalid First Name";
        return false;
    }
    document.getElementById("fname-error").innerHTML = "";
    return true;
}

function validateMinit() {
    const val = document.getElementById("minit").value.trim();
    if (val === "") return true;
    if (val.length !== 1 || !/^[a-zA-Z]$/.test(val)) {
        document.getElementById("minit-error").innerHTML = "Invalid Middle Initial";
        return false;
    }
    document.getElementById("minit-error").innerHTML = "";
    return true;
}

function validateLname() {
    const val = document.getElementById("lname").value.trim();
    if (val.length < 1 || val.length > 30 || !/^[a-zA-Z'-]+$/.test(val)) {
        document.getElementById("lname-error").innerHTML = "Invalid Last Name";
        return false;
    }
    document.getElementById("lname-error").innerHTML = "";
    return true;
}

function validateDob() {
    const input = document.getElementById("dob");
    const date = new Date(input.value);
    const now = new Date();
    const oldest = new Date();
    oldest.setFullYear(now.getFullYear() - 120);

    if (date > now) {
        document.getElementById("dob-error").innerHTML = "DOB can't be in the future";
        return false;
    } else if (date < oldest) {
        document.getElementById("dob-error").innerHTML = "DOB too far in past";
        return false;
    }
    document.getElementById("dob-error").innerHTML = "";
    return true;
}

function validateSsn() {
    const val = document.getElementById("ssn").value.trim();
    const pattern = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;
    if (!pattern.test(val)) {
        document.getElementById("ssn-error").innerHTML = "Invalid SSN";
        return false;
    }
    document.getElementById("ssn-error").innerHTML = "";
    return true;
}

function validateAddr1() {
    return validateField("address1", /^.{2,30}$/, "address1-error", "Address 1 must be 2-30 characters");
}

function validateCity() {
    return validateField("city", /^.{2,30}$/, "city-error", "City must be 2-30 characters");
}

function validateZcode() {
    return validateField("zipcode", /^\d{5}$/, "zcode-error", "Invalid Zipcode");
}

function validateEmail() {
    return validateField("email", /^[\w.-]+@[\w.-]+\.\w{2,}$/, "email-error", "Invalid Email");
}

function validatePhone() {
    return validateField("phone", /^\d{3}-\d{3}-\d{4}$/, "phone-error", "Invalid phone (000-000-0000)");
}

function validateUid() {
    const uid = document.getElementById("uid").value.trim();
    const errorBox = document.getElementById("uid-error");
    if (uid === "") {
        errorBox.innerHTML = "User ID required";
        return false;
    }
    if (!/^[a-zA-Z_\-][a-zA-Z0-9_\-]{4,29}$/.test(uid)) {
        errorBox.innerHTML = "Invalid User ID format";
        return false;
    }
    errorBox.innerHTML = "";
    return true;
}

function validatePword() {
    const pword = document.getElementById("pword").value;
    const uid = document.getElementById("uid").value;
    const errorBox = document.getElementById("pword-error");
    const errors = [];

    if (pword.length < 8) errors.push("Min 8 characters");
    if (!/[a-z]/.test(pword)) errors.push("Lowercase required");
    if (!/[A-Z]/.test(pword)) errors.push("Uppercase required");
    if (!/[0-9]/.test(pword)) errors.push("Number required");
    if (pword.includes(uid)) errors.push("Password can't include user ID");

    errorBox.innerHTML = errors.join("<br>");
    return errors.length === 0;
}

function confirmPword() {
    const p1 = document.getElementById("pword").value;
    const p2 = document.getElementById("repword").value;
    const errorBox = document.getElementById("pword2-error");

    if (p1 !== p2) {
        errorBox.innerHTML = "Passwords do not match";
        return false;
    }
    errorBox.innerHTML = "";
    return true;
}
//Review button
function reviewInput() {
    var formcontent = document.getElementById("signup");
    var formoutput = "<table class='output'><th colspan='2'> Review Your Information:</th>";

    for (let i = 0; i < formcontent.elements.length; i++) {
        let element = formcontent.elements[i];

        if (element.value !== "" || element.checked) {
            switch (element.type) {
                case "checkbox":
                    if (element.checked) {
                        formoutput += `<tr><td align='right'>${element.name}</td><td>&#x2713; ${element.value}</td></tr>`;
                    }
                    break;
                case "radio":
                    if (element.checked) {
                        formoutput += `<tr><td align='right'>${element.name}</td><td>${element.value}</td></tr>`;
                    }
                    break;
                case "select-one":
                    formoutput += `<tr><td align='right'>${element.name}</td><td>${element.options[element.selectedIndex].text}</td></tr>`;
                    break;
                default:
                    formoutput += `<tr><td align='right'>${element.name}</td><td>${element.value}</td></tr>`;
            }
        }
    }

    formoutput += "</table>";
    document.getElementById("showInput").innerHTML = formoutput;
}

function removeReview() {
    document.getElementById("showInput").innerHTML = "";
}

//Setting cookies
function setCookie(name, cvalue, expiryDays) {
    var day = new Date();
    day.setTime(day.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}

//Getting cookies
function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    document.cookie.split(";").forEach(function (cookie) {
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    });
}

var inputs = [
    {id:"fname", cookieName: "firstName"},
    {id:"minit", cookieName: "midInitial"},
    {id:"lname", cookieName: "lastName"},
    {id:"dob", cookieName: "dob"},
    {id:"ssn", cookieName: "ssn"},
    {id:"address1", cookieName: "address1"},
    {id:"city", cookieName: "city"},
    {id:"zipcode", cookieName: "zipcode"},
    {id:"email", cookieName: "email"},
    {id:"phone", cookieName: "phone"},
    {id:"uid", cookieName: "uid"},
]

document.addEventListener("DOMContentLoaded", function () {
    const todayElement = document.getElementById("today");
    if (todayElement) {
        const d = new Date();
        todayElement.innerHTML = d.toLocaleDateString();}
    displaySlider();

    // Prefill from cookies and set cookie on input
    inputs.forEach(function (input) {
        const inputElement = document.getElementById(input.id);
        if (!inputElement) return;

        const cookieValue = getCookie(input.cookieName);
        if (cookieValue !== "") {
            inputElement.value = cookieValue;
        }

        inputElement.addEventListener("input", function () {
            setCookie(input.cookieName, inputElement.value, 30);
        });
    });

    // Handle welcome message
    const firstName = getCookie("firstName");
    if (firstName !== "") {
        const welcome1 = document.getElementById("welcome1");
        const welcome2 = document.getElementById("welcome2");

        if (welcome1 && welcome2) {
            welcome1.innerHTML = "Welcome back, " + firstName + "!<br>";
            welcome2.innerHTML = `<a href='#' id='new-user'>Not ${firstName}? Click here to start a new form.</a>`;

            document.getElementById("new-user").addEventListener("click", function () {
                inputs.forEach(function (input) {
                    setCookie(input.cookieName, "", -1);
                });
                location.reload();
            });
        }
    }

    // Listen for Remember Me changes
    const rememberCheckbox = document.getElementById("remember-me");
    if (rememberCheckbox) {
        rememberCheckbox.addEventListener("change", function () {
            if (!this.checked) {
                deleteAllCookies();
            } else {
                inputs.forEach(function (input) {
                    const inputElement = document.getElementById(input.id);
                    if (inputElement.value.trim() !== "") {
                        setCookie(input.cookieName, inputElement.value, 30);
                    }
                });
            }
        });
    }

    // Intercept form submit to manually redirect
    const form = document.getElementById("signup");
    if (form) {
        form.addEventListener("submit", function (e) {
            const remember = document.getElementById("remember-me").checked;
            if (remember) {
                inputs.forEach(function (input) {
                    const inputElement = document.getElementById(input.id);
                    if (inputElement.value.trim() !== "") {
                        setCookie(input.cookieName, inputElement.value, 30);
                    }
                });
            }
            e.preventDefault(); // prevent default form action
            window.location.href = "thankyou.html";
        });
    }
});