// Namespace
this.BD = this.BD || {};

(function() {
	
	"use strict";

	function AssetsPreloader(){
		var asset_source = [
			{id:"preloader_background",				type:"image", src:"bgblue.jpg"},
			{id:"preloader_bar_bg",					type:"image", src:"Preloader/bar-bg.png"},
			{id:"preloader_bar_fill",				type:"image", src:"Preloader/bar-fill.png"}
		]
		
		return asset_source
	};
	
	BD.AssetsPreloader = AssetsPreloader;
	
}());



// NOTE ---
// within images source data below, an optional 'prerender:1' value can be set to prerender even if global PRERENDER value is false
		
(function() {
	
	"use strict";

	function AssetsMain(){
		var asset_source = [
			/*
			-----------------------------------------
			common
			-----------------------------------------
			*/
			
			{id:"QBox_Correct_BottomLeft",				type:"image", src:"QBox_Correct_BottomLeft.png"},
			{id:"QBox_Correct_BottomRight",				type:"image", src:"QBox_Correct_BottomRight.png"},
			{id:"QBox_Correct_TopLeft",					type:"image", src:"QBox_Correct_TopLeft.png"},
			{id:"QBox_Correct_TopRight",				type:"image", src:"QBox_Correct_TopRight.png"},
			{id:"QBox_Wrong_BottomLeft",				type:"image", src:"QBox_Wrong_BottomLeft.png"},
			{id:"QBox_Wrong_BottomRight",				type:"image", src:"QBox_Wrong_BottomRight.png"},
			{id:"QBox_Wrong_TopLeft",					type:"image", src:"QBox_Wrong_TopLeft.png"},
			{id:"QBox_Wrong_TopRight",					type:"image", src:"QBox_Wrong_TopRight.png"},
			
			{id:"AchivementIcon",						type:"image", src:"AchivementIcon.png"},
			{id:"arrow-linkedin",						type:"image", src:"arrow-linkedin.png"},
			{id:"BuzzwordButton",						type:"image", src:"BuzzwordButton.png"},
			{id:"CEOButton",							type:"image", src:"CEOButton.png"},
			{id:"CloseButton",							type:"image", src:"CloseButton.png"},
			{id:"coffee-ring",							type:"image", src:"coffee-ring.png"},
			{id:"CXButton",								type:"image", src:"CXButton.png"},
			{id:"EntrepreneurButton",					type:"image", src:"EntrepreneurButton.png"},
			{id:"FillBar",								type:"image", src:"FillBar.png"},
			{id:"FillBarEmpty",							type:"image", src:"FillBarEmpty.png"},
			{id:"FinancialButton",						type:"image", src:"FinancialButton.png"},
			{id:"CEOUnlocked",							type:"image", src:"CEOUnlocked.png"},
			{id:"EnraptureUnlocked",					type:"image", src:"EnraptureUnlocked.png"},
			{id:"HeadtoHeadLocked",						type:"image", src:"HeadtoHeadLocked.png"},
			{id:"GeneralButton",						type:"image", src:"GeneralButton.png"},
			{id:"glasses",								type:"image", src:"glasses.png"},
			{id:"HeadtoheadButton",						type:"image", src:"HeadtoheadButton.png"},
			{id:"HRButton",								type:"image", src:"HRButton.png"},
			{id:"InnovationButton",						type:"image", src:"InnovationButton.png"},
			{id:"logo",									type:"image", src:"logo.png"},
			{id:"logo-intel",							type:"image", src:"logo-intel.png"},
			{id:"logo-linkedin",						type:"image", src:"logo-linkedin.png"},
			{id:"logo-linkedin2",						type:"image", src:"logo-linkedin2.png"},
			{id:"logo-oracle",							type:"image", src:"logo-oracle.png"},
			{id:"more-connections",						type:"image", src:"more-connections.png"},
			{id:"mug",									type:"image", src:"mug.png"},
			{id:"ok",									type:"image", src:"ok.png"},
			{id:"PageMarkerOff",						type:"image", src:"PageMarkerOff.png"},
			{id:"PageMarkerOn",							type:"image", src:"PageMarkerOn.png"},
			{id:"paper-left",							type:"image", src:"paper-left.png"},
			{id:"PopUpBox",								type:"image", src:"PopUpBox.png"},
			{id:"EnraptureLocked",						type:"image", src:"EnraptureLocked.png"},
			{id:"QBox_BottomLeft",						type:"image", src:"QBox_BottomLeft.png"},
			{id:"QBox_BottomRight",						type:"image", src:"QBox_BottomRight.png"},
			{id:"QBox_TopLeft",							type:"image", src:"QBox_TopLeft.png"},
			{id:"QBox_TopRight",						type:"image", src:"QBox_TopRight.png"},
			{id:"SaleButton",							type:"image", src:"SaleButton.png"},
			{id:"side-splat",							type:"image", src:"side-splat.png"},
			{id:"splat",								type:"image", src:"splat.png"},
			{id:"TechnologyButton",						type:"image", src:"TechnologyButton.png"},
			{id:"todo",									type:"image", src:"todo.png"},
			{id:"BuzzwordButtonUnlocked",				type:"image", src:"BuzzwordButtonUnlocked.png"},
			{id:"CEOLocked",							type:"image", src:"CEOLocked.png"},
			{id:"CEOButtonLocked",						type:"image", src:"CEOButtonLocked.png"},
			{id:"EntrepreneurButtonLocked",				type:"image", src:"EntrepreneurButtonLocked.png"},
			{id:"HeadtoheadButtonUnlocked",				type:"image", src:"HeadtoheadButtonUnlocked.png"},
			{id:"HomeIcon",								type:"image", src:"HomeIcon.png"},
			{id:"AchivementsIcon",						type:"image", src:"AchivementsIcon.png"},
			{id:"LeaderBoardIcon",						type:"image", src:"LeaderBoardIcon.png"},
			{id:"SettingsIcon",							type:"image", src:"SettingsIcon.png"},
			{id:"overlay",								type:"image", src:"overlay.png"},
			
		]

		return asset_source
	
	};
	
	BD.AssetsMain = AssetsMain;
	
}());

	
	