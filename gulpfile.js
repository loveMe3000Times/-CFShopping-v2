const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      sass = require('gulp-sass'),
      cleanCss = require('gulp-clean-css'),
      connect = require('gulp-connect')

// 制定了一个default任务，执行console语句
// gulp.task('default', () => {
//   console.log('default')
// })


// 制定html任务：把html压缩之后放到dist目录里
gulp.task('html', () => {
  gulp.src('src/**/*.html')
    .pipe(htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

// 制定js任务：ES6转ES5，再压缩js
gulp.task('js', () => {
  gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
})

// css任务：先把scss编译成css，压缩css
gulp.task('css', () => {
  gulp.src('src/css/**/*.scss')
    .pipe(sass())
    // .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})

// img任务：移动图片
gulp.task('img', () => {
  gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
})

// libs任务：移动文件
gulp.task('libs', () => {
  gulp.src('src/libs/**/*')
    .pipe(gulp.dest('dist/libs'))
})

// server任务：开启一个本地服务器
gulp.task('server', () => {
  connect.server({
    root: 'dist',
    port: 2333,
    livereload: true
  })
})

// watch任务：监听文件的修改，执行对应的任务
gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['html'])
  gulp.watch('src/js/**/*.js', ['js'])
  gulp.watch('src/css/**/*.scss', ['css'])
})

// 把所有任务放进default里，默认全部执行一次
gulp.task('default', ['html', 'js', 'css', 'img', 'libs', 'server', 'watch'])
