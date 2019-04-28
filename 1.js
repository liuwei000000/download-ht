const Fse = require('fs-extra');
const RequestAsync = require('then-request');
var https = require('https');
var fs = require('fs');

const HOST = 'https://www.blend4web.com';

let f = Fse.readFileSync('1.txt');

let flist = f.toString().split('\r\n');

function getexf(f) {
	let exf = f.split('.');
	if (exf.length < 1) return null
	return exf[exf.length - 1];
}

async function do_download(fl) {
	let objs = [];
	for (let i = 0; i < fl.length; i++) {
		let url = fl[i];
		url = url.replace(/\?.*$/g, '');
		if (url.indexOf(HOST) != 0) continue;
		try {
			let ap = url.split(HOST);
			if (ap.length != 2) continue;
			let path = decodeURIComponent(ap[1]);
			path = path.replace(/\?.*$/g, '');
			let exf = getexf(url);

			if (!exf || exf.length > 6) continue;
			console.log(fl[i]);
			// // if (exf == 'obj') {
			// // 	objs.push('.' + path);
			// // } else 
			{
				let r = await RequestAsync('GET', fl[i]);
				Fse.outputFileSync('.' + path, r.getBody());
			}
		} catch (e) {
			console.error(e);
		}
	}
	console.log('=========== download done! ===============')
	// for (let i = 0; i < objs.length; i++) {
	// 	let obj = objs[i];
	// 	console.log(obj);
	// }

	//console.log('done!')
}

do_download(flist);


async function gethtts(url) {
	var options = {
		hostname: 'www.blend4web.com',	  
		path: '/assets/location_agriculture/sounds/lhstana_soundtrack_3_55.mp3?v=_b4w_ver_17_12_0_',	  
		rejectUnauthorized: false // 忽略安全警告	  
	  };
	  
	  var req = https.get(options, function(res){	  
		res.pipe(process.stdout);
	  });
	  
	  req.on('error', function(err){	  
		console.error(err.code);	  
	  });
}

//gethtts();