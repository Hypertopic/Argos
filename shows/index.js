function(doc, req) {
  var revision = '0.8'; //Current version
  if('Accept' in req.headers && req.headers['Accept'].indexOf('json') > 0) {
    return {
        body : JSON.stringify({'service':'Argos', 'revision': revision}),
        headers : { 
          "Content-Type" : "application/json",
        }
    }
  }
  else {
    return {
        body : '<html><body><h3>Welcome to Argos!</h3><p>version ' + revision + '.</p></body></html>',
        headers : { 
          "Content-Type" : "text/html",
        }
    }
  }
  
}