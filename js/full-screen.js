function onScreenLoad() {

  $( "#close-icon" ).on( "click", function () {
    $("#debate-web-full").remove();
  });


  $.getJSON("js/web-data-1.json", function(web_data) {
    var web = [];

    if (web_data.short_text && web_data.full_text) {
      $("<div/>", {
        "id": "general-claim",
        "class": "full-center",
        html: "<h2>" + web_data.short_text + "</h2><p>" + web_data.full_text + "</p>"
      }).appendTo("#debate-web-full");
    }

    $.each( web_data.claims, function(index) {
      $("<div/>", {
        "id": "subclaim-" + index,
        class: "subclaim",
        html: "<p>" + web_data.claims[ index ].claim_full_text + "</p>"
      }).appendTo("#debate-web-full");
    })


  var num_subs = web_data.claims.length;

  if (num_subs < 6) {
    var lengthTuner = 0.35;
    var width = $("#debate-web-full").width();
    var height = $("#debate-web-full").height();
    var unitLocation = webLocation(num_subs);

    $.each( web_data.claims, function(index) {

      var left = width * 0.5 + width * lengthTuner * unitLocation[index][0];
      var top = height * 0.5 + height * lengthTuner * unitLocation[index][1];



      $("#subclaim-" + index).css({

                                   width: function ( index, value ) {
                                     return 200;
                                   },
                                   left: function ( index, value ) {
                                     return left - parseFloat( $(this).css("width") ) / 2;
                                   },
                                   top: function () {
                                     return top - parseFloat( $(this).css("height") ) / 2;
                                   }
                                  });
    });
  }

  console.log(width, height);

  });


}

function sizeOfSub($obj) {
  var textLength = $obj.text().length


}

function webLocation(count) {

  var locations = new Array(count);
  var offset = Math.random() - 0.5;

  for ( i = 0; i < count; i++ ) {
    locations[i] = new Array(2);
    locations[i][0] = Math.sin( Math.PI * 2 / count * ( i + offset) );      //xloc
    locations[i][1] = Math.cos( Math.PI * 2 / count * ( i + offset) );     //yloc
  }

  return locations;
}
