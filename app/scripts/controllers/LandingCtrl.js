(function() {
    function LandingCtrl() {
      this.heroTitle = "Turn the Music Up!";
    }

    angular //associates module blocJams with LandingCtrl, along with its callback functions and scope(s), if any.
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();
