Ti.App.domain = "https://monstbbs.herokuapp.com/";
//Ti.App.domain = "http://localhost:3000/";

Ti.API.info("######" + Ti.Platform.createUUID());

var Admob = require('ti.admob');
var nend = require('net.nend');
var iOSUniqueID = require('com.joseandro.uniqueids');
//var securely = require('bencoding.securely');
//var Flurry = require('com.onecowstanding.flurry');
//var TiFlurry = require('ti.flurry');

/*
Flurry.appVersion = Ti.App.version;
Flurry.debugLogEnabled = true;
Flurry.eventLoggingEnabled = true;
Flurry.sessionReportsOnCloseEnabled = true;
Flurry.sessionReportsOnPauseEnabled = true;
Flurry.sessionReportsOnActivityChangeEnabled = true;
Flurry.secureTransportEnabled = false;
Flurry.crashReportingEnabled = true;

switch(Ti.Platform.osname){
    case 'iphone':
        Flurry.startSession('3FPSMSFH54X7KN7JKH28');
        break;
    case 'ipad':
        //Ti.API.info("Flurry iPadスタート");
        break;
    case 'android':
        //Ti.API.info("Flurry Androidスタート");
        break;
}
Flurry.logAllPageViews();
*/
//statusbarの色を指定
//Titanium.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK);
//Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;

var displayWidth = Titanium.Platform.displayCaps.platformWidth;
var displayHeight = Titanium.Platform.displayCaps.platformHeight;
Ti.API.info("Width: " + displayWidth + "\nHeight: " + displayHeight);
Titanium.UI.setBackgroundColor('black');

var recruitID = "";
var luck_restriction = "";
var tabGroup;

checkLogin();

Ti.App.addEventListener('resume',function(){
	if(recruitID != "" || recruitID == "0"){
		if(luck_restriction == 1 || luck_restriction == "t"){
			//alert("recruitID: " + recruitID);
			rID = recruitID;
			recruitID = "";
			luck_restriction = "";
			//アンケート表示
			var alertDialog = Titanium.UI.createAlertDialog({
			    title: "迷惑行為撲滅のため\nアンケートに\nご協力ください",
			    message: "先ほどのマルチ募集で運極（ラック極）は何人いましたか？",
			    buttonNames: ['全員運極だった','運極は3人','運極は2人','運極は1人','運極は誰もいなかった','わからない','マルチに入れなかった','アンケートに答えない'],
			    cancel: 7
			});
			alertDialog.addEventListener('click',function(event){
				//alert(event.index);
				var data = {
					user_id: Ti.App.Properties.getString('uid'),
					recruit_id: rID,
					answer: event.index
				};
			
				url = Ti.App.domain + "send_answer.json";
				sendData( url, data, function( data ){
				});
				
			});
			alertDialog.show();
		}
		
		//レビュー誘導ポップアップ
		//review==nullのときは、最初にアプリを立ち上げたとき
		if(Ti.App.Properties.getString('review') == null){
			recruitID = "";
			//reviewはレビュー誘導ボタンが押されたかどうか。一度押されたら以後ださない。trueは押されたことがあるということ。
			Ti.App.Properties.setString('review', "false");
			//resume_countはアプリを立ち上げた回数。
			Ti.App.Properties.setString('resume_count', 0);
		}
		//まだレビュー誘導ボタンが押されていないとき
		else if(Ti.App.Properties.getString('review') == "false"){
			recruitID = "";
			if(parseInt(Ti.App.Properties.getString('resume_count')) < 1){
				Ti.App.Properties.setString('resume_count', parseInt(Ti.App.Properties.getString('resume_count')) + 1 );
			}
			else{
				Ti.App.Properties.setString('resume_count', 0);
				//レビュー誘導表示
				var reviewDialog = Titanium.UI.createAlertDialog({
				    title: "ご利用ありがとうございます",
				    message: "\n応援レビューを書いて、本アプリを応援して頂けないでしょうか？\n\n皆様から応援を頂けると開発が頑張れます!\n\nまた何かご要望があればレビューに書いて頂ければ修正します！",
				    buttonNames: ['キャンセル','応援する'],
				    cancel: 0
				});
				reviewDialog.addEventListener('click',function(event){
					if(event.index == 1){
						Ti.Platform.openURL("http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=955313441&pageNumber=0&sortOrdering=1&type=Purple+Software&mt=8");
						Ti.App.Properties.setString('review', "true");
					}
				});
				reviewDialog.show();
			}
		}	
	}
});






