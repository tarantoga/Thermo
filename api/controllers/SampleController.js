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

	initialize: function (req, res) {
		Sample.subscribe(req.socket);
		//send initial graph data - last 1200 samples = last 10 hours
		Sample.find().limit(1200).sort('createdAt DESC').done(function(err, samples) {

			// Error handling
			if (err) {
				return console.log(err);
			} else {
				//create values array for simplify-js
				var curTime = new Date().getTime();
				var vals = new Array();
				for (var i = samples.length - 1; i >= 0 ; i--) {
					var sampleTime = samples[i].createdAt.getTime();
					var diffTime = Math.round((sampleTime - curTime) / 1000);	//this is our x (time)
					vals.push({"x":diffTime, "y":samples[i].value});
				}
				//simplify graph
				var simplified = Simplify(vals, 0.5);

				var arrx = new Array();
				var arry = new Array();
				for (var i = 0; i < simplified.length; i++) {
					arrx.push(simplified[i].x);
					arry.push(simplified[i].y);
				}
				//format chart data so it gets into 320 * 60 pixels
				var minX = Math.min.apply(Math, arrx);
				var maxX = Math.max.apply(Math, arrx);
				var minY = Math.min.apply(Math, arry);
				var maxY = Math.max.apply(Math, arry);

				var cX = 320 / (maxX - minX);	//constant value is width of graph
				var x0 = maxX;
				var cY = 60 / (maxY - minY);	//constant value is height of graph
				var y0 = minY;

				arrx = arrx.map(function(x){return 320 + (x - x0) * cX;});
				arry = arry.map(function(y){return 60 - (y - y0) * cY;});

				req.socket.emit('graphdata', {"xs": arrx, "ys": arry, 
					"min": minY.toFixed(1), "max": maxY.toFixed(1),
					"tmin": DateHelper.formatLocal(samples[samples.length - 1].createdAt, "hh:mm"), 
					"tmax": DateHelper.formatLocal(samples[0].createdAt, "hh:mm")});
				res.send();
			}
		});
	}
};
