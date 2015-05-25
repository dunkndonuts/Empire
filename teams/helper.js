module.exports = {
    position: require('helperPosition'),
    roads: require('helperRoads'),
	ramparts: {
		expandRampartsOutwards: function(tgtRoom) {
			var ramparts = tgtRoom.find(FIND_MY_STRUCTURES, {
				filter: {structureType: STRUCTURE_RAMPART}
			});
			for(var i in ramparts) {
				var rampart = ramparts[i];
				var rampartPositions = [];
				var newPositions = [];
				var possibleRampartPositions = [
					{x: rampart.pos.x - 1, y: rampart.pos.y},
					{x: rampart.pos.x - 1, y: rampart.pos.y - 1},
					{x: rampart.pos.x - 1, y: rampart.pos.y + 1},
					{x: rampart.pos.x, y: rampart.pos.y - 1},
					{x: rampart.pos.x, y: rampart.pos.y + 1},
					{x: rampart.pos.x + 1, y: rampart.pos.y - 1},
					{x: rampart.pos.x + 1, y: rampart.pos.y},
					{x: rampart.pos.x + 1, y: rampart.pos.y + 1}
				];
				for(var indexOfPossibleRampartPositions in possibleRampartPositions) {
					var currentRampartPosition = possibleRampartPositions[indexOfPossibleRampartPositions];
					var tile = tgtRoom.lookAt(currentRampartPosition);
					var build = true;
					for(var tileItem in tile) {
						var thing = tile[tileItem];
						if(thing.type === 'constructionSite') build = false;
						if(thing.type === 'spawn') build = false;
						if(thing.type === 'structure' && thing.structure.structureType === STRUCTURE_RAMPART) build = false;
					}
					if(build) {
					    newPositions.push(currentRampartPosition);
					}
				}
				this.updatePositionsArray(newPositions, rampartPositions);
				for(var indexOfRampartPositions in rampartPositions) {
				    var currentNewRampartPosition = rampartPositions[indexOfRampartPositions];
					var result = tgtRoom.createConstructionSite(currentNewRampartPosition.x, currentNewRampartPosition.y, STRUCTURE_RAMPART);
					if(result !== 0) {
					    console.log('Result(' + currentNewRampartPosition.x + ',' + currentNewRampartPosition.y + '): ' + result);
	    				for(var tileItem in tile) {
	        				console.log(tile[tileItem]);
	    				}
					}
				}
			}
		}
	},
	constructionSites: {
		clearAllConstructionSites: function(tgtRoom) {
		    var constructionSites = tgtRoom.find(FIND_CONSTRUCTION_SITES);
		    constructionSites.forEach(function(constructionSite){
		        constructionSite.remove();
		    });
		},
		clearConstructionSites: function(tgtRoom, typeOfConstruction) {
		    var constructionSites = tgtRoom.find(FIND_CONSTRUCTION_SITES);
		    constructionSites.forEach(function(constructionSite){
		        if(constructionSite.structureType === typeOfConstruction) constructionSite.remove();
		    });
		}
	},
	paths: {
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
    },
    hostiles: {
        structures: {
            find: function(object) {
                return roomObj.find(FIND_HOSTILE_STRUCTURES);
            }
        },
        spawns: {
            find: function(roomObj) {
                return roomObj.find(FIND_HOSTILE_SPAWNS);
            },
            name: function(hostileSpawnObj) {
                return hostileSpawnObj.id;
            }
        },
        creeps: {
            find: function(roomObj) {
                return roomObj.find(FIND_HOSTILE_CREEPS);
            },
            name: function(hostileCreepObj) {
                return hostileCreepObj.id;
            },
            nameByParts: function(hostileCreepObj) {
                var creepName = '';
                var count = 0;
                for(var bodyIndex in hostileCreepObj.body) {
                    var currentPart = hostileCreepObj.body[bodyIndex];                    
                }
                return creepName;
            },
            nameByActive: function(hostileCreepObj) {
                    var creepName = '';
                    var bodyParts = {};
                    var possibleParts = [ATTACK,RANGED_ATTACK,HEAL,WORK,CARRY,TOUGH,MOVE];
                    for(var possiblePartsIndex in possibleParts) {
                        var i = hostileCreepObj.getActiveBodyparts(possibleParts[possiblePartsIndex]);
                        if(i>0) creepName += this.getPartAbbrev(possibleParts[possiblePartsIndex]) + i;
                    }
                    return creepName;
            },
            getPartAbbrev: function(part) {
                switch(part) {
                    case ATTACK:
                        return 'A';
                    case RANGED_ATTACK:
                        return 'R';
                    case HEAL:
                        return 'H';
                    case WORK:
                        return 'W';
                    case CARRY:
                        return 'C';
                    case TOUGH:
                        return 'T';
                    case MOVE:
                        return 'M';
                    default:
                        return '?';
                }
            
            }
        }
    },
    operations: {
        hostiles: {
            getInfo: function(ownerID, hostileName, lastPosition) {
                
            }
        }
    }
}