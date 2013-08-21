/* ----------------------------------------------------- */
/* CONSTANTS AND UTILITY FUNCTIONS */
/* ----------------------------------------------------- */

//var local = "file:///C:/Users/hadcroft/Dropbox/beefjack_pitch/build"

BTBW.CONST = BTBW.CONST || {
    TESTING : 1, 
	
	
	"BASE_URL": "/btbw", // LOCAL
	//"BASE_URL": "/GitHub/Beat-the-Buzzword",
	//"BASE_URL": "/dev/btbw2", // ONLINE
	
	"CSSCLASS_SCROLLABLE_TABLE": "wrap-table",

    "GAME_PRACTICE": "Buzzword",
    "GAME_BUZZWORD": "Buzzword",
    "GAME_HEAD2HEAD": "Head 2 Head",
	"GAME_CEO": "CEO",
	"GAME_ENTRENPENUER": "Entrenpenuer",
	
    
	"GAME_SET_CHALLENGE": "set-challenge",
    "GAME_TAKE_CHALLENGE": "take-challenge",

	"PATH_LOGIN": "/login",
    "PATH_GAMEPLAY": "/gameplay",
    "PATH_GAMEPLAY_EXISTING_CHALLENGE": "/gameplay/:challengeId",
    "PATH_SHOW_CHALLENGES": "/show-challenges",
    "PATH_VICTORY": "/victory",
    "PATH_INTRO": "/intro",
    "PATH_ACHIEVEMENTS": "/achievements",
    "PATH_SELECT_OPP": "/selectopp",
    "PATH_SELECT_GENRE": "/selectgenre",
    "PATH_LEADERBOARD": "/leaderboard",

    "TEMPLATE_URL_LOGIN": "static/partials/login.html",
    "TEMPLATE_URL_INTRO": "static/partials/intro.html",
    "TEMPLATE_URL_SHOW_CHALLENGES": "static/partials/show-challenges.html",
    "TEMPLATE_URL_GAMEPLAY": "static/partials/gameplay.html",
    'TEMPLATE_URL_GAMEPLAY_EXISTING_CHALLENGE': "static/partials/gameplay.html",
    'TEMPLATE_URL_VICTORY': "static/partials/victory.html",
    'TEMPLATE_URL_ACHIEVEMENTS': "static/partials/achievements.html",
    'TEMPLATE_URL_SELECT_OPP': "static/partials/selectopp.html",
    'TEMPLATE_URL_SELECT_GENRE': "static/partials/selectgenre.html",
    'TEMPLATE_URL_LEADERBOARD': "static/partials/show-leaderboard.html",

    'MESSAGE_TIMER_GO': 'GO!',   
    'MESSAGE_SELECT_GENRE': 'Please select a genre in order to continue!',
    'MESSAGE_EMAIL_SENT': 'The message successfully sent!',
    'MESSAGE_EMAIL_NOT_SENT': 'The message was not sent! Please try again later.',
    'MESSAGE_EMAIL_USERS_LIMIT': 'You selected all 5 available connections. You are ready to send the message now.',
    'MESSAGE_EMAIL_USERS_MINIMUM': 'Please select at least one connection!',

	'MESSAGE_EMAIL_BODY_CHALLENGE': 'You have been challenged to a game of "Beat the Buzz Word". Click here for more: ',
	'MESSAGE_EMAIL_BODY_CHALLENGE_REPLY': 'Your "Beat the Buzz Word" challenge has been completed. Click here for more: ',
	
    "EVALUATED_SCORE_MSG_FORMAT_1": "{0} correct answer{1}",
    "EVALUATED_SCORE_MSG_FORMAT_2": "You beat the time set by",
    "EVALUATED_SCORE_FEEDBACK": {
        1: "Oh my!", 
        2: "Getting there...", 
        3: "Good work", 
        4: "Impressive!", 
        5: "Excellent!"
    },

    "ERROR_AJAX": "(Not implemented) AJAX Request failed: {0}",
    "ERROR_NOT_IMPLEMENTED": "(Not implemented) To do {0}",
    "ERROR_MESSAGES": {
        0: 'There was an error while fetching the challenges.',
        1: 'There was an error while creating a new challenge.',
        2: 'There was an error while fetching the newly created challenge.',
        3: 'There was an error while fetching the selected challenge.',
        4: 'There was an error while fetching the user\'s challenge.',
        5: 'There was an error while fetching your played challenges.',
        6: 'There was an error while fetching the random challenges.',
        7: 'There was an error while sending the notification to your LinkedIn connections.',
        8: 'There was an error while fetching your LinkedIn connections.',
        9: 'There was an error while fetching your gameplay data.'
    },

    'TITLE_SHOW_USER_CHALLENGES': 'Select a challenge to beat!',
    'TITLE_SHOW_RANDOM_CHALLENGES': 'Select a challenge to beat!',
    'TITLE_SHOW_MY_CHALLENGES': 'Your Scores',
    
    "TIMER_READY_INTERVAL": 0,
    "TIMER_INTERVAL": 20,

    "CLASS_ANSWER_CORRECT": "correct",
    "CLASS_ANSWER_WRONG": "wrong",

    "LIMIT_RANDOM_CHALLENGES_BY_GENRE": 6,
	"LIMIT_RANDOM_CHALLENGES_CEO": 15,
	
	
	"LEADER_TITLE_ARR" : [
		{title:"All leaderboards (overall)", 	category:"All"},
		{title:"Top in Buzzwords", 				category:"Buzzword"},
		{title:"Top in Head to Head", 			category:"Head 2 Head"},
		{title:"Top in CEO", 					category:"CEO"},
		{title:"Top in Entrepreneur", 			category:"Entrepreneur"},	
	],
};
