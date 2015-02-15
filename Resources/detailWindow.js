
function detailWindow( data ) {

	var self = Titanium.UI.createWindow({
		statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		barImage: 'images/header.png',
		titleControl: Ti.UI.createImageView({
	    	image: 'images/detail_title_label.png',
	    	height: 24,
	    	width: 88
	    })
	});
	self.hideTabBar();
	
	var backbutton = Titanium.UI.createButton({
	    backgroundImage:'images/back_btn.png',
	    //backgroundColor: 'black',
	    width: 50.3,//68,
	    height: 32//38
	});
	self.leftNavButton = backbutton;
	
	backbutton.addEventListener('click', function(){
	  	self.close();
	});
	
	webView = Ti.UI.createWebView({
		url: '/detail.html',
		backgroundColor: 'black'
	});
	
	//webviewに変数を渡す
	var getContents = function(e){
		var code = "getContents(name = '" + data.name + "', desc = '" + data.desc + "', image = '" + data.image + "')";
		webView.evalJS( code );
	};
	Ti.App.addEventListener('webviewload', getContents);
	
	//マルチ起動ボタンが押されたときの挙動
	var launchMulti = function(e) {
		recruitID = data.id;
		luck_restriction = data.luck_restriction;
		//alert(data.luck_restriction);
		var send_data = {
			id: recruitID
		};
	
		url = Ti.App.domain + "increment_access.json";
		sendData( url, send_data, function( get_data ){
			if (get_data.success){
			}else{
			}
		});
		Ti.Platform.openURL(data.url);
	};
	Ti.App.addEventListener('app:fromWebView', launchMulti);
	
	//前画面に戻る際に割り当てたイベントリスナーを削除
	self.addEventListener('close', function(){
		Ti.App.removeEventListener('app:fromWebView', launchMulti);
		Ti.App.removeEventListener('webviewload', getContents);
	});
	
	self.add(webView);
	return self;
}

module.exports = detailWindow;