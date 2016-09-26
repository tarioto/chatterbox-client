// YOUR CODE HERE:

var app = $.ajax({
  url: 'https://api.parse.com/1/classes/messages',
  type: 'GET',
  contentType: 'application/json',
  success: function(data) {
    console.log('messages recieved', data);
  },
  error: function(data) {
    Console.error('messages failed!');
  }
});

app.init = function() {
  // body...
};

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

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





