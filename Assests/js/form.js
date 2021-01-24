//animate log in and signup form 
function logAnimate() {
    $('.form').animate({ height: "toggle", opacity: "toggle" }, 1000, 'linear');
    // replace log in word to register And vice versa .
    var name = document.getElementById("head").innerHTML;
    if (name == "Log In") {
        name = "Register";
        //accessibility first input focus
        setTimeout(() => {
            username.focus();
        }, 900);
    } else {
        name = "Log In";
        setTimeout(() => {
            userSIEmail.focus();
        }, 900);
    }
    document.getElementById("head").innerText = name;
}

//call logAnimate() when click on create an account or sign in
$('.message a').click(function () {
    resetForm();
    logAnimate();
});

//animate when click on log image ,using tween max library
$('#form_button').click(function () {
    $('#form_button').fadeOut("slow", function () {
        $("#container").fadeIn();
        TweenMax.from("#container", .2, { scale: 0, ease: Sine.easeInOut });
        TweenMax.to("#container", .2, { scale: 1, ease: Sine.easeInOut });
        //start focus with first input
        userSIEmail.focus();
    });
});

//animate when click on close button ,using tween max library
$(".close-btn").click(function () {
    resetForm();
    TweenMax.from("#container", .4, { scale: 1, ease: Sine.easeInOut });
    TweenMax.to("#container", .4, { left: "0px", scale: 0, ease: Sine.easeInOut });
    $("#container").fadeOut(800, function () {
        $("#form_button").fadeIn(800);
    });
});

// SELECTING ALL TEXT ELEMENTS in register form
var username = document.getElementById("userFullName");
var email = document.getElementById("userEmail");
var password = document.getElementById("userPassword");
var password_confirm = document.getElementById("userPassword-confirm");
// SELECTING ALL TEXT ELEMENTS in log in form
var userSIEmail = document.getElementById("userSIEmail");
var userSIPassword = document.getElementById("userSIPassword");
// SELECTING ALL ERROR DISPLAY ELEMENTS in log in form
var email_err = document.getElementById('email_err');
var password_err = document.getElementById('password_err');
// SELECTING ALL ERROR DISPLAY ELEMENTS in register form
var name_error = document.getElementById('name_error');
var email_error = document.getElementById('email_error');
var password_error = document.getElementById('password_error');
var allInputs = [username, email, password, password_confirm, userSIEmail, userSIPassword];

//Check in Log in form INPUTS
//>>Check Mail
var checkSIEmail = true;
var checkSIEmailPattern = true;
//>>Check Pass
var checkSIPass = true;
var checkSIPassPattern = true;
//Check in Sign UP form Inputs
// >> check name
var checkName = true;
var checkNameLen = true;
//>> check email
var checkMail = true;
var checkMailPattern = true;
//>> check password
var checkPass = true;
var checkPassPattern = true;
var checkPassConfirm = true;

//add more elements with one event
function addElementMulti(el, s, fn) {
    el.forEach(e => e.addEventListener(s, fn, true));
}

//Nested loop to add multi elements on multi events with specific function
function addElementEventMulti(el, s, fn) {
    el.forEach(l => {
        s.split(' ').forEach(e => {
            l.addEventListener(e, fn, true)
        });
    });
}

//use this function to verify all input with reset form also use it when add blur event
function blurAll() {
    allInputs.forEach(e => {
        verifyAll(e);
    });
}

//clear form if close form or toggle between log in and sign up form
function resetForm() {
    document.getElementById("form-signUP").reset();
    document.getElementById("form").reset();
    blurAll();
}

//Show password
function showPassLog() {
    (userSIPassword.type === "password") ? userSIPassword.type = "text" : userSIPassword.type = "password";
}
function showPassSI() {
    (password.type === "password") ? password.type = "text" : password.type = "password";
    (password_confirm.type === "password") ? password_confirm.type = "text" : password_confirm.type = "password";
}

//Put all inputs in if statement to prevent event listner error in the main page
allInputs.forEach(e => {
    if (e) {
        //log elements with input and focus events
        addElementEventMulti([userSIEmail, userSIPassword], "input focus", ValidateLog);
        //Sign UP elements with input and focus events
        addElementEventMulti([username, email, password, password_confirm], "input focus", Validate);
        // All elements with blur event
        addElementMulti(allInputs, "blur", () => {
            blurAll();
        }, true);
        //key event >> enter


    }
});

function searchKeyPress(e) {
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13) {
        var name = document.getElementById("head").innerHTML;
        if (name == "Log In") {
            document.getElementById('login').click();
            return false;
        } else if (name == "Register") {
            document.getElementById('signup').click();
            return false;
        }
    }
    return true;
}

