// DOM loading
$(document).ready(function() {
  // Event listener
  $("#tweet-text").on("input", function() {
    let maxLength = 140;
    let currentLength = $(this).val().length;
    let remainingChars = maxLength - currentLength;

    // ✅ Ensure the counter is correctly found
    let counterElement = $(this).closest("form").find(".counter");
    counterElement.text(remainingChars);

    // ✅ Toggle red color for negative count
    counterElement.toggleClass("invalid", remainingChars < 0);
  });
});
