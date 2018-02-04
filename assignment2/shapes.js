function Shape(position) {
    this.position = position;
}

Shape.prototype.render = function () {};

Shape.prototype.move = function () {
    this.position = position;
};

Shape.prototype.reszie = function () {};

function Rectangle(position, width, height) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
};

function Pen(position) {
    Shape.call(this, position);
}

function Circle(position, width) {
    Shape.call(this, position);
    this.width = width;
}

function Line(position) {
    Shape.call(this, position);
}

function Text(position) {
    Shape.call(this, position);
}

// assign prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Rectangle.prototype.render = function () {
    //Render a rectangle
    drawIo.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Pen.prototype.render = function () {

}

Circle.prototype.render = function () {
    //Render a rectangle
    drawIo.ctx.beginPath();
    drawIo.ctx.arc(this.position.x, this.position.y, Math.abs(this.width), 0, Math.PI * 2);
    drawIo.ctx.fill();
};

Line.prototype.render = function () {

}

/*Pen.prototype.resize = function(x,y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
}*/

Rectangle.prototype.resize = function (x,y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
}

Circle.prototype.resize = function (x,y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
}