// validation function (register form)
function Validate() {
    checkName = (username.value.trim() == "");
    checkNameLen = (username.value.trim().length < 3);
    checkMail = (email.value.trim() == "");
    checkMailPattern = (!email.value.match(email.pattern));
    checkPass = (password.value.trim() == "");
    checkPassPattern = (!password.value.match(password.pattern));
    checkPassConfirm = (password.value.trim() != password_confirm.value);

    var nextElement;
    // validate username
    if (username === document.activeElement) {
        nextElement = validationAll(this);
        if (checkName) {
            nextElement.textContent = "Username is required";
            return false;

        } else if (checkNameLen) {
            nextElement.textContent = "Username must be at least 3 characters";
            return false;

        } else { verifyValidate(username); }
        // validate email
    } else if (email === document.activeElement) {
        nextElement = validationAll(this);
        if (checkMail) {
            nextElement.textContent = "Email is required";
            return false;

        } else if (checkMailPattern) {
            nextElement.textContent = "Email Syntax is wrong";
            return false;

        } else { verifyValidate(email); }
        // validate password
    } else if (password === document.activeElement) {
        nextElement = validationAll(this);
        if (checkPass) {
            nextElement.textContent = "Password is required";
            return false;

        } else if (checkPassPattern) {
            nextElement.textContent = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
            return false;

        } else { verifyValidate(password); }
    } else if (password_confirm === document.activeElement) {
        nextElement = validationAll(this);
        if (checkPassConfirm) {
            password.style.border = "1px solid red";
            nextElement.textContent = "The two passwords do not match";
            return false;
        }
        else {
            password.style.border = "1px solid #5e6e66";
            verifyValidate(password_confirm);
        }
    }

}

// validate log in
function ValidateLog() {
    //Check in Log in form INPUTS
    //>>Check Mail
    checkSIEmail = (userSIEmail.value.trim() === "");
    checkSIEmailPattern = (!userSIEmail.value.match(userSIEmail.pattern));
    //>>Check Pass
    checkSIPass = (userSIPassword.value.trim() == "");
    checkSIPassPattern = (!userSIPassword.value.match(userSIPassword.pattern));

    var nextElement;
    //check active element
    if (userSIEmail === document.activeElement) {
        nextElement = validationAll(this);
        if (checkSIEmail) {
            nextElement.textContent = "Email is required";
            return false;

        } else if (checkSIEmailPattern) {
            nextElement.textContent = "Email Syntax is wrong";
            return false;

        } else {
            verifyValidate(userSIEmail);
        }
    } else if (userSIPassword === document.activeElement) {
        nextElement = validationAll(this);
        if (checkSIPass) {
            nextElement.textContent = "Password is required";
            return false;
        } else if (checkSIPassPattern) {
            nextElement.textContent = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
            return false;
        } else {
            verifyValidate(userSIPassword);
        }
    }
}

//function to set attribute on element that no validate and return element that have error validation
function validationAll(input) {
    input.style.border = "1px solid red";
    input.parentElement.style.color = "red";
    input.focus();
    return input.parentElement.children[1];
}

//function to set attribute on element that validate on blur event if input == null
function verifyAll(input) {
    if (input.value == "") {
        input.style.border = "1px solid #5e6e66";
        input.parentElement.style.color = "#5e6e66";
        input.parentElement.children[1].innerHTML = "";
        return true;
    }
}

//function to set attribute on element that validate on focus and input events if input != null
function verifyValidate(input) {
    if (input.value != "") {
        input.style.border = "1px solid #5e6e66";
        input.parentElement.style.color = "#5e6e66";
        input.parentElement.children[1].innerHTML = "";
        return true;
    }
}
// Submitting and Creating new user in firebase authentication
// Use it on Sign up button or Enter Key keyboard
function signUp() {
    //first remove spaces
    var userFullName = username.value.trim();
    console.log(userFullName);

    var userEmail = email.value.trim();
    var userPassword = password.value.trim();
    // if input no validate >> focus on it and go to validation function
    if (checkName || checkNameLen) {
        username.focus();
    } else if (checkMailPattern || checkMail) {
        email.focus();
    } else if (checkPass || checkPassPattern) {
        password.focus();
    } else if (checkPassConfirm) {
        password_confirm.focus();
    }
    else {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            //User Data
            var userData = {
                userFullName: userFullName,
                userEmail: userEmail,
                userPassword: userPassword,
                headerStyle: 'rgba(255, 255, 255, 0.4)',
                bodyStyle1: 'rgb(255, 255, 255)',
                bodyStyle2: '#f9f9f9',
                primaryStyle: '#0c65ed',
                checkDark: true
            }
            //Save user data on RealTime Database
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created', 'Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function () {
                    //after sign up auto toggle to log in form and also reset form
                    logAnimate();
                    resetForm();
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            resetForm();
            swal({
                type: 'error',
                title: errorCode,
                text: errorMessage
            })
        });
    }
}

//  Check email or password exsist in firebase authentication 
//  Use it on sign in button or Enter Key on keyboard    
function signIn() {
    var SIEmail = userSIEmail.value.trim();
    var SIPassword = userSIPassword.value.trim();
    // if input no validate >> focus on it and go to validation function
    if (checkSIEmail || checkSIEmailPattern) {
        document.getElementById("userSIEmail").focus();

    } else if (checkSIPass || checkSIPassPattern) {
        document.getElementById("userSIPassword").focus();
    }
    else {
        firebase.auth().signInWithEmailAndPassword(SIEmail, SIPassword).then((success) => {
            // window.location.replace("index.html");

            swal('successfull', 'Succesfully signed in',
            ).then((value) => {
                setTimeout(function () {
                    window.location.replace("index.html");
                    resetForm();
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: errorCode,
                text: errorMessage
            })
        });
    }
}

//when press on sign out button
$('.sign_out').on('click', signOut);
$(this).data('clicked', true);
// Working For Sign Out
function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        swal({
            icon: 'success',
            title: 'successfull',
            text: 'signed out',
            showConfirmButton: false
        }
        ).then((value) => {
            setTimeout(function () {
                window.location.replace("form.html");
            }, 1000)
        });
    }).catch(function (error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: errorMessage
        })
    });
}