/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('miner'); // -> 'a thing'
 */
module.exports = function (creep) {
    if(creep.memory.state === undefined) creep.memory.state = 0;
    var nearestActiveSource = null;
    if(creep.memory.source !== undefined) {
        var nearestActiveSources = creep.room.find(FIND_SOURCES_ACTIVE, {
            filter: function(object) {
                return (object.pos.x === creep.memory.source.x && object.pos.y === creep.memory.source.y);
            }    
        });
        if(nearestActiveSources.length > 0) nearestActiveSource = nearestActiveSources[0];
    } else {
        creep.memory.source = {x: 0, y: 0};
    }
	if(nearestActiveSource == null) nearestActiveSource = creep.pos.findClosest(FIND_SOURCES_ACTIVE);
	if(nearestActiveSource){
	    if(creep.memory.source.x == 0) {
    	    creep.memory.source.x = nearestActiveSource.pos.x;
    	    creep.memory.source.y = nearestActiveSource.pos.y;
	    }
	    if(creep.pos.isNearTo(nearestActiveSource)) {
    	    creep.memory.state = 10;
    		creep.harvest(nearestActiveSource);
	    } else {
	        creep.memory.state = 20;
    	    if(creep.fatigue == 0) {
    	        creep.moveTo(nearestActiveSource);
    	    }
	        
	    }
	} else {
	    creep.memory.state = 0;
	}
    creep.say(creep.memory.role +':' + creep.memory.state);
}