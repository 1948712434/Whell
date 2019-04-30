function Whell(elWra, options) {
	if (typeof arguments[0] === "undefined") {
		console.log("whell实例中尚未绑定元素");
		return false;
	}

	var that = this; //保存this

	that.option = {
		autoWhell: true, //自动播放
		isShowPoint: true, //显示滚动栏
		isShwoBtn: true, //显示切换按钮
	}

	//将options和that.option都存在的属性进行合并
	if (typeof arguments[1] !== "undefined") {
		for (k in options) {
			if (options.hasOwnProperty(k)) {
				that.option[k] = options[k];
			}
		}
	}

	//获取轮播图的容器宽高以及轮播的图片个数
	that.$wra = $(elWra);
	that.$wraWid = that.$wra.width();
	that.$wraHei = that.$wra.height();
	that.$item = that.$wra.find('.whell_item');
	that.$box = that.$wra.find(".whell_box");

	// 设置图片容器的宽高
	that.$box.width(that.$wraWid * that.$item.length);
	that.$box.height(that.$wraHei);

	that.$item.width(that.$wraWid);
	that.$item.width(that.$wraHeight);

	that.$item.find("img").width("100%");

	//标志当前页系数和图片个数
	that.indexPage = 0;
	that.imgLen = that.$item.length;

	//切换按钮
	that.btns = that.$wra.find(".btn");

	//导航point
	that.point = that.$wra.find(".point");
	//利用图片个数循环出导航
	$.each(that.$item, function(index) {
		var $li = $("<li data-index='" + index + "'></li>");

		if (index === 0) {
			$li.addClass("point_active");
		}

		that.point.append($li);
	})

	//判断是否显示子弹导航
	if (that.option.isShowPoint) that.point.show();

	//下一页
	that.nextPage = function() {
		that.indexPage++;

		if (that.indexPage > 0) { //超出，则回到第一张
			that.indexPage = -(that.imgLen - 1);
		}

		that.$box.css(
			"transform", "translateX(" + that.indexPage * that.$wraWid + "px)"
		);

		that.point.find("li").removeClass("point_active").eq([that.indexPage]).addClass("point_active");
	}

	//上一页
	that.prevPage = function() {
		that.indexPage--;

		if (that.indexPage < -(that.imgLen - 1)) { //超出,则回到最后一张
			that.indexPage = 0;
		}

		that.$box.css(
			"transform", "translateX(" + that.indexPage * that.$wraWid + "px)"
		);

		that.point.find("li").removeClass("point_active").eq([that.indexPage]).addClass("point_active");
	}

	//判断是否使用自动轮播
	if (that.option['autoWhell']) {
		//启动自动轮播
		that.startUpTime = setInterval(function() {
			that.nextPage();
		}, 3000);
	}

	//鼠标移入停止自动轮播
	that.$wra.on("mouseenter", function() {
		if (that.option.isShwoBtn) that.btns.show();

		if (that.option['autoWhell']) clearInterval(that.startUpTime);
	})

	//鼠标移除后播放
	that.$wra.on("mouseleave", function() {
		if (that.option.isShwoBtn) that.btns.hide();

		//启动自动轮播
		if (that.option['autoWhell']){
			that.startUpTime = setInterval(function() {
				that.nextPage();
			}, 3000);
		}
	})

	//切换上一页
	that.$wra.find(".prev").on("click", function() {
		that.prevPage();
	})

	//切换下一页
	that.$wra.find(".next").on("click", function() {
		that.nextPage();
	})

	//点击子弹导航
	that.point.on("click", "li", function() {
		var _this = $(this);
		index = parseInt(_this.data().index) * -1;

		that.indexPage = index;
		that.$box.css(
			"transform", "translateX(" + index * that.$wraWid + "px)"
		);

		_this.siblings().removeClass("point_active");
		_this.addClass("point_active");
	})
}
