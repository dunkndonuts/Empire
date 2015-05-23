/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room'); // -> 'a thing'
 */
module.exports = function (room, creepCheck) {
    if(room === undefined) return;  
    if(room.memory.sources === undefined) room.memory.sources = {};
    
    var harvester = require('harvester');
    var builder = require('builder');
    var guard = require('guard');
    var explore = require('explorer');
    var spawner = require('spawner');
    var repair = require('repair');
    var miner = require('miner');
    var runner = require('runner');
    
    var workForce = {h1: 0, b1: 0, e1: 0, g1: 0, r1: 0, min: 0, run: 0, bld: 0};
    
    var myCreeps = room.find(FIND_MY_CREEPS);
    var mySpawns = room.find(FIND_MY_SPAWNS);
    for(var spawnIndex in mySpawns) {
        var mySpawn = mySpawns[spawnIndex];
        var mySources = mySpawn.pos.findInRange(FIND_SOURCES_ACTIVE, 15)
        for(var sourceIndex in mySources) {
            room.memory.sources[mySources[sourceIndex].pos.x + '-' + mySources[sourceIndex].pos.y] = {harvesters: 0};
        }        
    }
    for(var creepIndex in myCreeps) {
        var creep = myCreeps[creepIndex];
        if(workForce[creep.memory.role] === undefined) workForce[creep.memory.role] = 0;
        if(creep.age < 30) creep.say('Dying:' + Creep.age);
        switch(creep.memory.role) {
            case 'h1':
                if(creep.memory.source !== undefined) {
                    room.memory.sources[creep.memory.source.x + '-' + creep.memory.source.y].harvesters += 1;
                }
                harvester(creep);
                workForce.h1 += 1;
                break;
            case 'b1':
                builder(creep);
                workForce.b1 += 1;
                break;
            case 'g1':
                guard(creep);
                workForce.g1 += 1;
                break;
            case 'e1':
                explore(creep);
                workForce.e1 += 1;
                break;
            case 'm1':
                explore(creep);
                workForce.m1 += 1;
                break;
            case 'r1':
                repair(creep);
                workForce.r1 += 1;
                break;
        }
        switch(creep.memory.role) {
            case 'min':
                miner(creep);
                workForce.min += 1;
                break;
            case 'run':
                if(creepCheck) {
                    if(creep.memory.energySource == undefined) creep.memory.energySource = {x: 0, y: 0};
                    creep.memory.energySource.x = mySpawns[0].pos.x;
                    creep.memory.energySource.y = mySpawns[0].pos.y;
                }
                creep.memory.order = workForce.run;
                runner(creep);
                workForce.run += 1;
                break;
            case 'bld':
                builder(creep);
                workForce.bld += 1;
                break;
        }
    }
    for(var sourceName in room.memory.sources) {
        var XandY = sourceName.split('-');
        var XandY = sourceName.split('-');
        for(var creepIndex in myCreeps) {
            if(room.memory.sources[sourceName].harvesters >= Memory.siteQuota.src) break;
            var creep = myCreeps[creepIndex];
            if(creep.memory.role == 'h1') {
                if(creep.memory.source == undefined) {
                    creep.memory.source = {x: parseInt(XandY[0]), y: parseInt(XandY[1])};
                    room.memory.sources[sourceName].harvesters += 1;
                }
            }
        }
    }
    if(creepCheck) {
        var mySpawns = room.find(FIND_MY_SPAWNS);
        var result = 0;
        var myExtensions = room.find(FIND_MY_STRUCTURES,{
            filter: function(object) {
                return (object.structureType == 'extension' && object.energy == 200);
            }
        });
        if(workForce.h1 < Memory.workForceQuota.h1) {
            var newBody = [WORK, CARRY, MOVE, MOVE];
            for(var spawnIndex in mySpawns) {
                var spawn = mySpawns[spawnIndex];
                if(spawn.spawning === null && newBody.length * 30 <= spawn.energy) {
                    result = spawner.createCreep(spawn,newBody, 'h1');                
                    if(result < 0) console.log('Failed to create h');
                    break;
                }
            }
        }
        if(workForce.b1 < Memory.workForceQuota.b1) {
            var newBody = [WORK, CARRY, MOVE, MOVE];
            for(var spawnIndex in mySpawns) {
                var currentSpawn = mySpawns[spawnIndex];
                if(currentSpawn.spawning === null && newBody.length * 30 <= currentSpawn.energy) {
                    spawner.createCreep(currentSpawn,newBody, 'b1');                
                    if(result < 0) console.log('Failed to create b');
                    break;
                }
            }
        }
        if(workForce.g1 < Memory.workForceQuota.g1) {
            var newBody = [TOUGH,MOVE, MOVE, ATTACK];
            for(var spawnIndex in mySpawns) {
                var currentSpawn = mySpawns[spawnIndex];
                if(currentSpawn.spawning === null && newBody.length * 30 < currentSpawn.energy) {
                    spawner.createCreep(currentSpawn,newBody, 'g1');                
                    if(result < 0) console.log('Failed to create g');
                    break;
                }
            }
        }
        if(workForce.r1 < Memory.workForceQuota.r1) {
            var newBody = [WORK, CARRY, MOVE, MOVE];
            for(var spawnIndex in mySpawns) {
                var currentSpawn = mySpawns[spawnIndex];
                if(currentSpawn.spawning === null && newBody.length * 30 <= currentSpawn.energy) {
                    spawner.createCreep(currentSpawn,newBody, 'r1');                
                    if(result < 0) console.log('Failed to create r');
                    break;
                }
            }
        }
        for(var role in Memory.workForceQuota) {
            if(role.length == 3 && workForce[role] < Memory.workForceQuota[role]) {
                var newBody = Memory.partDefinitions[role][Math.min(myExtensions.length, Memory.partDefinitions[role].length - 1)];
                for(var spawnIndex in mySpawns) {
                    var currentSpawn = mySpawns[spawnIndex];
                    if(currentSpawn.spawning === null && Math.min(newBody.length, 5) * 30 <= currentSpawn.energy) {
                        spawner.createCreep(currentSpawn,newBody, role);                
                        if(result < 0) console.log('Failed to create ' + role);
                        break;
                    }
                }
            }
        }

    }
}