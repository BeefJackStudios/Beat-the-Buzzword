

function SelectGenreController($scope, $location, $dialog, sharedData, sharedUtilities) {
    //load default data
    //sharedUtilities.loadDefaultData();
	$scope.genres = BTBW.Data.Genres;
	 
    $scope.connections = BTBW.Data.Challenges.connections;
	
	$scope.startChallenge = function(genreId) {
		sharedData.currentGenreId = genreId;
		$location.path(BTBW.CONST.PATH_GAMEPLAY);
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
 
}