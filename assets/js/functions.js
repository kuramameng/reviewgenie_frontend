'use strict'
// initialize variables
var currentProfileId, currentUser = false, currentUserId, currentProfile, wishlistTitle, userToken, currentListData, currentProductData;

// define api functions
var listProfile = function(userToken){
  api.listProfile(userToken, function(error, profiles){
    if (error) {console.error(error);}
    profiles["profiles"].forEach(function(profile) {
      if (profile.user_id === currentUserId) {
        currentProfile = profile;
        currentProfileId = currentProfile.id;
      }
    }); // end of foreach
    // get current user wishlists
    showList(userToken);
  }); // end of profile callback
}; // end of function

var showList =  function(userToken){
  api.showList(userToken,function(error, listData){
    if (error){console.error(error);}
    currentListData = listData;
    api.listProduct(userToken, function(error, productData){
      currentProductData = productData;
      updateList(listData, productData);
    }); // end of list product callback
  }); // end of show list callback
}; // end of function

var addProduct = function(productInfo, userToken){
  api.createProduct(productInfo, userToken, function(error, productData){
    if (error) {console.log(error);}
    var listInfo = {"wishlist": {}};
    listInfo.wishlist["user_id"] = currentUserId;
    listInfo.wishlist["product_id"] = productData.id;
    listInfo.wishlist["title"] = wishlistTitle;
    api.createList(listInfo, userToken, function(error, data){
      if (error) {console.log(error);}
      alert("product added!");
      showList(userToken);
    }); // end of create list callback
  }); // end of create product
};

$(document).ready(function(){
  var form2object = function(form) {
    var data = {};
    $(form).find("input").each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  $('#register').on('submit', function(e) {
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    api.register(credentials, function (error, data) {
      if (error) {
        console.error(error);
        $("#register-result").html("<strong>Error! Registration fail!</strong>");
        return;
      }
      // display.js changeRegister
      changeRegister();
      // create user profile after login
      var id = data.user.id;
      var token = data.user.token;
      var userInfo = {"profile": {"first_name": "nil","last_name": "nil","nickname": "nil","website": "nil","phone": "nil","email": data.user.email,"gender": "nil","location": "nil","birthday": "nil","interest": "nil","profile_image_url": "nil","status": "nil","user_id": id}};
      api.createProfile(userInfo, token, function(error, profile){
        if (error) {console.error(error);}
      }); // end of createProfile callback
    }); // end of register callback
  }); // end of register

  // login handler, all other functions available after user logged in
  $('#login').on('submit', function(e) {
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    api.login(credentials, function (error, data) {
      if (error) {console.error(error);}
      // update current_user status
      data.user.current_user = true;
      // assign current user variables
      currentUser = data.user.current_user;
      currentUserId = data.user.id;
      userToken = data.user.token;
      // change views after user logged in
      changeLogin(data);

      /****   Profile     ***/
      // get user profile info
      listProfile(userToken);
      // "My profile" click listener
      $("#profile-link").click(function(e){
        // change views for profile display
        updateProfile(currentProfile);
      });

      // "Edit profile" click listener
      $('#edit-profile-form').on('submit', function(e) {
        e.preventDefault();
        var editInfo = wrap('profile', form2object(this));
        editInfo.profile["email"] = data.user.email;
        editInfo.profile["user_id"] = data.user.id;
        for(var key in editInfo.profile) { if(!editInfo.profile[key]) editInfo.profile[key] = "nil"};
        api.editProfile(currentProfileId, editInfo, userToken, function (error, data) {
          if (error) {console.error(error);}
          updateProfile(editInfo.profile);
          // change views after editing profile
          editProfile();
        }); // end of editProfile callback
      }); // end of edit profile submisson
      /*******  End of Profile   ********/

      /*******  Wistlist    *******/
      // "My wishlist" click listener
      $("#wishlist-link").click(function(e){
        listProfile(userToken);
        showList(userToken);
      }); // end of list wishlist

      // "Create wishlist" form listener
      $("#create-list-form").on('submit',function(e){
        e.preventDefault();
        var listInfo = wrap('wishlist', form2object(this));
        listInfo.wishlist["user_id"] = currentUserId;
        listInfo.wishlist["comment"] = "";
        listInfo.wishlist["product_id"] = null;
        api.createList(listInfo, userToken, function(error, data){
          if (error) {console.log(error);}
          showList(userToken);
        }); // end of create list callback
      }); // end of create wishlist

      // "delete wishlist" form listener
      $("#delete-list-form").unbind('submit').bind('submit', function(e){
        e.preventDefault();
        var input = $(this).find("input").val();
        currentListData.wishlists.forEach(function(wishlist){
          if(wishlist.user_id === currentUserId && wishlist.title === input && confirm("Are you sure?")) {
            api.deleteList(wishlist.id, userToken, function(error, data){
              if(error) {console.log(error);}
              showList(userToken);
            }); // end of delete list callback
          }; // end of if statement
        }); // end of wishlists.forEach
      }); // end of delete wishlist
      /****** End of wishlist   ******/

      /******  Product  *****/
      // "Add product" form listener
      $("#add-product-form").unbind('submit').bind('submit',function(e){
        e.preventDefault();
        var productInfo = wrap('product', form2object(this));
        addProduct(productInfo, userToken);
      }); // end of submit form
      /****** End of product  *****/

      // listen to logout event
      $('#logout').click(function(e){
        api.logout(currentUserId, userToken, function (error){
          if (error) {console.error(error);}
          data.user.current_user = false;
          currentUser = data.user.current_user;
          // change views after user logged out
          changeLogout();
        }); // end of logout callback
      }); // end of logout

    }); // end of login callback
  }); // end of login
}); // end of document ready
