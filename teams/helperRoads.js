/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('helperRoads'); // -> 'a thing'
 */
module.exports = {
    extendFromSpawnToAllSources: function(spawnObj) {
        var sources = spawnObj.room.find(FIND_SOURCES_ACTIVE);
        var positions = [];
        var newPositions = [];
        for(var i in sources) {
            var path = spawnObj.room.findPath(spawnObj.pos, sources[i].pos, { ignoreCreeps: true });
            for(var indexOfPath in path) {
                var currentPathPosition = path[indexOfPath];
                var tile = spawnObj.room.lookAt(currentPathPosition.x, currentPathPosition.y);
                var already = false;
                tile.forEach(function(tileItem){
                    if(
                        (tileItem.type === 'structure' && tileItem.structure.structureType === 'road') ||
                        (tileItem.type === 'constructionSite' && tileItem.constructionSite.structureType === 'road')
                    ) { 
                        already = true;
                        return;
                    }
                });
                if(!already) {
                    newPositions.push(currentPathPosition);
                    break;
                }
            }
        }
        this.updatePositionsArray(newPositions, positions);
        for(var indexOfPosition in positions) {
            var currentNewRoadPosition = positions[indexOfPosition];
            var result = spawnObj.room.createConstructionSite(currentNewRoadPosition, STRUCTURE_ROAD);
        }
    },    
    buildFromSpawnToAllSources: function(spawnObj) {
        var sources = spawnObj.room.find(FIND_SOURCES_ACTIVE);
        var positions = [];
        for(var i in sources) {
            var path = spawnObj.room.findPath(spawnObj.pos, sources[i].pos, { ignoreCreeps: true });
            this.updatePositionsArray(path, positions);
        }
        for(var indexOfPosition in positions) {
            var result = spawnObj.room.createConstructionSite(positions[indexOfPosition], STRUCTURE_ROAD);
        }
    },
    extendFromSourceToController: function(sourceObj) {
        if(!sourceObj) return;
        var positions = [];
        var newPositions = [];
        var path = sourceObj.room.findPath(sourceObj.pos, sourceObj.room.controller.pos, { ignoreCreeps: true });
        for(var indexOfPath in path) {
            var currentPathPosition = path[indexOfPath];
            var tile = sourceObj.room.lookAt(currentPathPosition.x, currentPathPosition.y);
            var already = false;
            tile.forEach(function(tileItem){
                if(
                    (tileItem.type === 'structure' && tileItem.structure.structureType === 'road') ||
                    (tileItem.type === 'constructionSite' && tileItem.constructionSite.structureType === 'road')
                ) { 
                    already = true;
                    return;
                }
            });
            if(!already) {
                newPositions.push(currentPathPosition);
                break;
            }
        }
        for(var indexOfPosition in positions) {
            var currentNewRoadPosition = positions[indexOfPosition];
            var result = sourceObj.room.createConstructionSite(currentNewRoadPosition, STRUCTURE_ROAD);
        }
    },
    buildFromSourceToController: function(sourceObj) {
        if(!source) return;
        var positions = [];
        var path = sourceObj.room.findPath(source.pos, sourceObj.room.controller.pos, { ignoreCreeps: true });
        this.updatePositionsArray(path, positions);
        for(var indexOfPosition in positions) {
            var result = sourceObj.room.createConstructionSite(positions[indexOfPosition], STRUCTURE_ROAD);
        }
    },
    updatePositionsArray: function(newPositions, positions){
        for(var indexOfNewPositions in newPositions) {
            var currentNewPosition = newPositions[indexOfNewPositions];
            var addPos = true;
            for(var indexOfPosition in positions) {
                var currentPosition = positions[indexOfPosition]
                if(currentPosition.x === currentNewPosition.x && currentPosition.y === currentNewPosition.y) {
                    addPos = false;
                    break;
                }
            } 
            if(addPos) positions.push(currentNewPosition);
        }
    }
}
