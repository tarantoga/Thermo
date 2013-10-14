/**
 * SampleController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
  
	last: function (req, res) {
		Sample.find({ device: 'AA' }).limit(1).sort('createdAt DESC').done(function(err, samples) {
			if (err) {
				return console.log(err);
			} else {
				if (samples.length == 0) {
					res.view({ temp: '--.--' });
				}else{
					var gmt = samples[0].createdAt;
					//var local = new Date(gmt.getTime() - (gmt.getTimezoneOffset() * 60000));
					//console.log(localDate.toString());
					var formatted = DateHelper.formatLocal(gmt, "dd.MM.yyyy hh:mm:ss");
					console.log(formatted);
					res.view({ temp: samples[0].value.toFixed(1), time: formatted });
				}
			}
		});
	},

	subscribe: function (req, res) {
		Sample.subscribe(req.socket);
		res.send();
	}
 
};
