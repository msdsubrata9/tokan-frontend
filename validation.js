// function myFunc() {
//   const name = document.forms["myForm"]["fname"].value;
//   const phone = document.forms["myForm"]["fMobileNo"].value;
//   const email = document.forms["myForm"]["femail"].value;
//   alert("Name: " + name + "\nMobile No.: " + phone + "\nEmail Id: " + email);
// }
function clearErrors() {
  errors = document.getElementsByClassName("ferror");
  for (let item of errors) {
    item.innerHTML = "";
  }
}
function seterror(id, error) {
  //sets error inside tag of id
  element = document.getElementById(id);
  element.getElementsByClassName("ferror")[0].innerHTML = error;
}
function validateForm() {
  var returnval = true;
  clearErrors();

  const namecheck = /^[a-zA-Z\s]{5,100}$/;
  const passwordcheck =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const emailcheck = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  //perform validation and if validation fails, set the value of returnval to false
  const name = document.forms["myForm"]["fname"].value;
  if (name.length < 5) {
    seterror("name", "*length of name is too short");
    returnval = false;
  }

  if (name.length == 0) {
    seterror("name", "*length of name can not be zero");
    returnval = false;
  }
  if (!isNaN(name)) {
    seterror("name", "*only characters are allowed");
    returnval = false;
  }
  if (!namecheck.test(name)) {
    seterror("name", "*user name is invalid");
    returnval = false;
  }

  const phone = document.forms["myForm"]["fMobileNo"].value;
  if (phone.length != 10) {
    seterror("phone", "*Phone number should be of 10 digits");
    returnval = false;
  }
  if (isNaN(phone)) {
    seterror("phone", "*user must write digits only not characters");
    returnval = false;
  }

  const password = document.forms["myForm"]["fpassword"].value;
  if (password.length < 8) {
    seterror("password", "*Password should be of 8 characters long");
    returnval = false;
  }
  if (!passwordcheck.test(password)) {
    seterror("password", "*Password is invalid");
    returnval = false;
  }

  const email = document.forms["myForm"]["femail"].value;
  if (!emailcheck.test(email)) {
    seterror("email", "*Email is invalid");
    returnval = false;
  }
  if (returnval == true) {
    // return myFunc();
    return setActionSignUp();
  } else {
    return returnval;
  }
}
function setActionSignUp() {
  const fname = document.forms["myForm"]["fname"].value;
  const femail = document.forms["myForm"]["femail"].value;
  const fMobileNo = document.forms["myForm"]["fMobileNo"].value;
  const fpassword = document.forms["myForm"]["fpassword"].value;
  const fregister = document.forms["myForm"]["fregister"].value;
  fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fname: fname,
      femail: femail,
      fMobileNo: fMobileNo,
      fpassword: fpassword,
      fregister: fregister,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "success.html";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.log(error));
  return false;
}
