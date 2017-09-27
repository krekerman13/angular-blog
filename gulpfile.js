const gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    babel = require('gulp-babel'),
    rimraf = require('rimraf');


let paths = {
    src: {
        scss: {
            vendor: 'public/styles/vendors/vendors.scss',
            my: 'public/styles/scss/main.scss',
        },
        js: {
            vendor: 'public/js/vendors/*.js',
            my: ['public/js/app/**/*.js', '!public/js/app/**/*.spec.js'],
        },
        html: 'public/js/app/**/*.html',
        img: 'public/images/**/*.*'
    },

    build: {
        css: 'public/build/css',
        js: 'public/build/js',
        html: 'public/build/views',
        img: 'public/build/img/'
    },

    watch: {
        js: 'public/js/app/**/*.js',
        style: 'public/styles/**/*.scss',
        html: 'public/js/app/**/*.html',
    },

    clean: 'public/build/'
};

gulp.task('js:build-vendor', function () {
    gulp.src(paths.src.js.vendor)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.js))
});

gulp.task('js:build-app', function () {
    gulp.src(paths.src.js.my)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(ngAnnotate())
        .pipe(uglify({mangle: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.js))
});

gulp.task('style:build', function () {
    gulp.src(paths.src.scss.my)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.css))
});

gulp.task('style:build-vendors', function () {
    gulp.src(paths.src.scss.vendor)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(concat('vendors.min.css'))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.css))
});

gulp.task('image:build', function () {
    gulp.src(paths.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(paths.build.img))
});

gulp.task('html:templates', () => {
    gulp.src(paths.src.html)
        .pipe(gulp.dest(paths.build.html))
})

gulp.task('watch', function(){
    watch([paths.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([paths.watch.js], function(event, cb) {
        gulp.start('js:build-app');
    });
    watch([paths.watch.html], function (event,cb) {
        gulp.start('html:templates');
    })
});


gulp.task('build', [
    'js:build-app',
    'js:build-vendor',
    'html:templates',
    'style:build',
    'style:build-vendors',
    'image:build'
]);

gulp.task('clean', function (cb) {
    rimraf(paths.clean, cb);
});

gulp.task('default', ['build', 'watch']);







