const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
// const image = require('gulp-image')
const imagemin = require('gulp-imagemin')

function tarefasCSs(cb){
    return gulp.src('./vendor/**/*.css')
    .pipe(concat('libs.css')) //cria um arquivo 'libs.css'
    .pipe(cssmin()) //reduz a quantidade de arquivos em um só arquivo css
    .pipe(rename({suffix: '.min'})) //adiciona o 'min' no final do css 
    .pipe(gulp.dest('./dist/css'))
}

function tarefasJs(){
    return gulp.src('./vendor/**/*.js')
    .pipe(concat('libs.js')) //cria um arquivo 'libs.js'
    .pipe(uglify()) //reduz a quantidade de arquivos em um só arquivo js
    .pipe(rename({suffix: '.min'})) //adiciona o 'min' no final do js 
    .pipe(gulp.dest('./dist/js'))
}

// function tarefasImagem(){
    
//     return gulp.src('./src/images/*')
//         .pipe(image({
//             pngquant: true,
//             optipng: false,
//             zopflipng: true,
//             jpegRecompress: false,
//             mozjpeg: true,
//             gifsicle: true,
//             svgo: true,
//             concurrent: 10,
//             quiet: true
//         }))
//         .pipe(gulp.dest('./dist/images'))
// }

function tarefasImagemMin(){
    return gulp.src('./src/images/*')
    // .pipe(imagemin())
    .pipe(imagemin({
                    pngquant: true,
                    optipng: false,
                    zopflipng: true,
                    jpegRecompress: false,
                    mozjpeg: true,
                    gifsicle: true,
                    svgo: true,
                    concurrent: 10,
                    quiet: true
                }))
		.pipe(gulp.dest('dist/images'))
}

exports.styles = tarefasCSs
exports.scripts = tarefasJs
// exports.images = tarefasImagem
exports.imagesmin = tarefasImagemMin