function createBannerAdView( type ){
	var nend_id;
	var nend_key;
	var admob_id;
	
	switch( type ){
		case 1:
			nend_id = '284930';
			nend_key = '7bb422477552bc39eb05b0bd1f6fe88e71edb13b';
			admob_id = 'ca-app-pub-8392863952863215/5895724484';
			break;
			
		case 2:
			nend_id = '287241';
			nend_key = '204bfde6ecc0ba1e66a0d551b2acd148eb6e648a';
			admob_id = 'ca-app-pub-8392863952863215/7372457680';
			break;
			
		case 3:
			nend_id = '287242';
			nend_key = 'f4ce7c6f230f5c31d518882fcd1e44caf93cb73f';
			admob_id = 'ca-app-pub-8392863952863215/8849190889';
			break;
			
		default:
			nend_id = '';
			nend_key = '';
			admob_id = '';
            break;
	}
	
	var rand = Math.floor(Math.random()*2);
	switch(rand){
		case 0:
			var adview = Admob.createView({
			    width: 320,
			    height: 50,
			    adUnitId: admob_id,
			    adBackgroundColor: 'white',
			});
			break;
			
		case 1:
			var adview = nend.createView({
				width:  320,
                height: 50,
                spotId: nend_id,
                apiKey: nend_key,
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
		font: {fontSize:16},
		color: 'white',
		backgroundColor:'black',
		opacity: 0.3,
		//borderRadius:5,
		style:(Ti.Platform.name === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG), //DARK,PLAIN
		//message: "ローディング中"
	});
	return activityIndicator;
}




function checkLogin(){
	var message = {
		uid: iOSUniqueID.getUUID, 
		version: Ti.App.version
	};
	var url = Ti.App.domain + "check_user.json";
	
	sendData( url, message, function( data ){
		if (data.success){
			obj = data.data;
			
			if(obj.version == "development"){
				//バージョン番号がサーバーよりも高かった場合
				alert("ステージング環境");
            	Ti.App.domain = "https://monstbbs-stg.herokuapp.com/";
            	
            	var message = {
					uid: iOSUniqueID.getUUID, 
					version: Ti.App.version
				};
				var url = Ti.App.domain + "check_user.json";
				
				sendData( url, message, function( data ){
					if (data.success){
						obj = data.data;
						switch(obj.result){
							case 'new':
								//alert("new\nuuid: " + obj.uuid + "\nid: " + obj.id);
								loginProcess();
								break;
								
						    case 'not_deleted':
						    	//alert("not_deleted\nuuid: " + obj.uuid + "\nid: " + obj.id);
						    	loginProcess();
								break;
								
						    case 'deleted':
								alert("迷惑行為と見なされたため、只今ご利用できません。\n再度、利用されたい場合はお問い合わせください。");
								break;
								
							case 'error':
								alert("通信に失敗しました");
								break;
								
							default:
					           // alert("other");
					            break;
						}
						//alert(Ti.App.Properties.getString('uuid'));
					}
					
					else{
						Ti.UI.createAlertDialog({
							title: '通信に失敗しました',
						  	//message: data.data
						}).show();
					}
				});	
			}
			
			else if(obj.version == "update"){
				//バージョン番号がサーバーよりも低かった場合
				var alertDialog = Ti.UI.createAlertDialog({
					//title: '',
				  	message: 'アプリを最新版にアップデートしてください',
				  	buttonNames: ['アップデート']
				});
				alertDialog.addEventListener('click',function(e){
					if(e.index == 0){
						//App Store へ移動
          				Ti.Platform.openURL(obj.update_url);
					}
				});
				alertDialog.show();
			}
			
			else{
				//バージョン番号がサーバーと一致していた場合
				switch(obj.result){
					case 'new':
						//alert("new\nuuid: " + obj.uuid + "\nid: " + obj.id);
						loginProcess();
						break;
						
				    case 'not_deleted':
				    	//alert("not_deleted\nuuid: " + obj.uuid + "\nid: " + obj.id);
				    	loginProcess();
						break;
						
				    case 'deleted':
						alert("迷惑行為と見なされたため、只今ご利用できません。\n再度、利用されたい場合はお問い合わせください。");
						break;
						
					case 'error':
						alert("通信に失敗しました");
						break;
						
					default:
			            //alert("other");
			            break;
				}
				//alert(Ti.App.Properties.getString('uuid'));
			}
		}
		else{
			//通信に失敗した場合の処理
			Ti.UI.createAlertDialog({
				title: '通信に失敗しました',
			  	//message: data.data
			}).show();
		}
	});	     
}



function loginProcess(){
	Ti.App.Properties.setString('uuid', obj.uuid);
	Ti.App.Properties.setString('uid', obj.id);
	if(Ti.App.Properties.getString('desc') == null){
		Ti.App.Properties.setString('desc', "");
	}
	createTabGroup();
}




function createTabGroup(){
	tabGroup = Titanium.UI.createTabGroup({top:20});

	var bbsWin = require('bbsWindow');
	var bbsWindow = new bbsWin();
	
	var tab1 = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:'Tab 1',
	    window:bbsWindow
	});
	
	tabGroup.addTab(tab1);   
	tabGroup.open();
}




function sendData( val, data, callback ){
	var url = val;
	var sendData = data;
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.timeout = 10000;
	xhr.open('POST', url);
		
	xhr.onload = function(){
		//alert("返って来たデータ:" + this.responseText);
		callback({
			success: true,
			data: JSON.parse(this.responseText)//this.responseText
		});
	};
	
	xhr.onerror = function(e){
		callback({
			success: false,
			data: e
		});
	};
	
	xhr.send( sendData );
}








function getData(val, callback) {
	
	var url = val;
		
	//HTTPClientを生成する
	var xhr = Titanium.Network.createHTTPClient();
	xhr.timeout = 10000;
	//SSL通信
	//xhr.validatesSecureCertificate = false;
	
	//HTTPClientを開く
	xhr.open("GET", url);
	
	//通信が完了した場合の処理
	xhr.onload = function(){
		Ti.API.info("パース前：" + this.responseText);
		//Ti.API.info("パース後：" + JSON.parse(this.responseText));
		callback({
			success: true,
			data: JSON.parse(this.responseText)
		});
	};
	
	//エラー発生時の処理
	xhr.onerror = function(e){
		callback({
			success: false,
			data: e
		});
	};

	//HTTPClientで通信開始
	xhr.send();
}