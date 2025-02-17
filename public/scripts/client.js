// client side code
$(document).ready(function() {

  // Function to create a tweet element
  const createTweetElement = function(tweet) {
    const { name, avatars, handle } = tweet.user; 
    const { text } = tweet.content; 
    const timeAgo = timeago.format(tweet.created_at); 

    // Prevent XSS attacks
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${avatars}" alt="User Avatar">
            <h3>${name}</h3>
          </div>
          <span class="handle">${handle}</span>
        </header>
        <p class="tweet-content"></p> <!-- ✅ Empty paragraph -->
        <footer>
          <span class="timestamp">${timeAgo}</span>
          <div class="tweet-actions">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    $tweet.find(".tweet-content").text(text); // Securely set text content

    return $tweet;
  };

  // Function to render tweets
  const renderTweets = function(tweets) {
    $('#tweets-container').empty(); 

    tweets.forEach(tweet => {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement.hide().fadeIn(500)); 
    });
  };

  // Function to load tweets from the server
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/api/tweets",
      success: function(tweets) {
        console.log("Loaded tweets:", tweets); 
        renderTweets(tweets);
      },
      error: function(err) {
        console.error("Error loading tweets:", err);
      }
    });
  };

  // Toggle the tweet form when clicking Write a new tweet
  $("#compose-button").on("click", function() {
    $(".tweet-form-container").slideToggle(300, function() {
      if ($(this).is(":visible")) {
        $("#tweet-text").focus(); // Auto-focus on textarea
      }
    });

    // Rotate the down arrow icon
    $(".nav-tweet i").toggleClass("rotate-icon");
  });

  // Function to display validation errors
  const showError = function(message) {
    let $errorContainer = $(".error-message");

    // Ensure the error container exists
    if ($errorContainer.length === 0) {
      $("#tweet-form").before('<div class="error-message"></div>');
      $errorContainer = $(".error-message");
    }

    // Show error with smooth animation
    $errorContainer.text(message).slideDown();
  };

  // Function to hide errors before validation starts
  const hideError = function() {
    $(".error-message").slideUp();
  };

  // AJAX Form for new tweet submission
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault(); 

    // Hide error message before validation
    hideError();

    // Retrieve and trim form input
    const tweetText = $("#tweet-text").val().trim();

    // Prevent submitting empty tweets
    if (tweetText === "") {
      showError("🚨 Error: Tweet cannot be empty!"); 
      return;
    }

    // Prevent tweeting over 140 characters
    if (tweetText.length > 140) {
      showError("🚨 Error: Tweet exceeds 140 characters!"); 
      return;
    }

    // Serialize form data
    const tweetData = $(this).serialize();

    // Send the POST request using AJAX
    $.ajax({
      type: "POST",
      url: "/api/tweets",
      data: tweetData,
      success: function(response) {
        console.log("Tweet submitted successfully:", response);

        // Clear the textarea after submission
        $("#tweet-text").val("");
        $(".counter").text("140");

        // Directly add the new tweet instead of fetching all again
        const $newTweet = createTweetElement(response);
        $('#tweets-container').prepend($newTweet.hide().fadeIn(500).addClass("new-tweet"));

        // Highlight effect for new tweets
        setTimeout(() => $newTweet.removeClass("new-tweet"), 2000);
      },
      error: function(err) {
        console.error("Error submitting tweet:", err);
      }
    });
  });

  // Hide error message on page load
  $(".error-message").hide();

  // Load initial tweets when the page loads
  loadTweets();
});
