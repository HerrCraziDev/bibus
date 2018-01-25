const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bibuslib = require('./bibus.js');
const Bibus = bibuslib.Bibus;


var test = new Bibus('https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/', 'json');

test.getVersion( (res) => {
	console.log('Version : ' + res.json['Number']);
});
