/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('explorer'); // -> 'a thing'
 */
   module.exports = function (creepObj) {

	if(creep.energy == 0) {
		var nearestActiveSource = creepObj.pos.findClosest(FIND_MY_SPAWNS);
		if(nearestActiveSource){
    		creepObj.moveTo(nearestActiveSource);
    		nearestActiveSource.transferEnergy(creepObj, creepObj.maxEnergy - creepObj.energy);
		}
	}
	else {
	    var nearestFlag = creepObj.pos.findClosest(FIND_FLAGS, {
                filter: function(object) {
                    return object.name === 'explore';
                }
            });
		if(nearestFlag) {
			creepObj.moveTo(nearestFlag);
			//creep.attack(nearestFlag);
		}
	}
 }