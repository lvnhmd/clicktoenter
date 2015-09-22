var jsdom = require('jsdom');

jsdom.defaultDocumentFeatures = { 
  FetchExternalResources   : ['script'],
  ProcessExternalResources : ['script'],
  MutationEvents           : '2.0',
  QuerySelector            : false
};

var htmlDoc = '<html lang="en-US">' +
'head>' +
    '<title>Test document</title>' +
    '<script>' +
        'var testVar = true;' +
    '</script>' +
    '<script src=\'http://code.jquery.com/jquery-latest.js\'></script>' +
    '<script>' +
    '</script>' +
'</head>' +
'<body id="mainPage">' +
'</body>' +
'</html>';

var document = jsdom.jsdom(htmlDoc);

var window = document.defaultView;

var elementsArray = window.document.getElementsByTagName('script');

console.log(elementsArray.length);
console.log(window.testVar);
window.addEventListener('load', function () {
    console.log(typeof window.$ == 'function' ,typeof window.$ );
    window.close();
});