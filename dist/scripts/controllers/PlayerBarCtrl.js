(function() {
    function PlayerBarCtrl(Fixtures, SongPlayer) { //dependency injection: injects SongPlayer.js and Fixtures.js services
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    };

    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();
