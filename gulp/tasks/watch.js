var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: 'app'
        }
    });
    
    watch('./app/*.html', function() {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });

});

gulp.task('cssInject', ['css'], function() {
    gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});