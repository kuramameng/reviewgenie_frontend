
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
      // deleteProduct click handler, this will not work if put inside of document ready
      $("#delete-product-btn-" + product.id).click(function(){
        var id = wishlist.id;
        api.deleteList(id, userToken, function(e){
          console.log("deleted");
          api.showList(userToken,function(error, listData){
            if (error){}
            //console.log(JSON.stringify(data, null, 4));
            api.listProduct(userToken, function(error, productData){
              updateList(listData, productData);
            }); // end of list product callback
          }); // end of show list callback
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
