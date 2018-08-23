const {get} = require('http');
const url = require('url');
const {random} = require('lodash');

const GIPHY_URL = {
	hostname: 'api.giphy.com',
	pathname: '/v1/gifs/search',
};

const getGif = () => new Promise((resolve, reject) => {
	const GIPHY_API_KEY = process.env.GIPHY_API_KEY || 'aRaI0OP6k4eIT4nMeeJC16kBGujAkCI1';
	if(!GIPHY_API_KEY) {
		reject('Error: No GIPHY_API_KEY');
	}

	const giphyUrl = url.format({
		...GIPHY_URL,
		protocol: 'http',
		query: {
			api_key: GIPHY_API_KEY,
			q: 'pingpong',
			limit: 1,
			offset: random(0, 30),
		}
	});
	
	get(giphyUrl, (res) => {
		if(res.statusCode !== 200) {
			res.resume();
			return reject('Error: Giphy API call');
		}

		let rawData = '';
  		res.on('data', (chunk) => { rawData += chunk; });
		res.on('end', () => {
			let parsedResponse;
			try {
				parsedResponse = JSON.parse(rawData);
			} catch(e) {
				return reject('Error: JSON.parse error');
			}
			return resolve(parsedResponse.data[0].images.fixed_width.url)
		})
	})
})

module.exports = getGif;