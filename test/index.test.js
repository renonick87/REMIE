let expect = require('chai').expect,
	//remie = require('../examples/better-example.js'),
	RichError = require('../libs/RichError.js'),
	REMIE = require('../libs/index.js'),
	remie = new REMIE();
	exRemie = remie.create('Something went wrong', {});

/*try {
	let exRemie = RichError.create("Something went wrong", {});
} catch (e) {
	console.log('error caught')
	console.log(e)
}*/

describe('Rich-Error', function(){
	it('REMIE is not null or undefined', function(){
		expect(exRemie).to.exist;
	});
});

describe('Rich-Error', function(){
	it('REMIE is an instance of Rich Error', function(){
		expect(exRemie).to.be.an.instanceof(RichError);
	});
});

//console.error(exRemie)