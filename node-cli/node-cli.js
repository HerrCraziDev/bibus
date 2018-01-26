const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Bibus = require('./bibus.js').Bibus;

var args = {
	url: 'https://applications002.brest-metropole.fr/WIPOD01/Transport/REST/',
	format: 'json',
	lines: [],
	stops: [],
	loop: false,
	delay: 1000
};


//Command line arguments parsing
for (var arg=2 ; arg < process.argv.length ; arg++)
{
	switch (process.argv[arg]) {
		case '-u':
		case '--url':
			arg++;
			args.url = process.argv[arg];
			break;

		case '-l':
		case '--lines':
			arg++;
			args.lines = process.argv[arg].split(',');
			break;

		case '-s':
		case '--stops':
			arg++;
			args.stops = process.argv[arg].split(',');
			break;

		case '-L':
		case '--loop':
			args.loop = true;
			break;

		case '-d':
		case '--delay':
			args.delay = parseInt(process.argv[arg]);
			break;

		default:
		if ( process.argv[arg].substring(0,1) === '-' )
		{
			console.log("Usage : node node-cli.js [-L] [-u <url>] [-l <lines>] [-s <stops>], [-d <delay>]\n\t-L, --loop\t: Continue refreshing schedules forever\n\t-l, --lines <lines>\t: A comma-separated list of bus line numbers to check. Also works with letters (Tramway, telepheric).\n\t-s, --stops <stops>\t: A comma-separated list of stop names where to check the time schedule for the specified line(s). You must replace any space by an underscore. Names aren't case-sensitive. If none of these stops are on any of the lines, and error will be thrown.\n\t-d, --delay <time> : The delay, in milliseconds, between two refreshes. Default : 1000 (1s).\n\n$PROJECTNAME - Club Elec ISEN BREST");
			arg = process.argv.length +1;
		}
	}
}

//plez remov
console.log(args);


var bibus = new Bibus(args.url, args.format);

//Test
bibus.getVersion( (res) => {
	console.log('Version : ' + res.json['Number']);
});


//todo : everything
