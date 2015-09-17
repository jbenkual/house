function Room (data) {
  var count = 0;
  if(data === undefined) {
    data = {};
  }
  if(data.width === undefined) {
    throw new Error("Missing Parameters");
  }
  if(data.length === undefined) {
    throw new Error("Missing Parameters");
  }
  if(data.name === undefined) {
    data.name = "room" + (++count);
  }

  this.name = data.name;
  this.width = data.width;
  this.length = data.length;
  this.isRoom = true;

  this.calcSqft = function () {
    this.sqft = this.width * this.length;
    return this.sqft;
  };

  this.resize = function (x, y) {
    this.width = x;
    this.length = y;
    this.calcSqft();
  };

  this.calcSqft();
}


module.exports = Room;