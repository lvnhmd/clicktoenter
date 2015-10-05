var jsdom = require('jsdom');

jsdom.defaultDocumentFeatures = {
  FetchExternalResources: ['script','link'],
  ProcessExternalResources: ['script'],
  MutationEvents: '2.0',
  QuerySelector: false
};

var request = require('request');
request('http://www.stylist.co.uk/win', function(error, response, body) {
  if (!error && response.statusCode == 200) {

    var htmlDoc = body;

    var document = jsdom.jsdom(htmlDoc);

    var window = document.defaultView;

    var elementsArray = window.document.getElementsByTagName('a');

    console.log(elementsArray.length);
    // console.log(window.testVar);
    window.addEventListener('load', function() {
      // console.log(typeof window.$ == 'function', typeof window.$);
      // console.log(elementsArray);
      window.close();
    });

  }
})



// var htmlDoc = '<html lang="en-US">' +
// 'head>' +
//     '<title>Test document</title>' +
//     '<script>' +
//         'var testVar = true;' +
//     '</script>' +
//     '<script src=\'http://code.jquery.com/jquery-latest.js\'></script>' +
//     '<script>' +
//     '</script>' +
// '</head>' +
// '<body id="mainPage">' +
// '</body>' +
// '</html>';

// var document = jsdom.jsdom(htmlDoc);

// var window = document.defaultView;

// var elementsArray = window.document.getElementsByTagName('script');

// console.log(elementsArray.length);
// console.log(window.testVar);
// window.addEventListener('load', function () {
//     console.log(typeof window.$ == 'function' ,typeof window.$ );
//     window.close();
// });