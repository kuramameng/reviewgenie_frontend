$('#prodcut-search-btn').click(function(){
  var keywords = $('#product-keywords').val();
  if (keywords !== '') {
        // Create a JavaScript array of the item filters you want to use in your request
        var filterarray = [
          {"name":"MaxPrice",
           "value":"1000",
           "paramName":"Currency",
           "paramValue":"USD"},
          {"name":"FreeShippingOnly",
           "value":"true",
           "paramName":"",
           "paramValue":""},
          {"name":"ListingType",
           "value":["AuctionWithBIN", "FixedPrice", "StoreInventory"],
           "paramName":"",
           "paramValue":""},
          ];


        // Define global variable for the URL filter
        var urlfilter = "";

        // Generates an indexed URL snippet from the array of item filters
        function  buildURLArray() {
          // Iterate through each filter in the array
          for(var i=0; i<filterarray.length; i++) {
            //Index each item filter in filterarray
            var itemfilter = filterarray[i];
            // Iterate through each parameter in each item filter
            for(var index in itemfilter) {
              // Check to see if the paramter has a value (some don't)
              if (itemfilter[index] !== "") {
                if (itemfilter[index] instanceof Array) {
                  for(var r=0; r<itemfilter[index].length; r++) {
                  var value = itemfilter[index][r];
                  urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
                  }
                }
                else {
                  urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
                }
              }
            }
          }
        }  // End buildURLArray() function

        // Execute the function to build the URL filter
        buildURLArray(filterarray);

        // Construct the request
        // Replace MyAppID with your Production AppID
        var url = "http://svcs.ebay.com/services/search/FindingService/v1";
            url += "?OPERATION-NAME=findItemsByKeywords";
            url += "&SERVICE-VERSION=1.0.0";
            url += "&SECURITY-APPNAME=Jiangsha-0e99-48bd-a589-5714365ff998";
            url += "&GLOBAL-ID=EBAY-US";
            url += "&RESPONSE-DATA-FORMAT=JSON";
            url += "&REST-PAYLOAD";
            url += "&paginationInput.entriesPerPage=10";
            url += urlfilter;
        // Submit the request
        $.ajax({
        url: url,
        dataType: "jsonp",
        data: {keywords: keywords},
        success: function(root){
          var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
          //console.log(JSON.stringify(items, null, 4));
          $("#search-result").html("");
          items.forEach(function(current){
            // $("#search-result").append("<li><span><img style='max-width:150px; margin-top: 10px;' src='" + current.galleryURL + "'></span>" + current.title+ "</li>");
            $("#search-result").append("<table class='product-info'><tr><td style='width: 250px;'><a target='_blank' href='" + current.viewItemURL + "'><img style='height:150px; margin-top: 20px;' src='" + current.galleryURL + "'</a></td><td style='width:600px'><strong>Title:</strong> " + "<a target='_blank' href='" + current.viewItemURL + "'>" + current.title + "</a></li><li style='margin-top: 10px;'><strong>Price:</strong> $" + current.sellingStatus[0].currentPrice[0].__value__ + " | <strong>Rating:</strong> N/A | <strong>Category:</strong> " + current.primaryCategory[0].categoryName[0] + "<button id='search-add-product-" + current.itemId + "' class='btn btn-action add-search-product-btn' type='button'>+</button><div id='myDropdown-" + current.itemId + "' class='dropdown-content'></div></td></tr></table>");
          })

          $(".add-search-product-btn").click(function(e){
            $(".dropdown-content").off();
            var table = null;
            $("#myDropdown-" + e.target.id.split("-")[3]).html("");
            console.log(e.target.id);
            var product_id = e.target.id;
            api.showList(userToken,function(error, listData){
              if (error){}
              var list = [];
              listData.wishlists.forEach(function(current){
                if (currentUserId ===  current.user_id && list.indexOf(current.title) === -1) {
                  $("#myDropdown-" + e.target.id.split("-")[3]).append("<div id='add-wishlist-" + current.title + "' class='add-search'>" + current.title + "</div>");
                  list.push(current.title);
                }
              }) // end of forEach
              $("#myDropdown-" + e.target.id.split("-")[3]).toggle("show");
              $(".dropdown-content").click(function(event){
                console.log("clcked on " + event.target.id.split("-")[2]);
                var first_td = event.target.closest("tr");
                var sec_td = event.target.closest("td");
                console.log(first_td);

                // var productInfo = {
                //   product: {
                //     title: ,
                //     price: ,
                //     category: ,
                //     img_url:
                //   }
                // }
                // api.createProduct(productInfo, userToken, function(error, productData){
                //   if (error) {}
                //   console.log(productInfo);
                //   var listInfo = {"wishlist": {}};
                //   listInfo.wishlist["user_id"] = currentUserId;
                //   listInfo.wishlist["product_id"] = product_id;
                //   listInfo.wishlist["title"] = event.target.id.split("-")[2];
                // }); // end of create product
              }); // end of dropdown-content click
            }); // end of show list callback
          }) // end of btn click
        } // end of success
        }); // end of ajax call
  } else {
    console.log(false);
  }
})

