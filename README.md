# Whell
轮播图

### 快速使用 
1、html布局
```
 <div id="whellDemo" class="whell_wra">
    <div class="whell_box">
      <div class="whell_item"><img src="" /></div>
      <div class="whell_item"><img src="" /></div>
      <div class="whell_item"><img src="" /></div>
    </div>

    <ul class="point"></ul>

    <p class="btn">
      <span class="prev"><</span>
      <span class="next">></span>
    </p>
</div>

```

2、导入css文件
```
<link rel="stylesheet" href="dist/css/demo.css" /> 
```

3、导入js文件

```
<script src="dist/js/jquery.min.js"></script>
<script src="dist/js/demo.js"></script>

```

4、初始化

```
var whell = new Whell("#whellDemo", {
    autoWhell: true,//自动轮播
				isShwoBtn: true,//显示切换按钮
				pointArr:[1,2,3],//子弹导航的内容（可以使用html）
				isShowPoint: true,//显示子弹导航（direction为p是才显示pointArr的相应信息，否则不显示）
				direction:"l",//轮播方向，l为竖向，p为横向
});

```


# API
### 下一页
### nextPage()

### 上一页
### prevPage()
