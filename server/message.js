exports.setTimezone = () => process.env.TZ = 'Europe/Paris';

exports.getMessage = (today) => {
  	const hours = today.getHours();
  	const minutes = today.getMinutes();
  	const day = today.getDay();
  	
  	if([0, 6].indexOf(day) >= 0) {
  		return 'Pas le weekend voyons...';
  	}

  	if((hours >= 12 && hours < 14) || hours >= 18) {
  		return `OUI \\o/`;
  	}

  	if(hours === 17  && minutes >= 0 && minutes <= 15 ) {
  		return 'C\'est la tournante de 5h !' ;
  	}

  	if((hours === 11 || hours === 17 ) && minutes >= 45) {
  		return 'Bientôt...';
  	}

  	return 'Non.';
}

