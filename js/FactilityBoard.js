<!DOCTYPE html>
<html lang="en" >
<!--  <meta http-equiv="refresh" content="5" /> -->
<meta http-equiv="Pragma" content="no-cache">	<!--  每次進網頁都是全新的資料，不是Cache裡的 -->

<head>
  <meta charset="UTF-8">
  <title>整廠轉接板</title>
	<link rel = "stylesheet" type = "text/css" href = "css/style.css">
</head>

<body>
  <button id = "btn_refrech" class = "refresh">刷新</button>
  <p>整廠設備資料收集系統</p> 
  <div align="center">
  <button id = "btn_all" class="raise firstLine">全部顯示</button>
  <button id = "btn_connected" class="raise firstLine">顯示連接中</button>
  </div>
  <div align="center">
  <button id = "btn_0X" class="raise">01 <B>~</B> 09</button>
  <button id = "btn_1X" class="raise">10 <B>~</B> 19</button>
  <button id = "btn_2X" class="raise">20 <B>~</B> 29</button>
  <button id = "btn_3X" class="raise">30 <B>~</B> 39</button>
  <button id = "btn_4X" class="raise">40 <B>~</B> 49</button>
  </div>
  <div align="center">
  <button id = "btn_5X" class="raise">50 <B>~</B> 59</button>
  <button id = "btn_6X" class="raise">60 <B>~</B> 69</button>
  <button id = "btn_7X" class="raise">70 <B>~</B> 79</button>
  <button id = "btn_8X" class="raise">80 <B>~</B> 89</button>
  <button id = "btn_9X" class="raise">90 <B>~</B> 99</button>
  </div>
  <p id="updateTime" class="updateTime">更新時間:</p>
<table>
  <thead>
    <tr >
      <th class='prop__name' data-prop-name='No' >編號</th>
	  <th class='prop__name' data-prop-name='Status' >狀態</th>
      <th class='prop__name' data-prop-name='CurQty' >目前生產量</th>
      <th class='prop__name' data-prop-name='SetQty' >設定生產量</th>
	  <th class='prop__name' data-prop-name='CurMiss' >目前失誤量</th>
	  <th class='prop__name' data-prop-name='SetMiss' >設定失誤量</th>
	  <th class='prop__name' data-prop-name='Speed' >產速</th>
    </tr>
	
  </thead>
  <tbody></tbody>
</table>

<a style="font-size:2.3vw; color:skyblue; position:absolute; right: 25%; font-family:fantasy;" href="#top"><em>Top</em></a>

<script type="text/javascript" src="js/jquery-3.3.1.js"></script>	
<script src="js/FactilityBoard.js"></script>

</body>

</html>
