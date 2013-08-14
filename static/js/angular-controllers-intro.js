
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
	var total_genres_unlock = 1;
	var myRandomNumbers = MyRandoms(7,total_genres_unlock); //array containing 2 distinct random numbers
		
	$scope.genres = BTBW.Data.Genres;
	$scope.selectGenre = function(genreId) {
		sharedData.currentGenreId = genreId;
		
		var resultFound = false;
		for (var j = 0; j < myRandomNumbers.length; j++)
		{
			if (genreId == myRandomNumbers[j])
			{
				resultFound = true;
				break;
			}
		}
		
		//var e = document.getElementById("debug");
		//e.innerHTML = "genreId:" + genreId + " / " + myRandomNumbers[0] + " / " +  resultFound; 
		
		if(resultFound)
		{
			$location.path(BTBW.CONST.PATH_GAMEPLAY);
		}
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
        $location.path(BTBW.CONST.PATH_LEADERBOARD);
	}
	
	$scope.gotoAchievementPage = function() {
        $location.path(BTBW.CONST.PATH_ACHIEVEMENTS);
	}
	
	$scope.gotoHome = function() {
        $location.path(BTBW.CONST.PATH_INTRO);
	}
	
	function DisplayUserPoints(myRandomNumbers) {
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
			
			
			SetRandomGenre(myRandomNumbers);
			
			

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
	


	function SetRandomGenre(myRandomNumbers)
	{
		var e;
		var resultFound = false;
		for (var i = 1; i < 8; i++)
		{
			resultFound = false;
			for (var j = 0; j < myRandomNumbers.length; j++)
			{
				if (i == myRandomNumbers[j])
					resultFound = true;
			}
			
			if (!resultFound)
			{
				e = document.getElementById("genre_"+i);
				e.style.background = "url(static/img/genre_"+i+".png)";
			}
		}		
	}
	
	function MyRandoms(range,tot){
		
		if(tot > range){
			alert('infinite loop?');
			return [];
		}
		var myRandomNumbers = new Array();
		var randN = 0;
		
		for(var i = 0; i<tot; i++){
			randN = Math.floor(Math.random()*range);
			
			for (var j = 0; j < myRandomNumbers.length; j++)
			{
				if (myRandomNumbers[j] != randN)
				{
					randN = Math.floor(Math.random()*range);
					break;
				}
			}
	
			
			myRandomNumbers.push(randN + 1);
		}
		return myRandomNumbers;
	}


	
	
	
	
	DisplayUserPoints(myRandomNumbers);
	
	
	
}