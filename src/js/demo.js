function Whell(elWra, options) {
	if (typeof arguments[0] === "undefined") {
		console.log("whell实例中尚未绑定元素");
		return false;
	}

	var that = this; //保存this

	that.option = {
		autoWhell: true, //自动轮播
		isShowPoint: true, //显示子弹导航（direction为p是才显示pointArr的相应信息，否则不显示）
		isShwoBtn: true, //显示切换按钮
		pointArr: [], //子弹导航的内容（可以使用html）
		direction: "p", //轮播方向，l为纵向，p为横向
	}

	//将options和that.option都存在的属性进行合并
	if (typeof arguments[1] !== "undefined") {
		for (k in options) {
			if (options.hasOwnProperty(k)) {
				that.option[k] = options[k];
			}
		}
	}

	//判断轮播方向
	var direction;
	(that.option.direction === "l") ? direction = true: direction = false;

	//获取轮播图的容器宽高以及轮播的图片个数
	that.$wra = $(elWra);

	if (direction) {
		that.$wra.css({
			position: "fixed",
			top: 0,
			left: 0,
			width: "100vw",
			height: "100vh"
		})
	}

	that.$wraWid = that.$wra.width();
	that.$wraHei = that.$wra.height();
	that.$item = that.$wra.find('.whell_item');
	that.$box = that.$wra.find(".whell_box");

	// 设置图片容器的宽高
	that.$box.width(that.$wraWid * that.$item.length);
	that.$box.height(that.$wraHei);

	that.$item.width(that.$wraWid);
	that.$item.height(that.$wraHei);
	if (direction) {
		that.$item.css({
			float: "none"
		})
	}
	that.$item.find("img").height("100%");

	//标志当前页系数和图片个数
	that.indexPage = 0;
	that.imgLen = that.$item.length;

	//切换按钮
	that.btns = that.$wra.find(".btn");

	//导航point
	that.point = that.$wra.find(".point");

	//利用图片个数循环出导航
	$.each(that.$item, function(index) {
		var text = (typeof that.option.pointArr[index] !== "undefined" && direction) ? that.option.pointArr[index] : "";
		var $li = $("<li data-index='" + index + "'>" + text + "</li>");

		if (index === 0) {
			$li.addClass("point_active");
		}

		that.point.append($li);
	})

	//纵向轮播样式
	if (direction) {
		that.point.addClass("p_point");
		var pointLiHei = that.point.find("li").eq(0).height();
		that.point.height(pointLiHei * that.$item.length); //设置子弹导航的高度
	}
	//判断是否显示子弹导航
	if (that.option.isShowPoint) that.point.show();

	//下一页
	that.nextPage = function() {
		that.indexPage++;

		if (that.indexPage > 0) { //超出，则回到第一张
			that.indexPage = -(that.imgLen - 1);
		}

		var translate = direction ? "translateY(" + that.indexPage * that.$wraHei + "px)" : "translateX(" + that.indexPage *
			that.$wraWid + "px)";
		that.$box.css(
			"transform", translate
		);

		that.point.find("li").removeClass("point_active").eq(Math.abs([that.indexPage])).addClass("point_active");

	}

	//上一页
	that.prevPage = function() {
		that.indexPage--;

		if (that.indexPage < -(that.imgLen - 1)) { //超出,则回到最后一张
			that.indexPage = 0;
		}

		var translate = direction ? "translateY(" + that.indexPage * that.$wraHei + "px)" : "translateX(" + that.indexPage *
			that.$wraWid + "px)";
		that.$box.css(
			"transform", translate
		);

		that.point.find("li").removeClass("point_active").eq(Math.abs([that.indexPage])).addClass("point_active");
	}

	//判断是否使用自动轮播
	if (that.option['autoWhell']) {
		//启动自动轮播
		that.startUpTime = setInterval(function() {
			that.prevPage();
		}, 3000);
	}

	//鼠标移入停止自动轮播
	that.$wra.on("mouseenter", function() {
		if (that.option.isShwoBtn && !direction) that.btns.show(); //纵向不显示切换按钮

		if (that.option['autoWhell']) clearInterval(that.startUpTime);
	})

	//鼠标移除后播放
	that.$wra.on("mouseleave", function() {
		if (that.option.isShwoBtn && !direction) that.btns.hide(); //纵向不显示切换按钮

		//启动自动轮播
		if (that.option['autoWhell']) {
			that.startUpTime = setInterval(function() {
				that.nextPage();
			}, 3000);
		}
	})

	//点击切换上一页
	that.$wra.find(".prev").on("click", function() {
		that.prevPage();
	})

	//点击切换下一页
	that.$wra.find(".next").on("click", function() {
		that.nextPage();
	})

	/**键盘事件
	 * 37 左、38 上、 39 右 、 40下
	 */
	//键盘切换上一页
	$(document).on("keydown", function(e) {
		if (that.option['autoWhell']) clearInterval(that.startUpTime);//关掉自动轮播
		
		if(e.keyCode === 38 && direction){//纵向轮播，则使用上下切换
			that.prevPage();
		}else if(e.keyCode === 40 && direction){//纵向轮播，则使用上下切换
			that.nextPage();
		}
		
		//启动自动轮播
		if (that.option['autoWhell']) {
			that.startUpTime = setInterval(function() {
				that.nextPage();
			}, 3000);
		}
	})

	//点击子弹导航
	that.point.on("click", "li", function() {
		var
			_this = $(this),
			index = parseInt(_this.data().index) * -1;

		that.indexPage = index;

		var translate = direction ? "translateY(" + that.indexPage * that.$wraHei + "px)" : "translateX(" + that.indexPage *
			that.$wraWid + "px)";

		that.$box.css(
			"transform", translate
		);

		_this.siblings().removeClass("point_active");
		_this.addClass("point_active");
	})
}
