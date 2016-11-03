(function() { //corresponds to templates/directives/seek_bar.html; applied in div <div class="seek-bar" ng-click = "onClickSeekBar($event)">
  function seekBar($document) { //document as argument. $document must be injeceted to be used
    /*
    * @desc continuously keep track of % offset
    * returns offsetXPercent {number}
    * behaves like a property. Call seekBar.calculatePercent
    */
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    // running seekBar() gets all the below property.
    return {
      templateUrl: '/templates/directives/seek_bar.html', //directive attributes
      replace: true,
      restrict: 'E', //element
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
        /*
        * public attributes
        */
        scope.value = 0;
        scope.max = 100;

        /*
        * private attribute
        * @desc = assign seekBar to $(element)
        */
        var seekBar = $(element);

        /*
        * @desc when the observed attribute of value changed, callback (function) is executed
        */
        attributes.$observe('value', function(newValue) { //when 'value' changed value, execute callback method. Which 'value' is it referring to?
          scope.value = newValue;
        });

        attributes.$observe('max', function(newValue) { //when 'max' change value, execute callback method
          scope.max = newValue;
        });


        /*
        * private function
        * @desc inputs = scope.value and scope.max
        * outputs/ returns 'percent%'
        */
        var percentString = function(){
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        /*
        *public function
        *returns width CSS style
        */
        scope.fillStyle = function() {
          return {width: percentString()};
        };
        /*
        * public function
        * returns CSS attribute left, value percentString();
        */
        scope.thumbStyle = function() {
          return {left: percentString()};
        };

        /*
        * doesn't return anything, but updates attributes
        * updates scope.value
        */
        scope.onClickSeekBar = function(event) { //is onClickSeekBar a built-in function? What does event do?
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };

        scope.trackThumb = function() { //.trackThumb() function
           $document.bind('mousemove.thumb', function(event) { //binds thumb class with mousemove event
               var percent = calculatePercent(seekBar, event); //what does seekBar in argument do? How does event work here?
               scope.$apply(function() { //$apply method; constantly updates value second-by-second when change happens
                   scope.value = percent * scope.max;
                   notifyOnChange(scope.value); //scope.value is newValue
               });
           });

           $document.bind('mouseup.thumb', function() { //binds $document with mouseup event on thumb class (when mouse is up/ released on ANY part of document - that is, anywhere on screen)
               $document.unbind('mousemove.thumb'); //unbind mousemove from thumb class
               $document.unbind('mouseup.thumb'); //unbind mouseup from thumb class
           });
         };

         var notifyOnChange = function(newValue) {
           if (typeof scope.onChange === 'function') { //for future use, ensures that .onChange is a function to activate it
             scope.onChange({value: newValue}); //updates value
           }
         };
      }
    };
  }

  angular
    .module('blocJams') //associates with blocJams module
    .directive('seekBar', ['$document', seekBar]); //injects seekBar directive, with $document and seekBar dependencies
})();
