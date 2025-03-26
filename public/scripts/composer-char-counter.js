// Character counter logic
$(document).ready(function() {
  // --- our code goes here ---
 const maxLength = 140;
 const tweetArea = $('#tweet-area');
 const counter = $('#counter');

 $(tweetArea).on('input', function() {
   const characters = $(this).val().length;
   let remainingChars = maxLength - characters;
   counter.text(remainingChars);
   if (remainingChars < 0) {
     counter.addClass("red");
   } else {
     counter.removeClass("red");
   }
   
 });

 
});
