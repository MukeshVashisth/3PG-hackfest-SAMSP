var gulp = require('gulp'),
    sass = require('gulp-sass');
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    postCss = require('gulp-postcss'),
    imagemin = require('gulp-imagemin'),
    cleanCss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

// PATHS OBJECT
var paths = {
  scss: {
    all: 'src/scss/**/*.scss',
    main: 'src/scss/main.scss'
  },
  html: 'static/**/*.html',
  images: 'src/images/**/*',
  fonts: 'src/fonts/*',
  js: 'static/js/*.js'
}

// CSS LINTING
gulp.task('lint-css', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');

  return gulp
    .src(paths.scss.all)
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

// CSS TASK
gulp.task('styles', ['lint-css'], function() {
  var processors = [
    require('autoprefixer')
  ];

  return gulp.src(paths.scss.main)
    .pipe(sass().on('error', function(err) {
      gutil.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(postCss(processors))
    .pipe(gulp.dest('static/dist/css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('static/dist/css'))
    .pipe(browserSync.stream());
});

// HTML TASK
gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(browserSync.stream());
});

// JS TASK
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// FONTS TASK
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.stream());
});

// IMAGES TASK
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
});

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch(paths.scss.all, ['styles']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.images, ['images', 'clean']);
});

// BROWSER SYNC TASK
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./static"
    },
    port: 8080
  });
});

// CLEAN TASK
gulp.task('clean', function () {
  return gulp.src('static/dist', {read: false})
    .pipe(clean());
});

// DEFAULT TASK
gulp.task('default',['styles', 'html', 'js', 'images', 'fonts', 'browser-sync', 'watch']);