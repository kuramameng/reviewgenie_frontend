'use strict'
var currentProfileId = null;
var api = {
  url: 'http://localhost:3000',
  //url: 'http://ttt.wdibos.com',
  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  logout: function(id,token,callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/logout/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  createProfile: function(userInfo, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/profiles',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(userInfo),
      dataType: 'json'
    }, callback);
  },

  listProfile: function(token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/profiles',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  editProfile: function(id, editInfo, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/profiles/' + id,
      contentType: 'application/json; charset=utf-8',
      headers: {
        Authorization: 'Token token=' + token
      },
      data: JSON.stringify(editInfo),
      dataType: 'json'
    }, callback);
  },

  listProduct: function(token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/users',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  }

}; // end of api object

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
          var currentProfile = null;
          profiles["profiles"].forEach(function(profile) {
            if (profile.user_id === data.user.id) {
              currentProfile = profile;
              currentProfileId = currentProfile.id;
            }
          });
          //console.log(JSON.stringify(currentProfile, null, 4));
          updateProfile(currentProfile);
        }); // end of profile callback
      }); // end of profile display

      // listen to edit profile submission
      $('#edit-profile-form').on('submit', function(e) {
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
        e.preventDefault();
      }); // end of edit profile submisson

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
