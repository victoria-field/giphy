 var feeling = ["sad", "angry", "happy", "satisfied", "content"];
      // Function for displaying feeling data
      function renderButtons() {
        // Deleting the feeling buttons prior to adding new feeling buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttonView").empty();
        // Looping through the array of feeling
        for (var i = 0; i < feeling.length; i++) {
          // Then dynamicaly generating buttons for each feeling in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("feel");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", feeling[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(feeling[i]);
          // Adding the button to the HTML
          $("#buttonView").append(a);
        }
      }
      // This function handles events where one button is clicked
      $("#add-feeling").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var feel = $("#gifInput").val().trim();
        // The feeling from the textbox is then added to the array
        feeling.push(feel);
        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

       // Calling the renderButtons function at least once to display the initial list of feeling
      renderButtons();


      $("#add-feeling").on("click", function() {
        alert("click");
      
      // this is a problem
       var felt = $(this).attr(feeling);
       var api_key = "bca0e4aeaf744d878081cf4727f2b867";
       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + feeling +"&api_key=" + api_key + "&limit=10";

       $.ajax({
         url: queryURL,
         method: "GET"


       })
     

      .done(function(response) {
        alert(response);

        var results = response.data;

       for (var i = 0; i < results.length; i++){
         var gifDiv = $("<div class = 'gifs-appear-here1'>");
         var rating = results[i].rating;
         var p = $("<p>").text("Rating: " + rating);
         var feelImage = $("<img>");
         alert(results.length);
                
         var animateImage = results[i].images.fixed_height.url;
         var staticImage = results[i].images.fixed_height_still.url;
            

         feelImage.attr("src", results[i].images.fixed_height.url);
         alert(results[i].images.fixed_height.url);
         feelImage.attr("data-state", "still");
         feelImage.attr("data-still", staticImage);
         feelImage.attr("data-animate", animateImage);

         gifDiv.append(p);
         alert("p");
         gifDiv.append(feelImage);
         alert(feelImage);

         $(".gifs-appear-here").prepend(gifDiv);
       }


       });
    });
      $(".gifs-appear-here1").on("click", function() {
        alert("img");
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        alert("still to animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        alert("animate to still");
      }
    });