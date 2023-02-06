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
  debugger;
  const returnval = true;
  clearErrors();

  const passwordcheck =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const emailcheck = /^[A-Za-z_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}/;

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
    return setActionLogin();
  } else {
    return returnval;
  }
}
function setActionLogin() {
  const femail = document.forms["myForm"]["femail"].value;

  const fpassword = document.forms["myForm"]["fpassword"].value;

  debugger;
  fetch("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      femail: femail,
      fpassword: fpassword,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
  return false;
}
