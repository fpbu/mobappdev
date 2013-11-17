//////////////////////////////////
// Set the event listener to run when the device is ready
document.addEventListener("deviceready", onDeviceReady, false);
//after device is start getting data

function onDeviceReady() {
    watchGeo();
    //watchAcc();
    recordPrepare();
}  
//////////////////////////////////

// Poll the accelerometer at intervals
function watchAcc() {
    // Set the frequency of updates
    // from the acceleration
    var options = { frequency: 300 };
    // Assign watchAcceleration to the watchID variable
    // and pass through the options array
    watchID = navigator.accelerometer.watchAcceleration(onAccSuccess, onAccError, options);
}

// Stop watching the accelerometer
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        var element = document.getElementById('accelerometerData');
        element.innerHTML = 'Polling Accelerometer: OFF.';
    }
}

// Run after successful transaction
// Let's display the accelerometer data
function onAccSuccess(acceleration) {
    var element = document.getElementById('accelerometerData');
    element.innerHTML = 'X: ' + acceleration.x + '<br />' +
                        'Y: ' + acceleration.y + '<br />' +
                        'Z: ' + acceleration.z + '<br />' +
                        'Timestamp: ' + acceleration.timestamp + '<br />';
}

// Run if we get an error accessing sensor data
function onAccError() {
    var element = document.getElementById('accelerometerData');
    element.innerHTML = 'unable to access sensor data...';
}


/////////////////////////////////////////////////////
// GEOLOCATION CODE
/////////////////////////////////////////////////////

function watchGeo(){
        navigator.geolocation.watchPosition(onSuccess, onError,
                                            {maximumAge: 5000, 
                                             timeout: 15000, 
                                             enableHighAccuracy: true}
                                       );}

// after successful transaction display the position data
function onSuccess(position) {
   var geoElement = document.getElementById('geolocationData');
    geoElement .innerHTML = 'Latitude: '  + position.coords.latitude + '<br />' +
     'Longitude: ' + position.coords.longitude + '<br />' +
     'Altitude: '  + position.coords.altitude + '<br />' +
     'Accuracy: '  + position.coords.accuracy + '<br />' +
     'Altitude Accuracy: ' +
     position.coords.altitudeAccuracy + '<br />' +
     'Heading: ' + position.coords.heading  + '<br />' +
     'Speed: '   + position.coords.speed + '<br />' +
     'Timestamp: ' + position.timestamp + '<br />';
}

// Run if we face an error getting the position data
function onError(error) {
  var errString = '';
  // Check to see if we have received an error code
  if(error.code) {
    // If we have, handle it by case
    switch(error.code)
    {
      case 1: // PERMISSION_DENIED
      errString =
          'Unable to obtain the location information ' +
          'because the device does not have permission '+
          'to the use that service.';
      break;
      case 2: // POSITION_UNAVAILABLE
        errString =
          'Unable to obtain the location information ' +
          'because the device location could not ' +
          'be determined.';
      break;
      case 3: // TIMEOUT
        errString =
          'Unable to obtain the location within the ' +
          'specified time allocation.';
      break;
      default: // UNKOWN_ERROR
        errString =
          'Unable to obtain the location of the ' +
                         'device due to an unknown error.';
             break;
} }
         // Handle any errors we may face
         var element = document.getElementById('geolocationData');
          element.innerHTML = errString;
       }

//////////////////////////////////////////////////
// AUDIO NOTE RECORDER
//////////////////////////////////////////////////
var maxTime = 10,
    countdownInt = 3,
    src,
    audioRecording,
    stopRecording;

function recordPrepare() {
           $('#record').unbind();
           $('#record').html('Start Recording!');
           $('#record').bind('touchstart', function() { recordAudio();
           });
}

function recordAudio() {
       $('#record').unbind();
       $('#record').html('Stop Recording!');
       $('#record').bind('touchstart', function() {
           stopRecording();
       });

       src = 'recording_' + Math.round(new Date().getTime()/1000) + '.mp3';
       audioRecording = new Media(src, onAudioSuccess, onAudioError);
       var startCountdown = setInterval(function() {
           $('#message').html('Recording will start in ' + 
                              countdownInt + ' seconds...');
           countdownInt = countdownInt -1;
           if(countdownInt <= 0) {
               countdownInt = 3;
               clearInterval(startCountdown);
               audioRecording.startRecord();
               var recTime = 0;
                   recInterval = setInterval(function() {
                   recTime = recTime + 1;
                   $('#message').html(Math.round(maxTime - recTime) + ' seconds remaining...');
                    var progPerc = 100-((100/maxTime) * recTime);
                       if (recTime >= maxTime) {
                           stopRecording();
                       }    
                   }, 1000); }
       }, 1000); }

function stopRecording() {
           clearInterval(recInterval);
           audioRecording.stopRecord();
           recordPrepare();
}

function onAudioSuccess() {
    $('#message').html('Audio Note created!:<br />' + src);
}
function onAudioError(error) {
    $('#message').html('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
