/*
 * Client-side JS logic
 * jQuery is already loaded
 */

$(document).ready(function () {
  // Escape text to prevent XSS (alternate to using .text())
  const escape = function (str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create a tweet element using template literals
  const createTweetElement = function (tweet) {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const timeAgo = timeago.format(tweet.created_at);

    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${avatars}" alt="User Avatar">
            <h3>${escape(name)}</h3>
          </div>
          <span class="handle">${escape(handle)}</span>
        </header>
        <p class="tweet-content"></p>
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

    $tweet.find(".tweet-content").text(text); // Securely insert content
    return $tweet;
  };

  // Render array of tweets
  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    tweets.forEach(tweet => {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement.hide().fadeIn(400));
    });
  };

  // Load tweets from server
  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets", // Change to /api/tweets if needed
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (err) {
        console.error("Error loading tweets:", err);
      }
    });
  };

  // Toggle tweet form and rotate icon
  $("#compose-button").on("click", function () {
    $(".new-tweet").slideToggle(300, function () {
      if ($(this).is(":visible")) {
        $("#tweet-area").focus();
      }
    });
    $(".nav-tweet i").toggleClass("rotate-icon");
  });

  // Show error with animation
  const showError = function (message) {
    const $error = $(".error-msg");
    $error.find("p").text(message);
    $error.slideDown();
  };

  // Hide error message
  const hideError = function () {
    $(".error-msg").slideUp();
  };

  // Tweet validation
  const validateTweet = function (text) {
    if (!text) {
      showError("🚨 Tweet cannot be empty!");
      return false;
    }
    if (text.length > 140) {
      showError("🚨 Tweet exceeds 140 character limit!");
      return false;
    }
    hideError();
    return true;
  };

  // Submit handler
  $("#tweet-submission").on("submit", function (event) {
    event.preventDefault();
    const tweetText = $("#tweet-area").val().trim();

    if (!validateTweet(tweetText)) {
      return;
    }

    const tweetData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/tweets", // Change to /api/tweets if your server requires
      data: tweetData,
      success: function () {
        $("#tweet-area").val("");
        $("#counter").text("140");
        loadTweets();
      },
      error: function (err) {
        console.error("Error submitting tweet:", err);
      }
    });
  });

  // Initialize
  hideError();
  loadTweets();
});
