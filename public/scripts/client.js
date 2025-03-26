/*
 * Client-side JS logic
 * jQuery is already loaded
 */

$(document).ready(function () {
  const MAX_LENGTH = 140;

  // Escape input to prevent XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Generate tweet HTML from object
  const createTweetElement = function (tweet) {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const timeAgo = timeago.format(tweet.created_at);

    const safeText = escape(text);

    return $(
      `<article class="posted-tweet">
        <div class="tweet-header">
          <div class="tweet-header-left">
            <img class="tweet-header-avatar" src="${avatars}" alt="User avatar"/>
            <span>${name}</span>
          </div>
          <p><a href="#">${handle}</a></p>
        </div>
        <h4>${safeText}</h4>
        <div class="tweet-footer">
          <span>${timeAgo}</span>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </article>`
    );
  };

  // Render all tweets
  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  // Load tweets from server
  const loadTweets = function () {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (err) {
        console.error("Error loading tweets:", err);
      }
    });
  };

  // Show error message
  const showError = function (message) {
    const $errorBox = $(".error-msg");
    $errorBox.text(message).slideDown();
  };

  // Hide error
  const hideError = function () {
    $(".error-msg").slideUp();
  };

  // Form submission handler
  $('#tweet-submission').on('submit', function (event) {
    event.preventDefault();
    hideError();

    const tweetText = $('#tweet-area').val().trim();

    if (!tweetText) {
      return showError("⚠️ Tweet cannot be empty!");
    }

    if (tweetText.length > MAX_LENGTH) {
      return showError("⚠️ Tweet exceeds 140 characters!");
    }

    const formData = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function () {
        $('#tweet-area').val('');
        $('#counter').text(MAX_LENGTH);
        loadTweets();
      },
      error: function (err) {
        console.error("Error submitting tweet:", err);
      }
    });
  });

  // Toggle compose form visibility
  $('#compose-button').on('click', function () {
    $('.new-tweet').slideToggle(300, function () {
      if ($(this).is(':visible')) {
        $('#tweet-area').focus();
      }
    });
    $('.nav-tweet i').toggleClass('rotate-icon');
  });

  // Initial state
  $('.error-msg').hide();
  loadTweets();
});

