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

    self.deleteSelectedTopics = function() {
      $('.topic').find(':checked').each(function() {
        $.agorae.topic.delete($(this).parent());
      });
    };

    /* ---- KEYBOARD BINDINGS ---- */

    Mousetrap.stopCallback = function () {
         return false;
    };

    Mousetrap.bind('backspace', function(e) {
      if(!$.agorae.config.isEditing) {
        e.preventDefault();
        e.stopPropagation();
        self.deleteSelectedTopics();
      }
    });
  }

  function Topic() {
    var self = this;

    /**
     * Delete a topic both visually and in database.
     * @param  {Object} $topic Topic to delete
     * @return {Object} Deleted topic.
     */
    self.delete = function($topic) {
      console.log($.agorae.deleteTopic, $topic.attr);
      $.agorae.deleteTopic(document.URL, $topic.attr('id'), function() {
        var $parent = $topic.parent().parent();
        if($parent.is('.topic') && $parent.find('> ul').children().length === 1) {
          $parent.find('> a > i')
            .removeClass('arrow-down')
            .removeClass('arrow-right')
            .addClass('bullet');
        }
        $topic.remove();
      });

      return $topic;
    };
  }

  $.agorae = $.agorae || {};
  $.extend($.agorae, {
    interact: new Interact(),
    topic: new Topic(),
    ui: new UI()
  });
});