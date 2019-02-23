"use strict";

// Run on document ready >>
$(document).ready(function() {
//document.addEventListener("turbolinks:load", function() {

  // -------------------------
  // START: Framesizing for border/shadded boxes with images >>
  function framesizing(imgframecontainer, imgframeborder) {
    $(window).on("load", function() {
    // document.addEventListener("turbolinks:load", function() {
      console.log('in the loop');
      console.log(imgframecontainer, imgframeborder);
      $(imgframeborder).css('height', $(imgframecontainer).height());
      $(imgframeborder).css('width', $(imgframecontainer).width());

      $(window).resize(function(){
        $(imgframeborder).css('height', $(imgframecontainer).height());
        $(imgframeborder).css('width', $(imgframecontainer).width());
      });
    });
  };
  // Get all elements with a data-border attribute
  for (let elem of $('[data-border]')) {
    framesizing('#'+elem.id, '#'+elem.dataset.border);
  };
  // << END: Framesizing for border/shadded boxes with images
  // -------------------------
  // START: Count timer code >>
  function rollit(rollelementid) {
    let firstgo = 0;
    if (($(window).scrollTop() > $(rollelementid).offset().top - $(window).height()) && $(rollelementid).data("roller")) {
      // Start the counter only when you scroll to the element
      let rolldata = $(rollelementid).data('roller').split(" ");
      $(rollelementid).removeData("roller");
      $(rollelementid).removeAttr("data-roller");

      let startcount = parseFloat(rolldata[0]) || 0;
      let endcount = parseFloat(rolldata[1]) || 0;
      let countby = parseFloat(rolldata[2]) || 1;
      let refreshtime = parseFloat(rolldata[3]) || 10;
      let decimalplaces = parseInt(rolldata[4]) || 0;

      // Interval function does the count down/up
      var timerfunc = setInterval(function() {
          if (parseFloat(startcount.toFixed(5)) > parseFloat(endcount.toFixed(5))) {
            startcount = startcount - countby;
            $(rollelementid).html(startcount.toFixed(decimalplaces));
          } else if (parseFloat(startcount.toFixed(5)) < parseFloat(endcount.toFixed(5))) {
            startcount = startcount + countby;
            $(rollelementid).html(startcount.toFixed(decimalplaces));
          } else {clearInterval(timerfunc)};
      }, refreshtime);
    };
  };

  function rollitonscroll(rollelementid) {
      $(window).scroll(() => {
        rollit(rollelementid);
      });
    };

  function rollvalue(rollelementid) {
    if ($(rollelementid).offset().top < $(window).height()) {
      rollit(rollelementid);
    }
    else {
      rollitonscroll(rollelementid);
    };
  };
  // Run the timer for all elements with a span and data-roller item
  for (let elem of $('[data-roller')) {
    rollvalue('#' + elem.id);
  };
  // END: << Count timer code
  // -------------------------

}); // << End of document ready function
