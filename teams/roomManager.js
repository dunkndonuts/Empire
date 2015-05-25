module.exports = function (roomObj, helper) {
    if(roomObj === undefined) return;
    if(Game.time%20===0) console.log('tick');
    
    if(roomObj.memory.operations === undefined) {
        var roomInitializer = require('roomInitializer');
        roomInitializer(roomObj, helper);
    } else {
        //Figure it out as we go along.
        var roomScanner = require('roomScanner');
        roomScanner(roomObj, helper);
    }
}