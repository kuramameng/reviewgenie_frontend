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
  $('.edit-profile-form').css('display', 'none');
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
      if($(this).text().toLowerCase().replace(' ', '_') === key) {
        if(currentProfile[key] === "nil") $(this).html($(this).text() + ":    <span style='color: #808080'>empty</span>" )
        else $(this).html($(this).text() + ":   " + currentProfile[key]);
      }
    };
  }); // end of populate <li>
  // update profile image
  currentProfile["profile_image_url"] === "nil" ? true : $("#profile-image").attr("src", currentProfile["profile_image_url"]);

  $("#edit-profile-form").find("input").each(function(index){
    var type = $(this).attr('type');
    for (var key in currentProfile){
      if ($(this).attr('name') === key && type !== 'submit' && type !== 'hidden') {
        $(this).attr("value", currentProfile[key]);
      } else if ($(this).attr('value') === "nil" && type !== 'submit' && type !== 'hidden'){
        $(this).attr("value","");
      }
    }
  });
};

var editProfile = function(){
  $('.edit-profile-form').css('display', 'none');
  $('.profile').css('display', 'block');
};

var updateList = function(listData, productData){
  // initialize the display
  var listCount = 0;
  var productCount = 0;
  $("#wishlist-ul").find("li").remove();
  $("#wishlist-ul li").find("ul").remove();
  // $("#wishlist-ul li ul").each(function(index) {$(this).html("")});
  // $("#wishlist-ul li").each(function(index) {$(this).html("")});
  $("#create-list-form").css("display","none");
  $("#delete-list-form").css("display", "none");
  // populate list
  listData.wishlists.forEach(function(wishlist){
    if(wishlist.user_id === currentUserId){
      listCount ++;
      if($("#wishlist-ul li").length !== 0 || listCount !== 0) {
        $("#wishlist-ul").append("<li class='wishlist-title' id='title-" + wishlist.id + "'>" + wishlist.title + " (id: " + wishlist.id + ")" + "</li>");
      };
    };
    productData.products.forEach(function(product){
      if(product.id === wishlist.product_id){
        productCount++;
        console.log(JSON.stringify(productData, null, 4));
        $("#title-" + wishlist.id).append("<ul class='product-info'><li>Title: " + product.title + "</li><li>ASIN: " + product.asin + "</li><li>Rating: " + product.rating + "</li></ul>");
      };
    });
  });
  if (listCount === 0) {
      $("#wishlist-ul").append("<li>You don't have any wishlist yet, click 'Create Wishlist' to create one</li>")
  };
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
  // wishlist click handler
  $("#wishlist-link").click(function(){
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
