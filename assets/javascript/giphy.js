
var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret",
               "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil",
               "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander",
               "frog", "horse", "fennec fox", "percheron"];

var limit = 10;


$(document).ready(function() {

  // Create initial buttons
  for(var i = 0; i < animals.length; i++) {
    createButton(animals[i]);
  }

  // Creates a new button with the specified name and adds it to the page
  function createButton(name) {
    var newButton = $("<button>", {
      text: name,
      class: "animalButton"
    });

    $("#animal-buttons").append(newButton);
  }

  // Event handler for adding a new animal
  $("#add-animal").on("click", function() {
    event.preventDefault();
    createButton($("#animal-input").val().trim());
    $("#animal-input").val("");
  });


  // Event handler for clicking on the animal buttons
  $(document).on("click", ".animalButton", function() {

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=omLnc01SkEE8npkH2LF67gWUKZTXGf9P"
                    + "&limit=" + limit + "&q=" + $(this).text().trim().replace(" ", "+");

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Clear out the current pictures
      $("#animals").empty();

      // For each image returned by the search, add it to the page
      for(var i = 0; i < limit; i++) {

        var staticURL = response.data[i].images.fixed_height_still.url;
        var animatedURL = response.data[i].images.fixed_height.url;
        var rating = response.data[i].rating.toUpperCase();

        var newImage = $("<img>", {
          src : staticURL,
          class : "staticImg",
          "data-still" : staticURL,
          "data-animated" : animatedURL
        });

        var newDiv = $("<div>").attr("class", "image-wrapper");
        var ratingText = $("<p>").text("Rating: " + rating);

        newDiv.append([ratingText, newImage]);

        $("#animals").append(newDiv);
      }
    });
  });

  // Clicking on a static image makes it animated
  $(document).on("click", ".staticImg", function() {
    $(this).attr("src", $(this).data("animated"));
    $(this).attr("class", "animatedImg");
  });

  // Clicking on an animated image makes it static
  $(document).on("click", ".animatedImg", function() {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("class", "staticImg");
  });

});

