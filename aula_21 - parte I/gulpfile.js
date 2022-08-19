const {series} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
// const image = require('gulp-image') //não funcionou
const imagemin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const sass = require('gulp-sass')(require('sass'));
// const sass = require('gulp-sass')(require('node-sass'))


function tarefasCSs(cd){
    // gulp.src('./vendor/**/*.css')
    gulp.src(["node_modules/bootstrap/dist/css/bootstrap.min.css",
                "vendor/owl/css/owl.css",
                "node_modules/@fortawesome/fontawesome-free/css/fontawesome.css",
                // "node_modules/@fortawesome/fontawesome-free/css/all.css",
                // 'node_modules/font-awesome/css/font-awesome.css.map',
                "src/css/style.css",
                // "node_modules/font-awesome/fonts/fontawesome-webfont.ttf",
                // "node_modules/font-awesome/fonts/fontawesome-webfont.woff",
                // "node_modules/font-awesome/fonts/fontawesome-wesbfont.woff2",
                // "node_modules/font-awesome/fonts/fontawesome-webfont.woff",
            ])
    .pipe(concat('libs.css')) //cria um arquivo 'libs.css'
    .pipe(cssmin()) //reduz a quantidade de arquivos em um só arquivo css
    .pipe(rename({suffix: '.min'})) //adiciona o 'min' no final do css 
    .pipe(gulp.dest('./dist/css'))

    return cd()
}

function tarefaSASS(cb){
    gulp.src('./scss/**/*.scss')
    .pipe(sass()) //scss para css
    .pipe(gulp.dest('./dist/css'))

    cb()
}

/* Pode haver navegadores que acabam não lendo o código */
// function tarefasJs(callback){
//     gulp.src('./vendor/**/*.js')
//     .pipe(concat('libs.js')) //cria um arquivo 'libs.js'
//     .pipe(uglify()) //reduz a quantidade de arquivos em um só arquivo js
//     .pipe(rename({suffix: '.min'})) //adiciona o 'min' no final do js 
//     .pipe(gulp.dest('./dist/js'))

//     return callback()
// }

function tarefasJsBabel(callback){
    gulp.src(["node_modules/jquery/dist/jquery.js",
                "node_modules/bootstrap/dist/js/bootstrap.bundle.js",
                "vendor/owl/js/owl.js",
                "node_modules/jquery-mask-plugin/dist/jquery.mask.js",
                
                "src/js/custom.js",
            ])
    // gulp.src('./vendor/**/*.js')
    .pipe(babel({
        comments:false,
        presets: ['@babel/env']
    }))
    .pipe(concat('libs.js')) //cria um arquivo 'libs.js'
    // .pipe(uglify()) //reduz a quantidade de arquivos em um só arquivo js
    .pipe(rename({suffix: '.min'})) //adiciona o 'min' no final do js 
    .pipe(gulp.dest('./dist/js'))

    return callback()
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

function tarefasHTML(callback){
    gulp.src('./src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true})) //remove os espaços em branco
    .pipe(gulp.dest('./dist'))

    return callback()
}

gulp.task("serve", function(){
    browserSync.init({
        server:{
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on("change", process) //repete quando alterado
    gulp.watch('./src/**/*').on("change", reload)
})

const process = series(tarefasHTML, tarefaSASS, tarefasCSs, tarefasJsBabel)

exports.styles = tarefasCSs
// exports.scripts = tarefasJs
exports.scripts = tarefasJsBabel
// exports.images = tarefasImagem
exports.imagesmin = tarefasImagemMin
exports.sass = tarefaSASS

exports.default = process