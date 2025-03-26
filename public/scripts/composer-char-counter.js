// Character counter logic
$(document).ready(function () {
  const MAX_CHAR = 140;

  $("#tweet-text").on("input", function () {
    const inputLength = $(this).val().length;
    const remaining = MAX_CHAR - inputLength;

    // Find the nearest counter element
    const $counter = $(this).closest("form").find(".counter");

    // Update counter display
    $counter.text(remaining);

    // Toggle red color when over the limit
    if (remaining < 0) {
      $counter.addClass("red");
    } else {
      $counter.removeClass("red");
    }
  });
});
