var stripe = Stripe('pk_test_8PJzgKnqqYc4KdpZzecMQwWp00opd4WGqT');
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const forgetPassword = document.querySelector(".forget");
const updatePassword = document.querySelector(".updatePassword");
const resetPassword = document.querySelector(".reset");
const signupButtons = document.querySelectorAll(".signup-button")
// async function bookings(id) {
//     const result = await axios.post("/api/booking/checkout", { id });

//     if (result.data.success) {
//         console.log(result.data.session);
//     } else {

//     }
// }
if (resetPassword) {
    resetPassword.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input");
        const token = inputs[0].value;
        const password = inputs[1].value;
        const confirmpassword = inputs[2].value;
        myReset(token, password, confirmpassword);
    })
}
async function bookings(id) {
    console.log(id);
    const result = await axios.post("/api/booking/checkout", { id });
    if (result.data.success) {
        console.log("res");
        console.log(result.data);
        //payment
        console.log("session.- "+result.data.session);
        await stripe.redirectToCheckout({
            sessionId: result.data.session.id
        });
        alert("payment has been done");
    } else {
        //payment fail
        // console.log('failed');
    }
}
async function myReset(token, password, confirmpassword) {
    const result = await axios.patch(`/api/user/resetPassword/${token}`, {

        password,
        confirmpassword
    });
    if (result.data.success) {
        alert("password updated successfully");
        location.assign("/login");
    } else {
        alert("something went wrong");
    }
}
if (forgetPassword) {
    forgetPassword.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementsByTagName("input")[0].value;
        myForget(email);
    })
}
async function myForget(email) {
    const result = await axios.patch("/api/user/forgetPassword", {
        email
    });
    if (result.data.success) {
        alert("user mail has been sent");
        location.assign("/resetPassword");
    } else {
        alert("something went wrong");
    }
}
if (updatePassword) {
    updatePassword.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input");
        const oldPassword = inputs[0].value;
        const newPassword = inputs[1].value;
        const confirmNewPassword = inputs[2].value;
        console.log("update password was called");
        myUpdatePassword(oldPassword, newPassword, confirmNewPassword);
    })
}
async function myUpdatePassword(password, newpassword, confirmpassword) {
    console.log(password + " " + newpassword + " " + confirmpassword);
    const result = await axios.patch("/api/user/updatePassword", {
        password,
        newpassword,
        confirmpassword
    });
    if (result.data.success) {
        alert("password updated");
    } else {
        alert("something went worng");
    }
}
async function mylogin(email, password) {
    const result = await axios.post("/api/user/login", {
        email,
        password
    });
    if (result.data.success) {
        // alert("user logged in");
        location.assign("/me");
    } else {
        alert("wrong email or password");
    }
}
if (login) {
    login.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input");
        const email = inputs[0].value;
        const password = inputs[1].value;
        console.log("login was called");
        mylogin(email, password);
    });
}
async function mysignup(name, email, password, confirmpassword) {
    const result = await axios.post("/api/user/signup", {
        name,
        email,
        password,
        confirmpassword
    });
    if (result.data.success) {
        alert("user signed in");
    } else if (result.data.failed) {
        alert("something went wrong")
    }
}
if (signup) {
    signup.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input");
        const name = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;
        const confirmpassword = inputs[3].value;
        console.log("signup was called");
        mysignup(name, email, password, confirmpassword);
    });
}
// if (updateUser) {

// }
if (signupButtons) {
    console.log(signupButtons);
    for (let i = 0; i < signupButtons.length; i++) {
        signupButtons[i].addEventListener("click", function (event) {
            bookings(event.target.getAttribute("plan-id"));
        });
    }
}