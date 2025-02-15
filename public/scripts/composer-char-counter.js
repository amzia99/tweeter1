// character count code
// DOM loading
$(document).ready(function() {
  // event listerner
  $("#tweet-text").on("input", function() {
    
    let maxLength = 140;  
    let currentLength = $(this).val().length;  
    let remainingChars = maxLength - currentLength; 

    // Find the counter element within the new tweet container
    let counterElement = $(this).closest("form").find(".counter");

    // Update the counter in real-time
    counterElement.text(remainingChars);

    // Toggle color if the limit is exceeded
    if (remainingChars < 0) {
      counterElement.addClass("invalid"); // Adds red color when exceeded
    } else {
      counterElement.removeClass("invalid"); // Removes red color when valid
    }
  });
});


