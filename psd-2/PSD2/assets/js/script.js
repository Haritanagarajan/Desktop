

$(document).ready(function () {
    $("#f1").validate({
    rules: {
        'username': {
            required: true,
            minlength: 2,
            maxlength: 15,
            pattern: /^[A-Za-z ]+$/
        },
        'phonenum': {
            required: true,
            minlength: 10,
            pattern: /^[0-9]{10}$/
        },
        'email': {
            required: true,
            email: true,
            pattern: /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/
        }
    },
    messages: {
        'username': {
            required: "Please enter a Username.",
            minlength: "Username is too small",
            maxlength: "Username is too large",
            pattern: "Username must have alpabets"
        },
        'phonenum': {
            required: " Please enter valid Mobile number.",
            minlength: " Mobile number must have 10 digits",
            pattern: "Match correct mobile format"
        },
    
        'email': {
            required: " Please enter Email address",
            email: " Please enter a valid email address",
            pattern: " E-mail address should be in proper format"
        }
    }
    });
    });