'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');


gulp.task('default', function() {
  gulp.run('styles', 'scripts', 'images');

  gulp.watch('./sass/**/*.scss', function(event) {
        gulp.run('styles');
  })

  gulp.watch('./js/source/script.js', function(event) {
        gulp.run('scripts');
  })

  gulp.watch('./img/src/**', function(event) {
        gulp.run('images');
  })
});

gulp.task('images', () =>
    gulp.src('img/src/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'))
);

gulp.task('styles', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
  return gulp.src(['./js/source/jquery-1.9.1.min.js', './js/source/jquery.jcarousel.min.js', './js/source/imagesloaded.pkgd.min.js', './js/source/masonry.pkgd.min.js', './js/source/tmpl.js', './js/source/script.js'])
    .pipe(concat('script.js'))
    .pipe(minify({
        ext:{
            src:'_.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./js/'));


});

