
function VictoryController($scope, $dialog, $location, $timeout, sharedData, serverLayer, sharedUtilities) {
    $scope.isPracticeGame = sharedData.currentChallengeName === BTBW.CONST.GAME_PRACTICE;
	
	//determine if the victory url is accessed directly (through refresh for ex)
	$scope.isValidSession = sharedData.currentGenreId || sharedData.currentChallengeId || sharedData.currentChallengeUserId;

   //if accessed directly return to the intro view
   // TEMP REMOVED
   //if(!$scope.isValidSession) { $location.path(BTBW.CONST.PATH_INTRO); }
   
    $scope.data = null;
    $scope.checkAnswer = sharedUtilities.evalAnswerToClassname;
    $scope.emailButtonDisplayed = sharedData.currentChallengeName === BTBW.CONST.GAME_SET_CHALLENGE;

	//$scope.data = {};
	
	/*
    if(!$scope.isPracticeGame) {
        serverLayer.getEndGameData().then(function(data){
            $scope.data = data.gamedata;
            //relayout the panel after updating the data
            $timeout(BTBW.Utilities.initScrollbars, 0); 
        });
    } else {
		$scope.data = sharedData.answers || [];
		$scope.data.score = sharedData.score || 0;
		$scope.data.scoretobeat = sharedData.scoretobeat || 0;
		//relayout the panel after updating the data
        $timeout(BTBW.Utilities.initScrollbars, 0); 
	}
	*/

	// Show scores for all games regardless of server submit
	$scope.data = sharedData.answers || [];
	$scope.data.score = sharedData.score || 0;
	$scope.data.scoretobeat = sharedData.scoretobeat || 0;
	$timeout(BTBW.Utilities.initScrollbars, 0); 
	$scope.data.buzzwords = sharedData.buzzwords;
	
	
	
    $scope.evaluateScore = function(isFeedbackMessage) {
        //if accessed directly return to the intro view
        //prevent throwing errors because of bindings when accesing the victory screen directly
        if(!sharedData.isValidSession) { return null; }

        var plural = $scope.data.correct !== 1 ? 's' : ''; //determine plural - answers or answer

        //determine the percentage of correct answers and multiply by 5 to get an entry from the EVALUATED_SCORE_FEEDBACK array (5 values)
        var scoreLevel = Math.round($scope.data.correct / $scope.data.buzzwords.length * 5);

        //if it's only the feedback message return it
        if(isFeedbackMessage) {
            return BTBW.CONST.EVALUATED_SCORE_FEEDBACK[scoreLevel];
        } 

        //otherwise it's the correct answers message
        if (sharedData.currentChallengeName === BTBW.CONST.GAME_SET_CHALLENGE ||  sharedData.currentChallengeName === BTBW.CONST.GAME_PRACTICE) {
            return BTBW.CONST.EVALUATED_SCORE_MSG_FORMAT_1.format(completedChallenge.correctAnswers, plural);
        } else if ( sharedData.currentChallengeName === BTBW.CONST.GAME_TAKE_CHALLENGE ) {
            return BTBW.CONST.EVALUATED_SCORE_MSG_FORMAT_2.format(2);
        }
    }

    $scope.gotoDashboard = function() {
        $location.path(BTBW.CONST.PATH_INTRO);
	}

    $scope.challengeConnections = function() {        
        var template = '<div class="modal-header">'+
          '<h3>This is the title</h3>'+
          '<p><input type="text" tabindex="1" autofocus="autofocus" data-ng-model="filterPlayerName"/><a href="javascript:void(0);" data-ng-click="filterPlayerName = \'\'">X</a></p>'+
          '</div>'+
          '<div class="modal-body ng-class:{\'loading\': isLoading}">'+
          '<label data-ng-repeat="profile in data | filter: filterByPlayerName" class="ng-class:{\'selected\':profile.checked, \'disabled\': result.length >= 5 && !profile.checked}"><input type="checkbox" data-ng-model="profile.checked" data-ng-disabled="result.length >= 5 && !profile.checked" data-ng-click="selectConnection(profile, $event);"/><img ng-src="{[{ profile.picture }]}" />{[{ profile.firstName }]} {[{ profile.lastName }]}</label>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<div>'+
          '<p data-ng-bind="feedbackMessage"></p>'+
          '<p class="people">The email will be sent to: <span data-ng-repeat="profile in result"> <span data-ng-show="$index != 0">,</span>{[{profile.firstName}]} {[{profile.lastName[0]}]} </span></p>'+
          '<p>Enter you email message here:</p>'+
          '</div>'+
          '<textarea data-ng-model="emailMessage"></textarea><br/>'+
          '<button ng-click="submit(result)" tabindex="1" class="btn btn-primary" >Submit</button>'+
          '<button ng-click="close()" tabindex="2" class="btn btn-primary" >Close</button>'+
          '</div>';

        $dialog.dialog({
            backdrop: true,
            dialogClass: 'modal dialog-victory',
            keyboard: false,
            backdropClick: false,
            template:  template,
            controller: VictoryDialogController
        })
          .open()
          .then(function(result){
            if(result) {
                console.log('dialog closed with result: ' + result);
            }
        });
    }
	
	
	
	//----------------
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
	
	
	$scope.challengeName = sharedData.currentChallengeName;
	
	$scope.correct_cnt = sharedData.correct_cnt;
	
	function timeFromSecs(seconds)
	{
		//Math.floor(seconds/86400)+'d
		//Math.floor(((seconds/86400)%1)*24)+'h
		var min = Math.floor(((seconds/3600)%1)*60);
		var sec = Math.round(((seconds/60)%1)*60);
		
		var num_sec = "";
		if (sec < 10)
			num_sec = "0" + sec;
		else
			num_sec = sec;
			
		var num_min = min;
		/*
		if (min < 10 && min != 0)
			num_min = "0" + min;
		else
			num_min = min;
		*/
		
		return num_min + ":" + num_sec;
	}
	
	$scope.time_taken = timeFromSecs(sharedData.time_taken);
	
	
	
	function setAchievement()
	{
		//1. Complete one full game of beat the buzzwords 	500
		//2. Complete one full game of head to head 	500
		//3. Complete one full game of CEO 	500
		//4. Complete one full game of Entrepenuer 	500
		var challenge_name = sharedData.currentChallengeName;
		var challenge_id = 0;
		
		if (challenge_name == BTBW.CONST.GAME_PRACTICE)
		{
			challenge_id = 1;
			if (sharedData.achievement_1 == 1) return;
		}
		else if (challenge_name == BTBW.CONST.GAME_HEAD2HEAD)
		{
			challenge_id = 2;
			if (sharedData.achievement_2 == 1) return;
		}
		else if (challenge_name == BTBW.CONST.CEO)
		{
			challenge_id = 3;
			if (sharedData.achievement_3 == 1) return;
		}
		else if (challenge_name == BTBW.CONST.GAME_ENTRENPENUER)
		{
			challenge_id = 4;
			if (sharedData.achievement_4 == 1) return;
		}			
			
		var url = BTBW.CONST.BASE_URL+"/php/setAchievement.php?mode=setAchievement&player_id="+BTBW.Data.Profile.linkedin_id+"&achievement_id="+challenge_id; // BTBW.Data.Profile.linkedin_id;
		$.ajax({ url:url })
		.done(function(evt) {
			//var e = document.getElementById("debug");
			//e.innerHTML = evt; 
			if (evt == 1)
				sharedData.achievement_1 = 1;
			else if (evt == 2)
				sharedData.achievement_2 = 1;
			else if (evt == 3)
				sharedData.achievement_3 = 1;
			else if (evt == 4)
				sharedData.achievement_4 = 1;
		})
		.fail(function() { sharedUtilities.reportError(evt); })
		.always(function() { console.log("complete"); });
		return 0;
	}
	
	setAchievement();
	

}

