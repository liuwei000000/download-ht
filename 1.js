const Fse = require('fs-extra');
const RequestAsync = require('then-request');


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
		if (url.indexOf('http') != 0) continue;
		url = url.split('?')[0]
		try {
			let ap = url.split('www.hightopo.com');
			if (ap.length != 2) continue;
			let path = decodeURIComponent(ap[1]);
			let exf = getexf(url);

			if (!exf || exf.length > 6) continue;
			console.log(url);
			// // if (exf == 'obj') {
			// // 	objs.push('.' + path);
			// // } else 
			{
				let r = await RequestAsync('GET', url);
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