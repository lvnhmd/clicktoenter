module.exports.index = {
    description: 'Show the main page for our welcome page',
    handler: function (request, reply) {

        reply.view('index');
    }
};