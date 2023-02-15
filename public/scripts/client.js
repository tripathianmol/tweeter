$(document).ready(() => {
  $("#error").hide();
  $("#emptyError").hide();
  $("#lengthError").hide();

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Creates individual tweet element
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

  // Renders all tweets to the tweets section
  const renderTweets = function(tweets) {
    let tweetsArray = [];
    for (let tweet of tweets) {
      let tweetHTML = createTweetElement(tweet);
      tweetsArray.push(tweetHTML);
    }

    // Append in reverse
    for (let i = tweetsArray.length - 1; i >= 0; i--) {
      $('#tweets').append(tweetsArray[i]);
    }
  };

  // Loads tweets and renders data
  const loadTweets = function() {
    $.get("/tweets", renderTweets);
  };

  // Load the tweets on page load
  loadTweets();

  // Add tweet to tweets container
  $('#form').submit(function(event) {
    let tweet = $('#tweet-text').val();
    
    event.preventDefault();
    if (tweet === "") {
      $("#error").show();
      $("#lengthError").hide();
      $("#emptyError").show();
    } else if (tweet.length > 140) {
      $("#error").show();
      $("#emptyError").hide();
      $("#lengthError").show();
    } else {
      $("#error").hide();
      $("#emptyError").hide();
      $("#lengthError").hide();
      $("#tweets").empty(); //empty tweets container
      $.post('/tweets', $('#form').serialize())
        .done(() => {
          loadTweets();
          $('#tweet-text').val("");
          $('.counter').val("140");
        })
        .catch(() => {
          alert("Error posting tweet.");
        });
    }
  });
});


