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
					var formatted = DateHelper.formatLocal(gmt, "dd.MM.yyyy hh:mm:ss");
					res.view({ temp: samples[0].value.toFixed(1), time: formatted });
				}
			}
		});
	},

	subscribe: function (req, res) {
		Sample.subscribe(req.socket);
		//send initial graph data - last 300 samples = latest 150 minutes
		Sample.find().limit(300).sort('createdAt DESC').done(function(err, samples) {

			// Error handling
			if (err) {
				return console.log(err);
			} else {
				var vals = new Array();
				for (var i = samples.length - 1; i >= 0 ; i--) {
					vals.push(samples[i].value);
				}
				req.socket.emit('graphdata', {values: vals});
				res.send();
			}
		});
	}
 
};
