var expect = require("chai").expect;

describe("House", function () {
	it("allows user to define a house object", function () {
		expect(new House()).to.be.an('Object');
	});
	it("takes a name from arguments", function () {
		expect(new House("Red").name).to.equal('Red');
	});
	it("has an object called rooms", function () {
		expect(new House("Red").rooms).to.be.an('Object');
	});
	describe("Room", function () {
		it("allows user to define a room object", function () {
			expect(new Room()).to.be.a('Object');
		});
		it("takes a name from arguments", function () {
			expect(new Room(5,5,"Red").name).to.equal('Red');
		});
		it("has the proper square feet", function () {
			expect(new Room(10,10, "test").sqft).to.equal(100);
			expect(new Room(5,12, "test2").sqft).to.equal(60);
		});
	});
});

function House (name, rLimit, sqftLimit) {
	if(rLimit === undefined) {
		rLimit = 0;
	}
	if(sqftLimit === undefined) {
		sqftLimit = 0;
	}
	this.name = name;
	this.roomLimit = rLimit;
	this.sqftLimit = sqftLimit;
	this.roomCount = 0;
	this.rooms = {};
	this.sqft = 0;

	this.addRooms = function () {
		for(var i = 0; i < arguments.length; i++) {
			if(arguments[i].isRoom !== undefined) {
				if(this.rooms.hasOwnProperty(arguments[i].name)) {
					console.log("House " + this.name + " already has a room named " + arguments[i].name);
					console.log("Adding room failed");
				}
				else if(this.sqftLimit > 0 && this.sqft + arguments[i].sqft > sqftLimit) {
					console.log("House " + this.name + " cannot fit room named " + arguments[i].name);
					console.log("sqft available " + this.sqftLimit - this.sqft + "  room size: " + arguments[i].sqft);
					console.log("Adding room failed");
				}
				else if(this.roomLimit > 0 && this.roomLimit === this.roomCount) {
					console.log("House " + this.name + " cannot fit any more rooms");
				}
				else {
					this.roomCount++;
					this.rooms[arguments[i].name] = arguments[i];
					this.sqft += arguments[i].sqft;
				}
			}
			else if(Array.isArray(arguments[i])) {
				for(var j =0; j < arguments[j].length; j++) {
					this.addRooms(arguments[j]);
				}
			}
		}
	};
	this.removeRoom = function (name) {
		delete this.rooms[name];
	};
}

function Room (width, height, rName) {
	if(width === undefined) {
		width = 0;
	}
	if(height === undefined) {
		height = 0;
	}
	if(rName === undefined) {
		rName = "room" + Math.floor(Math.random() * 10000000);
	}

	this.name = rName;
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
/*
var h1 = new house("Coding Mansion");
var r1 = new room(5,5, "blue");
var r2 = new room(4,4, "red");
h1.addRooms(r1);
console.log(h1.sqft);
h1.addRooms(r1, r2);
console.log(h1.sqft);
h1.removeRoom("blue");
console.log(h1.sqft);
*/
