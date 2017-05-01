
// Initial array of topics
var topics = ["The Big Bang Theory", "NCIS", "Green Arrow"];
        
// Function for displaying topics data
function renderButtons() {


       
$("#buttons-view").empty();


// Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button class = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary'>");
          // Adding a class of giphy to button
          a.addClass("giphy");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
    displayGiphy();
    }     
 
        
// Function that displays gifs for each button into the div
function displayGiphy() {
$("button").on("click", function() {
   
    
        var giphy = $(this).attr("data-name");
        if (giphy === "") {
        alert("Nothing to search for!"); }
        else {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        giphy + "&api_key=dc6zaTOxFJmzC&limit=9&rating=pg";
        console.log("giphy" + giphy);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        console.log(response);
            
        var topicsResults = response.data;
            //clean up div with previous searches to avoid clutter
            $("#gifs-view").empty(topicDisplay); 
            //loop through results of search
            for (var i = 0; i < topicsResults.length; i++) {
                console.log("this is topics results: " + topicsResults);
                var topicDisplay = $("<div class='img-card-square mdl-card mdl-card--border mdl-shadow--2dp'>");
                var rating = topicsResults[i].rating;
                var p = $("<div class = 'mdl-card__supporting-text'>").text("Rating: " + rating + "  " + giphy);
                var giphyImage = $("<img>");
                giphyImage.attr("src", topicsResults[i].images.fixed_height.url);
                topicDisplay.append(p);
                topicDisplay.append(giphyImage);
                $("#gifs-view").append(topicDisplay);
            }
        });
      }
}

)} //end displayGiphy


      //This function handles events where one button is clicked
      $("#add-gifs").on("click", function(event) {
        event.preventDefault();
        
        //grabs the input from the textbox
        var giphy = $("#gifs-input").val().trim();
        //check if we have a valid input in the box
        if (giphy === "") {
        alert("Please enter a valid topic");
        $("#gifs-input").focus();
        } 
          else {
        //will add the topic from the textbox to our array
        topics.push(giphy);
        console.log(topics)
        //call renderButtons which handles the processing of our topic array
        renderButtons();
        $("#gifs-input").val("");            
              }
      });
      //call renderButtons function to display the initial buttons
      renderButtons();
     

