var page = require('webpage').create();
// page.onResourceRequested = function(request) {
//   // console.log('Request ' + JSON.stringify(request, undefined, 4));
// };
// page.onResourceReceived = function(response) {
  

//   if(response.url.indexOf("http://www.stylist.co.uk/api/widgets/win?ids=") > -1 ) {
//   	console.log('Receive ' + JSON.stringify(response));
//   		// , undefined, 4));
//   }


// };
page.onLoadFinished = function(status) { // Search result loaded
        console.log("new page loaded with status: " + status);
        phantom.exit();
    };

page.open('http://www.stylist.co.uk/win');
