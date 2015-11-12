var DOTS = 300;
var xSPEED = 0.6;
var ySPEED = 0.6; 
function Dot() {
  this.y = Math.random() * canvas.height;
  this.x = Math.random() * canvas.width;
  this.intervalX = (Math.random()*xSPEED);
  this.intervalY = (Math.random()*ySPEED);
  this.onFire = false;
  this.brightness = 0;

  this.update = function() {
    this.x += this.intervalX;
    this.y += this.intervalY;
    this.checkForBoundary();
    this.render();
  };

  this.checkForBoundary = function() {
    if (this.x > canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.y > canvas.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = canvas.height;
    }
  };

  this.render = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.5, 0, (2 * Math.PI))
    ctx.fillStyle = '#000000';
    ctx.fill();
  };
};

function Garden() {
  var dots = [];
  var dotCount = DOTS;
  var minDistance = 100;
  var checkConnectionBetween = function(firstDot, secondDot) {
    var distanceX = secondDot.x - firstDot.x;
    var distanceY = secondDot.y - firstDot.y;
    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < minDistance) {
      ctx.beginPath();
      ctx.lineWidth= 2;
      ctx.strokeStyle = "rgba(0,0,0,"
        + (1-distance/minDistance)+")";
      ctx.moveTo(firstDot.x, firstDot.y);
      ctx.lineTo(secondDot.x, secondDot.y);
      ctx.stroke();
      ctx.closePath();
    }
  };

  var connectTheDots = function() {
    for(i = 0; i < dotCount-1; i++) {
      var firstDot = dots[i];
      for(var j = i+1; j < dotCount; j++){
        var secondDot = dots[j];
        checkConnectionBetween(firstDot, secondDot);
      };
    };
  };

  this.grow = function() {
    for(i = 0; i < dotCount; i++){
      var dot = new Dot();
      dot.render();
      dots.push(dot);
    }
  };

  this.loop = function(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < dots.length; i++){
      dots[i].update();
    }
    connectTheDots();
    requestAnimationFrame(garden.loop);
  };
};

var canvas = document.getElementById("maize-garden");
var ctx    = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var garden = new Garden();
var gardenTwo = new Garden();

garden.grow();
requestAnimationFrame(garden.loop);