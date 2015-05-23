/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('repair'); // -> 'a thing'
 */
   module.exports = function (creep) {
    var nearestActiveSpawn = creep.pos.findClosest(FIND_MY_SPAWNS);
    var fillSpawn = false;
    if(nearestActiveSpawn) { 
        fillSpawn = (nearestActiveSpawn.energy <= (nearestActiveSpawn.energyCapacity/6));
    }
    if(creep.memory.state === undefined) creep.memory.state = 0;
	if(creep.energy != creep.energyCapacity && (creep.energy == 0 || creep.memory.state < 0)) {
	    creep.say('Juice?');
	    creep.memory.state = -1; //getting juice.

        if(nearestActiveSpawn && !fillSpawn) {
    		creep.moveTo(nearestActiveSpawn);
    		nearestActiveSpawn.transferEnergy(creep, creep.energyCapacity - creep.energy);
		} else {
    		creep.say('Spawn Empty');
		    nearestActiveSource = creep.pos.findClosest(FIND_SOURCES_ACTIVE);
	    	if(nearestActiveSource){
        		creep.moveTo(nearestActiveSource);
        		creep.harvest(nearestActiveSource);
		    }
		}
	}
	else if (fillSpawn && creep.energy == creep.energyCapacity) {
		creep.say('Filling Spawn');
		creep.moveTo(nearestActiveSpawn);
	    creep.transferEnergy(nearestActiveSpawn, creep.energy);
	} else {
	    var nearestRepairSite = creep.pos.findClosest(FIND_STRUCTURES, {
	        filter: function(object) {
	            return (object.structureType == 'road' || object.structureType == 'wall') && (object.hits < creep.energyCapacity);
	        }
	    });
	    if(!nearestRepairSite) {
    	    nearestRepairSite = creep.pos.findClosest(FIND_STRUCTURES, {
    	        filter: function(object) {
    	            return (object.structureType == 'road' || object.structureType == 'wall') && (object.hits < object.hitsMax - creep.energyCapacity);
    	        }
    	    });
    	    if(!nearestRepairSite) {
        	    nearestRepairSite = creep.pos.findClosest(FIND_MY_STRUCTURES, {
        	        filter: function(object) {
        	            return (object.hits < object.hitsMax - creep.energyCapacity);
        	        }
        	    });
    	    }
	    }
	    if(nearestRepairSite) {
	        creep.memory.state = 1; //repairing
    		creep.moveTo(nearestRepairSite);
    		creep.repair(nearestRepairSite);
    	} else {
    		var nearestConstructionSite = creep.pos.findClosest(FIND_CONSTRUCTION_SITES);
    		if(nearestConstructionSite) {
    		    creep.say('building');
    	        creep.memory.state = 2; //building
    			creep.moveTo(nearestConstructionSite);
    			creep.build(nearestConstructionSite);
    		} else {
    		    creep.say('idle');
        	    creep.memory.state = 0; //idle.
    		    var nearestFlag = creep.pos.findClosest(FIND_FLAGS, {
                        filter: function(object) {
                            return object.name === 'builders';
                        }
                    });
        		if(nearestFlag) {
        			creep.moveTo(nearestFlag);
        		}
    		}
    	}
    }
    //creep.say(creep.memory.role +':' + creep.memory.state);
 }