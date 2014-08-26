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

  console.log(num_subs)

  });


}
