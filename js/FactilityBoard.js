var data;
var MachineQty;
var file = './MachineData.txt?nocache=';
var fileSplit = "\n";		//Github page上不用加"\r"，不然顯示不出來

var time = document.getElementById("updateTime");
var titleHead = document.getElementById('title_head');
var title = document.getElementById('title');
var checkData;
var checkUpdate = setInterval(check_Update ,3000);	//每3秒檢查資料是否更新，刷新頁面
window.addEventListener("load", readData, false);
			
function readData()
{
	//讀取txt檔內容，放到data陣列
	$(function(){
	    $.ajax({
			url: file + (new Date()).getTime(),
	        dataType: 'text',
	        success: function(data_t) {
	            //alert(data_t);
	        	//console.log(data_t);
	        	data = data_t.split(fileSplit);	//Github page上不用加"\r"，不然顯示不出來
				
				setTimeout(function(){ checkData = setInterval(chkData ,1000); }, 500);	//0.5秒後每秒檢查是否正確讀取到txt檔的資料
	        }
	    });
	});
}

function check_Update()
{	
	var time_old = data[0].split(" ");	//舊時間陣列
	var check_data_t, time_new;
	//讀取txt檔內容
	$(function(){
	    $.ajax({
	        url: file + (new Date()).getTime(),
	        dataType: 'text',
	        success: function(data_t2) {
	            //alert(data_t);
	        	//console.log(data_t);
	        	check_data_t = data_t2.split(fileSplit);	//Github page上不用加"\r"，不然顯示不出來
	        	time_new = check_data_t[0].split(" ");	//新時間陣列
	        	if((time_old[0]==time_new[0]) && (time_old[1]==time_new[1]) && (time_old[2]==time_new[2]) && (time_old[3]==time_new[3]) && (time_old[4]==time_new[4]))
	        	{ /*不刷新*/ }
	        	else	//若發現時間不同，則刷新頁面
	        		myRefresh();	
	        }
	    });
	});
}

function myRefresh()	//重新刷新頁面
{
	window.location.reload();
}

function chkData()	
{	
	time.innerHTML = "讀取資料中 ...　"; 
	if(data[data.length-1] == null)
	{}
	else
	{
		showData();
		clearInterval(checkData);	//如果讀取到txt檔資料後就停止檢查
	}
}

