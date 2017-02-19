const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', [
    'watch'
]);

gulp.task('watch', () => {
    gulp.watch("static/css/*.css", ['autoprefix']);
});

gulp.task('autoprefix', () => {
    gulp.src("static/css/*.css")
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('static/build/css'))
});