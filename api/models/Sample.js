/**
 * Sample
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

 	attributes: {
		device: {
			type: 'string',
			required: true,
			len: 2
		},
		value: {
			type: 'float',
			required: true
 		}
	}
};
