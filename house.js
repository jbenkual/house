function house () {
	this.rooms = [];
	this.sqft = 0;

	this.addRooms = function () {
		for(var i = 0; i < arguments.length; i++) {
			if(arguments[i].isRoom !== undefined) {
				this.rooms.push(arguments[i]);
				this.sqft += arguments[i].sqft;
			}
			else if(Array.isArray(arguments[i])) {
				for(var j =0; j < arguments[j].length; j++) {
					this.addRooms(arguments[j]);
				}
			}
		}
	};
}

function room (width, height) {
	if(width === undefined) {
		width = 0;
	}
	if(height === undefined) {
		height = 0;
	}
	this.width = width;
	this.length = height;

	this.sqft = width * height;

	this.isRoom = true;

	this.calcSqft = function () {
		this.sqft = width * length;
	};

	this.setDimensions = function (x, y) {
		this.width = x;
		this.length = y;
		this.calcSqft();
	};
}

var r1 = new room();
console.log(r1.sqft)

