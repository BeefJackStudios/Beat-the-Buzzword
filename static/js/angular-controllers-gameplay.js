
function GameplayController($scope, $location, $timeout, $http, $routeParams, $rootScope, sharedUtilities, sharedData, serverLayer) {
   
	$scope.currentQuestion = 0;
    $scope.timeset = 0;
    $scope.isLoading = true;
    $scope.locked = true;
    $scope.waitingForGo = true;
	
	
	$scope.category = sharedUtilities.getGenreById(sharedData.currentGenreId).name;
	
	sharedData.score = 0;
	sharedData.all_correct = true;
	sharedData.correct_cnt = 0;
	sharedData.time_taken = 0;
    
	sharedData.answers = []; // store game progress internally
	sharedData.buzzwords = []; // store game progress internally
	
	// We want to ask same questions from player 2 in h2h
	if (sharedData.currentChallengeName == BTBW.CONST.GAME_HEAD2HEAD && !sharedData.isMyGame)
		sharedUtilities.getBuzzWords(true);
	else
		sharedUtilities.getBuzzWords(false);
	
	$scope.evalAnswerToClassname = sharedUtilities.evalAnswerToClassname;

    //if a challenge id is specified then take the challenge
    if($routeParams.challengeId) {
        sharedData.currentChallengeId = $routeParams.challengeId;
        sharedData.currentChallengeName = BTBW.CONST.GAME_TAKE_CHALLENGE;
    }

    //returns a promise (data loaded remotely)
	
	/*
    var promiseRequest;
	if (!BTBW.CONST.TESTING){ // bypass loading
		
		if(sharedData.currentChallengeName === BTBW.CONST.GAME_TAKE_CHALLENGE) {
		   promiseRequest = serverLayer.getExistingChallenge(sharedData.currentChallengeId);
		} else if(sharedData.currentChallengeName === BTBW.CONST.GAME_SET_CHALLENGE) {
		   promiseRequest = serverLayer.getNewChallenge(sharedData.currentGenreId);
		} else {
			$scope.data = BTBW.Data.PracticeChallenge;
			$scope.isLoading = false;
		}
		
		if(promiseRequest) {
			promiseRequest.then(function(data) {
				//success
				$scope.isLoading = false;
				$scope.data = data;

			}, function(reason){
				//if it fails
				sharedUtilities.reportError(reason);
			});
		}

		//add alert when trying to refresh
		if(sharedData.currentChallengeName !== BTBW.CONST.GAME_PRACTICE) {
			$(window).on('beforeunload', function(e) {
				return 'You will lose your session if you continue!';
			});
		}
	}
	*/
	
    //action to do when the timer expired (mark the aswer as wrong)
    $scope.$on("TIMER_EXPIRED", function() {
        $scope.submitAnswer("TIME EXPIRED");
    });
	
    $scope.$on("TIMER_STARTED", function() {
        $scope.locked = false;
        $scope.waitingForGo = false;
    });
	
	$scope.$on("TIMER_TICKED", function(evt, arg1) {
		console.log("TIMER_TICKED "+evt+" "+arg1);
		$scope.time = arg1;
		$scope.updateTimerView();
	});
	
	$scope.updateTimerView = function() {
		$("#timesetfill").css("width", (240/20)*$scope.time);
	}
	
	function setPlayerScore(prev, added, score)
	{
		var e = document.getElementById("displayScore");
		//e.innerHTML = "Prev Score: " + prev + " + Added Score: " + added + " = Total Score: " + score; 
		e.innerHTML = score; 
		BTBW.Data.Profile.points = score;
	}
	setPlayerScore(sharedData.prev_score, sharedData.score, sharedData.total_score);
	
    $scope.submitAnswer = function(answer, $event) {
        
		//var next_question = $scope.data.questions[$scope.currentQuestion + 1];
		//var e = document.getElementById("debug");
		//e.innerHTML = "Answer: " + $scope.currentQuestion + " :: " + sharedData.buzzwords[$scope.currentQuestion]; 
		
		//set lock to prevent multiple clicks
        if($scope.locked) return;
        $scope.locked = true;

        //update the answer in the question
        var question = $scope.data.questions[$scope.currentQuestion];
        question.answer = answer;			
			
        //add the correct/wrong class to the button
        if($event) {
			var classname = sharedUtilities.evalAnswerToClassname($scope.data.questions[$scope.currentQuestion]);
            angular.element($event.target).addClass(classname, answer);
        }

		

        // if it's not a practice game then send the answer to the server
		// if(sharedData.currentChallengeName !== BTBW.CONST.GAME_PRACTICE) {
        // serverLayer.saveAnswer($scope.timeset, answer);
        // }
		
		
		// SJH  - store progress internally
		var correct = classname=="correct" ? true : false
		sharedData.answers.push({timeset:$scope.timeset, answer:answer});
		sharedData.buzzwords.push({correct:correct, definition:question.question, word:answer});
		
		
		if (!$scope.time) $scope.time = 20;
		
		var is_correct = 0;
		var answering_time = 20;
		var passed_time = answering_time - $scope.time;
		
		sharedData.time_taken += passed_time;
		
		var rightAnswerReward = 0;
		var this_question_score = 0;
		var mult = 1;
		if (correct){
			/*
			Scoring Systems
			Beat the Buzzwords
			10 points for a question right
			The amount of seconds remaining on the clock get added to the score
			x3 to the score if question is answered under 5 seconds
			x2 to the score if the question is answered under 10 seconds.
			(i.e. a question answered correctly with 16 seconds left on the clock)
			(10 + 16) *3 = 78pts

			Head to Head mode
			10 points for a question right
			The amount of seconds remaining on the clock get added to the score
			x3 to the score if question is answered under 5 seconds
			x2 to the score if the question is answered under 10 seconds.
			(i.e. a question answered correctly with 16 seconds left on the clock)
			(10 + 16) *3 = 78pts

			On the results page it should display your score, and your opponents score. It should also apply a head to head ‘bonus’ which adds or removes the percentage you won / lost by from you and your opponents score.

			i.e 
			Lewis    1000pts + 10%!
			Shaun  900pts - 10 %!
			(Lewis scored 10% more than shaun so wins the round, but also receives a 10% points bonus to his score - see below)
			Head to Head Final Score
			Lewis    1100pts + 10%!
			Shaun  800pts - 10 %!

			CEO mode
			20 points for a question right
			The amount of seconds remaining on the clock get added to the score
			x5 to the score if question is answered under 5 seconds
			x3 to the score if the question is answered under 10 seconds.
			(i.e. a question answered correctly with 16 seconds left on the clock)
			(20 + 16) *5 = 180pts
			*/
			is_correct = 1;
			sharedData.correct_cnt++;
		}
		else
			sharedData.all_correct = false;
		
		rightAnswerReward = 10;
		if (sharedData.currentChallengeName == BTBW.CONST.CEO)
			rightAnswerReward = 20;
		
		if (passed_time<5)
			mult = 3;
		else if (passed_time<10)
			mult = 2;
			
		this_question_score = (rightAnswerReward + (answering_time - passed_time)) * mult * is_correct;
		
		sharedData.total_score = parseInt(this_question_score) + parseInt(sharedData.total_score);
		
		sharedData.score += parseInt(this_question_score);
		
		setPlayerScore(sharedData.prev_score, sharedData.score, sharedData.total_score);
		
		function setAnswer()
		{
			var question = $scope.data.questions[$scope.currentQuestion].question.substring(0, 36);
			
			var url = BTBW.CONST.BASE_URL+"/php/setAnaswer.php?mode=setAnaswer&question="+question+"&player_id="+BTBW.Data.Profile.linkedin_id+"&category="+sharedData.currentChallengeName+"&score="+this_question_score+"&genre="+sharedUtilities.getGenreById(sharedData.currentGenreId).name; // BTBW.Data.Profile.linkedin_id;

			$.ajax({ url:url })
			.done(function(evt) {
				//var e = document.getElementById("debug");
				//e.innerHTML = evt; 
			})
			.fail(function() { sharedUtilities.reportError(evt); })
			.always(function() { console.log("complete"); });
			return 0;
		}
		if (is_correct == 1)
			setAnswer();
			
			
		function setAchievement(achievement_id)
		{
			if (achievement_id == 5)
				if (sharedData.achievement_5 == 1) return;
			else if (achievement_id == 6)
				if (sharedData.achievement_5 == 1) return;
			
			var url = BTBW.CONST.BASE_URL+"/php/setAchievement.php?mode=setAchievement&player_id="+BTBW.Data.Profile.linkedin_id+"&achievement_id="+achievement_id; // BTBW.Data.Profile.linkedin_id;
			$.ajax({ url:url })
			.done(function(evt) {
				//var e = document.getElementById("debug");
				//e.innerHTML = evt; 
				if (evt == 5)
					sharedData.achievement_5 = 1;
				else if (evt == 6)
					sharedData.achievement_6 = 1;
			})
			.fail(function() { sharedUtilities.reportError(evt); })
			.always(function() { console.log("complete"); });
			return 0;
		}
		//5. Answer a question in under 3 seconds 500
		if (passed_time < 4 && is_correct == 1)
			setAchievement(5);	

		if (sharedData.all_correct)
			setAchievement(6);	
			
		function setWhoAnsweredHow(_value)
		{
			var json = {};
			for (var i = 0; i < _value; i++)
			{
				json = {linkedin_id:"gggg", firstName:"farhad", lastName:"poorsolaymani", picture:"http://m.c.lnkd.licdn.com/mpr/mprx/0_Z3_74LI-gCffNtau9X3p4QJPl8e7qNxus6Br4bW2m6yxIre2qFP_nFjGxSHKBPY8MGTlchBkSV9f", score:"87x"};
				$scope.WhoAnsweredHow.push(json);
			}
			$scope.showOpps = true;
			$timeout(BTBW.Utilities.initScrollbars, 0);	
		}
		//setWhoAnsweredHow(4);

		
		 //reset the timer 
        $rootScope.$broadcast("RESET_TIMER");
		$scope.time = answering_time;
		
		
		sharedData.scoretobeat = 100;
		// end internal STUFF
		
		function getInAndCorrect(){
			var correct = 0;
			var incorrect = 0;
			for (var i in sharedData.buzzwords){
				sharedData.buzzwords[i].correct ? correct++ : incorrect++
			}
			return {correct:correct, incorrect:incorrect};
		}
		
						
       $timeout(function(){
            //if last question go to victory screen
           if($scope.currentQuestion >= $scope.data.questions.length - 1) {	
				if (sharedData.currentChallengeName == BTBW.CONST.GAME_BUZZWORD){
					console.log(">> submit GAME_BUZZWORD "+sharedData.score)
					serverLayer.saveScores({
									mode:"saveScores",
									playerId:BTBW.Data.Profile.linkedin_id,
									playerName : BTBW.Data.Profile.firstName+" "+BTBW.Data.Profile.lastName,
									playerPicture : BTBW.Data.Profile.picture,
									genre:sharedUtilities.getGenreById(sharedData.currentGenreId).name,
									category:sharedData.currentChallengeName,
									answers:sharedData.currentChallengeAnswers,				
									score:sharedData.score,
									correct:getInAndCorrect().correct,
									incorrect:getInAndCorrect().incorrect
								});
								
				// create game on server if mygame && head2head
				} else if (sharedData.currentChallengeName == BTBW.CONST.GAME_HEAD2HEAD){
				
					// My new set HeadToHead function
					function setHeadToHead(is_complete)
					{	
						var url = BTBW.CONST.BASE_URL+"/php/setHeadToHead.php?mode=setHeadToHead&player_id_1="+BTBW.Data.Profile.linkedin_id+"&player_id_2="+sharedData.currentChallengeUserId+"&genre_id="+sharedData.currentGenreId+"&is_complete="+is_complete+"&random_questions="+sharedData.random_questions; // BTBW.Data.Profile.linkedin_id;
						$.ajax({ url:url })
						.done(function(evt) {
							//var e = document.getElementById("debug");
							//e.innerHTML = evt; 
						})
						.fail(function() { sharedUtilities.reportError(evt); })
						.always(function() { console.log("complete"); });
						return 0;
					}
					
					if (sharedData.isMyGame)
						setHeadToHead(0);
					else
						setHeadToHead(1);
				
					
						
					if (sharedData.isMyGame){
						console.log(">> submit GAME_HEAD2HEAD player 1 "+sharedData.score)
						serverLayer.createChallenge({
									mode:"createGame",
									idPlayer1 : BTBW.Data.Profile.linkedin_id,
									idPlayer2 : sharedData.currentChallengeUserId,
									playerName : BTBW.Data.Profile.firstName+" "+BTBW.Data.Profile.lastName,
									playerPicture : BTBW.Data.Profile.picture,
									genre : sharedUtilities.getGenreById(sharedData.currentGenreId).name,
									category : sharedData.currentChallengeName,
									answers : sharedData.currentChallengeAnswers,				
									score : sharedData.score,
									correct : getInAndCorrect().correct,
									incorrect : getInAndCorrect().incorrect
								});
						$scope.sendLinkedInMessage( BTBW.Data.Profile.linkedin_id, BTBW.CONST.MESSAGE_EMAIL_BODY_CHALLENGE );
					
						
					} else {
						console.log(">> submit GAME_HEAD2HEAD player 2 "+sharedData.score)
						serverLayer.submitAnswers({
									mode:"submitAnswers",
									playerId:BTBW.Data.Profile.linkedin_id,
									playerName : BTBW.Data.Profile.firstName+" "+BTBW.Data.Profile.lastName,
									playerPicture : BTBW.Data.Profile.picture,
									gameId:sharedData.currentChallengeId,	
									answers:sharedData.currentChallengeAnswers,				
									score:sharedData.score,
									correct:getInAndCorrect().correct,
									incorrect:getInAndCorrect().incorrect
								});
								
						$scope.sendLinkedInMessage( BTBW.Data.Profile.linkedin_id, BTBW.CONST.MESSAGE_EMAIL_BODY_CHALLENGE );
					}	
				} 
				
				$location.path(BTBW.CONST.PATH_VICTORY);
				return;
			
			}
			
            //else increment the current question
            $scope.currentQuestion++;
            $scope.locked = false;
            if($event) {
                angular.element($event.target).removeClass(BTBW.CONST.CLASS_ANSWER_WRONG).removeClass(BTBW.CONST.CLASS_ANSWER_CORRECT);
            }
        }, 1000);
		
		
    }
	
	
	$scope.sendLinkedInMessage = function(userid, message) {
		var BODY = {
			"recipients": {
			   "values": [{
				 "person": {
					"_path": "/people/" + userid,
				 }
			   }]
			 },
			"subject": "Message from Message Sender",
			"body": message
		}
		
		IN.API.Raw("/people/~/mailbox")
		   .method("POST")
		   .body(JSON.stringify(BODY)) 
		   .result(function(result) { console.log ("Message sent") })
		   .error(function error(e) { console.log ("No dice") });
	}
	
    $scope.isTheCorrectButton = function(answer) {
        //no button has been selected yet
        if(!$scope.locked || $scope.waitingForGo) { return; }
        return sharedUtilities.evalAnswerToClassname($scope.data.questions[$scope.currentQuestion], answer);
    }

    //reset data after leaving the victory view
    $scope.$on("$destroy", function() {
        //remove the alert from page refresh
        if(sharedData.currentChallengeName !== BTBW.CONST.GAME_PRACTICE) {
            $(window).off('beforeunload');
        }
    });
	
	/*
	// -- TEST -------------------------
	if (BTBW.CONST.TESTING){
		$scope.data = BTBW.Data.PracticeChallenge;
		$scope.isLoading = false;
		$scope.locked = false;
		$scope.waitingForGo = false;
	}
	*/
	
	$scope.data = BTBW.Data.PracticeChallenge;
	$scope.isLoading = false;
	//$scope.locked = false;
	//$scope.waitingForGo = false;
	
	$scope.challengeName = sharedData.currentChallengeName;
	

		//var e = document.getElementById("wrap-overlay");
	//e.style.background = "url('static/img/PlayAreaQuestion.png') no-repeat 50% 0"; 
	$scope.wrap_background = "url('static/img/PlayAreaQuestion.png') no-repeat 50% 0";
	// ----------------------------------
	
	
	
	

	
	$scope.oppClose = function() 
	{
		$scope.showOpps = false;
	}
	
	$scope.WhoAnsweredHow = [];

	function getWhoAnsweredHow()
	{
		var temp = [];
		temp = $scope.data.questions;
		var questions = "";
		for (var i in temp)
			questions += temp[i].question.substring(0, 36) + "::";
	
		var url = BTBW.CONST.BASE_URL+"/php/getWhoAnsweredHow.php?mode=getWhoAnsweredHow&questions="+questions;
		$.ajax({ url:url })
		.done(function(evt) {
			//var e = document.getElementById("debug");
			//e.innerHTML = evt; 
		})
		.fail(function() { sharedUtilities.reportError(evt); })
		.always(function() { console.log("complete"); });
		return 0;
	}
	
	setTimeout(function() {
		getWhoAnsweredHow();
	}, 50);


		
}