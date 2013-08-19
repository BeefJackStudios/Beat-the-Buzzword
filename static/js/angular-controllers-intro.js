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
	
	var shouldShowGenres = false;
	
	$scope.selectOpp = function(userId) {
		sharedData.currentChallengeUserId = userId;
		$scope.showOpps = false;
		if (shouldShowGenres)
			$scope.showGenres = true;
	}

	$scope.oppClose = function() {
		$scope.showOpps = false;
		$scope.showGenres = false;
	}


	//---------------
	//GENRES 
	//var total_genres_unlock = 1;
	//var unlocked_cats = MyRandoms(7,total_genres_unlock); //array containing 2 distinct random numbers
	var unlocked_cats = new Array();


	$scope.genres = BTBW.Data.Genres;
	$scope.selectGenre = function(genreId) {
		sharedData.currentGenreId = genreId;

		var resultFound = false;
		for (var j = 0; j < unlocked_cats.length; j++)
		{
			if (genreId == unlocked_cats[j])
			{
				resultFound = true;
				break;
			}
		}



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
			if (BTBW.Data.Profile.points >= 700)
				$scope.startHead2Head();
		} else if (game.name == "Game3"){
			if (BTBW.Data.Profile.points >= 7000)
				$scope.startCEO();
		}
	}

    $scope.startBuzzword = function() {
        sharedData.isMyGame = false;
		sharedData.currentChallengeName = BTBW.CONST.GAME_PRACTICE;
		//$location.path(BTBW.CONST.PATH_SELECT_GENRE);
		if (shouldShowGenres)
			$scope.showGenres = true;
	}
	$scope.startHead2Head = function() {
		sharedData.isMyGame = true;
        sharedData.currentChallengeName = BTBW.CONST.GAME_HEAD2HEAD;
		//$location.path(BTBW.CONST.PATH_SELECT_OPP);
		$scope.showOpps = true;
		$timeout(BTBW.Utilities.initScrollbars, 0); 
	}
	$scope.getUserScores = function(userId) {
		sharedData.hiscorePlayerId = userId;
		$location.path(BTBW.CONST.PATH_LEADERBOARD);
		//$location.path(BTBW.CONST.PATH_SHOW_CHALLENGES);
	}
	$scope.startCEO = function() {
		sharedData.isMyGame = true;
		sharedData.currentChallengeName = BTBW.CONST.GAME_CEO;
		$location.path(BTBW.CONST.PATH_GAMEPLAY);
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



	$scope.leadertitle = "Topping the Leaderboards";
	$scope.leaderTitleIndex = -1;
	$scope.secs = 0;



	$scope.getConnectionsWithScores = function() {

		//set Title
		$scope.leaderTitleIndex++;
		if ($scope.leaderTitleIndex>4) $scope.leaderTitleIndex = 0;
		$scope.leadertitle = BTBW.CONST.LEADER_TITLE_ARR[$scope.leaderTitleIndex].title;

		$("#leadertitle").css({ opacity: 0.1});
		$("#leadertitle").animate({"opacity":"1"}, 1000);

		var category = BTBW.CONST.LEADER_TITLE_ARR[$scope.leaderTitleIndex].category;

		$scope.challenges = [];

		var arr = "";
		for (var i in BTBW.Data.connections){
			arr += "'"+BTBW.Data.connections[i].linkedin_id+"',";
		}

		arr = arr.substr(0, arr.length-1);
		var nocache = Math.floor(Math.random()*999999);
		var url =  BTBW.CONST.BASE_URL+"/php/functions.php?mode=getUsersWithScores&category="+category+"&nocache="+nocache+"&playerIdsString="+arr;

		serverLayer.genericCall({url:url})
			.then(function(data) {
				//success
				BTBW.Data.connectionScores = [];
				var spl = data.split("#");
				for (var i in spl){
					var spl2 = spl[i].split("¬");

					var id = spl2[0];
					var name = spl2[1];
					var picture = spl2[2];
					var category = spl2[3];

					$scope.leader_rank = id;

					// LOAD USERS CONNECTIONS
					if (id !=  "undefined"){
						for (var c=0; c<BTBW.Data.connections.length; c++){
							if (id && BTBW.Data.connections[c].linkedin_id && id == BTBW.Data.connections[c].linkedin_id){
								BTBW.Data.connectionScores.push(BTBW.Data.connections[c])
								$("#leaderthumbs").css({ opacity: 0.1});
								$("#leaderthumbs").animate({"opacity":"1"}, 1000);
							}
						}
					}

					// LOAD ALL
					//if (id && name){
					//	BTBW.Data.connectionScores.push({linkedin_id:id, firstName:name.split(" ")[0], lastName:name.split(" ")[1], picture:picture, category:category});
					//}

				}
				$scope.updateChallenges(BTBW.Data.connectionScores);

				$scope.delay = $timeout(function(){ $scope.getConnectionsWithScores() }, 10000);


			}, function(reason){
				//if it fails
				sharedUtilities.reportError(reason);
			});  
	}

	$scope.updateChallenges = function(arr) {
		//console.log("updateConns"+arr);
		$scope.challenges = arr;
	}

	$scope.getConnectionsWithScores();


	
	
	
	

	function UnlockGameMode(points)
	{
		var e;
		if (points >= 700)
			$("#Game2").css({ background: "url(static/img/HeadtoheadButtonUnlocked.png)"});
		if (points >= 7000)
			$("#Game3").css({ background: "url(static/img/CEOButtonUnlocked.png)"});			
		if (points >= 20000)
			$("#Game4").css({ background: "url(static/img/EntrepreneurUnlocked.png)", width: "200"});	
	}

	function GetUserRank(points)
	{
		var rank = "Intern";
		if (points >= 2000)
			rank = "Junior";
		if (points >= 3500)
			rank = "Team Leader";
		if (points >= 12000)
			rank = "Supervisor";
		if (points >= 18000)
			rank = "Senior Manager";
		if (points >= 27000)
			rank = "Department Head";
		if (points >= 27000)
			rank = "Director";
		if (points >= 31000)
			rank = "Senior Director";
		if (points >= 36000)
			rank = "Vice President";
		if (points >= 42000)
			rank = "President";

		return rank;
	}

	function setUnlockedCats()
	{
		var e;
		var resultFound = false;
		for (var i = 1; i < 8; i++)
		{
			resultFound = false;
			for (var j = 0; j < unlocked_cats.length; j++)
			{
				if (i == unlocked_cats[j])
					resultFound = true;
			}

			if (!resultFound)
			{
				e = document.getElementById("genre_"+i);
				//e.style.background = "url(static/img/genre_"+i+".png)";
				e.style.display = "none";

			}
		}
		shouldShowGenres = true;		
	}
	
	function setScore(score)
	{
		var e = document.getElementById("displayScore");
		e.innerHTML = score; 
		BTBW.Data.Profile.points = score;
		
		var rank = GetUserRank(score);
		e = document.getElementById("displayRank");
		e.innerHTML = rank; 
		BTBW.Data.Profile.rank = rank;
		
		UnlockGameMode(score);
		
		sharedData.prev_score = 0;
		sharedData.prev_score = score;
		sharedData.total_score = 0;
		sharedData.total_score = score;
	}

	/*
	function MyRandoms(range,tot){
		
		if(tot > range){
			alert('infinite loop?');
			return [];
		}
		var unlocked_cats = new Array();
		var randN = 0;
		
		for(var i = 0; i<tot; i++){
			randN = Math.floor(Math.random()*range);
			
			for (var j = 0; j < unlocked_cats.length; j++)
			{
				if (unlocked_cats[j] != randN)
				{
					randN = Math.floor(Math.random()*range);
					break;
				}
			}
	
			
			unlocked_cats.push(randN + 1);
		}
		return unlocked_cats;
	}
	*/
	
	function setNextCategoryTime(time)
	{
		var e = document.getElementById("next_category_time");
		e.innerHTML = time; 
	}
	

	function getUser()
	{
		var url = BTBW.CONST.BASE_URL+"/php/getUser.php?mode=getUser&player_id="+BTBW.Data.Profile.linkedin_id+"&first_name="+BTBW.Data.Profile.firstName+"&last_name="+BTBW.Data.Profile.lastName+"&picture="+BTBW.Data.Profile.picture; // BTBW.Data.Profile.linkedin_id;
		$.ajax({ url:url })
		.done(function(evt) {
			var temp = [];
			temp = evt.split(";");
			setScore(temp[0]);
			
			unlocked_cats = temp[1].split(",");
			setUnlockedCats();
			
			var achievements = temp[2].split(",");
			sharedData.achievement_1 = achievements[0];
			sharedData.achievement_2 = achievements[1];
			sharedData.achievement_3 = achievements[2];
			sharedData.achievement_4 = achievements[3];
			sharedData.achievement_5 = achievements[4];
			sharedData.achievement_6 = achievements[5];
			sharedData.achievement_7 = achievements[6];
			sharedData.achievement_8 = achievements[7];
			sharedData.achievement_9 = achievements[8];
			
			setNextCategoryTime(temp[4])
		})
		.fail(function() { sharedUtilities.reportError(evt); })
		.always(function() { console.log("complete"); });
		return 0;
	}
	
			
	
	getUser();
}