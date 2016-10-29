(function() {
    function AlbumCtrl(Fixtures, SongPlayer) { //inject custom service to ALbumCtrl
    //  this.albumData = angular.copy(albumPicasso); //albumData = albumPicasso obj this.albumData = Fixtures.getAlbum(); //because Fixtures was injected earlier (AlbumCtrl(Fixtures)), Fixtures (and its methods) are now available for use!
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]); //adding Fixtures to AlbumCtrl's dependencies
})();
