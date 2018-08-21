const connect = require('connect');
const serveStatic = require('serve-static');
const port =  process.env.PORT || 8080;

connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log(`Server running on ${port}...`);
});

