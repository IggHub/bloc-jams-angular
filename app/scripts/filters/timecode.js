(function() {
  function timecode() {
      return function(seconds) { //filter functions must return another function accepting >= 1 argument
      /*  var seconds = Number.parseFloat(seconds);
        if (Number.isNaN(seconds)) {
          return '-:--';
        }

        var wholeSeconds = Math.floor(seconds);
        var minutes = Math.floor(wholeSeconds / 60);
        var remainingSeconds = wholeSeconds % 60;

        var output = minutes + ':';

        if (remainingSeconds < 10) {
            output += '0';
        }

        output += remainingSeconds;
        return output;*/

        /*
        * @desc refactor timer using buzz.toTimer() method
        * in 00:00 format
        */
        var timer = buzz.toTimer(seconds);
        return timer;
      };
  }

  angular
      .module('blocJams')
      .filter('timecode', timecode);
})();
