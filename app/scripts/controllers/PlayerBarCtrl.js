(function() {
    function PlayerBarCtrl(Fixtures, SongPlayer) { //dependency injection: injects SongPlayer.js and Fixtures.js services
        this.albumData = Fixtures.getAlbum(); //PlayerBarCtrl.albumData is Fixtures.getAlbum() function
        this.songPlayer = SongPlayer; //PlayerBarCtrl.songPlayer is SongPlayer (directly from dependency)
    };

    angular
        .module('blocJams') //PlayerBarCtrl is part of blocJams module
        .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]); //controller is named PlayerBarCtrl. It has dependencies of: Fixtures, SongPlayer, and PlayerBarCtrl
})();
