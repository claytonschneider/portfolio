const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const nodemon = require('gulp-nodemon');
const inline = require('gulp-inline');
const cleanCSS = require('gulp-clean-css');
const cssAutoPrefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

const OUTPUT_DIR = './';
const paths = {
  css: ['src/**/*.css'],
  html: ['src/index.html'],
  assets: ['src/**/*.jpg']
};

// gulp.task('clean', () => {
//   return Promise.all([
//     del(OUTPUT_DIR),
//     del(OUTPUT_DIR)
//   ]);
// });

gulp.task('assets', () => {
  return gulp.src(paths.assets)
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest(OUTPUT_DIR))
});

gulp.task('html', () => {
  return gulp.src(paths.html)
    .pipe(inline({
      base: 'src/',
      css: [cssAutoPrefixer, cleanCSS],
      disabledTypes: ['img']
    }))
    .pipe(htmlmin())
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('watch', () => {
  if (process.env.NODE_ENV === 'prod') return;

  gulp.watch(paths.css, ['html']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('build', [
  // 'clean',
  'assets',
  'html',
  'watch'
]);


gulp.task('default', ['build']);
