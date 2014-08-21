$(document).ready(function() {

var $window = $( window );
var $debateCont = $( '#debate-cont' );

widthHeightRatio( $debateCont.parent().width() );

function widthFunc(type) {

  if ( type == "full-screen" ) {

    var el_width = $window.width() - 2 * parseInt($(".full-screen-static").css('margin-left'));

  } else if ( type == "mini" ) {

    var el_width = $debateCont.parent().width();

  } else {

    console.log('Error: Improper input');

  }

  // var miniHeight = 0.5 * miniWidth;
  // $debateCont.css({'height' : miniHeight, 'width' : miniWidth});

  return el_width;

}



function heightFunc(type) {

  if ( type == "full-screen" ) {

    var el_height = 0.5 * ( $window.width() - 2 * parseInt($(".full-screen-static").css('margin-left')) );

  } else if ( type == "mini" ) {

    var el_height = 0.5 * $debateCont.parent().width();

  } else {

    console.log('Error: Improper input');

  }

  // var miniHeight = 0.5 * miniWidth;
  // $debateCont.css({'height' : miniHeight, 'width' : miniWidth});

  return el_height;

  console.log(el_height);
}



function widthHeightRatio(containerWidth) {
  var miniWidth = containerWidth;
  var miniHeight = 0.5 * containerWidth;
  $debateCont.css({'height' : miniHeight, 'width' : miniWidth});

}



$( window ).on('resize', function() {
  if ($debateCont.hasClass( "full-screen" )) {
    widthHeightRatio( $window.width() - 2 * parseInt($(".full-screen").css('margin-left')) );
    console.log('window width')
  } else {
    widthHeightRatio( $debateCont.parent().width() );
    console.log('column width')
  }
});


// $( "#close-icon" ).on('click', function() {
//   $debateCont.removeClass( "full-screen" );
//   $debateCont.addClass( "thumbnail" );
//   widthHeightRatio( $debateCont.parent().width() );
//   $(" #close-icon img ").toggleClass( "hide" , true );
//   console.log('clicked')
// });
//
//
// $debateCont.click(function() {
//
//   if ($debateCont.hasClass( "thumbnail" )) {
//     $debateCont.addClass( "full-screen" );
//     $debateCont.removeClass( "thumbnail" );
//     widthHeightRatio( $window.width() );
//     $(" #close-icon img ").toggleClass( "hide" , false );
//     console.log('this fires too');
//   }
//
// });

function fullScreen() {
  $("#placeholder").load("full-screen-content.html", function(responseText, statusText, xhr)
        {
                // if(statusText == "success")
                //         alert("Successfully loaded the content!");
                // if(statusText == "error")
                //         alert("An error occurred: " + xhr.status + " - " + xhr.statusText);

        setToFullScreen();

        });

}

function setToFullScreen() {
  $(document.getElementById("debate-web-full")).css({
                             width: $window.width() - 2 * parseInt($('#debate-web-full').css('margin-left')),
                             height: $window.height() - 2 * parseInt($('#debate-web-full').css('margin-top'))
  });
  TweenLite.from($('#debate-web-full'), 1, {autoAlpha: 0});
}



$debateCont.click( function () {

  $("html body").animate({ scrollTop: $('#debate').offset().top }, 1000, function() {fullScreen()});

});


$( "#close-icon" )
  .mouseenter(function() {
     TweenLite.to($("#close-icon"), 0.5, {autoAlpha: 1});
  })
  .mouseleave(function() {
    TweenLite.to($("#close-icon"), 0.5, {autoAlpha: 0.4});
  });


function preTweenShowClose() {
  TweenLite.from($("#close-icon"), 10, {autoAlpha: 0, onComplete: showClose});
}

function showClose() {
  TweenLite.to($("#close-icon"), 10, {autoAlpha: 0.4});
}

function hideClose() {
  TweenLite.to($("#close-icon"), 1, {autoAlpha: 0});
}


//Finds y value of given object
// function findPos(obj) {
//     var curtop = 0;
//     if (obj.offsetParent) {
//         do {
//             curtop += obj.offsetTop;
//         } while (obj = obj.offsetParent);
//     return [curtop];
//     }
// }


});
