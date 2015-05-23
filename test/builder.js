/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
  module.exports = function (creep) {
    var nearestActiveSpawn = creep.pos.findClosest(FIND_MY_SPAWNS);
    var fillSpawn = false;
    if(nearestActiveSpawn) { 
        fillSpawn = (nearestActiveSpawn.energy <= (nearestActiveSpawn.energyCapacity/6));
    }
    if(creep.memory.state === undefined) creep.memory.state = 0;
    /*
    if(creep.energy != creep.energyCapacity && (creep.energy == 0 || creep.memory.state < 0)) {
        creep.memory.state = -1; //getting juice.
        if(nearestActiveSpawn && !fillSpawn) {
//            creep.say('Filling up');
            if(creep.pos.isNearTo(nearestActiveSpawn)) {
                creep.memory.state = 10;
                nearestActiveSpawn.transferEnergy(creep, creep.energyCapacity - creep.energy);
            } else {
                creep.memory.state = 21;
                if(creep.fatigue == 0) {
                    creep.moveTo(nearestActiveSpawn);
                }
                
            }
        } else {
            creep.say('Spawn Empty');
            nearestActiveSource = creep.pos.findClosest(FIND_SOURCES_ACTIVE);
            if(nearestActiveSource){
                if(creep.pos.isNearTo(nearestActiveSource)) {
                    creep.memory.state = 11;
                    nearestActiveSource.transferEnergy(creep, creep.energyCapacity - creep.energy);
                } else {
                    creep.memory.state = 22;
                    if(creep.fatigue == 0) {
                        creep.moveTo(nearestActiveSource);
                    }
                    
                }
            }
        }
    }
    else if (fillSpawn && creep.energy == creep.energyCapacity) {
        if(creep.pos.isNearTo(nearestActiveSpawn)) {
            creep.memory.state = 12;
            creep.transferEnergy(nearestActiveSpawn, creep.energy);
        } else {
            creep.memory.state = 23;//To fill Spawn
            if(creep.fatigue == 0) {
                creep.moveTo(nearestActiveSpawn);
            }
            
        }
    } else { */
        var nearestConstructionSite = creep.pos.findClosest(FIND_CONSTRUCTION_SITES);
        if(nearestConstructionSite) {
            if(creep.pos.isNearTo(nearestConstructionSite)) {
                creep.memory.state = 30;
                creep.build(nearestConstructionSite);
            } else {
                creep.memory.state = 24;//To ConstructionSite
                if(creep.fatigue == 0) {
                    creep.moveTo(nearestConstructionSite);
                }
                
            }
        } else {
            if(creep.room.controller) {
                creep.memory.state = 40; //upgrading.
                creep.moveTo(creep.room.controller);
                if(creep.pos.isNearTo(creep.room.controller)) {
                    if(!creep.room.controller.my) {
                        creep.memory.state = 40;//claiming controller
                        creep.claimController(creep.room.controller);
                    } else {
                        if(creep.energy > 0) {
                            creep.memory.state = 41;//upgrading controller
                            creep.upgradeController(creep.room.controller);
                        } else {
                            var nearestEnergy = creep.pos.findClosest(FIND_DROPPED_ENERGY);
                            if(nearestEnergy) {
                                if(creep.pos.isNearTo(nearestEnergy)) {
                                    creep.memory.state = 42;//picking up energy
                                    creep.pickup(nearestEnergy);
                                } else {
                                    creep.memory.state = 1;
                                }
                            } else {
                                creep.memory.state = 1;//idle no energy
                            }
                        }
                    }
                } else {
                    creep.memory.state = 25;//To Controller
                    if(creep.fatigue == 0) {
                        creep.moveTo(creep.room.controller);
                    }
                    
                }
            } else {
                creep.memory.state = 0; //idle.
            }
        }
//    }
    //creep.say(creep.memory.role +':' + creep.memory.state);
 }