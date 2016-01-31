'use strict'
var api = {
  url: 'https://intense-tundra-9809.herokuapp.com',
  //url: 'http://localhost:3000',
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

  createList: function(listInfo, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/wishlists',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(listInfo),
      dataType: 'json'
    }, callback);
  },

  showList: function(token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/wishlists',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  deleteList: function(id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/wishlists/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  listProduct: function(token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/products',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  createProduct: function(productInfo, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/products',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(productInfo),
      dataType: 'json'
    }, callback);
  },

  deleteProduct: function(id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/products/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  }
}; // end of api object
