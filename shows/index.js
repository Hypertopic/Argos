function(doc, req) {
  if('Accept' in req.headers && req.headers['Accept'].indexOf('json') > 0) {
    return {
      body : JSON.stringify({
        service: 'Argos', 
        revision: '3.12.07.09',
        update_seq: req.info.update_seq
      }), headers : { 
        'Content-Type': 'application/json',
      }
    }
  } else {
    return {
        body : '<html><body><h3>Welcome to Argos!</h3></body></html>',
        headers : { 
          'Content-Type' : 'text/html',
        }
    }
  }
  
}
