function(doc, req) {
  provides('json', function() {
    return {
      body: JSON.stringify({
        service: 'Argos', 
        revision: '3.14.08.28',
        update_seq: req.info.update_seq
      })
    }
  });
  provides('html', function() {
    return {
      body: '<html><body><h3>Welcome to Argos!</h3></body></html>',
    }
  });
}
