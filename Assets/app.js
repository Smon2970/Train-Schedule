

    var config = {
      apiKey: "AIzaSyCaZk6PIwFugTZgMxU0qxCfhbrmWxzctyw",
      authDomain: "train-schedule-99373.firebaseapp.com",
      databaseURL: "https://train-schedule-99373.firebaseio.com",  
      projectId: "train-schedule-99373",
    };
    firebase.initializeApp(config);

  var database = firebase.database();
  // var Trainname = "";
  // var TrainDestination = "";
  // var TrainTime = moment();


  setInterval(function(){
    $('.time').html(moment().format('hh:mm:ss A'))
  }, 1000);

  // on submit//
    $(".submit").on('click', function(event) {
      event.preventDefault();

        //grab input values//
        var Trainname = $("#trainName").val().trim();
        var TrainDestination = $("#trainDestination").val().trim();
        var TrainTime = $("#trainTime").val().trim();
        var frequency= $("#frequency").val().trim();

        // console.log(Trainname)
        // console.log(TrainDestination)
        // console.log(TrainTime)
        console.log(frequency)

            database.ref().push({
              name: Trainname,
              destination: TrainDestination,
              time: TrainTime,
              frequency: frequency,
            });
            
    });

      database.ref().on("child_added", function(childSnapshot) {

        var Name = childSnapshot.val().name;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTime = childSnapshot.val().time;
        var firebaseFrequency = childSnapshot.val().frequency;

       if(Name){
        $("#newTable > tbody").append("<tr><td>" +Name + "</td><td>" + firebaseDestination +  "</td><td>" + firebaseFrequency +  "</td><td>" + firebaseTrainTime + "</td></tr>");
       };

      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);

        var diffTime = moment().diff(moment.unix(firebaseTrainTime), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTime), "minutes") % firebaseFrequency;
        var minutes = firebaseFrequency - timeRemainder;
      
        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
        
      
      });
  