// controller for the boostrap dialog
function VictoryDialogController($scope, dialog, sharedData, serverLayer){
    $scope.isLoading = true;
    $scope.result = [];
    $scope.emailMessage = "Hi, you've been challenged to beat a buzzword!";
    $scope.filterPlayerName = null;
    $scope.feedbackMessage = "";

    if(!BTBW.Data.LinkedInConnections || BTBW.Data.LinkedInConnections.length <= 0) {
        serverLayer.getLinkedInConnections().then(function(data) {
            //success
            $scope.isLoading = false;

            BTBW.Data.LinkedInConnections = data;
            $scope.data = BTBW.Data.LinkedInConnections;

            if(data.length <= 0) {
                $scope.feedbackMessage = 'There was an error while getting the connections from LinkedIn!';
            }

        }, function(reason){
            //if it fails
            console.log(reason);
        });
    } else {
        $scope.isLoading = false;
        $scope.data = BTBW.Data.LinkedInConnections;
    }

    $scope.$watch('result', function(newValue, oldValue) {
        if (newValue.length >= 5) {
            $scope.feedbackMessage = BTBW.CONST.MESSAGE_EMAIL_USERS_LIMIT;
            return;
        }
        if(newValue.length <= 0) {
            $scope.feedbackMessage = BTBW.CONST.MESSAGE_EMAIL_USERS_MINIMUM;
            return;
        }
        $scope.feedbackMessage = '';
    }, true);

    $scope.close = function(result){
        dialog.close(result);
    };
    $scope.selectConnection = function(profile, $event){
        if($event.target.checked) {
            $scope.result.push(profile);
        } else {
           $scope.result = $.grep($scope.result, function(el){
              return (el != profile);
            });
        }
    }
    $scope.filterByPlayerName = function(item) {
        return !$scope.filterPlayerName || 
        item.firstName.toLowerCase().indexOf($scope.filterPlayerName.toLowerCase()) !== -1 || 
        item.lastName.toLowerCase().indexOf($scope.filterPlayerName.toLowerCase()) !== -1 ;
    }
    $scope.submit = function() {
        alert('This page allows the user to select up to five of their connections, and then send them a message via Linkedin\'s "InMail" with a link that brings them to the challenge within the game. It has been removed during this phase of testing to avoid notifying people innapropriately/accidentally.');
        return false;
        if($scope.result <= 0) return;
        var ids = '';
        $.each($scope.result, function (index, value) { 
            ids += value.linkedin_id;
            if(index !== $scope.result.length - 1) { ids += ','; }
        });
        serverLayer.sendDataForEmailNotify({recipients: ids, challenge_id: sharedData.completedChallenge.id, content: $scope.emailMessage})
        .then(function(data){
            $scope.feedbackMessage = BTBW.CONST.MESSAGE_EMAIL_SENT;
        }, function(reason){
            $scope.feedbackMessage = BTBW.CONST.MESSAGE_EMAIL_NOT_SENT;
        });
    }
	
	
	


	
	
	
}