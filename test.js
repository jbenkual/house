var expect = require("chai").expect;
var House = require('./house.js');
var Room = require("./room.js");

/*
*
*********** Describe House **************
*
*/

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
	it("can add a new room", function () {
		var h1 = new House("Coding Mansion");
		var r1 = new Room({width: 5, length: 6, name: "Red"});
		h1.addRooms(r1);
		expect(h1.rooms[r1.name]).to.equal(r1);
	});
	it("throws an error for adding two rooms of the same name", function () {
		var func = function() {
			var h1 = new House("Coding Mansion");
			var r1 = new Room({width: 5, length: 6, name: "Red"});
			var r2 = new Room({width: 8, length: 4, name: "Red"});
			h1.addRooms(r1).addRooms(r2);
		};
		expect(func).to.throw("Duplicate room name");
	});
	it("throws an error for adding a room if max space is exceeded", function () {
		var func = function() {
			var h1 = new House("Coding Mansion", 0, 1000);
			var r1 = new Room({width: 20, length: 20, name: "Red"});
			var r2 = new Room({width: 30, length: 30, name: "Blue"});
			h1.addRooms(r1).addRooms(r2);
		};
		expect(func).to.throw("Insufficient space (sqft)");
	});
	it("throws an error for adding a room if max rooms is exceeded", function () {
		var func = function() {
			var h1 = new House("Coding Mansion", 5);
			for(var x = 0; x < 10; x++) {
				var r1 = new Room({width: 20, length: 20, name: "Red" + x});
				h1.addRooms(r1);
			}
		};
		expect(func).to.throw("Room limit has been reached");
	});
	it("can add multiple rooms at once", function () {
		var h1 = new House("Coding Mansion");
		var r1 = new Room({width: 5, length: 6, name: "Red"});
		var r2 = new Room({width: 12, length: 13, name: "Green"});
		var r3 = new Room({width: 2, length: 20, name: "Purple"});
		h1.addRooms(r1,r2,r3);
		expect(h1.rooms[r1.name]).to.equal(r1);
		expect(h1.rooms[r2.name]).to.equal(r2);
		expect(h1.rooms[r3.name]).to.equal(r3);
	});
	it("can add an array of rooms", function () {
		var h1 = new House("Coding Mansion");
		var r1 = new Room({width: 5, length: 6, name: "Red"});
		var r2 = new Room({width: 5, length: 6, name: "Blue"});
		var r3 = new Room({width: 5, length: 6, name: "Green"});
		var arr = [r1,r2,r3];
		h1.addRooms(arr);
		expect(h1.rooms[r1.name]).to.equal(r1);
		expect(h1.rooms[r2.name]).to.equal(r2);
		expect(h1.rooms[r3.name]).to.equal(r3);
	});
	it("can remove a room", function () {
		var h1 = new House("Coding Mansion");
		var r1 = new Room({width: 5, length: 6, name: "Red"});
		var r2 = new Room({width: 5, length: 6, name: "Blue"});
		h1.addRooms(r1);
		h1.addRooms(r2);
		h1.removeRooms(r1.name);
		expect(h1.rooms[r1.name]).to.be.an('undefined');
		expect(h1.rooms[r2.name]).to.be.equal(r2);
	});
	it("provides the total sqft of all its rooms", function () {
		var h1 = new House("Coding Mansion");
		var r1 = new Room({width: 5, length: 8, name: "Red"});
		var r2 = new Room({width: 10, length: 20, name: "Blue"});
		h1.addRooms([r1,r2]);
		expect(h1.sqft).to.be.equal(240);
	});

/*
*
*********** Describe Room **************
*
*/

	describe("Room", function () {
		it("allows user to define a room object", function () {
			var r1 = new Room({width: 5, length: 5, name: "Red"});
			expect(r1).to.be.a('Object');
		});
		it("throws an error if length and width are omitted", function () {
			var func = function () {
				var x = new Room();
			};
			expect(func).to.throw("Missing Parameters");
		});
		it("takes length and width from arguments", function () {
			var r1 = new Room({width: 5, length: 5, name: "Red"});
			var r2 = new Room({width: 7, length: 13, name: "Blue"});
			expect(r1.width).to.equal(5);
			expect(r1.length).to.equal(5);
			expect(r2.width).to.equal(7);
			expect(r2.length).to.equal(13);
		});
		it("takes a name from arguments", function () {
			var r1 = new Room({width: 5, length: 5, name: "Red"});
			expect(r1.name).to.equal('Red');
		});
		it("can calculate its sqft", function () {
			var r1 = new Room({width: 10, length: 10, name: "Red"});
			r1.length = 15;
			r1.calcSqft();
			expect(r1.sqft).to.equal(150);
		});
		it("initializes with the proper square feet", function () {
			var r1 = new Room({width: 10, length: 10, name: "Red"});
			var r2 = new Room({width: 5, length: 12, name: "Blue"});
			expect(r1.sqft).to.equal(10*10);
			expect(r2.sqft).to.equal(5*12);
		});
		it("can be resized", function () {
			var r1 = new Room({width: 5, length: 5, name: "Red"});
			r1.resize(12, 13);
			expect(r1.width).to.equal(12);
			expect(r1.length).to.equal(13);
			expect(r1.sqft).to.equal(12*13);
		});
	});
});