function showData()
{
	dispTime();
	var MData, EInner, MStatus, MBar, ProgrssBar, BarText;
	var Card_ID, Custom_ID, model, admin, note, MType;
	var CurQty, SetQty, AccQty, CurMiss, SetMiss, SpeedRate, UpdateTime;
	var QtyRate, MissRate;
	var connectCnt;
	var producingCnt=0, stopCnt=0, powerOffCnt=0, achieveQtyCnt=0, errorCnt=0; 
	var tempD;
	
	titleHead.innerHTML = data[1];	//最上方標題
	title.innerHTML = data[1];		//頁面標題
	MachineQty = data[2];
	// 3 是排列方式
	// 4 是第幾台
	
	for(var i=1, index=5; i<=MachineQty; i++)
	{
		Card_ID = data[index++];
		Custom_ID = data[index++];
		model = data[index++];
		admin = data[index++];
		note = data[index++];
		if(data[index++] == 'CMD')
			MType = '指令型';
		else	
			MType = '通用型';
		
		MData = document.getElementById('MachineData-' + i);
		EInner = document.getElementById('element-inner-' + i);
		MStatus = document.getElementById('MachineStatus-' + i);
		MBar = document.getElementById('MachineBar-' + i);
		ProgrssBar = document.getElementById('Progress-bar-' + i);
		BarText = document.getElementById('BarText-' + i);
		switch(data[index++])
		{
			case 'Disconnect':
				index += 8;	
				ProgrssBar.parentNode.removeChild(ProgrssBar);
				MStatus.innerHTML = "未連接";	
				tempD = "板子類型: " + MType + "\n";
				tempD += "板子ID: " + Card_ID + "\n";
				tempD += "機型編號:　" + Custom_ID + "\n";
				tempD += "機型:　" + model + "\n";
				tempD += "管理人:　" + admin + "\n";
				tempD += "備註:　" + note;
				MData.setAttribute('data-description',tempD);			
				continue;	
			case 'Stop':
				stopCnt++;
				EInner.className = "periodic-element-inner-stop";
				MStatus.className = "status status-stop";
				MStatus.innerHTML = "待機";			
				break;
			case 'Stop(Lock)':
				stopCnt++;
				EInner.className = "periodic-element-inner-stop";
				MStatus.className = "status status-stop";
				MStatus.innerHTML = "待機(鎖)";	
				break;
			case 'Producing':
				producingCnt++;
				EInner.className = "periodic-element-inner-producing";
				MStatus.className = "status status-producing";
				MStatus.innerHTML = "生產";	
				break;
			case 'Producing(Lock)':
				producingCnt++;
				EInner.className = "periodic-element-inner-producing";
				MStatus.className = "status status-producing";
				MStatus.innerHTML = "生產(鎖)";	
				break;
			case 'AchieveQty':
				achieveQtyCnt++;
				EInner.className = "periodic-element-inner-achieveQty";
				MStatus.className = "status status-achieveQty";
				MStatus.innerHTML = "完成";	
				break;
			case 'AchieveQty(Lock)':
				achieveQtyCnt++;
				EInner.className = "periodic-element-inner-achieveQty";
				MStatus.className = "status status-achieveQty";
				MStatus.innerHTML = "完成(鎖)";	
				break;
			case 'PowerOff':
				powerOffCnt++;
				EInner.className = "periodic-element-inner-powerOff";
				MStatus.className = "status status-powerOff";
				MStatus.innerHTML = "關機";	
				break;
			case 'ServerError':
				errorCnt++;
				EInner.className = "periodic-element-inner-error";
				MStatus.className = "status status-error";
				MStatus.innerHTML = "異常";	
				break;
			case 'ServerError(Lock)':
				errorCnt++;
				EInner.className = "periodic-element-inner-error";
				MStatus.className = "status status-error";
				MStatus.innerHTML = "異常(鎖)";	
				break;			
			default: break;
		}	
		CurQty = data[index++];		if(CurQty == 'empty')		CurQty = '(空)';			
		SetQty = data[index++];		if(SetQty == 'empty')		SetQty = '(空)';	
		AccQty = data[index++];		if(AccQty == 'empty')		AccQty = '(空)';	
		CurMiss = data[index++];	if(CurMiss == 'empty')		CurMiss = '(空)';	
		SetMiss = data[index++];	if(SetMiss == 'empty')		SetMiss = '(空)';	
		SpeedRate = data[index++];	if(SpeedRate == 'empty')	SpeedRate = '(空)';	
		UpdateTime = data[index++]; if(UpdateTime == 'empty')	UpdateTime = '(空)';	
		index++;
		
		if((CurQty=='(空)') || (SetQty=='(空)'))
		{
			QtyRate = '(空)';	  
			BarText.innerHTML = QtyRate;
		}
		else if((CurQty*1) >= (SetQty*1))
		{			
			if(MType == '通用型')
				QtyRate = Math.round((CurQty/SetQty)*100) + "%";
			else
				QtyRate = "100%";
			BarText.innerHTML = QtyRate;
			MBar.style.width = "100%"; 
		}
		else
		{
			QtyRate = Math.round((CurQty/SetQty)*100) + "%";
			BarText.innerHTML = QtyRate;
			MBar.style.width = QtyRate; 
		}
		
		if((CurMiss=='(空)') || (SetMiss=='(空)'))
			MissRate = '空';	
		else
			MissRate = Math.round((CurMiss/SetMiss)*100) + " %";
				
		tempD = "板子類型: " + MType + "\n";
		tempD += "板子ID: " + Card_ID + "\n";		
		tempD += "目前生產量: " + CurQty + "\n"; 
		tempD += "設定生產量: " + SetQty + "\n"; 
		
		
		if(MType == '通用型')
			tempD += "累計生產量: " + AccQty + "\n"; 
		else
		{
			tempD += "目前失誤量: " + CurMiss + "\n"; 
			tempD += "設定失誤量: " + SetMiss + "\n"; 
			tempD += "產速: " + SpeedRate + " %\n"; 
		}
		tempD += "最後更新: " + UpdateTime + "\n";
		tempD += "機型編號:　" + Custom_ID + "\n";
		tempD += "機型:　" + model + "\n";
		tempD += "管理人:　" + admin + "\n";
		tempD += "備註:　" + note;
		MData.setAttribute('data-description',tempD);
	}
	
	//刪掉多餘的機台格子
	/*var deleteMachine;
	for(var i=MachineQty+1; i<100; i++)
	{
		deleteMachine = document.getElementById('MachineData-' + i);
		deleteMachine.className = "empty-spacer-1";	
	}*/
	
	//處理Chart		li 
	var ConnectCount = document.getElementById('ConnectCnt');
	var ProducingCount = document.getElementById('producingCnt');
	var StopCount = document.getElementById('stopCnt');
	var PowerOffCount = document.getElementById('powerOffCnt');
	var AchieveQtyCount = document.getElementById('achieveQtyCnt');
	var ErrorCount = document.getElementById('errorCnt');
	connectCnt = producingCnt+stopCnt+powerOffCnt+achieveQtyCnt+errorCnt;
	ConnectCount.innerHTML = connectCnt;
	ProducingCount.innerHTML = producingCnt;
	StopCount.innerHTML = stopCnt;
	PowerOffCount.innerHTML = powerOffCnt;
	AchieveQtyCount.innerHTML = achieveQtyCnt;
	ErrorCount.innerHTML = errorCnt;
	
	//處理Chart donut
	var ProducingPercent = Math.floor((producingCnt/connectCnt)*100);
	var StopPercent = Math.floor((stopCnt/connectCnt)*100);
	var PowerOffPercent = Math.floor((powerOffCnt/connectCnt)*100);
	var AchieveQtyPercent = Math.floor((achieveQtyCnt/connectCnt)*100);
	var ErrorPercent = Math.floor((errorCnt/connectCnt)*100);
	var TotalPercent = ProducingPercent+StopPercent+PowerOffPercent+AchieveQtyPercent+ErrorPercent;
	if(TotalPercent < 100)	//若總%數不是100，因為Math.floor可能會導致誤差
	{
		var tempValue = 100 - TotalPercent;
		if(ProducingPercent > 0)
			ProducingPercent = ProducingPercent + tempValue;
		else if(StopPercent > 0)
			StopPercent = StopPercent + tempValue;
		else if(PowerOffPercent > 0)
			PowerOffPercent = PowerOffPercent + tempValue;
		else if(AchieveQtyPercent > 0)
			AchieveQtyPercent = AchieveQtyPercent + tempValue;
		else if(ErrorPercent > 0)
			ErrorPercent = ErrorPercent + tempValue;
	}
	
	if(connectCnt > 0)	//連接數量大於0才須顯示Chart
	{
		var percent_array = new Array(5);
		percent_array[0] = ProducingPercent;
		percent_array[1] = StopPercent;
		percent_array[2] = PowerOffPercent;
		percent_array[3] = AchieveQtyPercent;
		percent_array[4] = ErrorPercent;
		dispChart(percent_array);
	}
	
	/*	舊Chart
	var producing_begin = document.getElementById('producing-begin'); 
	var quesito_producing = document.getElementById('quesito-producing'); 
	var stop_begin = document.getElementById('stop-begin'); 
	var quesito_stop = document.getElementById('quesito-stop'); 
	var powerOff_begin = document.getElementById('powerOff-begin'); 
	var quesito_powerOff = document.getElementById('quesito-powerOff'); 
	var achieveQty_begin = document.getElementById('achieveQty-begin'); 
	var quesito_achieveQty = document.getElementById('quesito-achieveQty'); 
	var error_begin = document.getElementById('error-begin'); 
	var quesito_error = document.getElementById('quesito-error'); 
	var CurDeg = 0, rota = 0;
	producing_begin.style.transform = "rotate(" + CurDeg + "deg)";
	rota = Math.floor((producingCnt/connectCnt)*360);
	quesito_producing.style.transform = "rotate(" + rota + "deg)";
	CurDeg = CurDeg + rota;
	
	stop_begin.style.transform = "rotate(" + CurDeg + "deg)";
	rota = Math.floor((stopCnt/connectCnt)*360);
	quesito_stop.style.transform = "rotate(" + rota + "deg)";
	CurDeg = CurDeg + rota;
	
	powerOff_begin.style.transform = "rotate(" + CurDeg + "deg)";
	rota = Math.floor((powerOffCnt/connectCnt)*360);
	quesito_powerOff.style.transform = "rotate(" + rota + "deg)";
	CurDeg = CurDeg + rota;
	
	achieveQty_begin.style.transform = "rotate(" + CurDeg + "deg)";
	rota = Math.floor((achieveQtyCnt/connectCnt)*360);
	quesito_achieveQty.style.transform = "rotate(" + rota + "deg)";
	CurDeg = CurDeg + rota;
	
	error_begin.style.transform = "rotate(" + CurDeg + "deg)";
	rota = 360-CurDeg;
	quesito_error.style.transform = "rotate(" + rota + "deg)";
	CurDeg = CurDeg + rota;	
	*/
}

