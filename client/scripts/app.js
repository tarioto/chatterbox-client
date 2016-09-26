// YOUR CODE HERE:

var app = {};
var loadedMessages = [];

app.init = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
      loadedMessages = data.results;
      loadedMessages.forEach(function(item) { app.renderMessage(item); });
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
  var display = $('<div></div>');
  display.text(message.text).html();
  $('#chats').prepend(display);
};

app.renderRoom = function(room) {
  $('#roomSelect').prepend('<li>' + room + '</li>');
};

$(document).ready(function () {
  app.init();
});

// var populateMessages = function () {
//   loadedMessages.forEach(function(item) { app.renderMessage(item); });
// };

// populateMessages();






































