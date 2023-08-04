var imageTrack = document.getElementById("imageTrack");
var scrollableContent = document.getElementById("scrollableContent");
var isMouseDown = false;
var startX;
var scrollLeft;

imageTrack.scrollLeft = 0;

var animationFrameId;

function smoothScroll() {
  imageTrack.scrollLeft += (scrollLeft - imageTrack.scrollLeft) * 0.1;

  if (Math.abs(scrollLeft - imageTrack.scrollLeft) < 0.5) {
    cancelAnimationFrame(animationFrameId);
    return;
  }

  animationFrameId = requestAnimationFrame(smoothScroll);
}

imageTrack.addEventListener("mousedown", function(event) {
  isMouseDown = true;
  startX = event.pageX - imageTrack.offsetLeft;
  scrollLeft = imageTrack.scrollLeft;
  imageTrack.style.cursor = "grabbing";
});

imageTrack.addEventListener("mousemove", function(event) {
  if (!isMouseDown) return;
  event.preventDefault();
  var x = event.pageX - imageTrack.offsetLeft;
  var walk = x - startX;
  imageTrack.scrollLeft = scrollLeft - walk;
});

imageTrack.addEventListener("mouseup", function() {
  isMouseDown = false;
  imageTrack.style.cursor = "grab";
});

imageTrack.addEventListener("mouseleave", function() {
  isMouseDown = false;
  imageTrack.style.cursor = "grab";
});

imageTrack.addEventListener("scroll", function() {
  cancelAnimationFrame(animationFrameId);
});

var imageTracks = document.querySelectorAll(".imageTrack");







var imageTrack2 = document.getElementById("imageTrack2");
var scrollableContent = document.getElementById("scrollableContent");
var isMouseDown = false;
var startX;
var scrollLeft;

imageTrack2.scrollLeft = 0;

var animationFrameId;

function smoothScroll() {
  imageTrack2.scrollLeft += (scrollLeft - imageTrack2.scrollLeft) * 0.1;

  if (Math.abs(scrollLeft - imageTrack2.scrollLeft) < 0.5) {
    cancelAnimationFrame(animationFrameId);
    return;
  }

  animationFrameId = requestAnimationFrame(smoothScroll);
}

imageTrack2.addEventListener("mousedown", function(event) {
  isMouseDown = true;
  startX = event.pageX - imageTrack2.offsetLeft;
  scrollLeft = imageTrack2.scrollLeft;
  imageTrack2.style.cursor = "grabbing";
});

imageTrack2.addEventListener("mousemove", function(event) {
  if (!isMouseDown) return;
  event.preventDefault();
  var x = event.pageX - imageTrack2.offsetLeft;
  var walk = x - startX;
  imageTrack2.scrollLeft = scrollLeft - walk;
});

imageTrack2.addEventListener("mouseup", function() {
  isMouseDown = false;
  imageTrack2.style.cursor = "grab";
});

imageTrack2.addEventListener("mouseleave", function() {
  isMouseDown = false;
  imageTrack2.style.cursor = "grab";
});

imageTrack2.addEventListener("scroll", function() {
  cancelAnimationFrame(animationFrameId);
});

var imageTrack2s = document.querySelectorAll(".imageTrack2");
