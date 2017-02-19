$(document).ready(function(){

  existingStars = 0;
  starTotalCap = 100

  var makeWordStars = true;
  var makeSymbolStars = true;

  if(makeWordStars == true)
  {
    GenerateRandomWordStar();
  }

  if(makeSymbolStars == true)
  {
    GenerateSymbolStar();
  }

  function GenerateRandomWordStar() {
        var requestStr = "http://randomword.setgetgo.com/get.php";

        $.ajax({
            type: "GET",
            url: requestStr,
            dataType: "jsonp",
            success:
            function(jsonp){
              MakeStar(jsonp.Word);
              existingStars = existingStars + 1;
              if(existingStars < starTotalCap)
              {
                GenerateRandomWordStar();
              }
            }
        });
  }

  function GenerateSymbolStar()
  {
    var starTypes = ['*', '`', "'"];
    for(var i = 0; i < starTotalCap; i++)
    {
      var starType = Math.floor(Math.random() * starTypes.length);
      MakeStar(starTypes[starType]);
    }
  }

  function MakeStar(starContent)
  {
      var starXCoord = Math.random() * screen.width;
      var starYCoord = Math.random() * screen.height;

      $('body').append("<div class='star' style='position: absolute; left:"
                                               + starXCoord + "px; top: "
                                               + starYCoord + "px;'>" + starContent + "</div>");
      Twinkle();
  }

  function Twinkle()
  {
    var colorComponents = '1234567890ABCDEF';
    var newStarColor = '#';
    while(newStarColor.length < 7)
    {
      newStarColor += colorComponents[Math.floor(Math.random() * 16)];
    }

    var starsToSwitchCount = Math.floor(($('.star').length)/20);
    for(var k = 0; k < starsToSwitchCount; k++)
    {
      $('.star')[Math.floor(Math.random() * $('.star').length)].style.color = newStarColor;
    }
  }
});
