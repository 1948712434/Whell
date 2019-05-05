# Whell
轮播图

### 快速使用 
1、html布局
<div id="whellDemo" class="whell_wra">
    <div class="whell_box">
      <div class="whell_item"><img src="src/img/li%20(1).jpg" /></div>
      <div class="whell_item"><img src="src/img/li%20(2).jpg" /></div>
      <div class="whell_item"><img src="src/img/li%20(3).jpg" /></div>
    </div>

    <ul class="point"></ul>

    <p class="btn">
      <span class="prev"><</span>
      <span class="next">></span>
    </p>
</div>

2、导入css文件
<link rel="stylesheet" href="dist/css/demo.css" />

3、导入js文件
<script src="dist/js/jquery.min.js"></script>
<script src="dist/js/demo.js"></script>

4、初始化
var whell = new Whell("#whellDemo", {
      autoWhell: true,//是否自动轮播
      isShwoBtn: true,//是否显示切换按钮
      isShowPoint: true//是否显示子弹导航
    });

# API
### 下一页
### nextPage()

### 上一页
### prevPage()
