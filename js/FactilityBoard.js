var table = document.querySelector('table'), 
    table_meta_container = table.querySelector('thead'), 
    //table_data_container = table.querySelector('tbody'),
    data = [
  { 'No': '1', 'Status': '　　生產中', 'CurQty': '00001234', 'SetQty': '99999998', 'CurMiss': '00000005', 'SetMiss': '00001234', 'Speed': ' 5%' }, 
  { 'No': '2', 'Status': '　　停機中', 'CurQty': '00789456', 'SetQty': '99999997', 'CurMiss': '00000050', 'SetMiss': '00001234', 'Speed': '10%' }, 
  { 'No': '3', 'Status': '　　生產中', 'CurQty': '00100215', 'SetQty': '99999996', 'CurMiss': '00000500', 'SetMiss': '00001234', 'Speed': '15%' }, 
  { 'No': '4', 'Status': '　 #未連接', 'CurQty': '00000000', 'SetQty': '99999995', 'CurMiss': '00000601', 'SetMiss': '00001234', 'Speed': '20%' }, 
  { 'No': '5', 'Status': '達到生產量', 'CurQty': '08900245', 'SetQty': '99999999', 'CurMiss': '00000048', 'SetMiss': '00001234', 'Speed': '25%' },
  { 'No': '6', 'Status': '　　生產中', 'CurQty': '00000048', 'SetQty': '00000000', 'CurMiss': '00789456', 'SetMiss': '00000050', 'Speed': '87%' },
  { 'No': '7', 'Status': '達到生產量', 'CurQty': '08900245', 'SetQty': '99999123', 'CurMiss': '00000048', 'SetMiss': '00000050', 'Speed': '87%' }
], n = data.length;
var time = document.getElementById("updateTime");

var data1 = new Array(100);

var strFile = ".\\MachineData.txt";	// 檔案位置，且「\」要用「\\」


var createTable = function(src) {
  var frag = document.createDocumentFragment(), 
      curr_item, curr_p;
  
  for(var i = 0; i < n; i++) {
    curr_item = document.createElement('tr');
	curr_item.setAttribute("id", "tableTr");
    curr_item.classList.add(((i%2 === 0)?'odd':'even'));
    data[i].el = curr_item;
    
    for(var p in data[i]) {
      if(p !== 'el') {
        curr_p = document.createElement('td');
        curr_p.classList.add('prop__value');
        curr_p.dataset.propName = p;
        curr_p.textContent = data[i][p];
        curr_item.appendChild(curr_p)
      }
    }
    
    frag.appendChild(curr_item);
  }
  
  table.querySelector('tbody').appendChild(frag);
};

function deleteTable(length)
{
	var element1;
	for(var i = 0; i < length; i++) {
		element1 = document.getElementById("tableTr");
		element1.remove();
	}
}

var sortTable = function(entries, type, dir) {  
  entries.sort(function(a, b) { 
    if(a[type] < b[type]) return dir;
    if(a[type] > b[type]) return -dir;
    return 0;
  });
  
  table.dataset.sortBy = type;
  
  for(var i = 0; i < n; i++) {
    entries[i].el.style.order = i + 1;
    
    if((i%2 === 0 && entries[i].el.classList.contains('even')) || 
       (i%2 !== 0 && entries[i].el.classList.contains('odd'))) {
      entries[i].el.classList.toggle('odd');
      entries[i].el.classList.toggle('even');
    }
  }
};

window.addEventListener("load", createTable(data), false);

table_meta_container.addEventListener('click', function(e) {
  var t = e.target;
  
  if(t.classList.contains('prop__name')) {
    if(!t.dataset.dir) { t.dataset.dir = 1; }
    else { t.dataset.dir *= -1; }
    
    sortTable(data, t.dataset.propName, t.dataset.dir);
  }
}, false);

var button1 = document.getElementById("btn_all");
button1.addEventListener("click", function(e) {
	//data[3]['Status'] = '1231231';
	//ptest.innerHTML = "Btn1觸發";
	//var element1 = document.getElementById("tableTr");
	//element1.remove();
	deleteTable(n);
	data.clear();
}, false);

var button2 = document.getElementById("btn_connected");
button2.addEventListener("click", function(e) {
	createTable(data);
}, false);

var button3 = document.getElementById("btn_0X");
button3.addEventListener("click", function(e) {
	data[0]['test'] = "12312313";
	data[1]['test2'] = "999999";
	time.innerHTML = test99;
}, false);

var button4 = document.getElementById("btn_1X");
button4.addEventListener("click", function(e) {
	createTable(data);
}, false);

var button5 = document.getElementById("btn_2X");
button5.addEventListener("click", function(e) {
	createTable(data);
}, false);

var button6 = document.getElementById("btn_3X");
button6.addEventListener("click", function(e) {
	createTable(data);
}, false);

var button7 = document.getElementById("btn_4X");
button7.addEventListener("click", function(e) {
	createTable(data);
}, false);

var button8 = document.getElementById("btn_5X");
button8.addEventListener("click", function(e) {
	createTable(data);
}, false);

var button9 = document.getElementById("btn_6X");
button9.addEventListener("click", function(e) {
	createTable(data);
}, false);

var button10 = document.getElementById("btn_7X");
button10.addEventListener("click", function(e) {
	createTable(data);
}, false);

var button11 = document.getElementById("btn_8X");
button11.addEventListener("click", function(e) {
	createTable(data);
}, false);

var button12 = document.getElementById("btn_9X");
button12.addEventListener("click", function(e) {

}, false);
test();
function test()
{
	//time.innerHTML = "123";
	//var fso = new ActiveXObject('Scripting.FileSystemObject');
}


/*function test()
{
	var text;
	var client = new XMLHttpRequest();
	//client.open('GET', "./MachineData.txt");
	client.open('GET', "./test.txt");
	client.onreadystatechange = function() {
	  //alert(client.responseText);
		text = client.responseText;
		var data = text.split("\r\n");
		var datalist = new Array(data.length);
		//var data = text.split(": ");
		for(var i=0; i<datalist.length; i++)
		{
			datalist[i] = data[i+1].split(": ");
		}
		time.innerHTML = "123";
	}	
	client.send();
}*/

