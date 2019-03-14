var data;
var MachineQty = 99;
var file = './MachineData.txt';
var fileSplit = "\n";		//Github page上不用加"\r"，不然顯示不出來

var time = document.getElementById("updateTime");
var checkData;
var checkUpdate = setInterval(check_Update ,30000);	//每30秒檢查資料是否更新，刷新頁面
window.addEventListener("load", readData, false);


				
function readData()
{
	//讀取txt檔內容，放到data陣列
	$(function(){
	    $.ajax({
	        url: file,
	        dataType: 'text',
	        success: function(data_t) {
	            //alert(data_t);
	        	//console.log(data_t);
	        	data = data_t.split(fileSplit);	//Github page上不用加"\r"，不然顯示不出來
				
				setTimeout(function(){ checkData = setInterval(chkData ,1000); }, 3000);	//每秒檢查是否正確讀取到txt檔的資料
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
	        url: file,
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
	var MData, EInner, MStatus, MBar, ProgrssBar;
	var CurQty, SetQty, CurMiss, SetMiss, SpeedRate;
	var QtyRate, MissRate;
	for(var i=1, index=2; i<=MachineQty; i++)
	{
		MData = document.getElementById('MachineData-' + i);
		EInner = document.getElementById('element-inner-' + i);
		MStatus = document.getElementById('MachineStatus-' + i);
		MBar = document.getElementById('MachineBar-' + i);
		ProgrssBar = document.getElementById('Progress-bar-' + i);
		switch(data[index++])
		{
			case 'Disconnect':
				index += 6;	
				ProgrssBar.parentNode.removeChild(ProgrssBar);
				continue;
				break;
			case 'Stop':
				EInner.className = "periodic-element-inner-stop";
				MStatus.className = "status status-stop";
				MStatus.innerHTML = "停機";			
				break;
			case 'Stop(Lock)':
				EInner.className = "periodic-element-inner-stop";
				MStatus.className = "status status-stop";
				MStatus.innerHTML = "停機(鎖)";	
				break;
			case 'Producing':
				EInner.className = "periodic-element-inner-producing";
				MStatus.className = "status status-producing";
				MStatus.innerHTML = "生產";	
				break;
			case 'Producing(Lock)':
				EInner.className = "periodic-element-inner-producing";
				MStatus.className = "status status-producing";
				MStatus.innerHTML = "生產(鎖)";	
				break;
			case 'AchieveQty':
				EInner.className = "periodic-element-inner-achieveQty";
				MStatus.className = "status status-achieveQty";
				MStatus.innerHTML = "達生產";	
				break;
			case 'AchieveQty(Lock)':
				EInner.className = "periodic-element-inner-achieveQty";
				MStatus.className = "status status-achieveQty";
				MStatus.innerHTML = "達生產(鎖)";	
				break;
			case 'PowerOff':
				EInner.className = "periodic-element-inner-powerOff";
				MStatus.className = "status status-powerOff";
				MStatus.innerHTML = "關機";	
				break;
			case 'ServerError':
				EInner.className = "periodic-element-inner-error";
				MStatus.className = "status status-error";
				MStatus.innerHTML = "異常";	
				break;
			case 'ServerError(Lock)':
				EInner.className = "periodic-element-inner-error";
				MStatus.className = "status status-error";
				MStatus.innerHTML = "異常(鎖)";	
				break;			
			default: break;
		}
		if(data[index] == 'IO')
		{
			MData.setAttribute('data-description',"通用型機台\n生產率: 無\n失誤率: 無\n產速率: 無");
			MBar.innerHTML = "無";
			index += 6;
		}
		else
		{
			CurQty = data[index++];		SetQty = data[index++];
			CurMiss = data[index++];	SetMiss = data[index++];
			SpeedRate = data[index++];	index++;
			QtyRate = Math.round((CurQty/SetQty)*100) + " %\n";
			MissRate = Math.round((CurMiss/SetMiss)*100) + " %\n";	
			MData.setAttribute('data-description',"生產率: " + QtyRate + "失誤率: " + MissRate + "產速率: " + SpeedRate + " %");
			MBar.innerHTML = Math.round((CurQty/SetQty)*100) + "%";
			MBar.style.width = Math.round((CurQty/SetQty)*100) + "%"; 
		}
	}	
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
	else if(temp == "Stop")				return "停機中";
	else if(temp == "Stop(Lock)")		return "停機中(鎖)";
	else if(temp == "Producing")		return "生產中";
	else if(temp == "Producing(Lock)")	return "生產中(鎖)";
	else if(temp == "AchieveQty")		return "達到生產量";
	else if(temp == "AchieveQty(Lock)")	return "達到生產量(鎖)";
	else if(temp == "PowerOff")			return "關機中";
	else if(temp == "ServerError")		return "伺服錯誤";
	else if(temp == "ServerError(Lock)")return "伺服錯誤(鎖)";
}

function debug(temp)
{
	time.innerHTML = temp;
}

