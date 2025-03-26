$(document).ready(function() {
  const maxLength = 140;

  // Listen for input changes in the tweet textarea
  $("#tweet-area").on("input", function() {
    const currentLength = $(this).val().length;
    const remainingChars = maxLength - currentLength;

    // Find the counter element relative to this form
    const counter = $(this).closest("form").find("#counter");

    // Update the counter text
    counter.text(remainingChars);

    // Add or remove the 'red' class if over character limit
    counter.toggleClass("red", remainingChars < 0);
  });
});
