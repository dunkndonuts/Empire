/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('helperPosition'); // -> 'a thing'
 */
 module.exports = {
    name: function(positionObj) {
        return(positionObj.x + '_' + positionObj.y) 
    }
}