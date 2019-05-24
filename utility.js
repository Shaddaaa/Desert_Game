String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
function getRandomInt(max) {
  return Math.round(Math.random() * Math.floor(max));
}
function makeUnclickable(element, time) {
	let action = element.onclick;
	element.style.opacity = 0.5;
	element.onclick = "";
	let i = setInterval(function() {element.style.opacity =parseFloat(element.style.opacity)+(0.5*100/time);}, 100);
	setTimeout(function() {clearInterval(i); element.onclick = action; element.style.opacity = 1;}, time);
}