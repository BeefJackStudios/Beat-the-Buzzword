
function SelectOppController($scope, $timeout, $location, $dialog, sharedData, sharedUtilities) {
    
	//load default data
    //sharedUtilities.loadDefaultData();
    $scope.connections = BTBW.Data.Challenges.connections;
	
	$scope.startChallenge = function(userId) {
		sharedData.currentChallengeUserId = userId;
		$location.path(BTBW.CONST.PATH_SELECT_GENRE);
	}
	
	$scope.close = function() {
		$location.path(BTBW.CONST.PATH_INTRO);
	}
	
	$scope.gotoLeaderboardPage = function() {
		sharedData.currentChallengeUserId = null;
        $location.path(BTBW.CONST.PATH_SHOW_CHALLENGES);
	}
	
	$scope.gotoAchievementPage = function() {
        $location.path(BTBW.CONST.PATH_ACHIEVEMENTS);
	}
	
	$timeout(BTBW.Utilities.initScrollbars, 0); 
}