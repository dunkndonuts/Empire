module.exports = {
    extendRoadsToAllSources: function(tgtSpawn) {
		var sources = tgtSpawn.room.find(FIND_SOURCES_ACTIVE);
        var positions = [];
        var newPositions = [];
		for(var i in sources)
		{
    		var path = tgtSpawn.room.findPath(tgtSpawn.pos, sources[i].pos, { ignoreCreeps: true });
    		for(var indexOfPath in path) {
    		    var currentPathPosition = path[indexOfPath];
    		    var tile = tgtSpawn.room.lookAt(currentPathPosition.x, currentPathPosition.y);
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
    		var result = tgtSpawn.room.createConstructionSite(currentNewRoadPosition, STRUCTURE_ROAD);
	    }
    },
    extendRoadToController: function(source) {
        if(!source) return;
        var positions = [];
        var newPositions = [];
		var path = source.room.findPath(source.pos, source.room.controller.pos, { ignoreCreeps: true });
		for(var indexOfPath in path) {
		    var currentPathPosition = path[indexOfPath];
		    var tile = source.room.lookAt(currentPathPosition.x, currentPathPosition.y);
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
    		var result = source.room.createConstructionSite(currentNewRoadPosition, STRUCTURE_ROAD);
	    }
    },
	buildRoadToAllSources: function(tgtSpawn)
	{
		var sources = tgtSpawn.room.find(FIND_SOURCES_ACTIVE);
        var positions = [];
		for(var i in sources)
		{
    		var path = tgtSpawn.room.findPath(tgtSpawn.pos, sources[i].pos, { ignoreCreeps: true });
    		this.updatePositionsArray(path, positions);
		}
	    for(var indexOfPosition in positions) {
    		var result = tgtSpawn.room.createConstructionSite(positions[indexOfPosition], STRUCTURE_ROAD);
	    }
	},
	buildRoadToController: function(source)
	{
        if(!source) return;
        var positions = [];
		var path = source.room.findPath(source.pos, source.room.controller.pos, { ignoreCreeps: true });
		this.updatePositionsArray(path, positions);
	    for(var indexOfPosition in positions) {
    		var result = source.room.createConstructionSite(positions[indexOfPosition], STRUCTURE_ROAD);
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