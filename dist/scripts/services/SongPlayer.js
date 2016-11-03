(function() {
    function SongPlayer($rootScope, Fixtures) { //songplayer service. Has 2 dependency injections: $rootScope, Fixtures ( can access Fixtures )

        // ********** Private attributes ********** //

        var SongPlayer = {};
        /**
        * @desc Information for current album
        * currently returns albumPicasso {object}
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum(); //uses Fixtures.getAlbum() method. Won't be possible if Fixtures was not registered initially.
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        // ********** Private functions ********** //

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        * what it does:
        * 1. Stops song
        * 2. Associate new currentBuzzObject
        * 3. Binds timeupdate with newly associated currentBuzzObject
        * 4. Sets up currentSong to equal song (arg)
        */
        var setSong = function(song) {
            if (currentBuzzObject) { //if currentBuzzObject is true (null is falsy)
                currentBuzzObject.stop(); //if there is a currently playing song (say, song #2), it will stop it
                SongPlayer.currentSong.playing = null; //sets the value to null
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, { //sets up new buzz Object (picks an audio from song => song.audioUrl)
                formats: ['mp3'], //object configs
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() { //binds currentBuzzObject (current song) with timeupdate
                $rootScope.$apply(function() { //applies, second by second, current time
                    SongPlayer.currentTime = currentBuzzObject.getTime(); //SongPlayer.currentTime is current song's current playing time (.getTime())
                });
            });

            SongPlayer.currentSong = song;//sets currentSong value to be song
        };
        /**
        * @function playSong
        * @desc Play a song (currentBuzzObject)
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play(); //plays the buzz object
            song.playing = true; //sets value of song.playing to equal true
        };
        /**
        * @function stopSong
        * @desc Stop a song
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop(); //stops currentBuzzObject
            song.playing = null; //sets value of song.playing to equal null (falsy)
        };
        /**
        * @function getSongIndex
        * @desc Get index of song in the songs array
        * @param {Object} song
        * @returns {Number}
        */
        var getSongIndex = function(song) { //get current song index from currentAlbum (currently albumPicasso object)
            return currentAlbum.songs.indexOf(song); //returns the index of the song
        };

        // ********** Public Attributes ********** //
        // ***** init config ***** //

        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        /**
        * @desc Current play time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        /**
        * @desc Volume used for songs
        * @type {Number}
        */
        SongPlayer.volume = 80;

        // ********** public functions ********** //
        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong; //if song is not given, song is SongPlayer.currentSong; depends on where it is called from
            if (SongPlayer.currentSong !== song) { //if song #2 is playing, and song #1 is clicked (currentSong !== song)
                setSong(song); //sets up new song (song #1)
                playSong(song); // plays new song (song #1)
            } else if (SongPlayer.currentSong === song) { // if song #2 information is stored as currently playing, and song #2 is clicked
                if (currentBuzzObject.isPaused()) { //if currentBuzzObject is in paused state
                    playSong(song); //plays it
                }
            }
        };
        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause(); //sets up currentBuzzObject to pause (isPuased() will be true)
          song.playing = false; //sets up song.playing to equal false (falsy)
        };
        /**
        * @function previous
        * @desc Set song to previous song in album
        */
        SongPlayer.previous = function() { //previous button
            var currentSongIndex = getSongIndex(SongPlayer.currentSong); //finds the index of currently playing song; calls getSongIndex() function
            currentSongIndex--; // from that currentSongIndex, subtract one

            if (currentSongIndex < 0) { //if currentSongIndex is -1 (outside the range of currentSong object's songs array)
                stopSong(SongPlayer.currentSong); // if song #1 is playing and previous is clicked, stop it
            } else { //if song > song #1 is playing and previous is clicked:
                var song = currentAlbum.songs[currentSongIndex]; //update song (note currentSongIndex is updated)
                setSong(song); //sets song up
                playSong(song); //plays song
            }
        };
        /**
        * @function next
        * @desc Set song to next song in album
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            var lastSongIndex = currentAlbum.songs.length - 1;

            if (currentSongIndex > lastSongIndex) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) { //sets current playing time
            if (currentBuzzObject) { //if song is currently playing (if not, do nothing)
                currentBuzzObject.setTime(time); //Buzz's setTime method http://buzz.jaysalvat.com/documentation/buzz/ changes song's current time playback
            }
        };
        /**
        * @function setVolume
        * @desc Set volume for songs
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) { //sets volume of the current song
          if (currentBuzzObject) { //if song is currently playing
            currentBuzzObject.setVolume(volume); //changes the volume using buzz's setVolume method
          }
          SongPlayer.volume = volume; //updates SongPlayer.volume (for display)
        }
        return SongPlayer; //registers all the attributes and methods in SongPlayer (SongPlayer.attributes, SongPlayer.functions())
    };

    angular
        .module('blocJams') //registers module blocJams
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]); //register SongPlayer factory service name. Inject $rootScope, Fixtures, and SongPlayer dependencies
})();
