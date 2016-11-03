(function() {
    function LandingCtrl() { //no dependency (argument is blank). LandingCtrl function has no DI
      this.heroTitle = "Turn the Music Up!"; //LandingCtrl attribute (.heroTitle); it contains a string.
    }

    angular //associates module blocJams with LandingCtrl, along with its callback functions and scope(s), if any.
        .module('blocJams') //associates LandingCtrl with blocJams
        .controller('LandingCtrl', LandingCtrl); //shows that LandingCtrl is injected into blocJams' controller, using LandingCtrl function (contains attributes and functions)
})();
