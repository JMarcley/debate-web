function fillCircle ($obj) {

  var length = $obj.text().length
  var p_html = $obj.text();

  var newPHTML = "";
  // console.log(newPHTML.push("i"));

  var charPerLine = linesInShape(5);

  var circleHeight = [$obj.css("line-height"), $obj.css("padding-top")];

  var i = 0;
  while ( i < p_html.length ) {

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

    }

    // console.log(i, p_html.length);
    // console.log(charPerLine);
    charPerLine = linesInShape( j+1 );

  }

  return newPHTML;

}

function linesInShape(lines) {
  var charArray = [];

  if (lines % 2 === 0) {
    for (i=0; i < lines / 2; i++) {
      charArray[i] = (i+1) * 5;
    }
    for (i = Math.floor(lines/2); i < lines; i++) {
      charArray[i] = charArray[lines-i-1];
    }
  } else {
    for (i=0; i < lines/2; i++) {
      charArray[i] = (i+1) * 5;
    }
    for (i = Math.ceil(lines/2); i < lines; i++) {
      charArray[i] = charArray[lines - i - 1];
    }
  }

  return charArray;
}
