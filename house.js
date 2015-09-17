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
          throw new Error("Duplicate room name");
        }
        else if(this.sqftLimit > 0 && this.sqft + arguments[i].sqft > sqftLimit) {
          throw new Error("Insufficient space (sqft)");
        }
        else if(this.roomLimit > 0 && this.roomLimit === this.roomCount) {
          throw new Error("Room limit has been reached");
        }
        else {
          this.roomCount++;
          this.rooms[arguments[i].name] = arguments[i];
          this.sqft += arguments[i].sqft;
        }
      }
      else if(Array.isArray(arguments[i])) {
        for(var j =0; j < arguments[i].length; j++) {
          this.addRooms(arguments[i][j]);
        }
      }
    }
    return this;
  };
  this.removeRooms = function () {
    for(var i = 0; i < arguments.length; i++) {
      if(this.rooms.hasOwnProperty(arguments[i])) {
        delete this.rooms[arguments[i]];
      }
      else if(Array.isArray(arguments[i])) {
        for(var j =0; j < arguments[i].length; j++) {
          this.removeRooms(arguments[i][j]);
        }
      }
    }
  };
}


module.exports = House;
