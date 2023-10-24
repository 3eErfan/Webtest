// script.js

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('plotCanvas');
    var ctx = canvas.getContext('2d');

    // Set canvas size to full viewport width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Function to generate a random number between a range
    function randomIntFromRange(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    // Object to represent a rectangle on the canvas
    function Rectangle(x, y, width, height, dx, dy) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx; // Change in x (speed in the x direction)
        this.dy = dy; // Change in y (speed in the y direction)

        // Draw the rectangle
        this.draw = function() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'blue'; // for example, color the rectangles blue
            ctx.fill();
            ctx.closePath();
        };

        // Update the rectangle's position
        this.update = function() {
            // If the rectangle hits the canvas boundaries, reverse its direction
            if (this.x + this.width > canvas.width || this.x < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.height > canvas.height || this.y < 0) {
                this.dy = -this.dy;
            }

            // Update the rectangle's position
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        };
    }

    // Create a bunch of rectangles
    var rectangles = [];
    for (var i = 0; i < 50; i++) { // for example, create 50 rectangles
        var width = randomIntFromRange(10, 120); // random width between 10 and 120
        var height = randomIntFromRange(10, 60); // random height between 10 and 60
        var x = randomIntFromRange(0, canvas.width - width);
        var y = randomIntFromRange(0, canvas.height - height);
        var dx = randomIntFromRange(-2, 2); // random velocity in the x direction
        var dy = randomIntFromRange(-2, 2); // random velocity in the y direction

        rectangles.push(new Rectangle(x, y, width, height, dx, dy));
    }

    // Animation function
    function animate() {
        requestAnimationFrame(animate); // Create an animation loop
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Draw and update all rectangles
        rectangles.forEach(function(rectangle) {
            rectangle.update();
        });
    }

    // Start the animation
    animate();
});
