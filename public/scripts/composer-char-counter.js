// character count code
$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    let maxLength = 140;
    let currentLength = $(this).val().length;
    let remainingChars = maxLength - currentLength;

    let counterElement = $(this).closest(".new-tweet").find(".counter");
    counterElement.text(remainingChars);

    // CSS styling class
    counterElement.toggleClass("invalid", remainingChars < 0);
  });
});

