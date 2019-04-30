const
	gulp = require("gulp"),
	less = require("gulp-less"),
	uglify = require("gulp-uglify"),
	cleanCss = require("gulp-clean-css"),
	livereload = require("gulp-livereload"),
	sourcemaps = require("gulp-sourcemaps");

//less编译css任务
gulp.task("less", () => gulp.src("src/less/*.less")
	.pipe(less())
	.pipe(gulp.dest('dist/css'))
	.pipe(livereload()) //自动刷新浏览器
)

//压缩js
gulp.task("uglifyJs", () => gulp.src("src/js/*.js")
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/js"))
	.pipe(livereload())
)

//压缩css
gulp.task("cleanCss", () => gulp.src("dist/css/*.css")
	.pipe(sourcemaps.init())
	.pipe(cleanCss())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
	.pipe(livereload())
)


//检测任务
gulp.task("watch", () => {
	livereload.listen();
	gulp.watch("src/less/*.less", gulp.series(["less"]));
	gulp.watch("src/js/*.js", gulp.series(["uglifyJs"]));
	// gulp.watch("src/css/*.css", gulp.series(["cleanCss"]));
})

//默认任务
gulp.task("default", gulp.series(["less", "watch"]))
