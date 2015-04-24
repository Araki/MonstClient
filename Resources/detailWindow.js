
function detailWindow( data ) {
	var actInd = createActInd();
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
	
	
//#################################
//通報ボタンの制御
//#################################
	//var reportBGView = createReportBGView();
	//var reportView = createReportView();
	//var cancelButtonOnReport = reportView.children[2];
	//var reportButtonOnReport = reportView.children[3];
	
	var reportButton = Titanium.UI.createLabel({
		font:{ fontSize:16, fontWeight: 'bold'},
		text:'通報',
		textAlign: 'center',
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		borderRadius: 4,
		height: 25,
		width: 60,
		right: 0,
		//backgroundColor: 'red',
		color: 'red'
	});
	self.setRightNavButton(reportButton);
	
	reportButton.addEventListener('click', function() {
		//reportView.show();
		//reportBGView.show();
		
		actInd.show();
		var url = Ti.App.domain + "send_report.json";
		var message = {
				id: data.id,
			    user_id: data.user_id,
			    luck_restriction: data.luck_restriction,
			    desc: data.desc,
			    url: data.url,
			    name: data.name,
			    image: data.image,
			    access: data.access,
			    time: data.time
		};
		//alert(data.id);
		sendData( url, message, function( d ){
			if (d.success) {
				//reportView.hide();
				//reportBGView.hide();
				Ti.UI.createAlertDialog({
					title: '通報を送信しました'
				}).show();
				actInd.hide();
			} else{
				// 通信に失敗したら行う処理
				Ti.UI.createAlertDialog({
					title: '通報の送信に失敗しました'
				}).show();
				actInd.hide();
			}
		});
		
		//alert("通報しました");
	});
	/*
	cancelButtonOnReport.addEventListener('click', function() {
		reportView.hide();
		reportBGView.hide();
	});
	*/
	/*
	reportButtonOnReport.addEventListener('click', function() {
		if( reportView.children[1].value == ""){
			Ti.UI.createAlertDialog({
				title: '通報理由を記入してください',
			}).show();
		}else{
			if( reportView.children[1].value.length > 300 ){
				Ti.UI.createAlertDialog({
					title: '300文字を超えており送信できません',
				}).show();
			}else{
				actInd.show();
				var url = Ti.App.domain + "send_report.json";
				var message = {
						app_token: Ti.App.Properties.getString('app_token'),
						reported_id: roomID,
						platform: Ti.Platform.name,
						version: Ti.Platform.version,
						manufacturer: Ti.Platform.manufacturer,
						model: Ti.Platform.model,
						body: reportView.children[1].value,
						from: 'chatroom'
				};
				sendData( url, message, function( data ){
					if (data.success) {
						reportView.hide();
						reportBGView.hide();
						Ti.UI.createAlertDialog({
							title: '通報を送信しました'
						}).show();
						actInd.hide();
					} else{
						// 通信に失敗したら行う処理
						Ti.UI.createAlertDialog({
							title: '通報の送信に失敗しました'
						}).show();
						actInd.hide();
					}
				});
				alert("通報しました");
			}
		}
	});
	*/
	
//#################################
//webViewの制御
//#################################
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
	//self.add(reportBGView);
	//self.add(reportView);
	self.add(actInd);
	return self;
}

module.exports = detailWindow;


/*
//#################################
//通報画面の制御
//#################################

function createReportBGView(){
	
	var view = Titanium.UI.createView({
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
		backgroundColor:'black',
		opacity: 0.3,
		visible: false
	});
	return view;
}



function createReportView(){
	var view = Titanium.UI.createView({
		bottom: 30,
		left: 30,
		right: 30,
		top: 30,
		backgroundColor:'white',
		borderRadius:10,
		visible: false
	});
	
	var title = Titanium.UI.createLabel({
		top: 15,
		right: 60,
		left: 10,
		text: '通報内容（300文字まで）',
		textAlign:'center',
		font:{fontSize:15},
		color: 'blue'
	});
	
	var textLengthLabel = Titanium.UI.createLabel({
		text: 0,
		top: 15,
		right: 10,
		width: 40,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color: 'blue',
		font:{fontSize: 15 }
	});
	
	var textField = Titanium.UI.createTextArea({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 40,
		right: 10,
		left: 10,
		bottom: 50,
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,
		autocapitalization: false,
		autocorrect:false,
	    borderColor:'blue',
	    color: 'gray',
	    backgroundColor: 'white',
	    borderRadius:5,
	    font: { fontSize: 15 }
	});
	
	textField.addEventListener('change',function(e){
  		textLengthLabel.text = textField.value.length;
  		if(textField.value.length > 300 ){
  			textLengthLabel.color = 'red';
  		}else{
  			textLengthLabel.color = 'gray';
  		}
	});
	
	cancelButton = Ti.UI.createButton({
		title: 'キャンセル',
		font:{ fontSize:18 },
		height: 30,
		width: 110,
		left: 10,
		bottom: 10,
		color: 'white',
		backgroundColor:'green',
		borderRadius:10
	});
	
	reportButton = Ti.UI.createButton({
		title: '通報',
		font:{ fontSize:18},
		height: 30,
		width: 110,
		right: 10,
		bottom: 10,
		color: 'white',
		backgroundColor: 'red',
		borderRadius:10
	});
	
	view.add(title);
	view.add(textField);
	view.add(cancelButton);
	view.add(reportButton);
	view.add(textLengthLabel);
		
	return view;
}
*/