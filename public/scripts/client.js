// client side code
const createTweetElement = function(tweet) {
  const { name, avatars, handle } = tweet.user;
  const { text } = tweet.content;
  const timeAgo = timeago.format(tweet.created_at); // Use timeago.js to format the timestamp

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


