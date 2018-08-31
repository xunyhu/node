var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');
var htmlmin = require('gulp-htmlmin');

gulp.task('uglifyhtml', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('../html/*.html')
        .pipe(htmlmin(options))  
        .pipe(gulp.dest('../dist/html'));
});

gulp.task('uglifyjs', function() {
	gulp.src('../js/*.js')
	.pipe(babel({presets: [es2015]}))
	// .pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('../dist/js'))
});

gulp.task('uglifycss',function(){
	gulp.src('../css/mallGrade.2.css')
	.pipe(minifycss())
	.pipe(gulp.dest('../css/dist'))
});

gulp.task('ugfile', ['uglifyhtml', 'uglifyjs']);