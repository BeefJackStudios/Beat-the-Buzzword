
/* ----------------------------------------------------- */
/* SERVICES */
/* ----------------------------------------------------- */

//create a service for sharing variables between controllers
//sharing through inheritance is not considered best practice because it forces a certain dom structure
BTBWModule.factory('sharedData', function ($q, $http, $location, $dialog) {
    return {
        currentGenreId: null, //stores the genre selected by the user
        //currentChallengeName: BTBW.CONST.GAME_PRACTICE,
        currentChallengeId: null,
        currentChallengeUserId: null
   };
});

BTBWModule.factory('sharedUtilities', function ($q, $http, $location, $dialog, sharedData) {
    return {
        //checks if the answer is correct or not and return a css classname
        evalAnswerToClassname: function(question, answer) {
            if(!answer) { answer = question.answer };
            //if answer not yet given
            if(!answer.length) { return ""; }
			return CryptoJS.MD5(answer).toString() === question.solution ? BTBW.CONST.CLASS_ANSWER_CORRECT : BTBW.CONST.CLASS_ANSWER_WRONG;
        },
		
        //load default data (eg: called when leaving the victory screen)
        loadDefaultData: function() {
            sharedData.currentGenreId = sharedData.currentChallengeId = sharedData.currentChallengeUserId = null;
            //currentChallengeName = BTBW.CONST.GAME_PRACTICE;
        },
        /**
         * Replaces %some_text% occurence with data from an object
         * for example cleanUrlRouteParams('api/v1/challenges/genre/%genre_id%/limit/%limit%/', {genre_id: 12, limit: 10}) 
         * will return api/v1/challenges/genre/12/limit/10/
         * @param  {string} url
         * @param  {object} replacementData {param1: value, param2: value, ...}
         * @return {string} 'api/v1/challenges/genre/value_of_param1/limit/value_of_param2/'
         */
        cleanUrlRouteParams: function(url,replacementData) {
            return url.replace(/%(.*?)%/g, function(match, content) { 
                return typeof replacementData != 'undefined'
                    ? replacementData[content]
                    : ''
                  ;
                }).replace(/\/\/$/g, '/');
        },
        displayAlert: function(message) {
            var template = '<div class="modal-header">'+
              '<h3>Error</h3>'+
              '</div>'+
              '<div class="modal-body">'+
              '<p ng-bind-html-unsafe="message"></p>'+
              '</div>'+
              '<div class="modal-footer">'+
              '<button ng-click="close()" tabindex="1" class="btn btn-primary" >Close</button>'+
              '</div>';

            $dialog.dialog({
                backdrop: true,
                dialogClass: 'modal dialog-alert',
                dialogFade: true,
                resolve: { message: function(){ return message; } },
                keyboard: true,
                backdropClick: false,
                template:  template,
                controller: AlertDialogController
            })
            .open().then(function(){
                $location.path(BTBW.CONST.PATH_INTRO);
			});
        },
		
        reportError: function(error) {
            this.displayAlert(BTBW.CONST.ERROR_MESSAGES[error.code]+ '<br/>Reason: ' + error.msg);
        },
		
		getGenreById: function(id) {
			for (var i in BTBW.Data.Genres){
				if (String(id) == String(BTBW.Data.Genres[i].id)){
					return BTBW.Data.Genres[i];
				}
			}
		},
								
		getBuzzWords: function() {
			function shuffleArray(array) {
				for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
				return array;
			}

			function definePkIdByGenre(){
				var temp = [];
				//get correct genre
				for (var i in BTBW.Data.Buzzwords){
					if (Number(BTBW.Data.Buzzwords[i].genre) == Number(sharedData.currentGenreId)){
						temp.push(BTBW.Data.Buzzwords[i].pk);
					}
				}
				//shuffle and return
				return shuffleArray(temp);
			}
			
			function getBuzzWordsByPkId(id){
				for (var i in BTBW.Data.Buzzwords){
					if (Number(BTBW.Data.Buzzwords[i].pk) == Number(id)){
						return BTBW.Data.Buzzwords[i];
					}
				}
			}
			
			function getRandomWord(){
				var i = Math.floor(Math.random() * (BTBW.Data.Buzzwords.length + 1));
				var word = BTBW.Data.Buzzwords[i].word
				return word;
			}
			
			var questions = [];
			
			// try getting loaded ids (user 2), failing that create news ones (user 1)
			if (sharedData.currentChallengeAnswers){
				var pks = sharedData.currentChallengeAnswers.split(",");
			} else {
				var pks =  definePkIdByGenre();
			}
			
			
			//console.log("pks "+pks)
			//alert(sharedData.currentChallengeAnswers)
			//currentChallengeAnswers
			
			for (var i=0;i<BTBW.CONST.LIMIT_RANDOM_CHALLENGES_BY_GENRE;i++){
				var buzzword = getBuzzWordsByPkId( pks[i] );
				//console.log(pks[i]+" buzzword "+buzzword)
				var options = [getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord()];
				options[Math.floor(Math.random()*4)] = buzzword.word;
				var obj = {"answer": "", "question": buzzword.definition, "solution": CryptoJS.MD5(buzzword.word).toString(), "options": options};
				questions.push(obj);
			}
			
			sharedData.currentChallengeAnswers = pks;
			BTBW.Data.PracticeChallenge = {"timeset":"0", "id":"1", "questions":questions};
			
        }
   };
});

