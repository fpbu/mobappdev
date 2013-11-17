// Set the event listener to run when the device is ready
        document.addEventListener("deviceready", onDeviceReady, false);
    
        //device is ready so let's grab the geolocation data
        function onDeviceReady() {
            navigator.geolocation.watchPosition(onSuccess, onError,{maximumAge: 5000, timeout: 15000, enableHighAccuracy: true});
            startWatch();
        }           

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



///////////////////////////////////

// Poll the accelerometer at intervals
            function startWatch() {
                //alert("startwatch");
                // Set the frequency of updates
                // from the acceleration
                var options = { frequency: 300 };
                // Set attributes for buttons
                document.getElementById('startBtn').disabled = true;
                document.getElementById('stopBtn').disabled = false;
                // Assign watchAcceleration to the watchID variable
                // and pass through the options array
                watchID = navigator.accelerometer.watchAcceleration(onAccSuccess, onAccError, options);
            }

            // Stop watching the acceleration
            function stopWatch() {
                if (watchID) {
                    navigator.accelerometer.clearWatch(watchID);
                    watchID = null;
                    var element = document.getElementById('accelerometerData');
                    element.innerHTML = 'Polling Accelerometer: OFF.'
                    // Set attributes for control buttons
                    document.getElementById('startBtn').disabled = false; 
                    document.getElementById('stopBtn').disabled = true;
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