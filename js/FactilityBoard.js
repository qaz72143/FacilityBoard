var table = document.querySelector('table'), 
    table_meta_container = table.querySelector('thead'); 
    //table_data_container = table.querySelector('tbody'),

var getTime = document.getElementById("updateTime");
var data;
var data_All = new Array(99), data_Connect;
var disp_Time;
var curr_num, curr_type;	//目前頁面的數量	//目前頁面的類型
var data_0X = new Array(9), data_1X = new Array(10), data_2X = new Array(10),
 data_3X = new Array(10), data_4X = new Array(10), data_5X = new Array(10),
 data_6X = new Array(10), data_7X = new Array(10), data_8X = new Array(10), data_9X = new Array(10);
Init_data();

var createTable = function(src) {	//根據傳遞進來的陣列創建Table
  var frag = document.createDocumentFragment(), 
      curr_item, curr_p;
  
  for(var i = 0; i < src.length; i++) {
    curr_item = document.createElement('tr');
	curr_item.setAttribute("id", "tableTr");	//創建tr時 賦予id值
    curr_item.classList.add(((i%2 === 0)?'odd':'even'));
    src[i].el = curr_item;
    
    for(var p in src[i]) {
      if(p !== 'el') {
        curr_p = document.createElement('td');
        curr_p.classList.add('prop__value');
        curr_p.dataset.propName = p;
        curr_p.textContent = src[i][p];
        curr_item.appendChild(curr_p)
      }
    }
    
    frag.appendChild(curr_item);
  }
  
  table.querySelector('tbody').appendChild(frag);
  curr_num = src.length;	//創建了多少數量
}

function deleteTable()	//刪除目前Table
{
	var element1;	
	for(var i = 0; i < curr_num; i++) {
		element1 = document.getElementById("tableTr");
		element1.parentNode.removeChild(element1);
		//element1.removeChild();
	}
}

var sortTable = function(entries, type, dir) {	//排序
  entries.sort(function(a, b) { 
    if(a[type] < b[type]) return dir;
    if(a[type] > b[type]) return -dir;
    return 0;
  });
  
  table.dataset.sortBy = type;

  for(var i = 0; i < entries.length; i++) {
    entries[i].el.style.order = i + 1;
    
    if((i%2 === 0 && entries[i].el.classList.contains('even')) || 
       (i%2 !== 0 && entries[i].el.classList.contains('odd'))) {
      entries[i].el.classList.toggle('odd');
      entries[i].el.classList.toggle('even');
    }
  }
};

table_meta_container.addEventListener('click', function(e) {	//點選th時做排序  
  var t = e.target;
  
  if(t.classList.contains('prop__name')) {
    if(!t.dataset.dir) { t.dataset.dir = 1; }
    else { t.dataset.dir *= -1; }
    
    //根據目前在哪種頁面而傳遞不同的陣列給排序function
	if(curr_type == 1)
		sortTable(data_All, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 2)
		sortTable(data_Connect, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 3)
		sortTable(data_0X, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 4)
		sortTable(data_1X, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 5)
		sortTable(data_2X, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 6)
		sortTable(data_3X, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 7)
		sortTable(data_4X, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 8)
		sortTable(data_5X, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 9)
		sortTable(data_6X, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 10)
		sortTable(data_7X, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 11)
		sortTable(data_8X, t.dataset.propName, t.dataset.dir);
	else if(curr_type == 12)
		sortTable(data_9X, t.dataset.propName, t.dataset.dir);
  }
}, false);

var buttonRefresh = document.getElementById("btn_refrech");
buttonRefresh.addEventListener("click", function(e) {
	myRefresh();
}, false);


//先刪除目前table後再創建指定的table
var button1 = document.getElementById("btn_all");
button1.addEventListener("click", function(e) {
	
	if(curr_type != 1)
	{
		curr_type = 1;
		deleteTable();
		createTable(data_All);
	}
}, false);

