(function() {
  function config($stateProvider, $locationProvider){ //arguments in config. In this case, configures $stateProvider and $locationProvider. They are what's called dependency injection
    $locationProvider //properties for $locationProvider
        .html5Mode({
            enabled: true,
            requireBase: false
        });

    $stateProvider //properties for $stateProvider
        .state('landing', {
            url: '/',
            controller: 'LandingCtrl as landing', //usually done on HTML page directly. With ui-router, we can assign it here!
            templateUrl: '/templates/landing.html'
        })
        .state('album', {
            url: '/album',
            controller: 'AlbumCtrl as album', //to use AlbumCtrl, it will be referred to as album
            templateUrl: '/templates/album.html' //templates where AlbumCtrl take precedence
        })
        .state('collection', {
            url: '/collection',
            controller: 'CollectionCtrl as collection',
            templateUrl: '/templates/collection.html'
        });
    }

    angular
      .module('blocJams', ['ui.router']) //include the module name ('blocJams'), and dependency(ies) ['ui.router']
      .config(config); //use config function for config
})();
