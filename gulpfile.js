'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  concat = require("gulp-concat"),
  minify = require("gulp-minify"),
    paths = {
        styles: {
            src: "./_assets/**/*.scss",
            dest: "./themes/villarly"
        },
        scripts: {
            src: "./_assets/**/*.js",
            dest: "./themes/villarly/js"
        }
    };

function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
    );
}

function scripts() {
    return(
        gulp
            .src(
                [
                    //"./_assets/js/abstract/aos.js",
                    //"./_assets/js/abstract/wpml/legacy-dropdown.js",
                    //"./_assets/js/abstract/wpml/legacy-dropdown-click.js",
                    "./_assets/js/jquery.cookie.js",
                    "./_assets/js/abstract/lightbox.min.js",
                    "./_assets/js/abstract/owl.carousel.min.js",
                    "./_assets/js/navigation.js",
                    "./_assets/js/sticky-menu.js",
                    "./_assets/js/skip-link-focus-fix.js",
                    "./_assets/js/main.js",
                ]
            )
           .pipe(sourcemaps.init())
            .pipe(concat('scripts.js'))
            // .pipe(stripDebug())
            .pipe(minify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.scripts.dest))
    );
}

function watch() {
    gulp.watch(paths.styles.src, style)
    gulp.watch(paths.scripts.src, scripts)
}

exports.style = style;
exports.scripts = scripts;
exports.watch = watch;