$(function() {

  var hypertopicMap = new HypertopicMap();

  $(".users ul").append(
    '<li><input class="new_user" type="text" placeholder="login" /></li>'
  );
  $(".new_user").on('keypress', function(key) {
    if (key.which==13) {
      var user = $(this).val();
      var textbox = $(this);
      hypertopicMap.register({
        id: $(this).closest('.viewpoint').prop('id'),
        user: user,
        success: function() {
          textbox.parent().before('<li>' + user + '</li>');
          textbox.val('');
        }
      });
    }
  });

});
