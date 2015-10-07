var request = require('request');
var htmlparser = require("htmlparser");

request('http://www.elvinali.co.uk', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    
  	var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error)
        // [...do something for errors...]
    	console.log('error');
    else
        // [...parsing done, do something...]
    	console.log('success');
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(body);
// sys.puts(sys.inspect(handler.dom, false, null));
console.log(JSON.stringify(handler.dom,undefined,4));


  }
})


