/**
 * SampleController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  
  last: function (req, res) {
	console.log('last called...');
	Sample.find({
	  device: 'AA'
	//}).limit(1).sort('createdAt DESC').done(function(err, samples) {
	}).limit(1).sort('id DESC').done(function(err, samples) {
	  if (err) {
	  	return console.log(err);
	  } else {
		if (samples.length == 0) {
			res.view({ temp: '--.--' });
		}else{
			console.log('result id: ' + samples[0].id);
			console.log('result value: ' + samples[0].value);
			res.view({ temp: samples[0].value.toFixed(1) });
		}
	  }
	});
  }
 
  

};
