var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var less = require('gulp-less');
// var cleanCss = require('gulp-clean-css');
// var htmlmin = require('gulp-htmlmin');
// var livereload = require('gulp-livereload');
// var connect = require('gulp-connect');
var open = require('open');

// 注册合并压缩js
gulp.task('minifyjs', function() {
    return gulp.src('src/js/*.js') //操作的源文件
        .pipe($.concat('built.js')) //合并到临时文件
        .pipe(gulp.dest('dist/js')) //生成到目标文件夹
        .pipe($.rename({suffix: '.min'})) //重命名
        .pipe($.uglify())    //压缩
        .pipe(gulp.dest('dist/js'))
        .pipe($.livereload())
        .pipe($.connect.reload());
});

// 注册转换less的任务
gulp.task('lessTask', function () {
    return gulp.src('src/less/*.less')
        .pipe($.less())
        .pipe(gulp.dest('src/css'))
        .pipe($.livereload())
        .pipe($.connect.reload());
});

// 注册合并压缩css
gulp.task('cssTask', ['lessTask'], function () {
    return gulp.src('src/css/*.css')
        .pipe($.concat('built.css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe($.livereload())
        .pipe($.connect.reload());
});

// 注册压缩html，注意压缩文件所在目录与对应css和js文件的相对位置发生了变化，直接运行会报错，需要更改对应位置
gulp.task('htmlMinify', function() {
    return gulp.src('index.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe($.livereload())
        .pipe($.connect.reload());
});

// 注册监视任务（半自动）
gulp.task('watch', ['default'], function () {
    //开启监视
    $.livereload.listen();
    //监视指定的文件, 并指定对应的处理任务
    gulp.watch('src/js/*.js', ['minifyjs']);
    gulp.watch(['src/css/*.css','src/less/*.less'], ['cssTask']);
});

// 注册监视任务（全自动）
gulp.task('server', ['default'], function () {
    //配置服务器的选项
    $.connect.server({
        root : 'dist/',//监视的源目标文件路径
        livereload : true,//是否实时刷新
        port : 5000//开启端口号
    });

    // 自动开启链接
    open('http://localhost:5000');

    //监视指定的文件, 并指定对应的处理任务
    gulp.watch('src/js/*.js', ['minifyjs']);
    gulp.watch(['src/css/*.css','src/less/*.less'], ['cssTask']);
});

gulp.task('default', ['minifyjs', 'cssTask', 'htmlMinify']);