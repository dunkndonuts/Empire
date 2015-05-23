/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function (creep) {
	if(creep.energy < creep.energyCapacity) {
	    //var nearestActiveSource = null;
	    //console.log(creep.memory.source);
	    var nearestActiveSource = null;
	    if(creep.memory.source !== undefined) {
	        //creep.say('(' + creep.memory.source.x + ',' + creep.memory.source.y + ')');
	        var nearestActiveSources = creep.room.find(FIND_SOURCES_ACTIVE, {
	            filter: function(object) {
	                return (object.pos.x === creep.memory.source.x && object.pos.y === creep.memory.source.y);
	            }    
	        });
	        if(nearestActiveSources.length > 0) nearestActiveSource = nearestActiveSources[0];
	    }
		if(nearestActiveSource == null) nearestActiveSource = creep.pos.findClosest(FIND_SOURCES_ACTIVE);
		if(nearestActiveSource){
		    //creep.say('Harvesting');
    		creep.moveTo(nearestActiveSource);
    		creep.harvest(nearestActiveSource);
		}
	}
	else {
	    var nearestTarget = creep.pos.findClosest(FIND_MY_STRUCTURES,{
		    filter: function(object) {
		        return (object.structureType == 'extension') && object.energy < object.energyCapacity;
		    }
	    });
		if(!nearestTarget) nearestTarget = creep.pos.findClosest(FIND_MY_SPAWNS, {
		    filter: function(object) {
		        return object.energy < object.energyCapacity;
		    }
		});
		if(nearestTarget) {
    		creep.moveTo(nearestTarget);
    		creep.transferEnergy(nearestTarget)
		} else {
		    nearestTarget = creep.pos.findClosest(FIND_FLAGS, {
                filter: function(object) {
                    return object.name === 'harvest';
                }
            });
    		if(nearestTarget) {
    			creep.moveTo(nearestFlag);
    		}
		}
	}
 }