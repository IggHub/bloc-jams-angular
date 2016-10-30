(function(){
  function SongPlayer(Fixtures) { //injects Fixtures to SongPlayer
    var SongPlayer = {};
    /*
    * @desc calls Fixtures service to getAlbum in Fixtures.js
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null; //sets up currentBuzzObject var

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {object} song
    */
    var setSong = function(song) { //private method
      if (currentBuzzObject) {
        stopSong();
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      SongPlayer.currentSong = song;

    };

    /**
    * @desc playSong plays current Buzz object
    @function playSong
    * @param {object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };
    /*
    * @desc recall currentAlbum gets an album from Fixtures.js. This gets the current song (song)'s index
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    /********** PUBLIC METHOD **********/
    //everything with SongPlayer.- is a public method

    /**
    * @desc initialize currentSong var to be null
    */
    SongPlayer.currentSong = null; //sets up currentSong public attribute

    SongPlayer.play = function(song) { //object. Question: Can I do this.play = function(song) instead of SongPlayer.play?
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) { //if currently playing song is not the song that is chosen
            setSong(song);
            playSong(song);
        } else if (SongPlayer.currentSong === song) { //else if we are hovering on song #2 and clicks song#2 (2 possibility: is song#2 playing? is song#2 paused?)
          if (currentBuzzObject.isPaused()) { //if it is paused, then play it
            playSong(song);
          }
        }
    };

    /**
    * @desc pauses currently playing song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    SongPlayer.previous = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong); //SongPlayer.currentSong is public variable
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    SongPlayer.next = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > currentAlbum.songs.length ) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
