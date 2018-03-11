var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssAutoprefixer = require('autoprefixer');
var cssVars = require('postcss-simple-vars');
var cssNested = require('postcss-nested');
var cssImport = require('postcss-import');

gulp.task('css', function() {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, cssVars, cssNested, cssAutoprefixer]))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});