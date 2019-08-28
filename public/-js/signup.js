$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var fnameInput = $("input#fname");
  var lnameInput = $("input#lname");
  var emailInput = $("input#email");
  var passwordInput = $("input#password");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      fname: fnameInput.val().trim(),
      lname: lnameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    console.log(userData);
    if (!userData.fname || !userData.lname || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.fname, userData.lname, userData.email, userData.password);
    fnameInput.val("");
    lnameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(fname, lname, email, password) {
    console.log("before post")
    $.post("/api/signup", {
      fname: fname,
      lname: lname,
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/dashboard");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
