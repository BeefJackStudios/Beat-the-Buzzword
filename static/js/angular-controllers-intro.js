
function IntroController($scope, $location, $timeout, $dialog, sharedData, sharedUtilities, serverLayer) {
	
	//load default data
    sharedUtilities.loadDefaultData();
	
	
	//reset data
	sharedData.currentChallengeAnswers = null;
	sharedData.isMyGame = null;
	sharedData.hiscorePlayerId = null;
	sharedData.score = 0;
	
	
	//---------------
	//OPPS
	$scope.selectOpp = function(userId) {
		sharedData.currentChallengeUserId = userId;
		$scope.showOpps = false;
		$scope.showGenres = true;
	}
	
	$scope.oppClose = function() {
		$scope.showOpps = false;
		$scope.showGenres = false;
	}
	
	
	//---------------
	//GENRES 
	$scope.genres = BTBW.Data.Genres;
	$scope.selectGenre = function(genreId) {
		sharedData.currentGenreId = genreId;
		$location.path(BTBW.CONST.PATH_GAMEPLAY);
	}
	
	$scope.genreClose = function() {
		$scope.showOpps = false;
		$scope.showGenres = false;
	}
	
	$scope.showGenres = false;
	//--------------------
			
	
	
    $scope.ceo = BTBW.Data.Challenges.ceo;
	// $scope.connections = BTBW.Data.Challenges.connections; // FILTER LATER
    $scope.genres = BTBW.Data.Genres;
	$scope.games = BTBW.Data.Games;

	$scope.startGame = function(game) {
		if (game.name == "Game1"){
			$scope.startBuzzword();
		} else if (game.name == "Game2"){
			$scope.startHead2Head();
		}
	}

    $scope.startBuzzword = function() {
        sharedData.isMyGame = false;
		sharedData.currentChallengeName = BTBW.CONST.GAME_PRACTICE;
		//$location.path(BTBW.CONST.PATH_SELECT_GENRE);
		$scope.showGenres = true;
	}
	$scope.startHead2Head = function() {
		sharedData.isMyGame = true;
        sharedData.currentChallengeName = BTBW.CONST.GAME_HEAD2HEAD;
		//$location.path(BTBW.CONST.PATH_SELECT_OPP);
		$scope.showOpps = true;
		$timeout(BTBW.Utilities.initScrollbars, 0); 
	}
	$scope.getScores = function(userId) {
		sharedData.hiscorePlayerId = userId;
		$location.path(BTBW.CONST.PATH_SHOW_CHALLENGES);
	}
    $scope.showUserChallenges = function(userId) {
		sharedData.currentChallengeUserId = userId;
		$location.path(BTBW.CONST.PATH_SHOW_CHALLENGES);
	}
    $scope.showChallengesByGenre = function(selectedGenreId) {
		sharedData.currentGenreId = selectedGenreId;
        $location.path(BTBW.CONST.PATH_SHOW_CHALLENGES);
	}
    $scope.setChallengeByGenre = function(selectedGenreId) {
        sharedData.currentChallengeName = BTBW.CONST.GAME_SET_CHALLENGE;
        sharedData.currentGenreId = selectedGenreId;
        $location.path(BTBW.CONST.PATH_GAMEPLAY);
	}
    $scope.filterByPlayerName = function(item) {
        return !$scope.filterConnectionName || 
        item.firstName.toLowerCase().indexOf($scope.filterConnectionName.toLowerCase()) !== -1 || 
        item.lastName.toLowerCase().indexOf($scope.filterConnectionName.toLowerCase()) !== -1 ;
    }
	
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
	
	function DisplayUserPoints() {
		var url = BTBW.CONST.BASE_URL+"/php/functions.php?mode=getScore&playerId="+BTBW.Data.Profile.linkedin_id; // BTBW.Data.Profile.linkedin_id;
		$.ajax({ url:url })
		.done(function(evt) {
	
			var e = document.getElementById("displayScore");
			e.innerHTML = evt; 
			BTBW.Data.Profile.points = evt;
			
			
			var rank = GetUserRank(evt);
			e = document.getElementById("displayRank");
			e.innerHTML = rank; 
			BTBW.Data.Profile.rank = rank;

		})
		.fail(function() { sharedUtilities.reportError(evt); })
		.always(function() { console.log("complete"); });
		
		return 0;
	}
	
	function GetUserRank(points)
	{
		var rank = "Intern";
		if (points > 2000)
			rank = "Junior";
		if (points > 3500)
			rank = "Team Leader";
		if (points > 12000)
			rank = "Supervisor";
		if (points > 18000)
			rank = "Senior Manager";
		if (points > 27000)
			rank = "Department Head";
		if (points > 27000)
			rank = "Director";
		if (points > 31000)
			rank = "Senior Director";
		if (points > 36000)
			rank = "Vice President";
		if (points > 42000)
			rank = "President";
			
		return rank;
	}
	
	DisplayUserPoints();
	
	
}