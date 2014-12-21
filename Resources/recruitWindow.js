
function recruitWindow() {

	var self = Titanium.UI.createWindow({
		barColor:'#1CADC3',
		titleControl: Ti.UI.createLabel({
	        text: 'マルチ相手を募集',
	        color: 'white'
	    })
	});
	self.hideTabBar();
	
	var scrollView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: 0,
		backgroundColor: 'white',
		showVerticalScrollIndicator: true
	});
	self.add(scrollView);
	
	var tosButton = Titanium.UI.createLabel({
			font:{fontSize:14},
			text:'利用規約',
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			borderRadius: 4,
			height: 30,
			width: 65,
			backgroundColor: 'red',
			color: 'white'
	});
	self.rightNavButton = tosButton;
	
	var view = Titanium.UI.createView({
		backgroundColor: 'white'
	});
	scrollView.add(view);
	
	var instructionLabel =  Titanium.UI.createLabel({
		text: 'キャラパクやチートなどの迷惑行為は禁止です。\n迷惑行為をした場合、本アプリの利用を禁止する場合がございます。',
		top: 20,
		left: 30,
		right: 30,
		color: 'red',
		font:{fontSize: 12 }
	});
	view.add(instructionLabel);
	
	var luckLabel =  Titanium.UI.createLabel({
		text: '運極限定設定',
		top: 80,
		left: 30,
		right: 30,
		color: 'black',
		font:{fontSize: 18 }
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
		left: 70,
		right: 30,
		color: 'red',
		font:{fontSize: 12 }
	});
	view.add(luckDescLabel);
	
	var descLabel =  Titanium.UI.createLabel({
		text: '募集内容',
		top: 160,
		left: 30,
		right: 30,
		color: 'black',
		font:{fontSize: 18 }
	});
	view.add(descLabel);
	
	var descTextArea = Titanium.UI.createTextArea({
        value:'',
        top:185,
        height:60,
        left:30,
        right:30,
        textAlign:'left',
        borderRadius: 5,
		borderColor: 'black',
		color: 'black',
		backgroundColor: 'white',
        //font:{fontFamily: _font, fontSize: 15 },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	});
	view.add(descTextArea);
	
	var urlLabel =  Titanium.UI.createLabel({
		text: 'マルチURL',
		top: 260,
		left: 30,
		right: 30,
		color: 'black',
		//font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(urlLabel);
	
	var urlTextArea = Titanium.UI.createTextArea({
        value:'',
        top:285,
        height:200,
        left:30,
        right:30,
        textAlign:'left',
        borderRadius: 5,
		borderColor: 'black',
		color: 'black',
		backgroundColor: 'white',
        //font:{fontFamily: _font, fontSize: 15 },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	});
	view.add(urlTextArea);
	
	var tosCheckBox = createCheckBox();
	tosCheckBox.top = 505;
	tosCheckBox.left = 30;
	tosCheckBox.height = 30;
	tosCheckBox.width = 30;
	view.add(tosCheckBox);
	
	var tosDescLabel =  Titanium.UI.createLabel({
		text: '利用規約に同意する',
		top: 505,
		height: 30,
		left: 70,
		right: 30,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		color: 'black',
		font:{fontSize: 14 }
	});
	view.add(tosDescLabel);
	
	var submitButton = Ti.UI.createButton({
		title: '投稿する',
		font:{fontSize: 22},
		top: 555,
		right: 30,
		left: 30,
		height: 40,
		//borderColor:"#1E90FF",
		color: 'white',
		backgroundColor: 'red',
		borderRadius:5
	});
	view.add(submitButton);
	
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
	
	
	return self;
}

module.exports = recruitWindow;