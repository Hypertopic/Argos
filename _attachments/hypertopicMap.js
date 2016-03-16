HypertopicMap = function() {
  return {

    service: location.href.split(/(user|item|viewpoint)/)[0],

    /**
     * @param id      Viewpoint or corpus identifier.
     * @param user    Login to register.
     * @param success Function to be called on success.
     */
    register: function(parameters) {
      parameters.modify = function(o) {
        o.users = o.users || [];
        o.users.push(parameters.user);
      };
      this.update(parameters);
    },

    /**
     * @param id      Hypertopic object identifier.
     * @param modify  Function to be called to transform data.
     * @param success Function to be called on success.
     */
    update: function(parameters) {
      var url = this.service + parameters.id;
      $.getJSON(url, function(o) {
        parameters.modify(o);
        $.ajax({
          type: 'PUT',
          url: url,
          contentType: 'application/json',
          data: JSON.stringify(o),
          success: parameters.success
        });
      });
    }

  };
}
