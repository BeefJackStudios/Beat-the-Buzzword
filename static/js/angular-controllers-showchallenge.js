
function ShowChallengesController($scope, $timeout, $location, sharedData, serverLayer, sharedUtilities) {
	
	$scope.title = sharedData.currentChallengeUserId ? BTBW.CONST.TITLE_SHOW_USER_CHALLENGES : BTBW.CONST.TITLE_SHOW_MY_CHALLENGES;
    $scope.isLoading = true;
    $scope.isMyChallenges = sharedData.currentChallengeUserId === BTBW.Data.Profile.linkedin_id;
    $scope.displayingRadomGenres = false;
    $scope.playedChallenges = null;
    $scope.myChallenges = null;
	
	if (!sharedData.hiscorePlayerId) sharedData.hiscorePlayerId  = BTBW.Data.Profile.linkedin_id;
	//sharedData.hiscorePlayerId = BTBW.Data.Profile.linkedin_id;
	
    if(sharedData.currentChallengeUserId) {
		if(!$scope.isMyChallenges) { 
			// ------------- LOAD CHALLENGES -------------
			var url = BTBW.CONST.BASE_URL+"/php/functions.php?mode=getUserChallenges&playerIdOpp="+sharedData.currentChallengeUserId+"&playerIdMe="+BTBW.Data.Profile.linkedin_id;
			console.log(url)
			$.ajax({ url:url })
			.done(function(evt) { 
				$scope.isLoading = false;
				var temp = [];
				var spl = evt.split("#");
				for (var i in spl){
					var spl2 = spl[i].split(":");
					
					if (spl2[0] && spl2[3]){ //  && spl2[1] && spl2[2]
						var chall = {gameId:spl2[0], genre:{name:spl2[1]}, correctAnswers:spl2[2], timeset:spl2[3], timesPlayed:"-", answers:spl2[4]};
						temp.push(chall);
					}
				}
				$scope.updateModel(temp);
				$timeout(BTBW.Utilities.initScrollbars, 0); 
			})
			.fail(function() { sharedUtilities.reportError(evt); })
			.always(function() { console.log("complete"); });
			
			
		}
	} else {
		// ------------- LOAD MY (OR CONNECTIONS) SCORES -------------
		var url = BTBW.CONST.BASE_URL+"/php/functions.php?mode=getScores&playerId="+sharedData.hiscorePlayerId; // BTBW.Data.Profile.linkedin_id;
			console.log(url)
			$.ajax({ url:url })
			.done(function(evt) {
				
				$scope.isLoading = false;
				var temp = [];
				var spl = evt.split("#");
				for (var i in spl){
					var spl2 = spl[i].split(":");
					if (spl2[0]){ //  && spl2[1] && spl2[2]
						var chall = {gameId:null, genre:{name:spl2[0]}, correctAnswers:spl2[1], timeset:spl2[2], timesPlayed:spl2[3], answers:null};
						temp.push(chall);
					}
				}
				$scope.updateModel(temp);
				$timeout(BTBW.Utilities.initScrollbars, 0); 
			})
			.fail(function() { sharedUtilities.reportError(evt); })
			.always(function() { console.log("complete"); });
			
			
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
		
		if (sharedData.currentChallengeUserId){
			console.log("challenge.genre "+challenge.genre.name)
			console.log("challenge.gameId "+challenge.gameId)
			console.log("challenge.answers "+challenge.answers)
			
			
			if($scope.isMyChallenges) { return false; }
			sharedData.currentGenreId = challenge.genre.name; // sharedData.currentChallengeId = sharedData.currentChallengeUserId = null;
			//sharedData.currentChallengeName = //challenge.genre; //BTBW.CONST.GAME_TAKE_CHALLENGE;
			sharedData.currentChallengeId = challenge.gameId;
			sharedData.currentChallengeName = BTBW.CONST.GAME_HEAD2HEAD;
			sharedData.currentChallengeAnswers = challenge.answers; //BTBW.CONST.GAME_aTAKE_CHALLENGE;
			$location.path(BTBW.CONST.PATH_GAMEPLAY);
		}
	}
	
	$scope.gotoLeaderboardPage = function() {
		sharedData.currentChallengeUserId = null;
		$location.path(BTBW.CONST.PATH_LEADERBOARD);
	}
	
	$scope.gotoAchievementPage = function() {
        $location.path(BTBW.CONST.PATH_ACHIEVEMENTS);
	}
	
	$scope.gotoHome = function() {
        $location.path(BTBW.CONST.PATH_INTRO);
	}
	
}