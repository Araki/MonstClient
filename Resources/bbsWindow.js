function bbsWindow() {
	
	var actInd = createActInd();
	actInd.show();
	
	var tableViewRowData = [];
	
	var self = Titanium.UI.createWindow({
		statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		barImage: 'images/header.png',
		titleControl: Ti.UI.createImageView({
	    	image: 'images/bbs_title_label.png',
	    	height: 23,
	    	width: 128
	    })
	});
	self.hideTabBar();
	
	var tableView = Titanium.UI.createTableView({
		top:0, 
		bottom:0, 
		separatorStyle:'NONE',
		backgroundColor: 'black'
	});
	self.add(tableView);
	
	var recruitButton = Titanium.UI.createButton({
			backgroundImage:'images/bbs_recruit_btn.png',
			//backgroundColor: 'black',
			height: 32,//70
			width: 52.1,//119
	});
	self.leftNavButton = recruitButton;
	
	recruitButton.addEventListener('click', function(){
		var recruitWin = require('recruitWindow');
		var recruitWindow = new recruitWin();
		tabGroup.activeTab.open(recruitWindow);
	});
	
	var reloadButton = Titanium.UI.createButton({
			backgroundImage:'images/bbs_reload_btn.png',
			//backgroundColor: 'black',
			height: 32,//70
			width: 43.9,//90
	});
	self.rightNavButton = reloadButton;
	
	reloadButton.addEventListener('click', function(){
		actInd.show();
		tableViewRowData = [];
		loadData();
		tableView.scrollToTop(0, true);
	});
	
	tableView.addEventListener('click', function(e) {
		if(e.row.id == "addRow"){
			//追加読込Rowと広告Rowを配列から削除
			tableViewRowData.pop();
			tableViewRowData.pop();
			createRow(e.row.data, e.row.startNum, e.row.endNum);
		}else if (e.row.id == "row"){
			if(e.row.data.luck_restriction == "t"){
				var alertDialog = Titanium.UI.createAlertDialog({
				    title: "運極限定マルチ",
				    message: "\n運極の方のみ参加可能なマルチです。\n運極でない方のご参加は\n他の方の迷惑となります。\n運極でない方の参加を見つけた場合、その方の本サービスの利用を禁止するなどの対処を致します。",
				    buttonNames: ['参加しない', '参加する'],
				    cancel: 0
				});
				alertDialog.addEventListener('click',function(event){
					if(event.index == 1){
						var detailWin = require('detailWindow');
						var detailWindow = new detailWin(e.row.data);
						tabGroup.activeTab.open(detailWindow);
					}
				});
				alertDialog.show();
			}
			else{
				var detailWin = require('detailWindow');
				var detailWindow = new detailWin(e.row.data);
				tabGroup.activeTab.open(detailWindow);
			}
		}
	});	
	
	loadData();
	
	function loadData(){
		var url = Ti.App.domain + "get_recruit.json";
		getData(url, function( data ){
			if (data.success) {
				// 通信に成功したら行う処理
				var json = data.data;
				if(json.length >= 10){
					createRow(json, 0, 10);
				}
				else{
					createRow(json, 0, json.length);
				}
			}else{
				// 通信に失敗したら行う処理
			}
			actInd.hide();	
		});
	
	}
	
	
	function createRow(dataList, startNum, endNum){
		actInd.show();
		for (var i=startNum; i<endNum; i++){
			Ti.API.info("DATA: " + dataList[i]);
			if( i % 10 == 0 ){
				var adRow = createAdRow(1);
			    tableViewRowData.push(adRow);
			}
			if( i % 10 == 5 ){
				var adRow = createAdRow(2);
			    tableViewRowData.push(adRow);
			}
			
			var row = Ti.UI.createTableViewRow({
				backgroundImage: 'images/bbs_row_bg.png',
		   		hasChild: false,
		   		height:73,//70,
		   		id: "row",
		   		data: dataList[i]
		    });
		    
		    
		   
		    if(i%2 == 0){
		   		row.backgroundColor = 'white';
			}else{
		   		row.backgroundColor = '#D8D8D8';
		   	}
		   	Ti.API.info("ID:" + i +"image:" + dataList[i].image);
		   	var imageURL;
		   	if(dataList[i].image == null){
		   		imageURL = "https://s3-ap-northeast-1.amazonaws.com/monsto/icon/noimage.png";
		   	}else{
		   		imageURL = dataList[i].image;
		   	}
		   	var iconImage = Titanium.UI.createImageView({
			 	top: 7,
			   	left: 9,
			   	width: 55,
			   	height: 55,
			   	image: imageURL
			});
			row.add(iconImage);
			
			var titleLabel = Titanium.UI.createLabel({
				font:{fontWeight: "bold", fontSize:13},
				textAlign: "left",
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		       	color:'black',
		       	left: 70,
		       	right: 5,
		       	top: 7,
		       	height: 15,
		       	//center: 0,
		       	//backgroundColor: 'gray',
		        text: dataList[i].name
		    });
		    row.add(titleLabel);
		    
		    var descriptionLabel = Titanium.UI.createTextArea({
		    	editable:false,
		    	touchEnabled:false,
				font:{fontSize:11},
				textAlign: "left",
				//verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		       	color:'black',
		       	left: 70,
		       	right: 5,
		       	top: 23,
		       	bottom: 23,
		       	//height: 25,
		       	//backgroundColor: 'green',//'transparent',
		        value: dataList[i].desc
		    });
		    row.add(descriptionLabel);
		    
		    var timeLabel = Titanium.UI.createLabel({
				font:{fontSize:10},
				textAlign: "right",
				//backgroundColor: 'blue',
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		       	color:'black',
		       	right: 9,
		       	bottom: 10,
		       	width: 100,
		        text: dataList[i].time
		    });
		    row.add(timeLabel);
		    
		    var accessLabel = Titanium.UI.createLabel({
				font:{fontWeight: "bold", fontSize:10},
				textAlign: "left",
				//backgroundColor: 'blue',
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		       	color:'black',
		       	left: 70,
		       	bottom: 10,
		       	width: 100,
		        text: 'アクセス数: ' + dataList[i].access
		    });
		    row.add(accessLabel);
		    
		    //Ti.API.info("luck:" + dataList[i].luck_restriction);
		    if(dataList[i].luck_restriction == "t"){
		    	
		    	//運極限定ラベルの追加
		    	var luckLabel = Titanium.UI.createLabel({
					font:{fontWeight: "bold", fontSize:10},
					textAlign: "center",
					verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			       	color:'white',
			       	right: 9,
			       	top: 7,
			       	height: 15,
			       	width: 50,
			       	backgroundColor: 'red',
			       	borderRadius: 2,
			        text: "運極限定"
			    });
			    row.add(luckLabel);
			    
			    //タイトルラベルの横幅の変更
			    titleLabel.right = 59;
		    }
		    
		    tableViewRowData.push(row);
		}
		
		//追加読込Rowの追加判定
		var nextEndNum;
		
		if(endNum == dataList.length){
			//次に読み込むRowがない場合はaddRowは追加しない 
		}else{
		
			if(endNum + 10 <= dataList.length){
				nextEndNum = endNum + 10;
			}else{
				nextEndNum = dataList.length;
			}
		
			var addRow = Ti.UI.createTableViewRow({
				hasChild: false,
				height:25,
				backgroundColor: 'red',
				id: "addRow",
				data: dataList,
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
			var advertiseRow = createAdRow(3);
			tableViewRowData.push(advertiseRow);
		}
		tableView.data = tableViewRowData;
		actInd.hide();
	}
	
	function createAdRow( type ){
		var adView = createBannerAdView( type );
		
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
	
	
	self.add(actInd);	
	return self;
}

module.exports = bbsWindow;