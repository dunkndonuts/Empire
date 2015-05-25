/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roomScanner'); // -> 'a thing'
 */
 module.exports = function (roomObj, helper) {
    if(roomObj === undefined) return; //No Room to Scan
    var counter = 0;
    var result = 0;
    var enemies = roomObj.find(FIND_HOSTILE_CREEPS);
    if(roomObj.memory.operations.hostiles === undefined) {
        roomObj.memory.operations.opForces = {
            creeps: {},
            structures: {}
        }
    }
    var mOpFor = roomObj.memory.operations.opForces;
    for(var enemyIndex in enemies) {
        var enemy = enemies[enemyIndex];
        if(mOpFor.creeps[enemy.id] === undefined) {
            mOpFor.creeps[enemy.id] = {
                owner: enemy.owner.username,
                lastPos: enemy.pos,
                body: enemy.body,
                hits: enemy.hits
            }
        } else {
            mOpFor.creeps[enemy.id].lastPos = enemy.pos;
        }
    }
    enemies = roomObj.find(FIND_HOSTILE_STRUCTURES);
    for(var enemyIndex in enemies) {
        var enemy = enemies[enemyIndex];
        if(mOpFor.structures[enemy.id] === undefined) {
            mOpFor.structures[enemy.id] = {
                owner: enemy.owner.username,
                structureType: enemy.structureType,
                pos: enemy.pos,
                hits: enemy.hits
            }
        } else {
            mOpFor.creeps[enemy.id].hits = enemy.hits;
        }
    }
}