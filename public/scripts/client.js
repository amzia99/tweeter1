// client side code
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
      $('#tweets-container').prepend($tweetElement); 
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

  // AJAX Form for new tweet submisison
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault(); 

    // Serialize form data
    const tweetData = $(this).serialize();
    const tweetText = $("#tweet-text").val().trim();

    // Prevent submitting empty tweets
    if (tweetText === "") {
      alert("Tweet cannot be empty!"); // Simple validation
      return;
    }

    // Prevent tweeting over 140 characters
    if (tweetText.length > 140) {
      alert("Tweet exceeds 140 characters!"); 
      return;
    }

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

  // Load initial tweets when the page loads
  loadTweets();
});
