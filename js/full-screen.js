function onScreenLoad() {

  $( "#close-icon" ).on( "click", function () {
    $("#debate-web-full").remove();
  });


  $.getJSON("js/web-data-3.json", function(web_data) {

    // console.log(web_data);
    var claimsToDisplay = 5;
    var topClaims = topSubclaims(web_data);

    var num_subs = topClaims.length;
    var centerCent = 0.9; //percentage of fullscreen area for web
    var containerWidth = $("#debate-web-full").width();
    var containerHeight = $("#debate-web-full").height();
    var width = 0.4 * containerWidth * centerCent;



    loadGeneralToCenter(web_data);
    displayGeneral(width, centerCent, containerWidth, containerHeight);


    var height = $("#general-claim").height();
    var widthTuner = 1;
    var heightTuner = 1.75;


    if (web_data.claims.length <= claimsToDisplay) {
      var topClaimsWebOrdered = claimWebArrangement(topClaims);
      loadSubclaims(topClaimsWebOrdered, web_data);
      displaySubclaims(topClaimsWebOrdered, web_data, width, containerWidth, widthTuner, centerCent, height, containerHeight, heightTuner); // function to arrange the subclaims appropriately in the web. can accept any number of claims
    } else {
      var topShortened = [];
      for (i = 0; i < claimsToDisplay; i++) {
        topShortened[i] = topClaims[i];
      }
      var topClaimsWebOrdered = claimWebArrangement(topShortened);
      loadSubclaims(topClaimsWebOrdered, web_data, true);
      displaySubclaims(topShortened, web_data,  width, containerWidth, widthTuner, centerCent, height, containerHeight, heightTuner, true);

    }

});


}

function claimWebArrangement(order) {
  var arrangementOrder = order.slice();
  var i;
  for (i = 0; i < order.length; i++) {
    if (i % 2 === 0) {
      arrangementOrder[ i/2 ] = order[i];
      } else {
      arrangementOrder[ order.length - Math.ceil(i/2) ] = order[i];
    }
  }
  return arrangementOrder;
}

function loadGeneralToCenter(data) {
  if (data.short_text && data.full_text) {
    $("<div/>", {
      "id": "general-claim",
      "class": "full-center",
      html: "<h2>" + data.short_text + "</h2><p>" + data.full_text + "</p>"
    }).appendTo("#debate-web-full");
  }
}

function displayGeneral(width, centerCent, containerWidth, containerHeight) {
  $("#general-claim").css({
                           width: function() {
                             return width;
                           },
                           left: function() {
                             return containerWidth * (0.5 + (1 - centerCent) * 0.5) - width * 0.5;
                           },
                           top: function() {
                             return containerHeight * 0.5 - parseFloat( $(this).css("height")) * 0.5;
                           }
  });
}

function loadSubclaims(order, data, ellipsis) {
  var i;
  if (ellipsis) { order.splice(Math.ceil(order.length/2), 0, -1) }

  for (i = 0; i < order.length; i++) {
    if (order[i] === -1) {

      $("<div/>", {
        "id": "subclaim-" + i,
        "class": "subclaim ellipsis",
        html: "<p>...</p>"
      }).appendTo("#debate-web-full");

    } else {

      $("<div/>", {
        "id": "subclaim-" + i,
        "class": "subclaim",
        html: "<p>" + data.claims[order[i]].claim_short_text + "</p>"
      }).appendTo("#debate-web-full");

      $("#subclaim-" + i).html( function () {
        return fillCircle( $(this) );
      });

    }
  }
}

function sizeOfSub($obj) {

  var textLength = $obj.text().length

  if (textLength < 555) {
    return 200;
  } else {
    return 300;
  }
}

function displaySubclaims(order, data, width, containerWidth, widthTuner, centerCent, height, containerHeight, heightTuner, ellipsis) {
  var i;

  if (ellipsis === true) {
    var unitLocation = webLocation(order.length + 1);
  } else {
    var unitLocation = webLocation(order.length);
  }

  for (i = 0; i <= order.length; i++) {
    // Center location of each subclaim measured in pixels from the left or top of parent element
    var subHorizCenter = containerWidth * (0.5 + (1 - centerCent) * 0.5) + width * widthTuner * unitLocation[i][0];
    var subVertCenter = containerHeight * 0.5 + height * heightTuner * unitLocation[i][1];

    $("#subclaim-" + i).css({
                                 width: function () {
                                   return sizeOfSub( $(this) );
                                 },
                                 height: function () {
                                   return parseFloat( $(this).css("width") ) * .5;
                                 },
                                 left: function () {
                                   return subHorizCenter - parseFloat( $(this).css("width") ) / 2;
                                 },
                                 top: function () {
                                  //  console.log($(this).css("left"), $(this).css("right"));
                                   return subVertCenter - parseFloat( $(this).css("height") ) / 2;
                                 }
                                });
  }
}

function webLocation(count) {

  var locations = new Array(count);
  var offset = Math.random() - 0.5;

  for ( i = 0; i < count; i++ ) {
    locations[i] = new Array(2);
    locations[i][0] = Math.sin( Math.PI * 2 / count * ( i + offset ) );     //xloc
    locations[i][1] = Math.cos( Math.PI * 2 / count * ( i + offset ) );      //yloc
  }

  return locations;
}

// returns array of the indices (as they are in the json object not the "index" value) of the most popular claims
function topSubclaims(data) {
  var sortedClaims = [];
  var indices = [];
  var clonedData = data.claims;
  var ranking = [];

  for (j = 0; j < clonedData.length; j++) {
    ranking.push(clonedData[j].plus - clonedData[j].minus);
  }

  for (j = 0; j < clonedData.length; j++) {
    for (i = 0; i < clonedData.length; i++) {
      if (ranking[i] === ranking.max()) {
        sortedClaims.push(ranking[i]);
        indices.push(i);
        ranking[i] = Number.NEGATIVE_INFINITY;
        break;
      }
    }
  }
  return indices;
}

Array.prototype.max = function () {
  return this.reduce(function (p, v) {
    return ( p > v ? p : v );
  });
}
