
/* ----------------------------------------------------- */
/* DIRECTIVES */
/* ----------------------------------------------------- */

BTBWModule.directive('scrollableContent', function ($timeout) {
 return {
    restrict: 'A',
    compile: function compile(tElement, tAttrs, transclude) {
        return {
          post: function postLink(scope, iElement, iAttrs, controller) { 
            //add css class for styling
            iElement.addClass(BTBW.CONST.CSSCLASS_SCROLLABLE_TABLE);
            //dirty - init the scrollbars after the content is added and rendered
            $timeout(BTBW.Utilities.initScrollbars, 0); 
          }
        }
    }
  };
});

BTBWModule.directive('displayTimer', function($timeout, $rootScope) {
    // return the directive link function. (compile function not needed)
    return {
        scope: { time:'=displayTimer' },
        controller: function($scope, $element, $attrs) {
            var timeoutId, 
                timeoutReadyId,
                readyInterval = BTBW.CONST.TIMER_READY_INTERVAL + 1, //incremented with 1 because there is a go message too
                timeReady = 0,
                interval = BTBW.CONST.TIMER_INTERVAL;

          // used to update the UI
          function updateTime() {
			/* start : 8 / 12 / 2013     */
			
			/*
			var cnt = interval - $scope.time++;
			var cntString = "";
			for (var i = 0; i < cnt; i++){
				cntString = cntString + "-";
			}
			$element.text(cntString);
			*/
			
			$scope.time--;
			
			$rootScope.$broadcast("TIMER_TICKED", [$scope.time]);
			
            //$element.text(interval - $scope.time++);
			/* end : 8 / 12 / 2013     */
          }

          // schedule update in one second
          function updateLater() {
            // save the timeoutId for canceling
            timeoutId = $timeout(function() {
                updateTime(); // update DOM
                updateLater(); // schedule another update
                //if the timer expired
                if($scope.time === interval + 1) {
                    $timeout.cancel(timeoutId);
                    $rootScope.$broadcast("TIMER_EXPIRED");
                }
            }, 1000);
          }

          function resetTimer() {
            $scope.time = 20;
            $timeout.cancel(timeoutId);
            updateLater();
          }

          // listen on DOM destroy (removal) event, and cancel the next UI update
          // to prevent updating time ofter the DOM element was removed.
          $element.bind('$destroy', function() {
            $timeout.cancel(timeoutId);
            $timeout.cancel(timeoutReadyId);
          });

          //
          $scope.$on("RESET_TIMER", function() {
            resetTimer();
          });

          function updateReady() {
            timeoutReadyId = $timeout(function() {

                
				
				if(timeReady === readyInterval - 1) {
                    //$element.text(BTBW.CONST.MESSAGE_TIMER_GO);
                } else {
                    //$element.text((readyInterval - 1) - timeReady);
					//$element.text("........................");
                }
                
                timeReady++;

                updateReady(); // schedule another update
                //if the timer expired
                if(timeReady === readyInterval) {
                    $timeout.cancel(timeoutReadyId);
                    //updateLaterdialogProvider
                    $rootScope.$broadcast("TIMER_STARTED");
                }
            }, 1000);
          }

          updateReady();
        }
    }
});
