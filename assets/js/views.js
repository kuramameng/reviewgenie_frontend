/****  Page views transition   ****/
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
/******  End of views transition  ******/

/******  Wishlist views transition  *******/
var initList = function(currentProfile){
  $("#wishlist-ul").css("display", "block");
  $("#wishlist-ul").find("li").remove();
  $("#wishlist-ul li").find("ul").remove();
  $("#create-list-form").css("display","none");
  $("#delete-list-form").css("display", "none");
  $("#add-product-form").css("display", "none");
  // update profile image
  currentProfile["profile_image_url"] === "nil" ? true : $("#wishlist-profile-image").attr("src", currentProfile["profile_image_url"]);
};

var populateListTitle = function(listTitle, listCount, wishlist){
  if(wishlist.user_id === currentUserId){
    if(listTitle.indexOf(wishlist.title) === -1){
      listCount ++;
      listTitle.push(wishlist.title);
      if($("#wishlist-ul li").length !== 0 || listCount !== 0) {
        $("#wishlist-ul").append("<li style='margin-top: 15px' class='wishlist-title' id='title-" + wishlist.title + "'>" + "<u>" + wishlist.title + "</u>" + "<button id='add-product-btn-" + wishlist.id + "' class='btn btn-action add-product-btn' type='button'><span style='font-size: 30px'>+</span></button></li>");
        // addProduct click handler, this will not work if put inside of document ready
        $("#add-product-btn-" + wishlist.id).click(function(){
          $("#wishlist-ul").css("display", "none");
          $("#add-product-form").css("display", "block");
          wishlistTitle = $(this).closest('li').attr("id").split("-")[1];
        });
      };
    } else if (listTitle.indexOf(wishlist.title) === 0 || listTitle.indexOf(wishlist.title)){
      console.log("wishlist exists");
    };
  };
};

var populateProductInfo = function(productData, wishlist){
  productData.products.forEach(function(product){
    if(product.id === wishlist.product_id){
      $("#title-" + wishlist.title).append("<table class='product-info'><tr><td style='width: 40%'><img style='height:150px; margin: auto 0;' src='" + product.img_url + "'</td><td style='width:60%'><strong>Title:</strong> " + product.title + "</li><li style='margin-top: 10px;'><strong>Price:</strong> " + product.price + " | <strong>Rating:</strong> " + product.rating + " | <strong>Category:</strong> " + product.category + "<button id='delete-product-btn-" + product.id + "' class='btn btn-action delete-product-btn' type='button'><span style='font-size: 20px'>-</span></button></td></tr></table>");
      // deleteProduct click handler
      $("#delete-product-btn-" + product.id).click(function(){
        var id = wishlist.id;
        api.deleteList(id, userToken, function(e){
          showList(userToken);
        }); // end of delete list callback
      });
    }; //end if
  });
};

var updateList = function(listData, productData){
  // initialize the display
  initList(currentProfile);
  // populate list
  var listTitle = [];
  var listCount = 0;
  listData.wishlists.forEach(function(wishlist){
    populateListTitle(listTitle, listCount, wishlist);
    populateProductInfo(productData, wishlist);
  }); // end wishlists.forEach
};
/******* End of wishlist views transition  ******/

/******* Profile views transition   ******/
var initProfile = function(){
  $("#profile-ul li").each(function(index){
    $(this).html($(this).text().split(':')[0]);
    $("#profile-image").attr("src", "assets/images/Icon-user.png")
  });
  $("#status").html("What's on your mind?");
};

var populateProfile =  function(currentProfile){
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
  currentProfile["profile_image_url"] === "nil" ? $("#wishlist-profile-image").attr("src", "assets/images/Icon-user.png") : $("#profile-image").attr("src", currentProfile["profile_image_url"]);
};

var autoFillEditForm = function(currentProfile){
  $("#edit-profile-form").find("input").each(function(index){
    var type = $(this).attr('type');
    for (var key in currentProfile){
      if ($(this).attr('name') === key && type !== 'submit' && type !== 'hidden') {
        $(this).attr("value", currentProfile[key]);
      } else if ($(this).attr('value') === "nil" && type !== 'submit' && type !== 'hidden'){
        $(this).attr("value","");
      } else if (key === "status"){
        $("#status").html(currentProfile[key]);
      }
    };
  });
};

var updateProfile = function(currentProfile){
  initProfile();
  populateProfile(currentProfile);
  autoFillEditForm(currentProfile);
};

var editProfile = function(){
  $('.edit-profile-form').css('display', 'none');
  $('.profile').css('display', 'block');
};
/******* End of profile views transition  *******/

