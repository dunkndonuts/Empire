/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('runner'); // -> 'a thing'
 */
module.exports = function (creep) {
    if(creep.memory.state === undefined) creep.memory.state = 0;
    if(creep.memory.energySource == undefined) creep.memory.energySource = {x: 0, y: 0};
    if(creep.energy < creep.energyCapacity) {
        if(creep.memory.energySource.x == 0) {
            var nearestEnergy = creep.pos.findClosest(FIND_DROPPED_ENERGY);
            if(nearestEnergy) {
                creep.memory.energySource.x = nearestEnergy.pos.x;
                creep.memory.energySource.y = nearestEnergy.pos.y;
            }
        }
        if(creep.memory.energySource.x > 0) {
            if(creep.pos.isNearTo(creep.memory.energySource.x, creep.memory.energySource.y)) {
                var nearestEnergy = creep.pos.findClosest(FIND_DROPPED_ENERGY);
                if(nearestEnergy) {
                    creep.memory.energySource.x = nearestEnergy.pos.x;
                    creep.memory.energySource.y = nearestEnergy.pos.y;
                    if(creep.pos.isNearTo(nearestEnergy)) {
                        creep.memory.state = 10;// Picking up energy
                        creep.pickup(nearestEnergy);
                    } else {
                        creep.memory.state = 21;// Moving to Dropped Energy
                        if(creep.fatigue == 0) {
                            creep.moveTo(nearestEnergy);
                        }
                        
                    }
                }
            } else {
                creep.memory.state = 23;// Moving to energy source
                if(creep.fatigue == 0) {
                    creep.moveTo(creep.memory.energySource.x, creep.memory.energySource.y);
                }
                
            }
        } else {
            creep.memory.state = 1;//No energy...
        }
    } else {
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
        if(creep.memory.order == 0 && nearestTarget) {
            console.log(creep.memory.order);
            if(creep.pos.isNearTo(nearestTarget)) {
                creep.memory.state = 12;//transfering energy to Spawn or Extension
                creep.transferEnergy(nearestTarget)
            } else {
                if(creep.fatigue == 0) {
                    creep.memory.state = 23;//moving to Spawn or Extension
                    creep.moveTo(nearestTarget);
                }
            }
        }
        else {
            if(creep.memory.target == undefined) creep.memory.target = {x: 0, y: 0};
            if(creep.memory.target.x == 0) {
                //look for an idle builder....
                var idleBuilders = creep.room.controller.pos.findInRange(FIND_MY_CREEPS,2,{
                   filter: function(object) {
                       return (object.memory.role == 'bld' && object.memory.state == 1);
                   } 
                });
                if(idleBuilders.length > 0 ) {
                    creep.memory.target.x = idleBuilders[0].pos.x;
                    creep.memory.target.y = idleBuilders[0].pos.y;
                }
            }
            if(creep.memory.target.x > 0) {
                if(creep.pos.isNearTo(creep.memory.target.x,creep.memory.target.y)) {
                    creep.memory.state = 11;// Dropping energy
                    creep.dropEnergy(creep.energy);
                } else {
                    creep.memory.state = 22;// Moving to target
                    if(creep.fatigue == 0) {
                        creep.moveTo(creep.memory.target.x, creep.memory.target.y);
                    }
                    
                }
            } else {
                creep.memory.state = 0; //Idle
            }
        }
    }
    creep.say(creep.memory.role + creep.memory.order +':' + creep.memory.state);
}