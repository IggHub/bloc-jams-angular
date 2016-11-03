(function() {
  function CollectionCtrl(Fixtures) { //inject Fixtures service into CollectionCtrl controller
    this.albums = Fixtures.getCollection(12); //Fixtures.getCollection function
  }

  angular
    .module('blocJams') //belongs to blocJams module
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]); //belongs to CollectionCtrl controller. Has Fixtures and CollectionCtrl dependencies (must include at least itself as part of dependency)
})();
