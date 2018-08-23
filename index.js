const express = require('express');
const path = require('path');

const getGif = require('./server/giphy');
const { getMessage, setTimezone } = require('./server/message');

const PORT = process.env.PORT || 5000;

setTimezone();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
  	getGif().then(
		(gif) => res.render('pages/index', {message: getMessage(new Date()), gif}),
		(message) => {
			console.log(message);
			return res.render('pages/index', {message: getMessage(new Date())})
		}
	);
  			
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));