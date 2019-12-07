const gulp = require("gulp");
const { src, dest, watch, parallel, series } = gulp;
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const concat = require("gulp-concat");

const { jsLibsOrder } = require("./configurations.js");

const paths = {
  sass: "./public/css/src/**/*.scss",
  js: "./public/js/*.js"
};

function style() {
  return src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./public/css"));
}

function concatJs() {
  let order = jsLibsOrder;
  if (!order || !order.length) {
    notify("JS order list not exists");
    return;
  }
  return src(order)
    .pipe(concat("libs.js"))
    .pipe(dest("./public/js/"));
}

function concatCss() {
  return src("./dev/libs/**/*.css")
    .pipe(concat("libs.css"))
    .pipe(dest("./dev/css/"));
}

exports.default = watchFiles;