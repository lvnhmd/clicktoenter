// var jsdom = require("jsdom");

// jsdom.env(
//     "<html><title>hello</title></html>",
//     // ["http://code.jquery.com/jquery.js"],
//     function(err, window) {
//         // console.log("there have been", window.$("a").length - 4, "io.js releases!");
//         // console.log(window.document);
//         // traverseDOMTree('tree.html', 'html', 3);

//         var childNodes = window.document.documentElement.childNodes;

//         for (var i = 0; i < childNodes.length; i++) {
//             console.log(childNodes[i]);
            
//             for (var j = 0; j < childNodes[i].childNodes.length; j++) {
//             	console.log('*************************');
//             	console.log(childNodes[i].childNodes[j]);
//             	console.log('*************************');
// 	        }
            
//             console.log('==========================================================');
//         }

//     }
// );


var jsdom = require("jsdom");

jsdom.env({
    url: "http://www.stylist.co.uk/win",
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function(err, window) {
        var $ = window.$;
        var i=0;
        $("a").each(function() {
            console.log(i++ , " ~", $(this).text(), " ~", $(this).attr("href"));
        });
    }
});
// var options = {
//     url: "http://www.stylist.co.uk/win",
//     scripts: ["http://code.jquery.com/jquery.js"],
//     done: function(err, window) {
//         var $ = window.$;
//         $("a").each(function() {
//             console.log(" ~", $(this).text(), " ~", $(this).attr("href"));
//         });
//     }
// };




// var jsdom = require("jsdom").jsdom;
// var doc = jsdom(markup, options);
// var window = doc.defaultView;