var button2 = document.getElementById("btn_connected");
button2.addEventListener("click", function(e) {
	if(curr_type != 2)
	{
		curr_type = 2;
		deleteTable();
		createTable(data_Connect);
	}
}, false);

var button3 = document.getElementById("btn_0X");
button3.addEventListener("click", function(e) {
	if(curr_type != 3)
	{
		curr_type = 3;
		deleteTable();
		createTable(data_0X);
	}
}, false);

var button4 = document.getElementById("btn_1X");
button4.addEventListener("click", function(e) {
	if(curr_type != 4)
	{
		curr_type = 4;
		deleteTable();
		createTable(data_1X);
	}
}, false);

var button5 = document.getElementById("btn_2X");
button5.addEventListener("click", function(e) {
	if(curr_type != 5)
	{
		curr_type = 5;
		deleteTable();
		createTable(data_2X);
	}
}, false);

var button6 = document.getElementById("btn_3X");
button6.addEventListener("click", function(e) {
	if(curr_type != 6)
	{
		curr_type = 6;
		deleteTable();
		createTable(data_3X);
	}
}, false);

var button7 = document.getElementById("btn_4X");
button7.addEventListener("click", function(e) {
	if(curr_type != 7)
	{
		curr_type = 7;
		deleteTable();
		createTable(data_4X);
	}
}, false);

var button8 = document.getElementById("btn_5X");
button8.addEventListener("click", function(e) {
	if(curr_type != 8)
	{
		curr_type = 8;
		deleteTable();
		createTable(data_5X);
	}
}, false);

var button9 = document.getElementById("btn_6X");
button9.addEventListener("click", function(e) {
	if(curr_type != 9)
	{
		curr_type = 9;
		deleteTable();
		createTable(data_6X);
	}
}, false);

var button10 = document.getElementById("btn_7X");
button10.addEventListener("click", function(e) {
	if(curr_type != 10)
	{
		curr_type = 10;
		deleteTable();
		createTable(data_7X);
	}
}, false);

var button11 = document.getElementById("btn_8X");
button11.addEventListener("click", function(e) {
	if(curr_type != 11)
	{
		curr_type = 11;
		deleteTable();
		createTable(data_8X);
	}
}, false);

var button12 = document.getElementById("btn_9X");
button12.addEventListener("click", function(e) {
	if(curr_type != 12)
	{
		curr_type = 12;
		deleteTable();
		createTable(data_9X);
	}
}, false);


