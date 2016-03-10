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

    var self = this;
    self.createEditor = function(e) {
      e.stopPropagation();
      e.preventDefault();
      var $this = $(this);
      var $topic = $this.parent();
      $.agorae.config.editingName = $this.html();

      if(!$.agorae.config.isEditing) {
        $.agorae.config.isEditing = true;
        $.agorae.config.renamingIsCancelled = false;
    
        $this.html('<input class="name-editor" type="text" value="' + $this.html() + '"/>');
        $('.name-editor').focus();
      }
    };

    /* ---- KEYBOARD BINDINGS ---- */

    Mousetrap.stopCallback = function () {
         return false;
    };

    Mousetrap.bind('enter', function(e) {
      if($.agorae.config.isEditing) {
        $(':focus').trigger('blur');
      }
    });

    Mousetrap.bind('escape', function(e) {
      if($.agorae.config.isEditing) {
        $.agorae.config.renamingIsCancelled = true;
        $(':focus').trigger('blur');
      }
    });

    Mousetrap.bind('shift+enter', function(e) {
      if($.agorae.config.isEditing) {
        $(':focus').trigger('blur');
      }
    });

    Mousetrap.bind('tab', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if($.agorae.config.isEditing) {
        $(':focus').trigger('blur');
      }
    });

    Mousetrap.bind('shift+tab', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if($.agorae.config.isEditing) {
        $(':focus').trigger('blur');
      }
    });

    // ---- MOUSE BINDINGS ---- //
    
    // Create topic name ditor
    $(document).on('dblclick', '.topic .name', self.createEditor);

    // Rename a topic
    $(document).on('blur', '.name-editor', function() {
      $.agorae.topic.rename($(this).closest('.topic'), $(this).val());
    });

  }

  function Topic() {
    var self = this;

    /**
     * Rename a topic. In case the editing is cancelled, do not update the topic.
     * @param  {Object} $topic  Topic to rename
     * @param  {String} newName Name to set
     * @return {Object}         Updated topic.
     */
    self.rename = function($topic, name) {
      var $nameField = $topic.find('> .name');
      $.agorae.config.isEditing = false;  
      if($.agorae.config.renamingIsCancelled) {
        $nameField.html($.agorae.config.editingName);
      } else {
        $.agorae.renameTopic(document.URL, $topic.attr('id'), name, function() {
          $nameField.html(name);
        });
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