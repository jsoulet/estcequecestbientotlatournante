const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
process.env.TZ = 'Europe/Paris';

const getTokenize = require("date-from-timezone/get-tokenize");
const parisTokenize = getTokenize('Europe/Paris');
const today = parisTokenize(new Date());

const getMessage = (today) => {
  	const hours = today.getHours();
  	const minutes = today.getMinutes();
  	const day = today.getDay();
  	
  	if([0, 6].indexOf(day) >= 0) {
  		return 'Pas le weekend voyons...';
  	}

  	if((hours >= 12 && hours < 14) || hours >= 18) {
  		return `OUI \o/`;
  	}

  	if(hours === 17  && minutes >= 0 && minutes <= 15 ) {
  		return 'C\'est la tournante de 5h !' ;
  	}

  	if((hours === 11 || hours === 17 ) && minutes >= 45) {
  		return 'Bientôt...';
  	}

  	return 'Non.';
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
  	return res.render('pages/index', {message: getMessage(new Date())})
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));