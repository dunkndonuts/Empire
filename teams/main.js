if(Memory.workForceQuota === undefined) {
    Memory.workForceQuota = {h1: 0, b1: 0, g1: 0, r1:1, min:3, run:8, bld:3};
}
if(Memory.siteQuota === undefined) {
    Memory.siteQuota = {src:4,ctrl:4};
}

if(Memory.partDefinitions === undefined) {
    Memory.partDefinitions = {
        run: [
            [CARRY,MOVE,CARRY,MOVE]],
        rep: [
            [CARRY,MOVE,WORK,WORK,WORK]],
        med: [
            [HEAL,HEAL,HEAL,HEAL,MOVE]],
        ext: [
            [MOVE,CARRY,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK]],
        bld: [
            [MOVE,CARRY,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK]], 
        min: [
            [MOVE,WORK,WORK,WORK,WORK,],
            [MOVE,WORK,WORK,WORK,WORK,WORK],
            [MOVE,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
            [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK]],
        grd: [
            [TOUGH,TOUGH,MOVE,RANGED_ATTACK,MOVE],
            [TOUGH,TOUGH,TOUGH,MOVE,RANGED_ATTACK,MOVE],
            [TOUGH,TOUGH,TOUGH,MOVE,RANGED_ATTACK,RANGED_ATTACK,MOVE],
            [TOUGH,TOUGH,TOUGH,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE],
            [TOUGH,TOUGH,TOUGH,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE],
            [TOUGH,TOUGH,TOUGH,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE],
            [TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE],
            [TOUGH,TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE]]
    };
}

var roomManager = require('room');

var DoACreepCheck = false;
var counter = Game.time % 1000;
if(counter%20 == 0) DoACreepCheck = true;


for(var name in Game.rooms) {
    var roomObj = Game.rooms[name];
    roomManager(roomObj, DoACreepCheck);
}
