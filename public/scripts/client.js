/*
 * Client-side JS logic
 * jQuery is already loaded
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Generates html layout for each tweet
function createTweetElement(tweetObject) {
    const {user, content, created_at} = tweetObject;
    const contentText = escape(content.text)

    const tweet = `<article class="posted-tweet">
                    <div class="tweet-header">
                      <div class="tweet-header-left">
                        <img class = "tweet-header-avatar" src="${user.avatars}" alt="user avatar"/>
                        <span>${user.name}</span>
                      </div>              
                      <p><a href="#">${user.handle}</a></p>
                    </div>
                    <h4>${contentText}</h4>
                    <div class="tweet-footer">
                      <span>${timeago.format(created_at)}</span>
                      <div class="tweet-icons">              
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </div>
                    </div>
                  </article>`
    return tweet
}

$(document).ready(function() {
  $(".error-msg").hide();

  //Renders tweets that are submitted to the page
  function renderTweets(tweetsData) {
    for (let tweet of tweetsData) {
      const postedTweet = createTweetElement(tweet);
      $("#tweets-container").append(postedTweet);
    }
  }
  
  //Error handling for incorrect form submissions
  function tweetValidation(tweetText) {
    if (!tweetText) {
      $(".error-msg").slideDown();
    } else if (tweetText.length > 140) {
      $(".error-msg").slideDown();
    } else {
      $(".error-msg").hide();
      return true
    }
  }

//Ajax request in form submission to load tweet asynchronously 
  $("form").submit(function(event) {
    event.preventDefault();
    const tweet = $("#tweet-area").val();
    const isValid = tweetValidation(tweet);
    if (isValid) {
      const query = $(this).serialize();
      $.post("/api/tweets", query).then(function(res){
         console.log(res, "Response is working");
         loadTweets();
      });
    }
    
  })

//renders tweets from JSON in /tweets url
  function loadTweets() {
    $.getJSON("/api/tweets", {}, function(res) {
      $('#tweets-container').empty();
      renderTweets(res.reverse());
      $("#tweet-area").val("");
      console.log("GET request successfull!");
    }).done(function() {
      $('#tweet-area').val('');
      $('#counter').html(140);
      $('#error-msg').slideUp();
      $(".submit-tweet").trigger("reset");
    });
  }
  loadTweets();

});