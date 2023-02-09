$(document).ready(() => {
  $("#error").hide();

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(obj) {
    const $tweet = $(`
  <article class="tweet">
  <header>
    <div>
      <i class="fa-solid fa-user-ninja"></i>
      <span>${obj["user"]["name"]}</span>
    </div>
    <div>
      <span>${obj["user"]["handle"]}</span>
    </div>
  </header>
  <p>
    ${escape(obj["content"]["text"])}
  </p>
  <footer>
    <div>
    ${timeago.format(obj["created_at"])}
    </div>
    <div>
      <i class="fa-solid fa-flag icon"></i>
      <i class="fa-solid fa-retweet icon"></i>
      <i class="fa-solid fa-heart icon"></i>
    </div>
  </footer>
</article>
  `);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let tweetHTML = createTweetElement(tweet);
      $('#tweets').append(tweetHTML);
    }
  };

  const loadTweets = function() {
    $.get("/tweets", renderTweets);
  };

  loadTweets();

  $('#form').submit(function(event) {
    let tweet = $('#tweet-text').val();
    
    event.preventDefault();
    if (tweet === "" || tweet.length > 140) {
      alert("Tweet too long or empty.");
      $("#error").show();
    } else {
      $("#error").hide();
      $.post('/tweets', $('#form').serialize()).done(() => loadTweets());
    }
  });
});


