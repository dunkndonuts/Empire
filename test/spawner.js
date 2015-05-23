/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner'); // -> 'a thing'
 */
 module.exports = {
    createCreep: function(spawnObj, newBody, role) {
        var result = spawnObj.createCreep(newBody, this.getCreepName(role), {role: role})
        return result;
    },
    getCreepName: function(newName) {
        var creepName = newName + '_0';
        for(i = 0; i < 999 ; i++) {
            creepName = newName + '_' + i;
            if(Game.creeps[creepName] === undefined) {
                break;
            }
            
        }
        console.log('Creating ' + creepName);
        return creepName;
    }
 }