'use strict'
var currentProfile = null;

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
    var credentials = wrap('credentials', form2object(this));
    console.log(JSON.stringify(credentials, null, 4));
    api.register(credentials, function (error, data) {
      if (error) {
        console.error(error);
        console.log('status: ' + error.status + ', error: ' +error.error);
        $("#register-result").html("<strong>Error! Registration fail!</strong>");
        return;
      }
      console.log(JSON.stringify(data, null, 4));
      changeRegister();

      // create user profile after login
      var id = data.user.id;
      var token = data.user.token;
      var userInfo = {
                        "profile": {
                          "first_name": "nil",
                          "last_name": "nil",
                          "nickname": "nil",
                          "website": "nil",
                          "phone": "nil",
                          "email": data.user.email,
                          "gender": "nil",
                          "location": "nil",
                          "birthday": "nil",
                          "interest": "nil",
                          "profile_image_url": "nil",
                          "status": "nil",
                          "user_id": id
                        }
                      };
      api.createProfile(userInfo, token, function(error, profile){
        if (error) {
          console.error(error);
        }
        console.log(token);
        console.log(JSON.stringify(profile, null, 4));
        console.log("User profile created");
      }); // end of createProfile callback

    }); // end of register callback
    e.preventDefault();
  }); // end of register

  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    api.login(credentials, function (error, data) {
      if (error) {
        console.error(error);
        console.log('status: ' + error.status + ', error: ' +error.error);
        $("#login-result").html("<strong>Error! Login fail!</strong>");
        return;
      }
      // update current_user status
      data.user.current_user = true;
      currentUserId = data.user.id;
      userToken = data.user.token;
      changeLogin(data);
      console.log(JSON.stringify(data, null, 4));

      // list user profile
      $("#profile-link").click(function(e){
        var token = data.user.token;
        api.listProfile(token, function(error, profiles){
          if (error) {
            console.error(error);
          }
          // console.log(JSON.stringify(profiles, null, 4));
          profiles["profiles"].forEach(function(profile) {
            if (profile.user_id === data.user.id) {
              currentProfile = profile;
              currentProfileId = currentProfile.id;
            }
          });
          console.log(JSON.stringify(profiles, null, 4));
          updateProfile(currentProfile);
        }); // end of profile callback
      }); // end of profile display

      // listen to edit profile submission
      $('#edit-profile-form').on('submit', function(e) {
        e.preventDefault();
        var token = data.user.token;
        var editInfo = wrap('profile', form2object(this));
        var id = currentProfileId;
        editInfo.profile["email"] = data.user.email;
        editInfo.profile["user_id"] = data.user.id;
        for(var key in editInfo.profile) { if(!editInfo.profile[key]) editInfo.profile[key] = "nil"};
        api.editProfile(id, editInfo, token, function (error, data) {
          if (error) {
          }
          console.log(JSON.stringify(editInfo, null, 4));
          updateProfile(editInfo.profile);
          editProfile();
        }); // end of editProfile callback
      }); // end of edit profile submisson

      // list user wishlist
      $("#wishlist-link").click(function(e){
        var token = data.user.token;
        api.listProfile(token, function(error, profiles){
          if (error) {
            console.error(error);
          }
          // console.log(JSON.stringify(profiles, null, 4));
          profiles["profiles"].forEach(function(profile) {
            if (profile.user_id === data.user.id) {
              currentProfile = profile;
              currentProfileId = currentProfile.id;
            }
          });
          //console.log(JSON.stringify(currentProfile, null, 4));
          updateProfile(currentProfile);
        }); // end of profile callback
        api.showList(token,function(error, listData){
            if (error){}
            //console.log(JSON.stringify(data, null, 4));
            api.listProduct(token, function(error, productData){
              updateList(listData, productData);
            }); // end of list product callback
          }); // end of show list callback
        }); // end of list wishlist

      // create wishlist
      $("#create-list-form").on('submit',function(e){
        e.preventDefault();
        var token = data.user.token;
        var listInfo = wrap('wishlist', form2object(this));
        listInfo.wishlist["user_id"] = currentUserId;
        listInfo.wishlist["comment"] = "";
        listInfo.wishlist["product_id"] = null;
        console.log(JSON.stringify(listInfo, null, 4));
        api.createList(listInfo, token, function(error, data){
          if (error) {
            console.log(error);
          }
          api.showList(token,function(error, listData){
            if (error){}
            //console.log(JSON.stringify(data, null, 4));
            api.listProduct(token, function(error, productData){
              updateList(listData, productData);
            }); // end of list product callback
          }); // end of show list callback
        }); // end of create list callback
      }); // end of create wishlist

      // delete wishlist
      $("#delete-list-form").on('submit', function(e){
        e.preventDefault();
        if (confirm("Are you sure?")) {
          var token = data.user.token;
          var input = $(this).find("input").val();
          api.showList(token, function(error, listData){
            if(error){}
            listData.wishlists.forEach(function(wishlist){
              if(wishlist.user_id === currentUserId && wishlist.title === input) {
                api.deleteList(wishlist.id, token, function(error, data){
                  if(error) {
                    console.log(error);
                  }
                  console.log("deleted!");
                  api.showList(token,function(error, data){
                  if (error){}
                    console.log(JSON.stringify(data, null, 4));
                    api.listProduct(token, function(error, productData){
                      updateList(data, productData);
                    }); // end of list product callback
                  }); // end of show list callback
                }); // end of delete list callback
              }; // end of if statement
            }); // end of wishlists.forEach
          }); // end of showList
        }; // end of if statement
      }); // end of delete wishlist

      $("#add-product-form").on('submit',function(e){
        e.preventDefault();
        var token = data.user.token;
        var productInfo = wrap('product', form2object(this));
        console.log(JSON.stringify(productInfo, null, 4));
        api.createProduct(productInfo, token, function(error, productData){
          if (error) {
            console.log(error);
          }
          var listInfo = {"wishlist": {}};
          listInfo.wishlist["user_id"] = currentUserId;
          listInfo.wishlist["product_id"] = productData.id;
          listInfo.wishlist["title"] = wishlistTitle;
          console.log(JSON.stringify(listInfo, null, 4));
          api.createList(listInfo, token, function(error, listData){
            if (error){}
            api.showList(token,function(error, listData){
              if (error){}
              //console.log(JSON.stringify(data, null, 4));
              api.listProduct(token, function(error, productData){
                updateList(listData, productData);
              }); // end of list product callback
            }); // end of show list callback
          }); // end of create list callback
        }); // end of create wishlist
      }); // end of submit form



      // listen to logout event
      $('#logout').click(function(e){
        var token = data.user.token;
        var id = data.user.id;
        api.logout(id, token, function (error){
          if (error) {
            console.error(error);
          }
          data.user.current_user = false;
          changeLogout();
          console.log(JSON.stringify(data, null, 4));
          console.log("Logged out");
        }); // end of logout callback
      }); // end of logout

    }); // end of login callback
    e.preventDefault();
  }); // end of login




}); // end of document ready
