// v2.0

var currentCamKey = 0;

// get the camera data from the json file
var cameraData = JSON.parse(cameras);

var timeElement;
var imageElement;
var staticElement;
var nameElement;

// init the element variables upon the page loading up
function init() {
  // init the element variables once the page is loaded
  imageElement = document.getElementById('camera-image');
  staticElement = document.getElementById('camera-static');
  timeElement = document.getElementById('camera-time');
  nameElement = document.getElementById('camera-name');

  setCameraImageAndName(0);

  // set the cameras to camera key 0
  setCameraImageAndName(0);


  setInterval(() => {updateTime()}, 87);
}

// run this every time the screen gets clicked
function changeCameraScreen() {
  // increment through the cameras and make sure it loops
  currentCamKey = (currentCamKey + 1) % cameraData.length;

  // reset the animation for the screen filters and change the camera
  imageElement.style.animation = 'none';
  imageElement.offsetHeight;
  imageElement.style.animation = null;

  // reset the static flash animation upon screen change
  staticElement.style.animation = 'none';
  staticElement.offsetHeight;
  staticElement.style.animation = null;

  // set the camera name
  setCameraImageAndName(currentCamKey);
}

function updateTime() {
  // set the camera time every x milliseconds to central time, adjusted from the user's timezone
  var time = calcTimeCST();
  timeElement.innerHTML = (formatDigit(time.getHours()) + ":" + formatDigit(time.getMinutes()) + ":" + formatDigit(time.getSeconds()) + ":" + formatDigit(time.getMilliseconds()));
}

function calcTimeCST() {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*-6));
    return nd;
}

// make sure numbers in the camera time are always 2 digits
function formatDigit(number){
  var string = number.toString();
  if(string.length != 1){
    return (string.slice(0, 2));
  } else {
    return ("0" + string);
  }
}

function setCameraImageAndName(key){
  var parentNode = imageElement.parentNode;
  imageElement.remove()

  var newImageElement = new Image()
  newImageElement.setAttribute('id', 'camera-image');
  parentNode.appendChild(newImageElement);

  imageElement = newImageElement;

  imageElement.src = getCameraImage(currentCamKey);
  nameElement.innerHTML = getCameraName(currentCamKey);
}

// assume the camera data name is a .gif file and is in the assets folder
function getCameraImage(key) {
  return ("assets/" + cameraData[key]["imgsrc"] + ".gif");
}

// this should work with any text put in the json file
function getCameraName(key) {
  return ("< " + cameraData[key]["name"] + " >");
}
