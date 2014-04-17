var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rev = require('gulp-rev'),
clean = require('gulp-clean'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
lr = require('tiny-lr'),
connect = require('gulp-connect'),
sass = require('gulp-sass'),
usemin = require('gulp-usemin'),
server = lr();

var paths = {
    html: 'app/**/*.html',
    fonts: 'app/fonts/**.*',
    bower: 'app/bower_components/**/*',
    scripts: 'app/scripts/**/*',
    styles: 'app/styles/**/*.scss',
    images: 'app/images/**/*',
    tmpFolder : '.tmp',
    distFolder : 'dist'
};


gulp.task('connect', connect.server({
    root: __dirname + '/.tmp/',
    port: 3501,
    livereload: true,
    open: {
        browser: 'Google Chrome'
    }
}));

gulp.task('watch', function () {
    gulp.watch(paths.html, ['html_tmp']);
    gulp.watch(paths.scripts, ['scripts_tmp']);
    gulp.watch(paths.fonts, ['fonts_tmp']);
    gulp.watch(paths.bower, ['bower_tmp']);
    gulp.watch(paths.styles, ['styles_tmp']);
    gulp.watch(paths.images, ['images_tmp']);
});

// Default task = server
gulp.task('default', ['watch', 'scripts_tmp', 'bower_tmp', 'styles_tmp', 'html_tmp', 'images_tmp', 'fonts_tmp', 'connect'], function() {
});


gulp.task('usemin', function() {
    gulp.src('./*.html')
    .pipe(usemin({
        cssmin: false,
        htmlmin: false,
        jsmin: false
    }))
    .pipe(gulp.dest('build/'));
});


// Styles
gulp.task('styles_tmp', function() {
    return gulp.src(paths.styles)
    .pipe(sass({ style: 'expanded', errLogToConsole: true }))
    .pipe(gulp.dest(paths.tmpFolder + '/styles'))
    .pipe(connect.reload());
});

// Styles
gulp.task('styles', function() {
    return gulp.src(paths.styles)
    .pipe(sass({ style: 'expanded', errLogToConsole: true }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('main.scss'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(minifycss())
    .pipe(rev())
    .pipe(gulp.dest(paths.distFolder + '/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// HTML
gulp.task('html_tmp', function() {
    return gulp.src('app/**/*.html')
    .pipe(gulp.dest('.tmp'))
    .pipe(connect.reload());
});

gulp.task('fonts_tmp', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(connect.reload());
});


// Scripts
gulp.task('scripts_tmp', function() {
    return gulp.src('app/scripts/**/*')
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(connect.reload());
});

// Scripts
gulp.task('bower_tmp', function() {
    return gulp.src(paths.bower)
    .pipe(gulp.dest('.tmp/bower_components'))
    .pipe(connect.reload());
});


gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(livereload(server))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images_tmp', function() {
    return gulp.src('app/images/**/*')
    .pipe(gulp.dest('.tmp/images'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Reload
gulp.task('reload', function () {
    connect.reload();
});

// Html
gulp.task('html_tmp', function () {
    gulp.src('./app/*.html')
    .pipe(gulp.dest('.tmp/'))
    .pipe(connect.reload());
});
gulp.task('html', function () {
    gulp.src('./app/*.html')
    .pipe(connect.reload());
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});


// The build task
gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});


