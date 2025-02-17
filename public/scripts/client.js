// Client side code

$(document).ready(function() {

  // Function to create a tweet element
  const createTweetElement = function(tweet) {
    const { name, avatars, handle } = tweet.user; 
    const { text } = tweet.content; 
    const timeAgo = timeago.format(tweet.created_at); 

    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${avatars}" alt="User Avatar">
            <h3>${name}</h3>
          </div>
          <span class="handle">${handle}</span>
        </header>
        <p class="tweet-content">${text}</p>
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

    return $tweet;
  };

  // Function to render tweets
  const renderTweets = function(tweets) {
    $('#tweets-container').empty(); 

    tweets.forEach(tweet => {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement.hide().fadeIn(500)); // Smooth fade-in effect
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

  // Function to display validation errors
  const showError = function(message) {
    $(".error-message").text(message).slideDown(); // Smooth error display
    setTimeout(() => $(".error-message").slideUp(), 3000); // Auto-hide after 3 seconds
  };

  // AJAX Form for new tweet submission
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault(); 

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

        // Reload tweets to show the new one
        loadTweets();
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
