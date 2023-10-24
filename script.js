// script.js

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('plotCanvas');
    var ctx = canvas.getContext('2d');

    // Set canvas size to full viewport width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Rectangle(x, y, width, height, dx, dy, isMoving) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx; // velocity in x
        this.dy = dy; // velocity in y
        this.isMoving = isMoving; // whether this rectangle is moving

        this.draw = function() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.isMoving ? 'red' : 'grey'; // distinguish moving vs stationary
            ctx.fill();
            ctx.closePath();
        };

        this.update = function() {
            if (!this.isMoving) return; // if it's not meant to move, don't update position

            // reverse direction if it hits the boundary
            if (this.x + this.width > canvas.width || this.x < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.height > canvas.height || this.y < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        };
    }

    // Let's create a grid and rectangles
    var rectangles = [];

    // Parameters for grid
    var numRows = 10;
    var numCols = 10;
    var rectWidth = canvas.width / numCols;
    var rectHeight = canvas.height / numRows;

    // Create stationary rectangles in grid
    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
            rectangles.push(new Rectangle(
                col * rectWidth, // x
                row * rectHeight, // y
                rectWidth, // width
                rectHeight, // height
                0, // dx
                0, // dy
                false // isMoving
            ));
        }
    }

    // Add three moving rectangles (you can set their initial positions and velocities as you like)
    rectangles.push(new Rectangle(100, 100, rectWidth, rectHeight, 2, 2, true));
    rectangles.push(new Rectangle(200, 200, rectWidth, rectHeight, -1, 1, true));
    rectangles.push(new Rectangle(300, 150, rectWidth, rectHeight, 1, -1, true));

    function animate() {
        requestAnimationFrame(animate); // Create an animation loop
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        rectangles.forEach(function(rectangle) {
            rectangle.draw(); // First draw all rectangles, stationary or moving
            rectangle.update(); // Then update those that are moving
        });
    }

    // Start the animation
    animate();
});
