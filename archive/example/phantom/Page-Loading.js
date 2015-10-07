var page = require('webpage').create();
page.open('http://www.elvinali.co.uk', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('elvin.png');
  }
  phantom.exit();
});
