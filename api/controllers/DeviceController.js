/**
 * DeviceController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	set: function (req, res) {
		var devName = req.param('name');
		var battLev = req.param('batt');
		Device.findOneByName(devName).done(function(err, dev) {
			if (err) {
		    	return console.log(err);
		  	} else {
		  		if (dev){
					Device.update({	name: devName }, { batt_level: battLev }, function(err, devs) {
						if (err) {
					    	return console.log(err);
					  	} else {
							res.send(devs[0]);
						}
					});
		    	} else {
		    		Device.create({	name: devName, batt_level: battLev }).done( function(err, dev) {
					  	if (err) {
				    		return console.log(err);
				  		}else {
				  			res.send(dev);
				  		}
					});
		    	}
		  	}
		});
	}
};
