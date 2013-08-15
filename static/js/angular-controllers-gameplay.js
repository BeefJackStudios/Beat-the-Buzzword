
function GameplayController($scope, $location, $timeout, $http, $routeParams, $rootScope, sharedUtilities, sharedData, serverLayer) {
   
	$scope.currentQuestion = 0;
    $scope.timeset = 0;
    $scope.isLoading = true;
    $scope.locked = true;
    $scope.waitingForGo = true;
    
	sharedData.answers = []; // store game progress internally
	sharedData.buzzwords = []; // store game progress internally
	
	sharedUtilities.getBuzzWords();
	
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
       //console.log("TIMER_TICKED "+arg1);
	    $scope.time = arg1;
    });
	
    $scope.submitAnswer = function(answer, $event) {
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

        //reset the timer 
        $rootScope.$broadcast("RESET_TIMER");
		$scope.time = 20;

        // if it's not a practice game then send the answer to the server
		// if(sharedData.currentChallengeName !== BTBW.CONST.GAME_PRACTICE) {
        // serverLayer.saveAnswer($scope.timeset, answer);
        // }
		
		
		// SJH  - store progress internally
		var correct = classname=="correct" ? true : false
		sharedData.answers.push({timeset:$scope.timeset, answer:answer});
		sharedData.buzzwords.push({correct:correct, definition:question.question, word:answer});
		
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
			
			var rightAnswerReward = 10;
			if (sharedData.currentChallengeName == BTBW.CONST.CEO)
				rightAnswerReward = 20;
			
			if ($scope.time<5){
				var mult = 3;
			} else if ($scope.time<10){
				var mult = 2;
			} else {
				var mult = 1;
			}
			
			if (!sharedData.score) sharedData.score = 0;
			sharedData.score += ((rightAnswerReward + $scope.time)*mult);
			
		}
	
		
		
		
		
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
				
				// create game on server if mygame && head2head
				} else if (sharedData.currentChallengeName == BTBW.CONST.GAME_HEAD2HEAD){
						
					if (sharedData.isMyGame){
						console.log(">> 1")
						serverLayer.createChallenge({
									mode:"createGame",
									idPlayer1:BTBW.Data.Profile.linkedin_id,
									idPlayer2:sharedData.currentChallengeUserId,
									genre:sharedUtilities.getGenreById(sharedData.currentGenreId).name,
									category:sharedData.currentChallengeName,
									answers:sharedData.currentChallengeAnswers,				
									score:sharedData.score,
									correct:getInAndCorrect().correct,
									incorrect:getInAndCorrect().incorrect
								});
						$scope.sendLinkedInMessage( BTBW.Data.Profile.linkedin_id, BTBW.CONST.MESSAGE_EMAIL_BODY_CHALLENGE );
					
						
					} else {
						console.log(">> 2")
						serverLayer.submitAnswers({
									mode:"submitAnswers",
									playerId:BTBW.Data.Profile.linkedin_id,
									gameId:sharedData.currentChallengeId,	
									answers:sharedData.currentChallengeAnswers,				
									score:sharedData.score,
									correct:getInAndCorrect().correct,
									incorrect:getInAndCorrect().incorrect
								});
								
						$scope.sendLinkedInMessage( BTBW.Data.Profile.linkedin_id, BTBW.CONST.MESSAGE_EMAIL_BODY_CHALLENGE );
					}
						
						
				} else {
					console.log(">> 3 "+sharedData.score)
					serverLayer.saveScores({
									mode:"saveScores",
									playerId:BTBW.Data.Profile.linkedin_id,
									genre:sharedUtilities.getGenreById(sharedData.currentGenreId).name,
									category:sharedData.currentChallengeName,
									answers:sharedData.currentChallengeAnswers,				
									score:sharedData.score,
									correct:getInAndCorrect().correct,
									incorrect:getInAndCorrect().incorrect
								});
					
					
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
		
}