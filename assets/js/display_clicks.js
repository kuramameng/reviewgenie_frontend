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
    $('.edit-profile-form').css('display', 'none');
    $('.login').css('display', 'none');
    $('.wishlist').css('display', 'none');
    $('.search').css('display', 'none');
    $('.profile').css('display', 'block');
  });

  // turn off login alert before allowing wishlist page
  $("#wishlist-link").off();
  $("#wishlist-link").click(function(){
    $('.register').css('display', 'none');
    $('.login').css('display', 'none');
    $('.edit-profile-form').css('display', 'none');
    $('.profile').css('display', 'none');
    $('.search').css('display', 'none');
    $('.wishlist').css('display', 'block');
  });

  // search handler
  $("#search-link").off();
  $("#search-link").click(function(){
    $('.register').css('display', 'none');
    $('.login').css('display', 'none');
    $('.edit-profile-form').css('display', 'none');
    $('.profile').css('display', 'none');
    $('.wishlist').css('display', 'none');
    $('.search').css('display', 'block');
  })
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

  // turn off search then turn on alert
  $("#search-link").off();
  $("#search-link").click(function(){
    alert("please login first!");
  });

  // change main content display
  $('.login').css('display', 'block');
  $('.edit-profile-form').css('display', 'none');
  $('.profile').css('display', 'none');
  $('.register').css('display', 'none');
  $('.wishlist').css('display', 'none');
  $('.search').css('display', 'none');
  $("#login-result").html("<strong>Logged out!</strong>");
};

// click handler for landing page
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
  // wishlist click handler
  $("#wishlist-link").click(function(){
    alert("please login first!");
  });
  // search click handler
  $("#search-link").click(function(){
    alert("please login first!");
  });
  // createlist click handler
  $("#create-list").click(function(){
    $("#create-list-form").css("display","block");
    $("#delete-list-form").css("display","none");
  });
  // createlist click handler
  $("#delete-list").click(function(){
    $("#delete-list-form").css("display","block");
    $("#create-list-form").css("display","none");
  });

}) // end of document ready
