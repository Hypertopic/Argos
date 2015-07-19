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

    self.promoteSelectedTopics = function() {
      var selectedTopics = self.getSelectedTopics();
      if(selectedTopics.length > 0){
        selectedTopics.forEach(function(topic) {
          $.agorae.topic.makeParent($(topic));
        });
      }
    };

    self.demoteSelectedTopics = function() {
      var selectedTopics = self.getSelectedTopics();
      if(selectedTopics.length > 0) {
        selectedTopics.forEach(function(topic) {
          $.agorae.topic.makeChild($(topic));
        });
      }
    };

    /* ---- KEYBOARD BINDINGS ---- */

    Mousetrap.stopCallback = function () {
         return false;
    };

    Mousetrap.bind('tab', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if($.agorae.config.isEditing) {
        $(':focus').trigger('blur');
        // TODO: Make child or edit next topic?
      } else {
        self.demoteSelectedTopics();
      }
    });

    Mousetrap.bind('shift+tab', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if($.agorae.config.isEditing) {
        $(':focus').trigger('blur');
        // TODO: Make parent
      } else {
        self.promoteSelectedTopics();
      }
    });
  }

  function Topic() {
    var self = this;    

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

    /**
     * Move a topic one level higher. 
     * Do nothing if there is no parent.
     * TODO: save
     * 
     * @param  {Object} $topic Topic to promote.
     * @return {Object} Promoted topic.
     */
    self.makeParent = function($topic) {
      var $parent = $topic.parent().parent();
      var $grandParent = $parent.parent().parent();
      var $topicToPromote = $topic.clone();

      if($parent.is('.topic')){
        $parent.after($topicToPromote);
        $topic.remove();
        self.checkTopic($topicToPromote);

        var id = $topicToPromote.attr('id');
        var grandParentId = $grandParent.attr('id');

        $.agorae.moveTopic(document.URL, id, $grandParent.is('.topic') ? grandParentId : '', function() {
          if($parent.find('> ul').children().length === 0){
            $parent.find('> a > i')
              .removeClass('arrow-down')
              .removeClass('arrow-right')
              .addClass('bullet');
          }
        });
      }

      return $topic;
    };

    /**
     * Move a topic one level lower, make it child of his previous sibling.
     * Do nothing if there is no sibling.
     * TODO: Save
     * 
     * @param  {Object} $topic Topic to demote.
     * @return {Object} Demoted topic.
     */
    self.makeChild = function($topic) {
      var $topicToDemote = $topic.clone();
      var $previousSibling = $topic.prev();
      
      if($previousSibling.length > 0) {
        $previousSibling.find('> ul').append($topicToDemote);
        $topic.remove();
        self.checkTopic($topicToDemote);

        var id = $topicToDemote.attr('id');
        var siblingId = $previousSibling.attr('id');
        $.agorae.moveTopic(document.URL, id, siblingId, function() {
          if($previousSibling.find('> ul').children().length > 0){
            $previousSibling.find('> a > i')
              .addClass('arrow-down')
              .removeClass('arrow-right')
              .removeClass('bullet');
          }
        });
      }
    };
  }

  $.agorae = $.agorae || {};
  $.extend($.agorae, {
    interact: new Interact(),
    topic: new Topic(),
    ui: new UI()
  });
});