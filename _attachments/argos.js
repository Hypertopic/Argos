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

    self.getSelectedTopics = function() {
      return $('.topic').filter(function() {
          return $(this).find('> input[type="checkbox"]').is(':checked');
      }).toArray();
    };

    self.checkAllTopics = function(value) {
      $('.topic').each(function() {
        $.agorae.topic.checkTopic($(this), value);
      });
    };

    self.checkAll = function() {
      self.checkAllTopics(true);
    };

    self.uncheckAll = function() {
      self.checkAllTopics(false);
    };

    self.deleteSelectedTopics = function() {
      $('.topic').find(':checked').each(function() {
        $.agorae.topic.delete($(this).parent());
      });
    };

    // ---- MOUSE BINDINGS ---- //

    // Toggle topic visibility
    $(document).on('click', '.topic .toggle-visibility', function(e) {
      $.agorae.topic.toggleVisibility($(this).closest('.topic'));
    });

    // Select all
    $(document).on('click', '.select-all', self.checkAll);
    
    // Deselect all
    $(document).on('click', '.deselect-all', self.uncheckAll);
    
    // Toggle a topic
    $(document).on('click', '.topic .name', function(e) {
      $.agorae.topic.checkTopic($(this).closest('.topic'));
    });

  }

  function Topic() {
    var self = this;

    /**
     * Hide or show the visibility of a topic.
     * It won't affect a topic without children.
     * @param  {Object} $topic Topic to hide or show.
     * @return {Object} Manipulated topic.
     */
    self.toggleVisibility = function($topic) {
      var $toggler = $topic.find('> a .toggle-visibility');

      if(!$toggler.hasClass('bullet')) {
        $topic.children('ul').toggle(0, function() {
          var isExpanded = $toggler.hasClass('arrow-down');
          
          $toggler
            .removeClass('arrow-'+(isExpanded?'down':'right'))
            .addClass('arrow-'+(isExpanded?'right':'down'));
        }); 
      }

      return $topic;
    };

    /**
     * Reverse the checkbox of a specific topic (check to uncheck, uncheck to check).
     * @param  {Object} $topic Chosen topic to check/uncheck.
     * @param  {Boolean} value Value to force (true|false).
     * @return {Object} The selected topic.
     */
    self.checkTopic = function($topic, value) {
      var $checkbox = $topic.find('> input[type="checkbox"]');
      if(!$.agorae.config.isEditing){
        $checkbox.prop('checked', value !== undefined ? value : !$checkbox.prop('checked'));
      }

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