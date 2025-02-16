// client side code

$(document).ready(function() {
  
  // Function to create a tweet element
  const createTweetElement = function(tweet) {
    const { name, avatar, handle } = tweet.user;
    const { content, created_at } = tweet;

    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${avatar}" alt="User Avatar">
            <h3>${name}</h3>
          </div>
          <span class="handle">${handle}</span>
        </header>
        <p class="tweet-content">${content}</p>
        <footer>
          <span class="timestamp">${created_at}</span>
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
      $('#tweets-container').append($tweetElement);
    });
  };

  // Test Code to render tweets
  const tweetsData = [
    {
      user: {
        name: "Sun Tzu",
        avatar: "images/suntzu.png", 
        handle: "@Tzu771"
      },
      content: "Appear weak when you are strong, and strong when you are weak.",
      created_at: "just now"
    },
    {
      user: {
        name: "Napoleon Bonaparte",
        avatar: "images/napoleon.png", 
        handle: "@Bonaparte769"
      },
      content: "My enemies are many, my equals are none.",
      created_at: "1 day ago"
    },
    {
      user: {
        name: "Alexander the Great",
        avatar: "images/alex.png", 
        handle: "@Alex356"
      },
      content: "There is nothing impossible to him who will try.",
      created_at: "10 days ago"
    }
  ];

  // renderTweets to test tweets
  renderTweets(tweetsData);

});
