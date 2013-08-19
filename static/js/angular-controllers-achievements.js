
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
			{id:"1", name:"Complete one full game of beat the buzzwords", score:"500"},
			{id:"2", name:"Complete one full game of head to head", score:"500"},
			{id:"3", name:"Complete one full game of CEO", score:"500"},
			{id:"4", name:"Complete one full game of Entrepenuer", score:"500"},
			{id:"5", name:"Answer a question in under 3 seconds", score:"500"},
			{id:"6", name:"All questions right in on session", score:"2000"},
			{id:"7", name:"Create questions for Entrepenuer Mode", score:"700"},
			{id:"8", name:"Beat an opponent from the same company", score:"700"},
			{id:"9", name:"Two questions in a row", score:"300"}
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
		$location.path(BTBW.CONST.PATH_LEADERBOARD);
	}
	
	$scope.gotoAchievementPage = function() {
        $location.path(BTBW.CONST.PATH_ACHIEVEMENTS);
	}
	
	$scope.gotoHome = function() {
        $location.path(BTBW.CONST.PATH_INTRO);
	}
	

	
	function getAchievements()
	{
		if (sharedData.achievement_1 == 1)
			activeAchivement(1);
		if (sharedData.achievement_2 == 1)
			activeAchivement(2);
		if (sharedData.achievement_3 == 1)
			activeAchivement(3);
		if (sharedData.achievement_4 == 1)
			activeAchivement(4);
		if (sharedData.achievement_5 == 1)
			activeAchivement(5);
		if (sharedData.achievement_6 == 1)
			activeAchivement(6);
		if (sharedData.achievement_7 == 1)
			activeAchivement(7);
		if (sharedData.achievement_8 == 1)
			activeAchivement(8);
		if (sharedData.achievement_9 == 1)
			activeAchivement(9);	
		
		function activeAchivement(id)
		{
			$("#achivements_name_"+id).css({ color: "black"});
			$("#achivements_score_"+id).css({ color: "black"});
		}
	}
	
	setTimeout(function() {
		getAchievements();
	}, 100);
	
	
	
}

