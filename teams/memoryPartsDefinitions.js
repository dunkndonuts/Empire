/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memoryBodyDefinitions'); // -> 'a thing'
 */
 module.exports = {
    initialize: function(){
        Memory.partsDefinitions = {
            run: [
                [CARRY,MOVE,CARRY,MOVE],
                [CARRY,MOVE,CARRY,MOVE],
                [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
                [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
                [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE],
                [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]],
            rep: [
                [CARRY,MOVE,MOVE,WORK,WORK,WORK],
                [CARRY,MOVE,MOVE,WORK,WORK,WORK]],
            med: [
                [HEAL,HEAL,HEAL,HEAL,MOVE]],
            chg: [
                [CARRY,CARRY,CARRY,CARRY,MOVE],
                [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],
                [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]],
            bld: [
                [WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE]], 
            upg: [
                [WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE]], 
            min: [
                [WORK,MOVE,WORK,WORK,MOVE,],
                [WORK,WORK,WORK,WORK,WORK,MOVE]],
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
 }