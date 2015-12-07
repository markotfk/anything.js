//Basic build process. Nothing too fancy

const gulp = require('gulp-help')(require('gulp')),
      concat = require('gulp-concat'),
      prettify = require('gulp-jsbeautifier'),
      minify = require('gulp-minify'),
      jsdoc = require("gulp-jsdoc"),
      pkg = require('./package.json'),
      template = require('gulp-template');

const opts = {
    showPrivate: true,
    monospaceLinks: true,
    cleverLinks: true,
    outputSourceFiles: true
};

// TODO: Make custom jsdoc template
const tpl = {
    path: 'ink-docstrap',
    systemName: pkg.name,
    footer: 'Generated with gulp',
    copyright: 'Copyright WebItUp 2014',
    navType: 'vertical',
    theme: 'spacelab',
    linenums: true,
    collapseSymbols: false,
    inverseNav: false
};

gulp.task('build', () => {
  return gulp.src(['./src/constants/start.js','./src/*.js','./src/constants/end.js'])
    .pipe(concat('anything.js'))
    .pipe(prettify())
    .pipe(minify({
          ext:{
              src: '.js',
              min: '.min.js'
          }
      }))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('jsdoc', ['build'], () => {
    gulp.src(['README.md', './dist/anything.js'])
        .pipe(template({pkg: pkg}))
        .pipe(jsdoc.parser({
            name: pkg.name,
            description: pkg.description,
            version: pkg.version,
            licenses: [pkg.license]
        }))
        .pipe(jsdoc.generator('./docs', tpl, opts));
    });

gulp.task('fuck', () => {
    const jsfuck = require('gulp-jsfuck');

    return gulp.src(['./src/constants/start.js','./src/*.js','./src/constants/end.js'])
        .pipe(concat('anything.fucked.js'))
        .pipe(jsfuck())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build']);
