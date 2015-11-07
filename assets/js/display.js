jQuery(document).ready(function(){
  // login click handler
  $("#login-link").click(function(){
    $('.login').css('display', 'block');
    $('.register').css('display', 'none');
  });
  $("#register-link").click(function(){
    $('.register').css('display', 'block');
    $('.login').css('display', 'none');
  });


}) // end of document ready
