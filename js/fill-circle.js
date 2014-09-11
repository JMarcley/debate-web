function fillCircle ($obj) {

  var length = $obj.text().length
  var p_html = $obj.text();

  var newPHTML = "";


  var charPerLine = linesInShape(2);

  var circleHeight = [$obj.css("line-height"), $obj.css("padding-top")];

  var w = 0, p, q, charsThisLine, t, n = 1;
  while ( w < length ) {

    newPHTML = "";
    w = 0;
    charPerLine = linesInShape( n );

    for (p = 0; p < charPerLine.length; p++) {

      // determine how many character spaces before a line break
      // value stored in charsThisLine variable
      for (q = charPerLine[p]; q > 0; q--) {
        // console.log(w,q, p_html[w+q]);
        if ( p_html[w + q] === " ") {
          charsThisLine = q;
          break;
        }
      }

      for (t = 0; t < charsThisLine; t++){
        if (p_html[w+t] !== undefined) {
          newPHTML += p_html[w + t];
        }
      }

      w += charsThisLine + 1;

      if (w < length) {
        newPHTML += "<br>";
      }


    }

    n++;

  }



  return "<p>" + newPHTML + "</p>";
}


function linesInShape(lines) {
  var charArray = [];

  if (lines % 2 === 0) {
    for (i=0; i < lines / 2; i++) {
      charArray[i] = (i+1) * 10;
    }
    for (i = Math.floor(lines/2); i < lines; i++) {
      charArray[i] = charArray[lines-i-1];
    }
  } else {
    for (i=0; i < lines/2; i++) {
      charArray[i] = (i+1) * 10;
    }
    for (i = Math.ceil(lines/2); i < lines; i++) {
      charArray[i] = charArray[lines - i - 1];
    }
  }

  return charArray;
}
