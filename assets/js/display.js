var changeRegister = function(){
  $("#register-result").html("<strong>Successfully registered! Now Log in!</strong>");
  $("#register").closest('form').find("input[type=text], input[type=password]").val("");
};

var changeLogin = function(data){
  $("#login-area").html("Welcome " + data.user.email + "!" + "</a> | <a id='logout'>Logout</a>");
  $("#login-area").removeAttr("href");
  $("#login-result").html("<strong>Logged in!</strong>");

  // turn off login alert before changing to profile page
  $("#profile-link").off();
  $("#profile-link").click(function(){
    $('.register').css('display', 'none');
    $('.login').css('display', 'none');
    $('.profile').css('display', 'block');
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

  $('.login').css('display', 'block');
  $('.profile').css('display', 'none');
  $('.register').css('display', 'none');
  $("#login-result").html("<strong>Logged out!</strong>");

};

$(document).ready(function(){
  // login click handler
  $("#login-link").click(function(){
    $('.login').css('display', 'block');
    $('.register').css('display', 'none');
  });

  $("#register-link").click(function(){
    $('.register').css('display', 'block');
    $('.login').css('display', 'none');
  });

  $("#profile-link").click(function(){
    alert("please login first!");
  });
}) // end of document ready
