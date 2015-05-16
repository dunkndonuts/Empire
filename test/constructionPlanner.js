module.exports = {
	buildRoads: function(tgtRoom, from, to)
	{
		var path = tgtRoom.findPath(from, to, { ignoreCreeps: true });
		for(var i in path)
		{
			var result = tgtRoom.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
		}
	},

	buildRoadToAllSources: function(tgtSpawn, tgtRoom)
	{
		var sources = tgtRoom.find(FIND_SOURCES_ACTIVE);
        var positions = [];
		for(var i in sources)
		{
    		var path = tgtRoom.findPath(tgtSpawn.pos, sources[i].pos, { ignoreCreeps: true });
    		this.updatePositionsArray(path, positions);
		}
	    for(var indexOfPosition in positions) {
    		var result = tgtRoom.createConstructionSite(positions[indexOfPosition], STRUCTURE_ROAD);
	    }
	},
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
	},
	clearConstructionSites: function(tgtRoom) {
	    var constructionSites = tgtRoom.find(FIND_CONSTRUCTION_SITES);
	    for(var indexOfSite in constructionSites) {
	        constructionSites[indexOfSite].remove();
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
};