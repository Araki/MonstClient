var Admob = require('ti.admob');
var nend = require('net.nend');

var displayWidth = Titanium.Platform.displayCaps.platformWidth;
var displayHeight = Titanium.Platform.displayCaps.platformHeight;
Ti.API.info("Width: " + displayWidth + "\nHeight: " + displayHeight);

Titanium.UI.setBackgroundColor('white');

var tabGroup = Titanium.UI.createTabGroup();

var bbsWin = require('bbsWindow');
var bbsWindow = new bbsWin();

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:bbsWindow
});
/*
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);
*/

tabGroup.addTab(tab1);  
//tabGroup.addTab(tab2);  

tabGroup.open();

function createBannerAdView(){
	
	var rand = Math.floor(Math.random()*2);
	switch(rand){
		case 0:
			var adview = Admob.createView({
			    width: 320,
			    height: 50,
			    adUnitId: 'ca-app-pub-8392863952863215/5215089280',
			    adBackgroundColor: 'white',
			});
			break;
			
		case 1:
			var adview = nend.createView({
				width:  320,
                height: 50,
                spotId: '284930',
                apiKey: '7bb422477552bc39eb05b0bd1f6fe88e71edb13b',
            });
            break;
 
        default:
            var adview = null;
            break;
	}
	
	if(Ti.Platform.displayCaps.platformWidth != 320){
	    var t = Ti.UI.create2DMatrix();
	    t = t.scale(Ti.Platform.displayCaps.platformWidth / 320);
	    adview.transform = t;
	}
	
    return adview;
}

function createActInd() {
	var activityIndicator = Titanium.UI.createActivityIndicator({
		height:'100%',
		width:'100%',
		font: {fontFamily: _font, fontSize:16},
		color: 'white',
		backgroundColor:'black',
		opacity: 0.3,
		//borderRadius:5,
		style:(Ti.Platform.name === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG), //DARK,PLAIN
		//message: "ローディング中"
	});
	return activityIndicator;
}