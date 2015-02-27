var HackerNewsUsers = HackerNewsUsers || {};

HackerNewsUsers.show_users = function(){
  $.ajax({
    url: 'http://ig-hacker-news.herokuapp.com/users',
    type: 'GET'
  })
  .done(function(data) {
    console.table(data);
  HackerNewsUsers.render_all_users(data);
  });
};

HackerNewsUsers.render_all_users = function(users){
  users.forEach(function(user){
    $('#user_list').append('<li>' + user.name + '<br>' + user.about + '<br>' + user.email);
  });
};

HackerNewsUsers.create_user = function(event){
  event.preventDefault();
  $.ajax({
    url: 'http://ig-hacker-news.herokuapp.com/users',
    type: 'POST',
    dataType: 'JSON',
    data: {
      user: {
        name: $('#name').val(),
        about: $('#about').val(),
        email: $('#email').val()
      }
    },
  })
  .done(function(new_user) {
    console.log("here is another user I just created, click on the triangle to expand");
    HackerNewsUsers.add_user(new_user);
  });
};

HackerNewsUsers.add_user = function(user) {
  $('#user_list').append('<li> Name: ' + user.name + '<br> About: ' + user.about + '<br> Email: ' + user.email + '</li>')
};

$(document).ready(function() {
  HackerNewsUsers.show_users();
  $('#submit').on('click',HackerNewsUsers.create_user);
});
