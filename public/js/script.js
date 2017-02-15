$(function(){
  $.getJSON( "./json/quotes.json", function(d) {
    var louisQuotes = [];
    $.each( d.louisTherouxQuotes, function(key,val) {
        for (quote in val [key]){
        louisQuotes.push(JSON.stringify(d.louisTherouxQuotes[key]));
      }
    });
    //console.log(d.louisTherouxQuotes[18]);
    //console.log(louisQuotes);
    $('#therouxButton').on("click", function(){
    // clear the container everytime there is a quote
    $("#therouxQuote").empty();
    //search the array for a randomly indexed item
      var randomQuote = louisQuotes[Math.floor(Math.random() * louisQuotes.length)];
      $( "<p/>", {
        "class": "louisQuotes",
        html: "</br>" + randomQuote + "</br>"
      }).appendTo($( "#therouxQuote" ));
    });
  });
});
