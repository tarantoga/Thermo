/**
 * DeviceController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	set: function (req, res) {
		Device.update({	name: req.param('name') },
		{ batt_level: req.param('batt')	}, 
		function(err, devs) {
			if (err) {
		    	return console.log(err);
		  	} else {
				if (devs.length == 0) {
					// no device found, create new			
					Device.create({	name: req.param('name'),
									batt_level: req.param('batt')
					}).done( function(err, dev) {
					  	if (err) {
				    		return console.log(err);
				  		}else {
				  			res.send(dev);
				  		}
					});
				}else{
					// device found and updated
					res.send(devs[0]);
				}
		  	}
		});
	}
  

};
