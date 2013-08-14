

//add format prototype for string type to simulate printf
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

/* ----------------------------------------------------- */
/* APP CONFIGURATION AND OTHER MODULE DEPENDENCIES */
/* ----------------------------------------------------- */

/* ----------------------------------------------------- */
/* DEFINE THE APP MODULE */
/* ----------------------------------------------------- */

//define the app (angular has a module as a starting point in contrast with the usual init function of other frameworks/plugins)
var BTBWModule = angular.module('BTBW', ['ui.bootstrap']);

//disable automatically scroll to top on changing views
BTBWModule.value('$anchorScroll', angular.noop); 

//configure angular to use [[ ]] symbols for binding 
BTBWModule.config(function($interpolateProvider) {
  //set the binding symbols to prevent collision with django
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
})

BTBWModule.config(['$routeProvider', function($routeProvider) {
  //configure router
  $routeProvider.
        when(BTBW.CONST.PATH_INTRO, {
			templateUrl: BTBW.CONST.TEMPLATE_URL_INTRO, 
            controller: IntroController
        }).
        when(BTBW.CONST.PATH_SHOW_CHALLENGES, { 
            templateUrl: BTBW.CONST.TEMPLATE_URL_SHOW_CHALLENGES,
            controller: ShowChallengesController
        }).
        when(BTBW.CONST.PATH_GAMEPLAY, { 
            templateUrl: BTBW.CONST.TEMPLATE_URL_GAMEPLAY, 
            controller: GameplayController
        }).
        when(BTBW.CONST.PATH_GAMEPLAY_EXISTING_CHALLENGE, { 
            templateUrl: BTBW.CONST.TEMPLATE_URL_GAMEPLAY_EXISTING_CHALLENGE, 
            controller: GameplayController
        }).
        when(BTBW.CONST.PATH_VICTORY, { 
            templateUrl: BTBW.CONST.TEMPLATE_URL_VICTORY, 
            controller: VictoryController
        }).
		when(BTBW.CONST.PATH_LOGIN, { 
            templateUrl: BTBW.CONST.TEMPLATE_URL_LOGIN, 
            controller: LoginController
        }).
		when(BTBW.CONST.PATH_ACHIEVEMENTS, { 
            templateUrl: BTBW.CONST.TEMPLATE_URL_ACHIEVEMENTS, 
            controller: AchievementsController
        }).
		when(BTBW.CONST.PATH_SELECT_OPP, { 
            templateUrl: BTBW.CONST.TEMPLATE_URL_SELECT_OPP, 
            controller: SelectOppController
        }).
		when(BTBW.CONST.PATH_SELECT_GENRE, { 
            templateUrl: BTBW.CONST.TEMPLATE_URL_SELECT_GENRE, 
            controller: SelectGenreController
        }).
		
		
		
    otherwise({redirectTo: BTBW.CONST.PATH_LOGIN});
}]);
