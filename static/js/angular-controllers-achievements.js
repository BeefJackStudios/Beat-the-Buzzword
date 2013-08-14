
function AchievementsController($scope, $timeout, $location, sharedData, serverLayer, sharedUtilities) {
	/*
	$scope.title = null;
    $scope.isLoading = true;
    $scope.isMyChallenges = sharedData.currentChallengeUserId === BTBW.Data.Profile.linkedin_id;
    $scope.displayingRadomGenres = false;
    $scope.playedChallenges = null;
    $scope.myChallenges = null;
	
	sharedData.currentChallengeUserId= "01mQhp3Gqo";
	
	console.log("$scope.isMyChallenges "+$scope.isMyChallenges)
	console.log("sharedData.currentChallengeUserId "+sharedData.currentChallengeUserId)
	
    //if user id specified then show the challenges of that user
	if (!BTBW.CONST.TESTING){
		
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
    }

	
	
	*/
	// TEST -------------------------------------------
	if (BTBW.CONST.TESTING){
		$scope.isLoading = false;
		$scope.title = BTBW.CONST.TITLE_SHOW_RANDOM_CHALLENGES;
		$scope.data = [
			{name:"Buzzwords", score:"99"},
			{name:"Buzzwords", score:"99"},
			{name:"Buzzwords", score:"99"},
			{name:"Buzzwords", score:"99"},
			{name:"Buzzwords", score:"99"},
			{name:"Buzzwords", score:"99"},
			{name:"Buzzwords", score:"99"},
		];
		//reinit the scroll panel as this since we are using a promise
		$timeout(BTBW.Utilities.initScrollbars, 0); 
	}
	// -- END TEST ------------------------------------
	 
			
	$scope.trophies = [
		{name:"", url:"static/img/AchivementIcon.png"},
		{name:"", url:"static/img/AchivementIcon.png"},
		{name:"", url:"static/img/AchivementIcon.png"},
		{name:"", url:"static/img/AchivementIcon.png"}
	];
	
	
	$scope.gotoLeaderboardPage = function() {
        sharedData.currentChallengeUserId = null;
		$location.path(BTBW.CONST.PATH_SHOW_CHALLENGES);
	}
	
	$scope.gotoAchievementPage = function() {
        $location.path(BTBW.CONST.PATH_ACHIEVEMENTS);
	}
	
	$scope.gotoHome = function() {
        $location.path(BTBW.CONST.PATH_INTRO);
	}
	
}

