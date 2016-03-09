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
    var self = this;
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

    self.addChild = function(e) {
      var selectedTopics = self.getSelectedTopics();
      if(selectedTopics.length === 0) {
        alert('No topic selected');
        return;
      } 

      if(selectedTopics.length > 1){
        alert('Too many topics selected');
        return;
      }

      var $topic = $(selectedTopics[0]);
      $.agorae.topic.addChildTo($topic);
    };

    self.addSibling = function(e) {
      var selectedTopics = self.getSelectedTopics();
      if(selectedTopics.length === 0) {
        alert('No topic selected');
        return;
      } 

      if(selectedTopics.length > 1){
        alert('Too many topics selected');
        return;
      }

      var $topic = $(selectedTopics[0]);
      $.agorae.topic.addSiblingTo($topic);
    };
  }

  function Topic() {
    var self = this;
    var template = '' + 
      '<li class="topic{{bound}}" id="{{id}}">' + 
        '<a>' +
          '<i class="{{children_indicator}}toggle-visibility"></i>' +
        '</a>' +
        '<input type="checkbox">' +
        '<span class="name">{{name}}</span>' +
        '<ul></ul>';

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
     * Add a topic (see template) as a child of another template. 
     * TODO: save
     * 
     * @param {Object} $topic Parent of the added topic.
     */
    self.addChildTo = function($topic) {
      if(!($topic instanceof jQuery)) {
        throw new TypeError('$topic must be an instanceof a jQuery element');
      }      

      $.agorae.createTopic(document.URL, 'untitled', function(topic) {
        var $child = $(template
          .replace('{{name}}', topic.name)
          .replace('{{id}}', topic.id)
          .replace('{{children_indicator}}', 'bullet')
          .replace('{{bound}}', '')).clone();

        $.agorae.moveTopic(document.URL, topic.id, $topic.attr('id'), function() {
          var $childrenList = $topic.find('> ul');
          $childrenList.append($child);

          self.checkTopic($topic, false);
          $child.find('.name').trigger('dblclick');
        });
      });
    };

    /**
     * Add a topic (see template) after another topic.
     * TODO: save
     * 
     * @param {Object} $topic Brother of the added topic.
     */
    self.addSiblingTo = function ($topic) {
      if(!($topic instanceof jQuery)) {
        throw new TypeError('$topic must be an instanceof a jQuery element');
      }

      $.agorae.createTopic(document.URL, 'untitled', function(topic) {
        // Clone the template to avoid referencing an already used reference.
        var $sibling = $(template
          .replace('{{name}}', topic.name)
          .replace('{{id}}', topic.id)
          .replace('{{children_indicator}}', 'bullet')
          .replace('{{bound}}', '')).clone();
        
        var $parent = $topic.parent().parent();

        $.agorae.moveTopic(document.URL, topic.id, $parent.attr('id'), function() {
          $topic.after($sibling);

          self.checkTopic($topic, false);
          $sibling.find('.name').trigger('dblclick');
        });
          
      });
    };
  }

  $.agorae = $.agorae || {};
  $.extend($.agorae, {
    interact: new Interact(),
    topic: new Topic(),
    ui: new UI()
  });
});