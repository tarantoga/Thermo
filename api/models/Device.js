/**
 * Device
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	attributes: {
		name: {
			type: 'string',
			required: true,
			len: 2
		},
		batt_level: {
			type: 'float',
			required: true
		},
 		toJSON: function() {
      		var obj = this.toObject();
       		obj.createdAt = DateHelper.formatDate(obj.createdAt, "dd.MM.yyyy hh:mm:ss");
      		obj.updatedAt = DateHelper.formatDate(obj.updatedAt, "dd.MM.yyyy hh:mm:ss");
      		return obj;
    	}
	}
};
