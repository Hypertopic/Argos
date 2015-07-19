$(document).ready(function() {

  function Interact() {
    $.agorae.config = {};
    $.agorae.config.auth = window.location.origin + '/_session';
    $.agorae.session = {};

    if($.cookie('username') && $.cookie('password')) {
      $.agorae.login($.cookie('username'), $.cookie('password'), function(res) {
        if(res) {
          alert('Wrong credentials, try again!');
          $.cookie('username', prompt('Select your username'));
          $.cookie('password', prompt('Select your password'));
          location.reload();
        }
      }, function(res) {

      });
    } else {
      $.cookie('username', prompt('Select your username'));
      $.cookie('password', prompt('Select your password'));
      $.agorae.login($.cookie('username'), $.cookie('password'), function(res) {
        if(res) {
          alert('Wrong credentials, try again!');
          $.cookie('username', prompt('Select your username'));
          $.cookie('password', prompt('Select your password'));
          location.reload();
        }
      }, function(res) {

      });
    }
  }

  function UI() {
    $.contextMenu({
      selector: '.show-options',
      trigger: 'left',
      callback: function(key, options) {
        switch(key){
          case 'delete' : self.deleteSelectedTopics(); break;
          case 'promote': self.promoteSelectedTopics(); break;
          case 'demote': self.demoteSelectedTopics(); break;
          case 'add-child': self.addChild(); break;
          case 'add-sibling': self.addSibling(); break;
        }
      },
      items: {
        "delete": {name: "Supprimer (Backspace)", icon: "delete"},
        "promote": {name: "Promouvoir (Shift+Tab)", icon: "promote"},
        "demote": {name: "Déscendre (Tab)", icon: "demote"},
        "add-child": {name: "Créer un enfant", icon: "create_a_child"},
        "add-sibling": {name: "Créer un frère", icon: "create_a_sibling"}
      }
    });
  }

  $.agorae = $.agorae || {};
  $.extend($.agorae, {
    interact: new Interact(),
    ui: new UI()
  });
});