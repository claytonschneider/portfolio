const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const nodemon = require('gulp-nodemon');
const inline = require('gulp-inline');
const cleanCSS = require('gulp-clean-css');
const cssAutoPrefixer = require('gulp-autoprefixer');

const paths = {
  css: ['src/**/*.css'],
  html: ['src/index.html']
};

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('html', () => {
  return gulp.src(paths.html)
    .pipe(inline({
      base: 'src/',
      css: [cssAutoPrefixer, cleanCSS]
    }))
    .pipe(htmlmin())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  if (process.env.NODE_ENV === 'prod') return;

  gulp.watch(paths.css, ['html']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('serve', () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: { NODE_ENV: process.env.NODE_ENV, PORT: process.env.PORT }
  });
});

gulp.task('build', [
  'clean',
  'html',
  'watch'
]);


gulp.task('default', ['build', 'serve']);