function dispTime()
{
	//Sun Mar  3 18:03:10 2019
	var cnt = 0;
	var temp = data[0].split(" ");
	if(temp.length == 6)	//若日的數字小於10，則需特別處理
	{
		temp[2] = "0" + temp[3];
		temp[3] = temp[4];
		temp[4] = temp[5];
	}

	disp_Time = temp[4] + '/';		//年份
	//disp_Time += '2019/';
	switch(temp[1])					//月份
	{
		case 'Jan': disp_Time += '01/'; break; 
		case 'Feb': disp_Time += '02/'; break; 
		case 'Mar': disp_Time += '03/'; break; 
		case 'Apr': disp_Time += '04/'; break; 
		case 'May': disp_Time += '05/'; break; 
		case 'Jun': disp_Time += '06/'; break; 
		case 'Jul': disp_Time += '07/'; break; 
		case 'Aug': disp_Time += '08/'; break; 
		case 'Sep': disp_Time += '09/'; break; 
		case 'Oct': disp_Time += '10/'; break; 
		case 'Nov': disp_Time += '11/'; break; 
		case 'Dec': disp_Time += '12/'; break;
		default: break;
	}
	disp_Time += temp[2] + ' ';		//日期
	switch(temp[0])					//星期
	{
		case 'Mon': disp_Time += '(一) '; break; 
		case 'Tue': disp_Time += '(二) '; break; 
		case 'Wed': disp_Time += '(三) '; break; 
		case 'Thu': disp_Time += '(四) '; break; 
		case 'Fri': disp_Time += '(五) '; break; 
		case 'Sat': disp_Time += '(六) '; break; 
		case 'Sun': disp_Time += '(日) '; break; 
		default: break;
	}
	
	disp_Time += temp[3];			//時間	
	time.innerHTML = '更新 : ' + disp_Time;
}

