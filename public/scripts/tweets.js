// tweets codde
$(document).ready(function() {
  const tweetsData = [
    {
      user: {
        name: "Rosa Frilli",
        avatar: "images/avatar1.png",
        handle: "@Frilli20"
      },
      content: "All that glitters is not gold.",
      created_at: "just now"
    },
    {
      user: {
        name: "Descartes",
        avatar: "images/avatar2.png",
        handle: "@rd"
      },
      content: "Je pense, donc je suis",
      created_at: "1 day ago"
    },
    {
      user: {
        name: "Newton",
        avatar: "images/avatar3.png",
        handle: "@SirIsaac"
      },
      content: "If I have seen further, it is by standing on the shoulders of giants",
      created_at: "10 days ago"
    }
  ];

  // Function to create a tweet element HTML string
  function createTweetElement(tweet) {
    return `
      <article class="tweet">
        <header>
          <div class="profile">
            <img src="${tweet.user.avatar}" class="avatar" alt="User Avatar">
            <span>${tweet.user.name}</span>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p>${tweet.content}</p>
        <footer>
          <span>${tweet.created_at}</span>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  }

  // Function to render tweets
  function renderTweets(tweets) {
    const container = $(".tweets-container");
    container.empty(); 
    tweets.forEach(tweet => {
      container.append(createTweetElement(tweet));
    });
  }

  // Load initial tweets
  renderTweets(tweetsData);
});
