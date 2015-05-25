 module.exports = function (roomObj, helper) {
    console.log('Initializing Room ' + roomObj.name);
    var notificationMessage = 'Initializing Room ' + roomObj.name;
    //gather up all the sources
    if(roomObj.memory.operations === undefined) {
        roomObj.memory.operations = {
            controller: {
                exists: false,
                openings:[],
                paths:{sources:{}},
                teams:{}
            },
            sources: {},
            SKLairs: {}
        };
    }
    var sourceList = roomObj.find(FIND_SOURCES);
    var mSourceList = roomObj.memory.operations.sources;
    var mController = roomObj.memory.operations.controller;
    var mSKLairs = roomObj.memory.operations.SKLairs;
    
    if(roomObj.controller) mController.exists = true;
    for(var sourceIndex in sourceList) {
        var currentSource = sourceList[sourceIndex];
        var sourceName = currentSource.id;
        mSourceList[sourceName] = {isBySourceKeeper: false, paths:{spawns:{}}};
        var pathToTarget = null
        if(mController.exists) {
            pathToTarget = currentSource.pos.findPathTo(roomObj.controller, {ignoreCreeps: true});
            if(pathToTarget && pathToTarget.length > 0 ) {
                mController.paths.sources[sourceName] = pathToTarget;
            }
        }
    }
    /*
     * Are sources by Source Keeper Lair?  Need to mark and leave alone for now, 
     * later post guard and healers, time it so Guards spawn in time for Source keeper spawns
     */
    var lairList = roomObj.find(FIND_HOSTILE_STRUCTURES, {
        filter: function(object) {
            return object.structureType === 'keeperLair';
        }
    });
    for(var lairIndex in lairList) {
        var lair = lairList[lairIndex];
        mSKLairs[lair.id] = {
            pos: lair.pos,
            ticksToSpawn: lair.ticksToSpawn
        }
        var closeSourceList = lair.pos.findInRange(FIND_SOURCES, 5);
        for(var closeSourceIndex in closeSourceList) {
            var currentSource = closeSourceList[closeSourceIndex];
            mSourceList[currentSource.id].isBySourceKeeper = true;
        }
    }
    Game.notify(notificationMessage, 0);//immediate message
 }