function Init_data()	//初始化陣列內容型態
{
	for (var i=0; i<99; i++)
		data_All[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
	for (var i=0; i<=8; i++)
		data_0X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
	for (var i=0; i<=9; i++)
	{
		data_1X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
		data_2X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
		data_3X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
		data_4X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
		data_5X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
		data_6X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
		data_7X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
		data_8X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
		data_9X[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''}; 
	}	
	
	//讀取txt檔內容，放到data陣列
	var text;
	var client = new XMLHttpRequest();
	client.open('GET', "./MachineData.txt");
	client.onreadystatechange = function() {
		text = client.responseText;
		data = text.split("\r\n");
	}	
	client.send();
}

function dispData()	//從data取值給data_All
{
	var cnt = 0;
	var temp = data[cnt++].split(" ");
	//disp_Time = temp[4] + '/';		//年份
	
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
	
	getTime.innerHTML = '更新 : ' + disp_Time;
	
	for(var i=0; i<data_All.length; i++)	// 0 ~ 98 
	{
		data_All[i]['No'] = data[cnt++];	
		data_All[i]['Status'] = transfer_Status(data[cnt++]);
		data_All[i]['CurQty'] = data[cnt++];
		data_All[i]['SetQty'] = data[cnt++];
		data_All[i]['CurMiss'] = data[cnt++];
		data_All[i]['SetMiss'] = data[cnt++];
		data_All[i]['Speed'] = data[cnt++];		
	}
	createTable(data_All);	//一開始先創建data_All的table
	curr_type = 1;			
	dispData_after();		//創好後再處理其餘陣列
}

function dispData_after()	//從data取值給剩餘陣列
{
	//由於data_Connect的大小屬於浮動的，所以須特別處理
	var cnt = 1, data_Connect_length = 0;
	//先算出data_Connect的大小需要多少
	for(var i=0; i<99; i++)
	{
		if(data[cnt+1] == "Disconnect")
			cnt = cnt + 7;
		else
		{
			cnt = cnt + 7;
			data_Connect_length++;
		}		
	}
	var temp = new Array(data_Connect_length);
	data_Connect = temp;	//決定data_Connect的大小
	for (var i=0; i<data_Connect_length; i++)	//初始化
		data_Connect[i] = {'No':'','Status':'','CurQty':'','SetQty':'','CurMiss':'5','SetMiss':'','Speed':''};
	
	cnt = 1;
	for(var i=0; i<99; i++)
	{
		if(data[cnt+1] == "Disconnect")
			cnt = cnt + 7;
		else
		{
			data_Connect[i]['No'] = data[cnt++];
			data_Connect[i]['Status'] = transfer_Status(data[cnt++]);
			data_Connect[i]['CurQty'] = data[cnt++];
			data_Connect[i]['SetQty'] = data[cnt++];
			data_Connect[i]['CurMiss'] = data[cnt++];
			data_Connect[i]['SetMiss'] = data[cnt++];
			data_Connect[i]['Speed'] = data[cnt++];	
		}		
	}
	
	cnt = 1;
	for(var i=0; i<9; i++)
	{
		data_0X[i]['No'] = data[cnt++];
		data_0X[i]['Status'] = transfer_Status(data[cnt++]);
		data_0X[i]['CurQty'] = data[cnt++];
		data_0X[i]['SetQty'] = data[cnt++];
		data_0X[i]['CurMiss'] = data[cnt++];
		data_0X[i]['SetMiss'] = data[cnt++];
		data_0X[i]['Speed'] = data[cnt++];
	}
	for(var i=0; i<10; i++)
	{
		data_1X[i]['No'] = data[cnt++];
		data_1X[i]['Status'] = transfer_Status(data[cnt++]);
		data_1X[i]['CurQty'] = data[cnt++];
		data_1X[i]['SetQty'] = data[cnt++];
		data_1X[i]['CurMiss'] = data[cnt++];
		data_1X[i]['SetMiss'] = data[cnt++];
		data_1X[i]['Speed'] = data[cnt++];
	}
	for(var i=0; i<10; i++)
	{
		data_2X[i]['No'] = data[cnt++];
		data_2X[i]['Status'] = transfer_Status(data[cnt++]);
		data_2X[i]['CurQty'] = data[cnt++];
		data_2X[i]['SetQty'] = data[cnt++];
		data_2X[i]['CurMiss'] = data[cnt++];
		data_2X[i]['SetMiss'] = data[cnt++];
		data_2X[i]['Speed'] = data[cnt++];
	}
	for(var i=0; i<10; i++)
	{
		data_3X[i]['No'] = data[cnt++];
		data_3X[i]['Status'] = transfer_Status(data[cnt++]);
		data_3X[i]['CurQty'] = data[cnt++];
		data_3X[i]['SetQty'] = data[cnt++];
		data_3X[i]['CurMiss'] = data[cnt++];
		data_3X[i]['SetMiss'] = data[cnt++];
		data_3X[i]['Speed'] = data[cnt++];
	}
	for(var i=0; i<10; i++)
	{
		data_4X[i]['No'] = data[cnt++];
		data_4X[i]['Status'] = transfer_Status(data[cnt++]);
		data_4X[i]['CurQty'] = data[cnt++];
		data_4X[i]['SetQty'] = data[cnt++];
		data_4X[i]['CurMiss'] = data[cnt++];
		data_4X[i]['SetMiss'] = data[cnt++];
		data_4X[i]['Speed'] = data[cnt++];
	}
	for(var i=0; i<10; i++)
	{
		data_5X[i]['No'] = data[cnt++];
		data_5X[i]['Status'] = transfer_Status(data[cnt++]);
		data_5X[i]['CurQty'] = data[cnt++];
		data_5X[i]['SetQty'] = data[cnt++];
		data_5X[i]['CurMiss'] = data[cnt++];
		data_5X[i]['SetMiss'] = data[cnt++];
		data_5X[i]['Speed'] = data[cnt++];
	}
	for(var i=0; i<10; i++)
	{
		data_6X[i]['No'] = data[cnt++];
		data_6X[i]['Status'] = transfer_Status(data[cnt++]);
		data_6X[i]['CurQty'] = data[cnt++];
		data_6X[i]['SetQty'] = data[cnt++];
		data_6X[i]['CurMiss'] = data[cnt++];
		data_6X[i]['SetMiss'] = data[cnt++];
		data_6X[i]['Speed'] = data[cnt++];
	}
	for(var i=0; i<10; i++)
	{
		data_7X[i]['No'] = data[cnt++];
		data_7X[i]['Status'] = transfer_Status(data[cnt++]);
		data_7X[i]['CurQty'] = data[cnt++];
		data_7X[i]['SetQty'] = data[cnt++];
		data_7X[i]['CurMiss'] = data[cnt++];
		data_7X[i]['SetMiss'] = data[cnt++];
		data_7X[i]['Speed'] = data[cnt++];
	}
	for(var i=0; i<10; i++)
	{
		data_8X[i]['No'] = data[cnt++];
		data_8X[i]['Status'] = transfer_Status(data[cnt++]);
		data_8X[i]['CurQty'] = data[cnt++];
		data_8X[i]['SetQty'] = data[cnt++];
		data_8X[i]['CurMiss'] = data[cnt++];
		data_8X[i]['SetMiss'] = data[cnt++];
		data_8X[i]['Speed'] = data[cnt++];
	}
	for(var i=0; i<10; i++)
	{
		data_9X[i]['No'] = data[cnt++];
		data_9X[i]['Status'] = transfer_Status(data[cnt++]);
		data_9X[i]['CurQty'] = data[cnt++];
		data_9X[i]['SetQty'] = data[cnt++];
		data_9X[i]['CurMiss'] = data[cnt++];
		data_9X[i]['SetMiss'] = data[cnt++];
		data_9X[i]['Speed'] = data[cnt++];
	}
}

function transfer_Status(temp)	//狀態的字串 英文轉中文
{
	if(temp == "Producing")
		return "　　生產中";
	else if(temp == "Lock")
		return "　　鎖機中";
	else if(temp == "Stop")
		return "　　停機中";
	else if(temp == "PowerOff")
		return "　　關機中";
	else if(temp == "ServerError")
		return "　伺服錯誤";
	else if(temp == "AchieveQty")
		return "達到生產量";
	else if(temp == "Disconnect")
		return "#未連接";
}

function myRefresh()	//重新刷新頁面
{
	window.location.reload();
}
/*
function check_Update()
{
	//讀取txt檔內容
	var text, tempData;
	var client = new XMLHttpRequest();
	client.open('GET', "./MachineData.txt");
	client.onreadystatechange = function() {
		text = client.responseText;
		tempData = text.split("\r\n");
	}	
	client.send();
	debug(text);
	//if(tempData[0] == data[0])
	//{ 
		// do nothing 
	//}
	//else
	//	myRefresh();	//若發現時間不同，則刷新頁面
}
*/
setTimeout(dispData,1000);	//由於讀取txt檔需要時間，所以延遲後再創建table

setTimeout(myRefresh,300000);	//五分鐘自動刷新頁面

//window.addEventListener("load", createTable(data_All), false);
//createTable(data_All);


function debug(temp)
{
	getTime.innerHTML = temp;
}
