// YOUR CODE HERE:

var app = {};
var loadedMessages = [];
var rooms = [];
var friends = [];

app.init = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
      loadedMessages = data.results;
      loadedMessages.forEach(function(item) { 
        app.renderMessage(item);
        app.renderRoom(item); 
      });
    },
    error: function(data) {
      console.error('messages failed!');
    }
  });
};

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

app.send = function(message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
      loadedMessages = data.results;
      app.clearMessages();
      loadedMessages.forEach(function(item) { app.renderMessage(item); });
    },
    error: function(data) {
      Console.error('messages failed!');
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  var display = $('<div class="chat"></div>');
  var username = $('<div class="username"></div>');
  if (friends.indexOf(message.username) !== -1) {
    display.addClass('friend');
  }
  username.text(message.username).html();
  display.data('user', message.username);
  display.text(' ' + message.text).html();
  display.prepend(username);
  $('#chats').append(display);
};

app.renderRoom = function(message) {
  
  if (rooms.indexOf(message.roomname) === -1) {
    rooms.push(message.roomname);
    var option = $('<option></option>');
    option.text(message.roomname).html();
    $(option).val(message.roomname);
    $('#dropdown').append(option);
  }
};

$(document).ready(function () {
  app.init();

  $('#chats').on('click', '.username', function() {
    var name = $(this).text();
    if (friends.indexOf(name) === -1) {
      friends.push(name);
    } else {
      friends.splice(friends.indexOf(name), 1);
    }
    app.fetch();
  });

  $('.update').on('click', function () {
    app.fetch();
  });

  $('.submit').on('click', function () {
    var input = $('input.send').val();
    var name = window.location.search.split('=')[1];
    var room = $('#dropdown option:selected').text();
    var obj = {
      username: name,
      text: input,
      roomname: room
    };
    app.send(obj);
  });
});

var loadRoom = function() {
  var currentRoom = $('#dropdown option:selected').text();
  if (currentRoom === 'All') {
    app.fetch();
    return;
  }
  var roomMessages = loadedMessages.filter(function(item) {
    return currentRoom === item.roomname; 
  });
  app.clearMessages();
  roomMessages.forEach(function(message) {
    app.renderMessage(message);
  });
};


