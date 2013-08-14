// Namespace
this.BD = this.BD || {};

	
/* ----------------------------------------------------- */
/* CONTROLLERS */
/* ----------------------------------------------------- */

function BTBWController($scope, $rootScope, $location, $route, $dialog, sharedData, sharedUtilities) {
	
	//$scope.isLoading = true;
	
	new BD.Loader(new BD.AssetsMain(), {}).load(function(){}, "");
	
	
	$scope.profile = BTBW.Data.Profile;
	$scope.today = new Date();
	
	$scope.gotoDashboard = function() {
        $location.path(BTBW.CONST.PATH_INTRO);
	}
	
	$scope.gotoLeaderboardPage = function() {
		sharedData.currentChallengeUserId = null;
        $location.path(BTBW.CONST.PATH_SHOW_CHALLENGES);
	}
	/*
    $scope.gotoMyChallenges = function() {
        sharedData.currentChallengeUserId = $scope.profile.linkedin_id;
        if($location.path() === BTBW.CONST.PATH_SHOW_CHALLENGES) { 
            $route.reload();
        } else {
            $location.path(BTBW.CONST.PATH_SHOW_CHALLENGES);
		}
    }
	*/
	
	//--------------------------------------------------------------------------
	// LinkedIn API STUFF
	//--------------------------------------------------------------------------
	try {
		//$scope.isLoggedIn = false;
		$(isLoggedIn).hide();
		$("#wrap-linkedin").hide();
		$("#wrap-usermenu").hide();
	} catch(e){}
	
	// as its not easy to pass the api from the html to angular, we're polling to pull it up rather then inject
	$scope.linkedinpole = setInterval(function(){
		if (IN){
			if (IN.API){
				//console.log(":: linkedin loaded :: "+IN.API)
				$scope.init();
			}
		}
	}, 500);
	
	$scope.init = function() {
		try {
			IN.API.Profile("me").result($scope.onMyProfileLoaded);
			clearInterval($scope.linkedinpole);
		} catch(e){
			//not authorised (yet?)
		}
	}
	
	$scope.onMyProfileLoaded = function(profiles) {
		member = profiles.values[0];
		console.log("$scope.onMyProfileLoaded MY ID : "+member.id)
		
		BTBW.Data.Profile.firstName = member.firstName;
		BTBW.Data.Profile.lastName = member.lastName;
		BTBW.Data.Profile.linkedin_id = member.id;
		BTBW.Data.Profile.picture = member.pictureUrl;
		BTBW.Data.Profile.points = 0;
		BTBW.Data.Profile.rank = "Intern";
		
		if (!member.pictureUrl){
			BTBW.Data.Profile.picture =  BTBW.CONST.BASE_URL+"/static/img/placeholder.jpg"
		}
		
		
		// LOAD CONNECTIONS
		BTBW.Data.connections = [];
		
		// displays login - after this
		IN.API.Connections("me").fields(["firstName", "lastName", "pictureUrl", "id"]).params({"start":1, "count":100}).result($scope.onConnectionsLoaded);
		
		//IN.API.Connections("me").params({"first-name":"Jonathan", "relation-to-viewer":"1"}).params({"start":1, "count":10}).result($scope.displayConnections);
		// ----- keyword search of anon people ----- 
		//IN.API.PeopleSearch().params({"first-name":"Jonathan", "relation-to-viewer":"1"}).result($scope.displayConnections)
		//IN.API.PeopleSearch().params({ "start":1, "count":50, keywords:"CEO"}).result($scope.displayConnections)
		//IN.API.PeopleSearch().params({ "start":1, "count":50, keywords:"Freelance"}).result($scope.displayConnections)
		//IN.API.PeopleSearch().fields(["firstName","headline"]).result($scope.displayConnections)
		//IN.API.PeopleSearch().fields(["firstName","headline"]).result(function(result) { alert JSON.stringify(result)) }
	}
	
	$scope.onConnectionsLoaded = function(result) {
		//console.log("result "+result.values)
		for (var index in result.values) {
			profile = result.values[index]
			if (profile.pictureUrl) {
				var con = {};
				console.log("con.firstName lastName : "+profile.firstName+" "+profile.lastName+" profile.id "+profile.id)
				//console.log("con.position  : "+con.position)
				
				con.firstName = profile.firstName;
				con.lastName = profile.lastName;
				con.linkedin_id = profile.id;
				con.picture = profile.pictureUrl;
				BTBW.Data.connections.push(con);
			}    
		}
		
		$scope.connections = BTBW.Data.connections;
		
		//$scope.getOpenChallenges();
		$scope.getConnectionsWithScores();
	}

	
	
	$scope.getConnectionsWithScores = function() {
		
		//$playerIdsString = "'N9IqeIebx0', 'xxxxx'";
		
		//http://localhost/btbw/php/functions.php?mode=getUsersWithScores&playerIdsString='N9IqeIebx0',%20'xxxxx'
			
		var arr = "";
		for (var i in BTBW.Data.connections){
			arr += "'"+BTBW.Data.connections[i].linkedin_id+"',";
		}
		arr = arr.substr(0, arr.length-1);
		//if ()
		//alert( arr.charAt(arr.length-1) )
		
		var url =  BTBW.CONST.BASE_URL+"/php/functions.php?mode=getUsersWithScores&playerIdsString="+arr; // ["N9IqeIebx0","xxxxx"];
		//alert(url)
		console.log(url)
		console.log("LEN : "+url.length)
		
       $.ajax({ url: url })
		.done(function(evt) { 
			var temp = [];
			var spl = evt.split(",");
			console.log(":: getConnectionsWithScores :: LOADED OK  :: spl "+spl);
			
			for (var i in spl){
				var id = spl[i];
				//console.log(":: getOpenChallenges :: id "+id);
				if (id !=  "undefined"){
					for (var c in BTBW.Data.connections){
						if (id == BTBW.Data.connections[c].linkedin_id){
							temp.push(BTBW.Data.connections[c])
						}
					}
				}
			}
			$scope.updateChallenges( $.unique(temp) );
			$scope.loadBuzzwords();
		})
		.fail(function(evt) { sharedUtilities.reportError(evt); })
		.always(function() { console.log("complete"); });
	}
	
	//------------------
	/*
	$scope.getOpenChallenges = function() {
		var url =  BTBW.CONST.BASE_URL+"/php/functions.php?mode=getOpenChallenges&playerId="+BTBW.Data.Profile.linkedin_id;
       $.ajax({ url: url })
		.done(function(evt) { 
			var temp = [];
			var spl = evt.split(",");
			console.log(":: getOpenChallenges :: LOADED OK  :: spl "+spl);
			for (var i in spl){
				var id = spl[i];
				if (id !=  "undefined"){
					for (var c in BTBW.Data.connections){
						if (id == BTBW.Data.connections[c].linkedin_id){
							temp.push(BTBW.Data.connections[c])
						}
					}
				}
			}
			$scope.updateChallenges( $.unique(temp) );
			$scope.loadBuzzwords();
		})
		.fail(function(evt) { sharedUtilities.reportError(evt); })
		.always(function() { console.log("complete"); });
	}
	*/
	
	
	$scope.updateChallenges = function(arr) {
		console.log("updateConns"+arr);
		$scope.challenges = arr;
	}
	
	//--------------------------------------------------------------------------
	// load Buzzwords
	//--------------------------------------------------------------------------
	$scope.loadBuzzwords = function() {
		$.ajax({ url: BTBW.CONST.BASE_URL+"/data/buzzwords.json" })
		.done(function(data) {
			var temp = [];
			for (var i in data){
				var pk 			= Math.floor( data[i].pk );
				var genre 		= Math.floor( data[i].fields.genre );
				var definition 	= String( data[i].fields.definition );
				var word 		= String( data[i].fields.word );
				var clue 		= String( data[i].fields.clue );
				var obj 		= {pk:pk, genre:genre, definition:definition, word:word, clue:clue};
				if (definition != "undefined" && definition.length>2){
					temp.push(obj);
				}
				//console.log(pk+" "+genre+" "+definition+" "+word+" "+clue)
			}
			BTBW.Data.Buzzwords = temp;
			$scope.complete();
		})
		.fail(function(evt) { sharedUtilities.reportError(evt); })
		.always(function() { console.log("complete"); });
	}
	
	
	//--------------------------------------------------------------------------
	// complete
	//--------------------------------------------------------------------------
	$scope.complete = function() {
		try {
			$(isLoggedIn).show();
		} catch(e){}
		setTimeout(function(){	
			//$location.path(BTBW.CONST.PATH_GAMEPLAY);
			//$location.path(BTBW.CONST.PATH_INTRO);
			//$scope.gotoLeaderboardPage()
		}, 500);
	}
	
	//--------------------
	$scope.play = function() {
		try {
			$("#wrap-linkedin").show();
			$("#wrap-usermenu").show();
		} catch(e){}
		//doesn't automatically nav, not sure why yet.
       $location.path(BTBW.CONST.PATH_INTRO);	
	}
	
	//-------------------------
	// always redirect to login
	$location.path(BTBW.CONST.PATH_LOGIN);
	 
}


