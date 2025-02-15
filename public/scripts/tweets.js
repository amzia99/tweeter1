$(document).ready(function() {
  // ✅ Hardcoded tweets data
  const tweetsData = [
    {
      user: {
        name: "Sun Tzu",
        avatar: "images/suntzu.png", // ✅ Ensure correct path
        handle: "@Tzu771"
      },
      content: "Appear weak when you are strong, and strong when you are weak.",
      created_at: "just now"
    },
    {
      user: {
        name: "Napoleon Bonaparte",
        avatar: "images/napoleon.png", // ✅ Ensure correct path
        handle: "@Bonaparte769"
      },
      content: "My enemies are many, my equals are none.",
      created_at: "1 day ago"
    },
    {
      user: {
        name: "Alexander the Great",
        avatar: "images/alex.png", // ✅ Ensure correct path
        handle: "@Alex356"
      },
      content: "There is nothing impossible to him who will try.",
      created_at: "10 days ago"
    }
  ];

  // ✅ Function to escape user input to prevent XSS attacks
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // ✅ Function to create a tweet element HTML string
  function createTweetElement(tweet) {
    return `
      <article class="tweet">
        <header>
          <div class="profile">
            <img src="${escape(tweet.user.avatar)}" class="avatar" alt="User Avatar">
            <span>${escape(tweet.user.name)}</span>
          </div>
          <span class="handle">${escape(tweet.user.handle)}</span>
        </header>
        <p>${escape(tweet.content)}</p>
        <footer>
          <span>${escape(tweet.created_at)}</span>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  }

  // ✅ Function to render tweets dynamically
  function renderTweets(tweets) {
    const container = $(".tweets-container");
    
    // ✅ Debugging: Check if container exists
    if (container.length === 0) {
      console.error("❌ Error: .tweets-container not found.");
      return;
    }

    container.empty(); // ✅ Clear existing tweets before rendering

    const tweetElements = tweets.map(tweet => createTweetElement(tweet));
    container.append(tweetElements.join("")); // ✅ Optimized DOM manipulation
  }

  // ✅ Load initial tweets on page load
  renderTweets(tweetsData);
});
