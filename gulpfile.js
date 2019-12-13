const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps'); // 可以查看错误文件的位置
const webpack = require('webpack-stream');
const through = require('through2');
const { series, parallel, src, dest, watch } = gulp;
const path = require('path');

const logBabelMetadata = () => {
    return through.obj((file, enc, cb) => {
        console.log(file.babel.test); // 'metadata'
        cb(null, file);
    });
}

const delayReload = (time) => {
    setTimeout(() => {
        connect.reload();
    }, time)
}

const styleTask = () => src('src/sass/*.scss')
        .pipe(sass())
        .pipe(dest('dist/css'))
        .pipe(connect.reload());
const tplStyleTask = () => src('src/tpl/**/*.scss')
        .pipe(sass())
        .pipe(dest('src/tpl'))
        .pipe(connect.reload())

const jsTask = () => src('src/**/*.js')
        // .pipe(sourcemaps.init())
        // .pipe(babel({
        //     presets: ['@babel/env'],
        //     plugins: [{
        //         post(file) {
        //             file.metadata.test = 'metadata';
        //         }
        //     }]
        // }))
        // .pipe(logBabelMetadata())
        // // .pipe(concat('bundle.js'))
        // .pipe(sourcemaps.write('.')) // 生成记录位置的sourcemaps文件
        // .pipe(dest('dist'))
        .pipe(connect.reload());

const htmlTask = () => src('src/**/*.html')
        .pipe(dest('dist'))
        .pipe(connect.reload());
const imageTask = () => src('src/images/*')
        .pipe(imagemin())
        .pipe(dest('dist/images'))
        .pipe(connect.reload())
const webpackTask = () => src('src/tpl/**/*.art')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(dest('dist'))
        .pipe(connect.reload());


const cleanTask = () => src('./dist/', { allowEmpty: true })
        .pipe(clean());

const watchTask = () => watch(['src/**/*.html', 'src/**/*.js', 'src/sass/*.scss', 'images/*', 'src/tpl/**/*.scss'], (cb) => {
    console.log('watch');
    jsTask();
    htmlTask();
    styleTask();
    tplStyleTask();
    imageTask();
    // webpackTask();
    cb();
})

const defaultTack = series(cleanTask, jsTask, htmlTask, styleTask, tplStyleTask, imageTask, parallel(watchTask, webpackTask));
const webserver = () => {
    defaultTack();
    connect.server({
    root: './dist/',
    livereload: true,
    });
}


exports.dev = series(webserver);
exports.build = series(cleanTask, jsTask, htmlTask);