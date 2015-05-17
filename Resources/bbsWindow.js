function bbsWindow() {
	
	var filtering_tag = "";
	
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
				Ti.API.info("name = " + e.row.data.name + "\ndesc = " + e.row.data.desc + "\nimage = " + e.row.data.image);
				var detailWin = require('detailWindow');
				var detailWindow = new detailWin(e.row.data);
				tabGroup.activeTab.open(detailWindow);
			}
		}else{
			//検索結果がなかったとき
			
		}
	});
	
	//////////////////////////////////
	//フィルタリングUI
	var filtering_button = Ti.UI.createImageView({//Ti.UI.createButton({
		bottom: 15,
		right: 15,
		width: 40,
		height: 40,
		image: 'images/search_button.png'
	});
	self.add(filtering_button);
	
	filtering_button.addEventListener('click', function(){
		createFilteringView();
	});
	
	var filtering_info = Ti.UI.createLabel({
		text: '　全て',
		backgroundColor:'black',
		opacity: 0.7,
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		font:{fontSize: 13},
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		bottom: 15,
		right: 65,
		left: 15,
		height: 40,
		enabled: false,
		color: 'white',
		keyboardToolbar: false,
		borderRadius: 5
	});
	
	self.add(filtering_info);
	//////////////////////////////////
	
	loadData();
	
	function loadData(){
		var filtering_array = [];///////////////////////////
		var i = 0;
		var url = Ti.App.domain + "get_recruit.json";
		getData(url, function( data ){
			if (data.success) {
				// 通信に成功したら行う処理
				var json = data.data;
				///////////////////////////
				//フィルタリング処理
				for(var j=0; j<json.length; j++){
					if(json[j].tags.indexOf(filtering_tag) != -1){
						filtering_array[i] = json[j];
						i = i + 1;
					}
				}
				///////////////////////////
				if(filtering_array.length >= 10){
					createRow(filtering_array, 0, 10);
				}
				else{
					createRow(filtering_array, 0, filtering_array.length);
				}
			}else{
				// 通信に失敗したら行う処理
			}
			actInd.hide();	
		});
	
	}
	
	
	function createRow(dataList, startNum, endNum){
		actInd.show();
		if (dataList.length == 0){
			//alert("検索条件に合うクエストがありませんでした");
			var row = Ti.UI.createTableViewRow({
				//backgroundImage: 'images/bbs_row_bg.png',
		   		hasChild: false,
		   		height:450,
		   		id: "",
		   		touchEnabled: false,
		   		selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		   		backgroundColor: 'black'
		    });
		    var label = Ti.UI.createLabel({
		    	text: '検索条件に合うクエストがありませんでした。\n\n検索条件に合うクエストが投稿されるまで更新し続けるか、\n\n検索条件を変更してください。',
		    	font:{fontWeight: "bold", fontSize:11},
		    	color: 'white',
		    	textAlign: 'center',
		    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		    	right: 20,
		    	left: 20,
		    	top: 30,
		    	height: 80
		    });
		    row.add(label);
		    
		    var nendAd = nend.createView({
		    	top: 130,
		    	//center:{x: Ti.Platform.displayCaps.platformWidth / 2},
		    	left: (Ti.Platform.displayCaps.platformWidth - 300) / 2,
				//width:  320,
                //height: 250,
                spotId: '285501',//'371039',
                apiKey: '7eafcb13dd674b523ec63c14db2f14aae7aaa89e'//'07b035e580886e8c0939d8b85ffca7b8a24aa81f'
            });
            row.add(nendAd);
		    
		    var reloadBtn = Ti.UI.createButton({
		    	title: '更 新',
				font:{fontWeight: 'bold', fontSize: 18},
				top: 400,
				right: 70,
				left: 70,
				height: 40,
				color: 'white',
				backgroundColor: '#77A82C',
				borderRadius:5
		    });
		    row.add(reloadBtn);
		    
		    reloadBtn.addEventListener('click', function(){
		    	actInd.show();
				tableViewRowData = [];
				loadData();
				tableView.scrollToTop(0, true);
		    });
            
           /*
           var admobAd = Admob.createView({
				top: 200,
			    width: 320,
			    height: 250,
			    adUnitId: 'ca-app-pub-8392863952863215/7944443689',
			    adBackgroundColor: 'white',
			});
			row.add(admobAd);
		    */
			tableViewRowData.push(row);
		}else{
			for (var i=startNum; i<endNum; i++){
				///////////////////////////////
				//if(dataList[i].tags.indexOf('kourin') != -1){
				//Ti.API.info("###startNum: " + startNum + "\nendNum: " + endNum + "\nlength: " + dataList.length);
				//Ti.API.info("\nid-i: " + i + "\nname: " +  + dataList[i].name + "\ntags: " + dataList[i].tags);
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
			    
				/*			    
			    if(i%2 == 0){
			   		row.backgroundColor = 'white';
				}else{
			   		row.backgroundColor = '#D8D8D8';
			   	}
			   	*/
			   	//Ti.API.info("ID:" + i +"\nNAME:" + dataList[i].name + "\nIMAGE:" + dataList[i].image);
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
	
	//////////////////////////////////////////////////////
	function createFilteringView(){
		var bgView = Titanium.UI.createView({
			backgroundColor:'black',
			opacity: 0.3,
		});
		self.add(bgView);
		
		var view = Titanium.UI.createView({
			width: 300,
			height: 400,
			backgroundColor: 'white',
			borderRadius:5
		});
		self.add(view);
		
		///////////////////////////////////////
		//全てボタン
		///////////////////////////////////////
		var allButton = Ti.UI.createButton({
			title: '全て',
			//font:{fontFamily: _font, fontSize: 18},
			top: 15,
			//right: 10,
			left: 15,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(allButton);
		
		allButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　全て";
			filtering_tag = "";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//降臨ボタン
		///////////////////////////////////////
		var kourinButton = Ti.UI.createButton({
			title: '降臨',
			//font:{fontFamily: _font, fontSize: 18},
			top: 15,
			right: 15,
			//left: 10,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(kourinButton);
		
		kourinButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　降臨";
			filtering_tag = "kourin";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//チケットボタン
		///////////////////////////////////////
		var ticketButton = Ti.UI.createButton({
			title: 'チケット',
			//font:{fontFamily: _font, fontSize: 18},
			top: 70,
			right: 15,
			//left: 10,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(ticketButton);
		
		ticketButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　チケット";
			filtering_tag = "ticket";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//超絶ボタン
		///////////////////////////////////////
		var chouzetsuButton = Ti.UI.createButton({
			title: '超絶',
			//font:{fontFamily: _font, fontSize: 18},
			top: 70,
			//right: 10,
			left: 15,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(chouzetsuButton);
		
		chouzetsuButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　超絶";
			filtering_tag = "chouzetsu";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//獣神玉ボタン
		///////////////////////////////////////
		var zyushindamaButton = Ti.UI.createButton({
			title: '獣神玉',
			//font:{fontFamily: _font, fontSize: 18},
			top: 125,
			//right: 10,
			left: 15,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(zyushindamaButton);
		
		zyushindamaButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　獣神玉";
			filtering_tag = "zyushindama";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//亀クエストボタン
		///////////////////////////////////////
		var kameButton = Ti.UI.createButton({
			title: '亀',
			//font:{fontFamily: _font, fontSize: 18},
			top: 125,
			right: 15,
			//left: 10,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(kameButton);
		
		kameButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　亀";
			filtering_tag = "kame";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//ムラサメボタン
		///////////////////////////////////////
		var murasameButton = Ti.UI.createButton({
			title: 'ムラサメ',
			//font:{fontFamily: _font, fontSize: 18},
			top: 180,
			//right: 10,
			left: 15,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(murasameButton);
		
		murasameButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　ムラサメ";
			filtering_tag = "murasame";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//ムラマサボタン
		///////////////////////////////////////
		var muramasaButton = Ti.UI.createButton({
			title: 'ムラマサ',
			//font:{fontFamily: _font, fontSize: 18},
			top: 180,
			right: 15,
			//left: 10,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(muramasaButton);
		
		muramasaButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　ムラマサ";
			filtering_tag = "muramasa";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//パワタスボタン
		///////////////////////////////////////
		var pawatasuButton = Ti.UI.createButton({
			title: 'パワタスキング',
			//font:{fontFamily: _font, fontSize: 18},
			top: 235,
			//right: 10,
			left: 15,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(pawatasuButton);
		
		pawatasuButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　パワタスキング";
			filtering_tag = "pawatasu";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//タスボタン
		///////////////////////////////////////
		var tasuButton = Ti.UI.createButton({
			title: 'タス',
			//font:{fontFamily: _font, fontSize: 18},
			top: 235,
			right: 15,
			//left: 10,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(tasuButton);
		
		tasuButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　タス";
			filtering_tag = "tasu";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//ゴールドボタン
		///////////////////////////////////////
		var goldButton = Ti.UI.createButton({
			title: 'ゴールド',
			//font:{fontFamily: _font, fontSize: 18},
			top: 290,
			//right: 10,
			left: 15,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(goldButton);
		
		goldButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　ゴールド";
			filtering_tag = "gold";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//ワクワクの実ボタン
		///////////////////////////////////////
		var wakuwakuButton = Ti.UI.createButton({
			title: '英雄の神殿',
			//font:{fontFamily: _font, fontSize: 18},
			top: 290,
			right: 15,
			//left: 15,
			height: 40,
			width: 130,
			color: 'white',
			backgroundColor: '#00A5CD',
			borderRadius:5
		});
		view.add(wakuwakuButton);
		
		wakuwakuButton.addEventListener('click', function(){
			actInd.show();
			filtering_info.text = "　英雄の神殿";
			filtering_tag = "wakuwaku";
			tableViewRowData = [];
			loadData();
			tableView.scrollToTop(0, true);
			self.remove(bgView);
			self.remove(view);
		});
		
		///////////////////////////////////////
		//閉じるボタン
		///////////////////////////////////////
		var closeButton = Ti.UI.createButton({
			title: '閉じる',
			//font:{fontFamily: _font, fontSize: 18},
			top: 350,
			right: 15,
			left: 15,
			height: 30,
			//width: 130,
			color: 'white',
			backgroundColor: '#707070',
			borderRadius: 5
		});
		view.add(closeButton);
		
		closeButton.addEventListener('click', function(){
			self.remove(bgView);
			self.remove(view);
		});
	
	}
		
	self.add(actInd);	
	return self;
}

module.exports = bbsWindow;
