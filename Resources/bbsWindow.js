function bbsWindow() {
	
	var tableViewRowData = [];

	var self = Titanium.UI.createWindow({  
		barColor:'#1CADC3',
		titleControl: Ti.UI.createLabel({
	        text: 'マルチ掲示板',
	        color: 'white'
	    })
	});
	self.hideTabBar();
	
	var tableView = Titanium.UI.createTableView({
		top:0, 
		bottom:0, 
		//separatorStyle:'NONE'
	});
	self.add(tableView);
	
	var recruitButton = Titanium.UI.createLabel({
			//font:{fontFamily: _font, fontSize:16},
			text:'募集',
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			borderRadius: 4,
			height: 30,
			width: 50,
			backgroundColor: 'red',
			color: 'white'
	});
	self.leftNavButton = recruitButton;
	
	recruitButton.addEventListener('click', function(){
		var recruitWin = require('recruitWindow');
		var recruitWindow = new recruitWin();
		tabGroup.activeTab.open(recruitWindow);
	});
	
	var reloadButton = Titanium.UI.createLabel({
			//font:{fontFamily: _font, fontSize:16},
			text:'更新',
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			borderRadius: 4,
			height: 30,
			width: 50,
			backgroundColor: 'red',
			color: 'white'
	});
	self.rightNavButton = reloadButton;
	
	reloadButton.addEventListener('click', function(){
		tableViewRowData = [];
		createRow(0,10);
		tableView.scrollToTop(0, true);
	});
	
	//var actInd = createActInd();
	//actInd.show();
	/*
	var url = Ti.App.domain + "get_user_rooms.json?user_id=" + user_id + "&app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			if (json.length >= 10){
				createRow(json, 0, 10);
			}else{
				createRow(json, 0, json.length);
			}
		}else{
			// 通信に失敗したら行う処理
		}
		//tableView.data = tableViewRowData;
		actInd.hide();	
	});
	*/
	tableView.addEventListener('click', function(e) {
		if(e.row.id == "addRow"){
			//追加読込Rowと広告Rowを配列から削除
			tableViewRowData.pop();
			tableViewRowData.pop();
			createRow(e.row.startNum, e.row.endNum);
		}else if (e.row.id == "row"){
			var detailWin = require('detailWindow');
			var detailWindow = new detailWin();
			tabGroup.activeTab.open(detailWindow);
		}
	});	
	
	createRow(0,10);
	
	function createRow(startNum, endNum){
		for (var i=startNum; i<endNum; i++){
			if( i % 10 == 0 || i % 10 == 5 ){
				var adRow = createAdRow();
			    tableViewRowData.push(adRow);
			}
			
			var row = Ti.UI.createTableViewRow({
		   		hasChild: false,
		   		id: "row",
		        height:60
		    });
		    
		    
		   
		    if(i%2 == 0){
		   		row.backgroundColor = 'white';
			}else{
		   		row.backgroundColor = '#D8D8D8';
		   	}
		   	
		   	var iconImage = Titanium.UI.createImageView({
			 	top: 5,
			   	left: 5,
			   	width: 50,
			   	height: 50,
			   	borderRadius: 6,
			   	//borderWidth: 2,
			   	//borderColor: _white,
			   	image: 'https://s3-ap-northeast-1.amazonaws.com/monsto/icon/izanami.jpg'
			});
			
			var titleLabel = Titanium.UI.createLabel({
				font:{fontWeight: "bold", fontSize:13},
				textAlign: "left",
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		       	color:'black',
		       	left: 60,
		       	right: 5,
		       	top: 5,
		       	height: 15,
		       	//center: 0,
		        text: '怨炎！黄泉の主宰神'//dataList[i].sendfrom_message
		    });
		    
		    var descriptionLabel = Titanium.UI.createTextArea({
		    	editable:false,
		    	touchEnabled:false,
				font:{fontSize:11},
				textAlign: "left",
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		       	color:'black',
		       	left: 60,
		       	right: 5,
		       	top: 25,
		       	height: 25,
		       	backgroundColor: 'transparent',
		       	//center: 0,
		        value: '運極以外来るな！運極３人で出発。水属性でAGBの人、お手伝いお願いします。場合によってはコンティニューします。'//dataList[i].sendfrom_message
		    });
		    
		    var timeLabel = Titanium.UI.createLabel({
				font:{fontSize:10},
				textAlign: "right",
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		       	color:'black',
		       	//left: 60,
		       	right: 5,
		       	top: 5,
		       	width: 40,
		       	//backgroundColor: 'red',
		       	//height: 15,
		       	//center: 0,
		        text: '55分前'//dataList[i].sendfrom_message
		    });
		    
		   	row.add(iconImage);
		   	row.add(timeLabel);
			row.add(titleLabel);
			row.add(descriptionLabel);
		    tableViewRowData.push(row);
		}
		
		//追加読込Rowの追加判定
		var nextEndNum;
		/*
		if(endNum == dataList.length){
			//次に読み込むRowがない場合はaddRowは追加しない 
		}else{
		
			if(endNum + 10 <= dataList.length){
				nextEndNum = endNum + 10;
			}else{
				nextEndNum = dataList.length;
			}
		*/
			nextEndNum = endNum + 10;
			var addRow = Ti.UI.createTableViewRow({
				hasChild: false,
				height:25,
				backgroundColor: 'red',
				id: "addRow",
				//data: dataList,
				startNum: endNum,
				endNum: nextEndNum,
			});
			addRowLabel = Ti.UI.createLabel({
				text: "次の結果を読み込む",
				color: 'white',//_darkGray,
				font:{fontSize:13}
			});
			addRow.add(addRowLabel);
			tableViewRowData.push(addRow);
			var advertiseRow = createAdRow();
			tableViewRowData.push(advertiseRow);
		//}
		tableView.data = tableViewRowData;
	}
	
	function createAdRow(){
		var adView = createBannerAdView();
		
		var row = Ti.UI.createTableViewRow({
	   		hasChild: false,
	        height: 50
	    });
	    
	    if(Ti.Platform.displayCaps.platformWidth != 320){
			var newHeight = Ti.Platform.displayCaps.platformWidth / 320 * 50;
			//alert(newHeight);
			row.height = newHeight;
			adView.top = (newHeight - 50) / 2;
		}
	    
	    row.add(adView);
	    return row;
	}
	/*
	function showDialog(){
		blackView = Ti.UI.createView({
			height:'100%',
			width:'100%',
			color: 'white',
			backgroundColor:'black',
			opacity: 0.3
		});
		self.add(blackView);
		
		dialogView = Ti.UI.createView({
			height: 300,
			width: 300,
			backgroundColor: 'white',
		});
		self.add(dialogView);
		
		cancelButton = Ti.UI.createButton({
			title: 'キャンセル',
			width: 150,
			height: 50,
			bottom: 0,
			left: 0
		});
		self.add(cancelButton);
		
		cancelButton.addEventListener('click', function(){
			
		});
		
		multiButton = Ti.UI.createButton({
			title: 'マルチを起動',
			width: 150,
			height: 50,
			bottom: 0,
			right: 0
		});
		self.add(multiButton);
		
	}*/
	
	//self.add(actInd);	
	return self;
}

module.exports = bbsWindow;