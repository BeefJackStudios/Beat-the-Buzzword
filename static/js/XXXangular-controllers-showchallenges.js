
function ShowChallengesController($scope, $timeout, $location, sharedData, serverLayer, sharedUtilities) {
	
	$scope.title = sharedData.currentChallengeUserId ? BTBW.CONST.TITLE_SHOW_USER_CHALLENGES : BTBW.CONST.TITLE_SHOW_MY_CHALLENGES;
    $scope.isLoading = true;
    $scope.isMyChallenges = sharedData.currentChallengeUserId === BTBW.Data.Profile.linkedin_id;
    $scope.displayingRadomGenres = false;
    $scope.playedChallenges = null;
    $scope.myChallenges = null;
	 
    if(sharedData.currentChallengeUserId) {
		if(!$scope.isMyChallenges) { 
			$.ajax({ url: "/btbw/php/functions.php?mode=getUserChallenges&playerIdOpp="+sharedData.currentChallengeUserId+"&playerIdMe="+BTBW.Data.Profile.linkedin_id })
			.done(function(evt) { 
				$scope.isLoading = false;
				var temp = [];
				var spl = evt.split(",");
				for (var i in spl){
					var spl2 = spl[i].split(":");
					if (spl2[0] && spl2[1] && spl2[2]){
						var chall = {gameId:spl2[0], genre:{name:spl2[1]}, correctAnswers:spl2[2], timeset:spl2[3], timesPlayed:"-"};
						temp.push(chall);
					}
				}
				$scope.updateModel(temp);
			})
			.fail(function() { sharedUtilities.reportError(evt); })
			.always(function() { console.log("complete"); });
		}
	} else {
		$location.path(BTBW.CONST.PATH_INTRO);	
	}
	
	//if (!BTBW.CONST.TESTING){
		/*
		if(sharedData.currentChallengeUserId) {
			if(!$scope.isMyChallenges) {   
				$scope.title = BTBW.CONST.TITLE_SHOW_USER_CHALLENGES;
				serverLayer.getUserChallenges(sharedData.currentChallengeUserId).then(function(data) {
					//success
					$scope.isLoading = false;

					$scope.data = $scope.myChallenges = data;

					//reinit the scroll panel as this since we are using a promise
					$timeout(BTBW.Utilities.initScrollbars, 0); 

				}, function(reason){
					//if it fails
					sharedUtilities.reportError(reason);
				});  

			} else {  
				$scope.title = BTBW.CONST.TITLE_SHOW_MY_CHALLENGES;   
				
				serverLayer.getLoggedInUserCreatedChallenges(sharedData.currentChallengeUserId).then(function(data) {
					//success
					$scope.isLoading = false;
					$scope.data = $scope.myChallenges = data;

					//reinit the scroll panel as this since we are using a promise
					$timeout(BTBW.Utilities.initScrollbars, 0); 

				}, function(reason){
					//if it fails
					sharedUtilities.reportError(reason);
				});
				
				 serverLayer.getLoggedInUserPlayedChallenges().then(function(data) {
					$scope.playedChallenges = data;
				}, function(reason){
					//if it fails
					console.log(reason);
				}); 
			}

		} else if(sharedData.currentGenreId) {
		//if genre id is specified then show the random challenges for that genre
			 //returns a promise (data loaded remotely)
			serverLayer.getRandomChallengesByGenre(sharedData.currentGenreId).then(function(data) {
				//success
				$scope.isLoading = false;
				$scope.title = BTBW.CONST.TITLE_SHOW_RANDOM_CHALLENGES;

				$scope.data = data;

				//reinit the scroll panel as this since we are using a promise
				$timeout(BTBW.Utilities.initScrollbars, 0); 

			}, function(reason){
				//if it fails
				console.log(reason);
			});

			$scope.displayingRadomGenres = true;

		} else {
			$location.path(BTBW.CONST.PATH_INTRO);	
		}
		*/
    //}
	
	$scope.updateModel = function(arr) {
		$scope.isLoading = false;
		$scope.data = arr;
		$timeout(BTBW.Utilities.initScrollbars, 0); 
	}
		
    $scope.challengeSelected = function(challenge) {
		if($scope.isMyChallenges) { return false; }
        sharedData.currentGenreId = sharedData.currentChallengeId = sharedData.currentChallengeUserId = null;
        sharedData.currentChallengeName = BTBW.CONST.GAME_TAKE_CHALLENGE;
        $location.path(BTBW.CONST.PATH_GAMEPLAY);
	}
	
	$scope.gotoLeaderboardPage = function() {
		sharedData.currentChallengeUserId = null;
        $location.path(BTBW.CONST.PATH_SHOW_CHALLENGES);
	}
	
	$scope.gotoAchievementPage = function() {
        $location.path(BTBW.CONST.PATH_ACHIEVEMENTS);
	}
}