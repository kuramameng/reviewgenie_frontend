var changeRegister = function(){
  $("#register-result").html("<strong>Successfully registered! Now Log in!</strong>");
  $("#register").closest('form').find("input[type=text], input[type=password]").val("");
};

var changeLogin = function(data){
  $("#login-area").html("Welcome " + data.user.email + "!" + "</a> | <a id='logout'>Logout</a>");
  $("#login-area").removeAttr("href");
  $("#login-result").html("<strong>Logged in!</strong>");

  // turn off login alert before allowing my profile page
  $("#profile-link").off();
  $("#profile-link").click(function(){
    $('.register').css('display', 'none');
    $('.login').css('display', 'none');
    $('.wishlist').css('display', 'none');
    $('.profile').css('display', 'block');
  });

  // turn off login alert before allowing wishlist page
  $("#wishlist-link").off();
  $("#wishlist-link").click(function(){
    $('.register').css('display', 'none');
    $('.login').css('display', 'none');
    $('.profile').css('display', 'none');
    $('.wishlist').css('display', 'block');
  });
};

var changeLogout = function(){
  $("#login-area").html("LOGIN / REGISTER");
  $("#login-area").attr('href', 'index.html');
  $("#login-result").html("");
  $("#login").closest('form').find("input[type=text], input[type=password]").val("");

  // turn off profile page path then turn on alert
  $("#profile-link").off();
  $("#profile-link").click(function(){
    alert("please login first!");
  });

  // turn off wishlist page path then turn on alert
  $("#wishlist-link").off();
  $("#wishlist-link").click(function(){
    alert("please login first!");
  });

  // change main content display
  $('.login').css('display', 'block');
  $('.profile').css('display', 'none');
  $('.register').css('display', 'none');
  $('.wishlist').css('display', 'none');
  $("#login-result").html("<strong>Logged out!</strong>");
};

var updateProfile = function(currentProfile){
  // return <li> to default values first
  $("#profile-ul li").each(function(index){
    $(this).html($(this).text().split(':')[0]);
    $("#profile-image").attr("src", "assets/images/Icon-user.png")
  });
  // populate <li> with currentProfile properties
  $("#profile-ul li").each(function(index){
    for (var key in currentProfile){
      if($(this).text().toLowerCase().replace(' ', '_') === key)
        $(this).html($(this).text() + ": " + currentProfile[key]);
    };
  }); // end of populate <li>
  // update profile image
  currentProfile["profile_image_url"] === "nil" ? true : $("#profile-image").attr("src", currentProfile["profile_image_url"]);
};

$(document).ready(function(){
  // login click handler
  $("#login-link").click(function(){
    $('.login').css('display', 'block');
    $('.register').css('display', 'none');
  });
  // register click handler
  $("#register-link").click(function(){
    $('.register').css('display', 'block');
    $('.login').css('display', 'none');
  });
  // my profile click handler
  $("#profile-link").click(function(){
    alert("please login first!");
  });
  // edit profile click handler
  $("#edit-profile").click(function(){
    $('.edit-profile-form').css('display', 'block');
    $('.profile').css('display', 'none');
  });
  // edit profile submit click handler
  $("#edit-profile-submit").click(function(){
    $('.edit-profile-form').css('display', 'none');
    $('.profile').css('display', 'block');
  });
  // wishlist click handler
  $("#wishlist-link").click(function(){
    alert("please login first!");
  });

}) // end of document ready
