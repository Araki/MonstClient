
function detailWindow() {

	var self = Titanium.UI.createWindow({
		barColor:'#1CADC3',
		titleControl: Ti.UI.createLabel({
	        text: 'マルチ掲示板',
	        color: 'white'
	    })
	});
	self.hideTabBar();
	
	var webView = Ti.UI.createWebView({
		url: '/detail.html'
	});
	
	webView.addEventListener('load', function() {
		webView.evalJS('setText("HOGEHOGE")');
	});
	
	var launchMulti = function(e) {
	    var launchWin = Ti.UI.createWindow({
	        title:"",
	        backgroundColor:'white'
	      });
	    var launchWebView = Ti.UI.createWebView({
	    	url:'http://static.monster-strike.com/line/?pass_code=OTI2MTIxMTk4'
	    });
	    launchWin.add(launchWebView);
	    tabGroup.activeTab.open(launchWin);
	    
	};
	
	Ti.App.addEventListener('app:fromWebView', launchMulti);
	
	self.addEventListener('close', function(){
		Ti.App.removeEventListener('app:fromWebView', launchMulti);
	});
	
	self.add(webView);
	return self;

}

module.exports = detailWindow;

/*
function detailWindow() {

	var self = Titanium.UI.createWindow({
		barColor:'#1CADC3',
		titleControl: Ti.UI.createLabel({
	        text: 'マルチ掲示板',
	        color: 'white'
	    })
	});
	self.hideTabBar();
	
	var view = Titanium.UI.createView({});
	scrollView.add(view);
	
	var label1 =  Titanium.UI.createLabel({
		text: '####################',
		top: 20
	});
	view.add(label1);
	
	var label2 =  Titanium.UI.createLabel({
		text: '####################',
		top: 50
	});
	view.add(label2);
	
	setTimeout(showBanner, 1000);
	
	function showBanner(){
		var adview = nend.createView({
	        spotId: '277713',
	        apiKey: '1d45d61fc2d6a620799606b4ae7cfd03ebff9e91',
	        top: 50
	    });
	    view.add(adview);
	    
	    label2.top = 310;
	}
	
	return self;

}
*/
module.exports = detailWindow;