//manages the communication with the server
BTBWModule.service('serverLayer', function ($q, $http, sharedUtilities) {
    return {
		
		createChallenge: function(obj) {        
			//use a promise since we do async requests
            var deferred = $q.defer();
			
			var url = BTBW.CONST.BASE_URL+"/php/functions.php?mode="+obj.mode+"&idPlayer1="+obj.idPlayer1+"&idPlayer2="+obj.idPlayer2+"&playerName="+obj.playerName+"&playerPicture="+obj.playerPicture+"&genre="+obj.genre+"&category="+obj.category+"&answers="+obj.answers+"&score="+obj.score+"&correct="+obj.correct+"&incorrect="+obj.incorrect+"";
            
			//BTBW.Data.Routes.url 
			$http({
                method: BTBW.Data.Routes.method, 
                url: url,
                cache: false,
                //data: $.param(obj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
			success(function(data, status) {
				//alert("createChallenge DONE "+data+" "+status);
                deferred.resolve({}); // id: challengeId, questions: data
            }).
            error(function(data, status) {
				//alert("createChallenge FAIL "+data+" "+status);
                deferred.reject({code: 3, msg: data.msg});
            });
			return deferred.promise;
        },
		
		
		saveScores: function(obj) {        
			//use a promise since we do async requests
            var deferred = $q.defer();
			
			var url = BTBW.CONST.BASE_URL+"/php/functions.php?mode="+obj.mode+"&playerId="+obj.playerId+"&playerName="+obj.playerName+"&playerPicture="+obj.playerPicture+"&genre="+obj.genre+"&category="+obj.category+"&answers="+obj.answers+"&score="+obj.score+"&correct="+obj.correct+"&incorrect="+obj.incorrect+"";
            console.log("url "+url)
									
			//BTBW.Data.Routes.url 
			$http({
                method: BTBW.Data.Routes.method, 
                url: url,
                cache: false,
                //data: $.param(obj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
			success(function(data, status) {
				//alert("createChallenge DONE "+data+" "+status);
                deferred.resolve({}); // id: challengeId, questions: data
            }).
            error(function(data, status) {
				//alert("createChallenge FAIL "+data+" "+status);
                deferred.reject({code: 3, msg: data.msg});
            });
			return deferred.promise;
        },
		
									
									
		getOpenChallenges: function(obj) {
			//use a promise since we do async requests
            var deferred = $q.defer();
			//console.log("getOpenChallenges() (MY) obj.playerId "+obj.playerId)
			//var url = "http://www.berthasworkers.com/dev/btbw/php/functions.php?mode="+obj.mode+"&playerId="+obj.playerId;
			var url = BTBW.CONST.BASE_URL+"/php/functions.php?mode="+obj.mode+"&playerId="+obj.playerId;
			
			//alert(url);
            $http({
				method: BTBW.Data.Routes.method, 
                url: url,
                cache: false,
                //data: $.param(obj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
			success(function(data, status) {
				alert("getOpenChallenges DONE "+data+" "+status);
                deferred.resolve({}); // id: challengeId, questions: data
            }).
            error(function(data, status) {
				alert("getOpenChallenges FAIL "+data+" "+status);
                deferred.reject({code: 3, msg: data.msg});
            });
			return deferred.promise;
        },
		
		
		getUserChallenges: function(userId) {
            var deferred = $q.defer();
			var url = BTBW.CONST.BASE_URL+"/php/functions.php?mode="+obj.mode+"&playerId="+obj.playerId;
            $http({
                method: BTBW.Data.Routes.challenges_set_by_connection.method, 
                url: sharedUtilities.cleanUrlRouteParams(BTBW.Data.Routes.challenges_set_by_connection.url) + userId,
                cache: false
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 4, msg: data.msg});
            });    

            return deferred.promise;
        }, 

		
		getScores: function(userId) {
            var deferred = $q.defer();
			var url =  BTBW.CONST.BASE_URL+"/php/functions.php?mode=getScores&playerId="+userId;
            $http({
                method: "getScores", 
                url: url,
                cache: false
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 4, msg: data.msg});
            });    

            return deferred.promise;
        },  		


		
		
		submitAnswers: function(obj) {
            var deferred = $q.defer();
			
			var url = BTBW.CONST.BASE_URL+"/php/functions.php?mode="+obj.mode+"&playerId="+obj.playerId+"&gameId="+obj.gameId+"&answers="+obj.answers+"&score="+obj.score+"&correct="+obj.correct+"&incorrect="+obj.incorrect+"";
			//console.log("submitAnswers "+url)
		  
            $http({
               	method: BTBW.Data.Routes.method, 
                url: url,
                cache: false,
                //data: $.param(obj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 4, msg: data.msg});
            });    

            return deferred.promise;
        },   
		
		/*
		getUsersWithScores: function(obj) {
            var deferred = $q.defer();
			
			$http({
               	method: BTBW.Data.Routes.method, 
                url: obj.url,
                cache: false,
                data: $.param(obj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
            success(function(data, status) {
				//alert("getUsersWithScores OK "+data)
                deferred.resolve(data);
            }).
            error(function(data, status) {
				//alert("getUsersWithScores FAIL " )
                deferred.reject({code: 4, msg: data.msg});
            });    

            return deferred.promise;
        },  
		*/
	
		
		genericCall: function(obj) {
            var deferred = $q.defer();
			
			$http({
               	method: BTBW.Data.Routes.method, 
                url: obj.url,
                cache: false,
                data: $.param(obj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
            success(function(data, status) {
				//alert("getUsersWithScores OK "+data)
                deferred.resolve(data);
            }).
            error(function(data, status) {
				//alert("getUsersWithScores FAIL " )
                deferred.reject({code: 4, msg: data.msg});
            });    

            return deferred.promise;
        },  
		
		
		/*
        saveAnswer: function(timeout, answer) {            
            $http({
                method: BTBW.Data.Routes.take_turn.method, 
                url: BTBW.Data.Routes.take_turn.url,
                cache: false,
                data: $.param({timer: timeout, answer: answer}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }); 
        },
		
        getNewChallenge: function(genreId) {
            //use a promise since we do async requests
            var deferred = $q.defer();

            $http({
                method: BTBW.Data.Routes.create_challenge.method, 
                url: BTBW.Data.Routes.create_challenge.url,
                data: $.param({genre: genreId}),
                cache: false,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
            success(function(data, status) {
                var challengeId = data.challenge_id;
                //returns the id of newly created challenge
                $http({
                    method: BTBW.Data.Routes.challenge_by_id.method, 
                    url: sharedUtilities.cleanUrlRouteParams(BTBW.Data.Routes.challenge_by_id.url) + challengeId,
                    cache: false
                }).
                success(function(data, status) {
                    deferred.resolve({id: challengeId, questions: data});
                }).
                error(function(data, status) {
                    deferred.reject({code: 2, msg: data.msg});
                });     

            }).
            error(function(data, status) {
                deferred.reject({code: 1, msg: data.msg});
            });

            return deferred.promise;
        }, 
		
        getExistingChallenge: function(challengeId) {
            //use a promise since we do async requests
            var deferred = $q.defer();
            
            $http({
                method: BTBW.Data.Routes.challenge_by_id.method, 
                url: sharedUtilities.cleanUrlRouteParams(BTBW.Data.Routes.challenge_by_id.url) + challengeId,
                cache: false
            }).
            success(function(data, status) {
                deferred.resolve({id: challengeId, questions: data});
            }).
            error(function(data, status) {
                deferred.reject({code: 3, msg: data.msg});
            }); 

            return deferred.promise;
        },
		
        getChallengeBesttimes: function(challengeId) {
            var deferred = $q.defer();

            $http({method: 'GET', url: '//buzz.localhost:8077/api/v1/challenge/besttimes/', cache: false}).
                success(function(data, status) {
                    deferred.resolve(data);
                }).
                error(function(data, status) {
                    deferred.reject({code: 100, msg: data.msg});
                });

            return deferred.promise;
        },
		
        getUserChallenges: function(userId) {
            var deferred = $q.defer();

            $http({
                method: BTBW.Data.Routes.challenges_set_by_connection.method, 
                url: sharedUtilities.cleanUrlRouteParams(BTBW.Data.Routes.challenges_set_by_connection.url) + userId,
                cache: false
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 4, msg: data.msg});
            });    

            return deferred.promise;
        },   
		
        getLoggedInUserCreatedChallenges: function(userId) {
            var deferred = $q.defer();

            $http({
                method: BTBW.Data.Routes.challenges_set_by_user.method, 
                url: sharedUtilities.cleanUrlRouteParams(BTBW.Data.Routes.challenges_set_by_user.url) + userId,
                cache: false
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 5, msg: data.msg});
            });  

            return deferred.promise;
        },
		
        getLoggedInUserPlayedChallenges: function(userId) {
            var deferred = $q.defer();

            $http({
                method: BTBW.Data.Routes.challenges_played_by_user.method, 
                url: sharedUtilities.cleanUrlRouteParams(BTBW.Data.Routes.challenges_played_by_user.url),
                cache: false
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 5, msg: data.msg});
            });  

            return deferred.promise;
        },
		
        getRandomChallengesByGenre: function(genreId) {
            var deferred = $q.defer();

            $http({
                method: BTBW.Data.Routes.challenges_by_genre.method, 
                url: sharedUtilities.cleanUrlRouteParams(BTBW.Data.Routes.challenges_by_genre.url, {genre_id: genreId, limit: BTBW.CONST.LIMIT_RANDOM_CHALLENGES_BY_GENRE}),
                cache: false
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 6, msg: data.msg});
            });   

            return deferred.promise;
        },
		
        sendDataForEmailNotify: function(data) {
            var deferred = $q.defer();

            $http({
                method: BTBW.Data.Routes.challenge_linkdein_connections.method, 
                url: BTBW.Data.Routes.challenge_linkdein_connections.url,
                data: $.param(data),
                cache: false,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 7, msg: data.msg});
            });

            return deferred.promise;
        },
		
        getLinkedInConnections: function() {
            var deferred = $q.defer();

            $http({
                method: BTBW.Data.Routes.linkdein_connections.method, 
                url: BTBW.Data.Routes.linkdein_connections.url,
                cache: false,
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 8, msg: data.msg});
            });

            return deferred.promise;
        },
		
        getEndGameData: function() {
            var deferred = $q.defer();

            $http({
                method: BTBW.Data.Routes.endgamedata.method, 
                url: BTBW.Data.Routes.endgamedata.url,
                cache: false,
            }).
            success(function(data, status) {
                deferred.resolve(data);
            }).
            error(function(data, status) {
                deferred.reject({code: 9, msg: data.msg});
            });

            return deferred.promise;
        }
		
		*/
   };
});
