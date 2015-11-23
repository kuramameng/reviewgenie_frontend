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
