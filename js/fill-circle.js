function fillCircle ($obj) {

  console.log($obj);

  var length = $obj.text().length
  var p_html = $obj.text();

  var newPHTML = "";
  // console.log(newPHTML.push("i"));

  var charPerLine = linesInShape(5);

  var circleHeight = [$obj.css("line-height"), $obj.css("padding-top")];

  var r = 0;
  var i = 0;
  while ( i < p_html.length ) {

    r++;

    var k = 0; newPHTML = ""; j = 0;
    for ( i = 0; i < length; i++ ) {

      if ( j >= charPerLine.length ) {
        break;
      }

      if ( k < charPerLine[j] ) {
        newPHTML += p_html[i];
        k++;
      } else {
        newPHTML += p_html[i];
        j++;
        k = 0;
        newPHTML += "<br>";
      }

        // console.log(i, newPHTML);

    }

    if (r > 5) {break}
    charPerLine = linesInShape( j+1 );

  }

  return newPHTML;

}

function linesInShape(lines) {
  var charArray = [];

  for (i = 0; i < lines / 2; i++) {
    charArray[i] = (i+1) * 5;
  }
  for (i = Math.floor(lines / 2); i < lines; i++) {
    charArray[i] = charArray[i-1] - 5;
  }

  return charArray;
}