function transfer_Status(temp)	//狀態的字串 英文轉中文
{
	if(temp == "Disconnect")			return "未連接";
	else if(temp == "Stop")				return "待機中";
	else if(temp == "Stop(Lock)")		return "待機中(鎖)";
	else if(temp == "Producing")		return "生產中";
	else if(temp == "Producing(Lock)")	return "生產中(鎖)";
	else if(temp == "AchieveQty")		return "達到生產量";
	else if(temp == "AchieveQty(Lock)")	return "達到生產量(鎖)";
	else if(temp == "PowerOff")			return "關機中";
	else if(temp == "ServerError")		return "伺服錯誤";
	else if(temp == "ServerError(Lock)")return "伺服錯誤(鎖)";
}

function dispChart(value){
	var dataset = [
			{ percent: value[0] },
			{ percent: value[1] },
			{ percent: value[2] },
			{ percent: value[3] },
			{ percent: value[4] }
		];

	var pie=d3.layout.pie()
			.value(function(d){return d.percent})
			.sort(null)
			.padAngle(.03);

	var w=250,h=270;
	var outerRadius=w/2;
	var innerRadius=70;

	var arc=d3.svg.arc()
			.outerRadius(outerRadius)
			.innerRadius(innerRadius);

	var svg=d3.select("#chart")
			.append("svg")
			.attr({
				width:w,
				height:h,
				class:'shadow'
			}).append('g')
			.attr({
				transform:'translate('+w/2+','+h/2+')'
			});
	var color=0;
	var path=svg.selectAll('path')
			.data(pie(dataset))
			.enter()
			.append('path')
			.attr({
				d:arc,
				fill:function(d,i){
					color++;
					if(color == 1)
						return '#8BF98F';	
					else if(color == 2)
						return '#FFFF00';
					else if(color == 3)
						return '#8B8B70';
					else if(color == 4)
						return '#00EEEE';
					else if(color == 5)
						return '#EE0000';
				}
			});

	path.transition()
			.duration(1000)
			.attrTween('d', function(d) {
				var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
				return function(t) {
					return arc(interpolate(t));
				};
			});

	var restOfTheData=function(){
		var text=svg.selectAll('text')
				.data(pie(dataset))
				.enter()
				.append("text")
				.transition()
				.duration(200)
				.attr("transform", function (d) {
					return "translate(" + arc.centroid(d) + ")";
				})
				.attr("dy", ".4em")
				.attr("text-anchor", "middle")
				.text(function(d){
					return d.data.percent+"%";
				})
				.style({
					fill:'#000',
					'font-size':'15px'
				});
	};
	setTimeout(restOfTheData,200);
}

function debug(temp)
{
	time.innerHTML = temp;
}