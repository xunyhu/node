var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');
var htmlmin = require('gulp-htmlmin');
var smushit = require('gulp-smushit');

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
	gulp.src('../css/*.css')
	.pipe(minifycss())
	.pipe(gulp.dest('../dist/css'))
});

gulp.task('uglifyimg', function(){ 
    gulp.src('../img/912/*')
        .pipe(smushit())
        .pipe(gulp.dest('../dist/img/912'))
});

gulp.task('ugfile', ['uglifyhtml', 'uglifyjs', 'uglifycss']);