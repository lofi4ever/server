const gulp = require("gulp");
const { src, dest, watch, parallel, series } = gulp;
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const nodemon = require("gulp-nodemon");

const { jsLibsOrder } = require("./configurations.js");

const paths = {
  sass: "./public/css/src/**/*.scss",
  js: "./public/js/*.js"
};

function nodemonStream(done) {
  let stream = nodemon({
    script: 'index.js',
    ext: 'js html',
    done: done
  });
  stream
    .on('crash', () => {
      stream.emit('restart', 5);
    })
}

function style(cb) {
  src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./public/css"));
  cb();
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
  return src("./libs/**/*.css")
    .pipe(concat("libs.css"))
    .pipe(dest("./public/css/"));
}

exports.default = function() {
  nodemonStream();
  concatJs();
  concatCss();
  watch(paths.sass, style);
}