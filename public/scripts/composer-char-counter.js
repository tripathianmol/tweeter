$("document").ready(function() {
  // --- our code goes here ---
  console.log("Document Ready.");

  $("#tweet-text").keyup(function() {
    let tweetLength = 140;
    let text = $(this).val();
    let length = tweetLength - text.length;
    $(".counter").val(length);
    if (length < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});


