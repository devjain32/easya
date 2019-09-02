$(document).ready(function () {
    // Getting references to our form and inputs
    var videosForm = $("form.videos");
    var videoInput = $("input#videoLink");
  
    // When the form is submitted, we validate there's an email and password entered
    videosForm.on("submit", function (event) {
      event.preventDefault();
      var userData = {
        link: videoInput.val().trim()
      };
  
      if (!userData.link) {
        return;
      }
  
      // If we have an email and password we run the submitVideo function and clear the form
      submitVideo(userData.link);
      videoInput.val("");
    });
  
    // submitVideo does a post to our "api/login" route and if successful, redirects us the the members page
    function submitVideo(link) {
      $.post("/api/postVideo", {
        link: link,
      })
        .then(function (res) {
          console.log(res);
          window.location.replace("/addvideos1234");
          // If there's an error, log the error
        })
        .catch(function (err) {
          console.log(err);
          if (res.status === 401) {
            console.log("Please enter link");
            window.alert("Please enter link");
          }
          else if (res.status >= 500) {
            console.log("Internal server error. Please try again.");
          }
  
        });
    }
  });
  