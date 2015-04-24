
function recruitWindow() {
	
	var actInd = createActInd();
	var multiUrl;
	var reruit_id;
	var luck_flag;
	
	var self = Titanium.UI.createWindow({
		statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		barImage: 'images/header.png',
		titleControl: Ti.UI.createImageView({
	    	image: 'images/recruit_title_label.png',
	    	height: 23,
	    	width: 169,  	
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
	
	var scrollView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: 0,
		backgroundColor: 'black',
		showVerticalScrollIndicator: true
	});
	self.add(scrollView);
	
	var bgView = Titanium.UI.createView({
		backgroundColor: 'black',
		height: 620
	});
	
	var view = Titanium.UI.createView({
		//backgroundImage: 'images/recruit_bg.png',
		width: '95%',
		//height: '95%',
		top: 10,
		bottom: 10,
		height: 590,
		borderRadius: 3,
		borderWidth: 3,
		borderColor: '#a0a0a0',
		backgroundColor: 'white'
	});
	
	var instructionLabel =  Titanium.UI.createLabel({
		text: 'キャラパクやチートなどの迷惑行為は禁止です。\n迷惑行為をした場合、本アプリの利用を禁止する場合がございます。',
		top: 20,
		left: '5%',//30,
		right:'5%',// 30,
		color: 'red',
		font:{fontSize: 12 }
	});
	view.add(instructionLabel);
	
	var luckLabel =  Titanium.UI.createImageView({
		//text: '運極限定設定',
		image: 'images/recruit_luck_label.png',
		top: 80,
		left: '5%',//30,
		width: 113,
		height: 22,
		//right: 30,
		//color: 'white',
		//font:{fontSize: 18 }
	});
	view.add(luckLabel);
	
	var luckCheckBox = createCheckBox();
	luckCheckBox.top = 110;
	luckCheckBox.left = 30;
	luckCheckBox.height = 30;
	luckCheckBox.width = 30;
	view.add(luckCheckBox);
	
	var luckDescLabel =  Titanium.UI.createLabel({
		text: '運極のみを募集したい場合は、チェックを入れてください。',
		top: 110,
		left: '25%',//70,
		right: '5%',//30,
		color: 'red',
		font:{fontSize: 12 }
	});
	view.add(luckDescLabel);
	
	var descLabel =  Titanium.UI.createImageView({
		//text: '募集内容',
		image: 'images/recruit_desc_label.png',
		top: 160,
		left: '5%',//30,
		width: 80,
		height: 21,
		//length: 200,
		//color: 'white',
		//font:{fontSize: 18 }
	});
	view.add(descLabel);
	
	var descValue;
	var descColor;
	var descTextLength;
	var hintText = '募集の条件や参加して欲しいモンスターを記入してください';
	if(Ti.App.Properties.getString('desc') == ""){
		descValue = hintText;
		descColor = 'gray';
		descTextLength = 0;
	}else{
		descValue = Ti.App.Properties.getString('desc');
		descColor = 'black';
		descTextLength = Ti.App.Properties.getString('desc').length;
	}
	var descTextArea = Titanium.UI.createTextArea({
        value: descValue,
        top:185,
        height:60,
        left: '5%',//30,
        right: '5%',//30,
        textAlign:'left',
        borderRadius: 5,
		borderColor: 'black',
		color: descColor,
		backgroundColor: 'white',
        font:{ fontSize: 15 },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	});
	view.add(descTextArea);
	
	descTextArea._hintText = hintText;
	 
	descTextArea.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	    }
	});
	descTextArea.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = hintText;
	        e.source.color = 'gray';
	    }else{
	    	e.source.color = 'black';
	    }
	});
	
	var descLengthLabel = Titanium.UI.createLabel({
		text: descTextLength,
		top: 160,
		right: '5%',//30,
		//length: 100,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color: 'black',
		font:{fontSize: 18 }
	});
	view.add(descLengthLabel);
	
	descTextArea.addEventListener('change',function(e){
  		descLengthLabel.text = descTextArea.value.length;
  		if(descTextArea.value.length > 50 ){
  			descLengthLabel.color = 'red';
  		}else{
  			descLengthLabel.color = 'black';
  		}
	});
	
	var urlLabel =  Titanium.UI.createImageView({
		//text: 'マルチURL',
		image: 'images/recruit_url_label.png',
		top: 260,
		left: '5%',//30,
		width: 107,
		height: 20,
		//lenth: 200,
		//font:{fontSize: 18 },
		//color: 'white'
	});
	view.add(urlLabel);
	
	var urlTextArea = Titanium.UI.createTextArea({
        value:"（例）\nモンストでマルチしない？\n「タスの巣窟（パワタスキング！）」\nhttp://static.monster-strike.com/line/?pass_code=XXXXXXXXXXXX\n↑このURLをタップすると、タップした人達同士で一緒にマルチプレイができるよ！",
        top:285,
        height:175,
        left: '5%',//30,
        right: '5%',//30,
        textAlign:'left',
        borderRadius: 5,
		borderColor: 'black',
		color: 'gray',
		backgroundColor: 'white',
        font:{ fontSize: 15 },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	});
	view.add(urlTextArea);
	
	urlTextArea._hintText = urlTextArea.value;
	 
	urlTextArea.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	    }
	});
	urlTextArea.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	        e.source.color = 'gray';
	    }else{
	    	e.source.color = 'black';
	    }
	});
	
	var urlLengthLabel = Titanium.UI.createLabel({
		text: 0,
		top: 260,
		right: '5%',//30,
		length: 100,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color: 'black',
		font:{fontSize: 18 }
	});
	view.add(urlLengthLabel);
	
	urlTextArea.addEventListener('change',function(e){
  		urlLengthLabel.text = urlTextArea.value.length;
  		if(urlTextArea.value.length > 300 ){
  			urlLengthLabel.color = 'red';
  		}else{
  			urlLengthLabel.color = 'black';
  		}
	});
	
	
	var tosCheckBox = createCheckBox();
	tosCheckBox.top = 470;
	tosCheckBox.left = 30;
	tosCheckBox.height = 30;
	tosCheckBox.width = 30;
	tosCheckBox.on();
	view.add(tosCheckBox);
	
	var tosDescLabel =  Titanium.UI.createLabel({
		text: '利用規約に同意する',
		top: 470,
		height: 30,
		left: 70,
		right: 30,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		color: 'blue',
		font:{fontSize: 14 }
	});
	view.add(tosDescLabel);
	
	tosDescLabel.addEventListener('click', function(){
		var tosWindow = Titanium.UI.createWindow({
			statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
			barImage: 'images/header.png',
			titleControl: Ti.UI.createLabel({
		    	text:'利用規約',
		    	font:{fontWeight: 'bold', fontSize: 19 },
		    	color: 'white',
		    	height: 24,
		    	width: 88
		    })
		});
		tosWindow.hideTabBar();
		
		var tosBackButton = Titanium.UI.createButton({
		    backgroundImage:'images/back_btn.png',
		    //backgroundColor: 'black',
		    width: 50.3,//68,
		    height: 32//38
		});
		tosWindow.leftNavButton = tosBackButton;
		
		tosBackButton.addEventListener('click', function(){
		  	tosWindow.close();
		});
		
		webView = Ti.UI.createWebView({
			url: '/tos.html',
			backgroundColor: 'white'
		});
		tosWindow.add(webView);
		
		tabGroup.activeTab.open(tosWindow);
		
		
	});
	
	var submitButton = Ti.UI.createImageView({//createButton({
		//title: '投稿する',
		//font:{fontSize: 22},
		top: 505,
		left: '5%',//30,
		right: '5%',//30,
		//width: 328,
		//height: 65,
		image: 'images/recruit_submit_btn.png',
		//borderColor:"#1E90FF",
		//color: 'white',
		//backgroundColor: 'red',
		//borderRadius:5
	});
	view.add(submitButton);
	
	submitButton.addEventListener('click', function(){
		actInd.show();
		descTextArea.blur();
		urlTextArea.blur();
		var errorMessage = "";
		if(urlTextArea.value == null || urlTextArea.value == ""){
			errorMessage = errorMessage + "マルチURLを入力してください\n";
		}
		if(tosCheckBox.value == false){
			errorMessage = errorMessage + "利用規約に同意されない場合は投稿できません\n";
		}
		if(descTextArea.value.length > 50){
			errorMessage = errorMessage + "募集内容を50文字以内にしてください\n";
		}
		var urlCheck = urlTextArea.value.indexOf("http://static.monster-strike.com/line/?pass_code=", 0);
		if(urlCheck == -1){
			errorMessage = errorMessage + "LINE募集のテキストをそのまま貼り付けてください\n";
		}
		var urlPassCodeCheck = urlTextArea.value.indexOf("http://static.monster-strike.com/line/?pass_code=XXXXXXXXXXXX", 0);
		if(urlPassCodeCheck != -1){
			errorMessage = errorMessage + "LINE募集のテキストをそのまま貼り付けてください\n";
		}
		if(errorMessage != ""){
			actInd.hide();
			Ti.UI.createAlertDialog({
				message: errorMessage,
			}).show();
		}
		else{
			var desc;
			if(descTextArea.value == '募集の条件や参加して欲しいモンスターを記入してください'){
				desc = "";
				Ti.App.Properties.setString('desc', desc);
			}else{
				desc = 	descTextArea.value;
				Ti.App.Properties.setString('desc', desc);
			}
			var data = {
				user_id: Ti.App.Properties.getString('uid'),
				luck: luckCheckBox.value,
				description: desc,
				url: urlTextArea.value
			};
		
			url = Ti.App.domain + "create_recruit.json";
			sendData( url, data, function( data ){
				//actInd.show();
				if (data.success){
					var json = data.data;
					multiUrl = json.url;
					reruit_id = json.id;
					recruitID = reruit_id;
					luck_flag = json.luck_restriction;
					luck_restriction = luck_flag;
					Ti.Platform.openURL(multiUrl);
					showGuideView();
				}else{
					alert("通信に失敗しました");
				}
				actInd.hide();
			});
		}
	});
	
	function showGuideView(){
		var backgroundView = Titanium.UI.createView({
			height:'100%',
			width:'100%',
			backgroundColor:'black',
			opacity: 0.3,
		});
		self.add(backgroundView);
		
		var guideView = Titanium.UI.createView({
			height: 170,
			left: 30,
			right: 30,
			borderRadius: 3,
			borderWidth: 3,
			borderColor: '#a0a0a0',
			backgroundColor: 'white'
		});
		self.add(guideView);
		
		var descLabel = Ti.UI.createLabel({
			top: 20,
			right: 10,
			left: 10,
			textAlign: 'center',
			color: 'black',
			font:{fontSize: 17},
			text: 'マルチ募集を投稿しました'
		});
		guideView.add(descLabel);
		
		var goTopButton = Ti.UI.createImageView({
			//title: 'トップに戻る',
			//font:{fontSize: 20},
			image: 'images/recruit_guide_top_btn.png',
			bottom: 70,
			right: '5%',
			left: '5%',
			//height: 40,
			//color: 'white',
			//backgroundColor: 'blue',
			//borderRadius:5
		});
		guideView.add(goTopButton);
		
		goTopButton.addEventListener('click', function(){
			self.remove(backgroundView);
			self.remove(guideView);
			self.close();
		});
		
		var goMultiButton = Ti.UI.createImageView({
			//title: '同じマルチを起動する',
			//font:{fontSize: 20},
			image: 'images/recruit_guide_multi_btn.png',
			bottom: 20,
			right: '5%',
			left: '5%',
			//height: 40,
			//color: 'white',
			//backgroundColor: 'red',
			//borderRadius:5
		});
		guideView.add(goMultiButton);
		
		goMultiButton.addEventListener('click', function(){
			recruitID = reruit_id;
			luck_restriction = luck_flag;
			Ti.Platform.openURL(multiUrl);
		});
	}
	
	
	function createCheckBox(){
		var checkbox = Ti.UI.createButton({
		    title: '\u2713',
		    color: '#DCDCDC',
		    borderColor: '#666',
		    borderWidth: 2,
		    borderRadius: 3,
		    backgroundColor: 'white',
		    backgroundImage: 'none',
		    font:{fontSize: 25, fontWeight: 'bold'},
		    value: false //value is a custom property in this casehere.
		});
		 
		//Attach some simple on/off actions
		checkbox.on = function() {
		    this.color = '#50B000';
		    this.title='\u2713';
		    this.value = true;
		};
		 
		checkbox.off = function() {
		    this.color = '#DCDCDC';
		    this.title='\u2713';
		    this.value = false;
		};
		 
		checkbox.addEventListener('click', function(e) {
		    if(false == e.source.value) {
		        e.source.on();
		    } else {
		        e.source.off();
		    }
		});
		
		return checkbox;
	}
	
	bgView.add(view);
	scrollView.add(bgView);
	self.add(actInd);
	return self;
}

module.exports = recruitWindow;