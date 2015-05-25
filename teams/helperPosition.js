module.exports = {
    name: function(positionObj) {
        return(positionObj.x + '_' + positionObj.y) 
    },
    getOpenPositions: function(roomObj, positionObj) {
        var goodSpaces = [];
		var possiblePositions = [
			{x: positionObj.x - 1, y: positionObj.y},
			{x: positionObj.x - 1, y: positionObj.y - 1},
			{x: positionObj.x - 1, y: positionObj.y + 1},
			{x: positionObj.x, y: positionObj.y - 1},
			{x: positionObj.x, y: positionObj.y + 1},
			{x: positionObj.x + 1, y: positionObj.y - 1},
			{x: positionObj.x + 1, y: positionObj.y},
			{x: positionObj.x + 1, y: positionObj.y + 1}
		];
		for(var indexOfPossiblePositions in possiblePositions) {
			var currentPosition = possiblePositions[indexOfPossiblePositions];
			var tileItems = roomObj.lookAt(currentPosition.x, currentPosition.y);
			var goodSpace = true;
			console.log(currentPosition);
			for(var indexOfTileItems in tileItems) {
				var tileItem = tileItems[indexOfTileItems];
                console.log(tileItem.type);
			    switch(tileItem.type) {
			        case 'terrain':
                        console.log(tileItem.terrain);
			            if(tileItem.terrain == 'wall') {
			                goodSpace = false;
			            }
			            break;
	                case 'structure':
                        console.log(tileItem.structure.structureType);
                        if('constructedWallportal'.indexOf(tileItem.structure.structureType) >= 0) {
    	                    goodSpace = false;
                        }
	                    break;
	                default:
	                    break;
			    }
			}
			if(goodSpace) {
			    goodSpaces.push({x: currentPosition.x, y: currentPosition.y, assigned:''});
			}
		}
		return goodSpaces;
    }
}