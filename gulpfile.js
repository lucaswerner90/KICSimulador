'use strict';

var path=require('./constantes');


// Llamada a los modulos de gulp
var gulp=require('gulp');
var concat=require('gulp-concat');
var util=require('gulp-util');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var cssBase64 = require('gulp-css-base64');
var minifyHTML = require('gulp-htmlmin');
var imageop = require('gulp-image-optimization');
var clean = require('gulp-clean');
var requireDir = require('require-dir');
var convert=require("gulp-convert");
var angularFilesort=require("gulp-angular-filesort");
var browserSync=require("browser-sync").create();


// gulp --env=pro
var desarrollo=(util.env.env=="pro")?false:true;
var directorio=(util.env.env=="pro")?path.dist:path.dev;
var minifyHTMLOptions={
  collapseWhitespace:true,
  comments: false
};


// /////////////////////////////////////////////////////////////////
// BORRA LAS CARPETAS DE DESARROLLO Y PRODUCCION
// /////////////////////////////////////////////////////////////////
gulp.task('clean',function(){
  return gulp.src([path.dist.dir_index,path.dev.dir_index])
  .pipe(clean({force: true}));
});
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////



// /////////////////////////////////////////////////////////////////
// OPTIMIZA LAS IMAGENES DEL DIRECTORIO DE IMAGENES
// /////////////////////////////////////////////////////////////////
gulp.task('imagenes',function(){
  return gulp.src(path.src.dir_img)
  .pipe(imageop())
  .pipe(gulp.dest(directorio.dir_img));
});
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////



// /////////////////////////////////////////////////////////////////
// COMPILA LOS ARCHIVOS SASS
// /////////////////////////////////////////////////////////////////
gulp.task('sass', function () {
  return gulp.src(path.src.dir_scss)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('master.css'))
  .pipe(cssBase64({extensionsAllowed: ['.gif', '.jpg','.jpeg','.png']}))
  .pipe(autoprefixer(path.AUTOPREFIXER_BROWSERS))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest(directorio.dir_css))
  .pipe(browserSync.stream());
});
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////////////
// CONCATENACION Y COPIA DE LAS LIBRERIAS
// /////////////////////////////////////////////////////////////////

gulp.task('libs',function(){
  return gulp.src(path.src.concat_libs)
  .pipe(concat("libs.js"))
  .pipe(gulp.dest(directorio.dir_lib));
});
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////////////
// TAREA DE MINIFICACION Y COPIA DE LAS DIFERENTES TEMPLATES DE LA APP
// /////////////////////////////////////////////////////////////////
gulp.task('copy-index-html',['templates'],function(){
  console.log(path.src.dir_index);
  return gulp.src(path.src.dir_index)
  .pipe(gulp.dest(directorio.dir_index));
});

gulp.task('templates',function(){
  return gulp.src(path.src.dir_templates)
  .pipe(minifyHTML(minifyHTMLOptions))
  .pipe(gulp.dest(directorio.dir_templates));
});
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////



// /////////////////////////////////////////////////////////////////
// TAREAS PARA LAS TIPOGRAFIAS Y SUS CSS
// /////////////////////////////////////////////////////////////////

gulp.task('fonts',['copyFontFiles'],function(){
  return gulp.src(path.src.dir_fonts+"/**/*.css")
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest(directorio.dir_fonts));
});
// /////////////////////////////////////////////////////////////////
gulp.task('copyFontFiles',function(){
  return gulp.src(path.src.dir_fonts+"/**/*.woff")
  .pipe(gulp.dest(directorio.dir_fonts));
});
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////




// /////////////////////////////////////////////////////////////////
// CONCATENA LOS ARCHIVOS DEL MODULO ANGULAR
// /////////////////////////////////////////////////////////////////
gulp.task('angular-files',function(){
  var task=gulp.src(path.src.concat_angular)
  .pipe(jshint());

  if(desarrollo){
    return task
    .pipe(gulp.dest(directorio.dir_js));
  }
  else{
    return task
    .pipe(concat("init.js"))
    .pipe(uglify())
    .pipe(gulp.dest(directorio.dir_js));
  }

});
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////

gulp.task('copy-models',function(){
  return gulp.src(path.src.dir_models)
  .pipe(gulp.dest(directorio.dir_models));
});

// /////////////////////////////////////////////////////////////////
// INYECTA LOS FICHEROS JS Y CSS EN EL INDEX.html
// /////////////////////////////////////////////////////////////////
gulp.task('inject',['copy-models','fonts','imagenes','copy-index-html','libs','sass','angular-files'],function(){
  var options={
    'relative':true,
    'removeTags':true
  };
  var target=gulp.src(directorio.dir_index+"/index.html");
  var sources=gulp.src([directorio.dir_lib+"/**/*.js",directorio.dir_js+"/**/*.module.js",directorio.dir_js+"/**/*.js",directorio.dir_css+"/**/*.css",directorio.dir_fonts+"/**/*.css"]);
  return target.pipe(inject(sources,options))
  .pipe((desarrollo)?util.noop():minifyHTML(minifyHTMLOptions))
  .pipe(gulp.dest(directorio.dir_index));
})
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////

gulp.task('default',['inject', 'watch'],function(){
  browserSync.init({
    server: {
      baseDir: "./"+directorio.dir_index,
    },
    port:8080
  });
  return;
});

gulp.task('browser-reload',function(){
  return browserSync.reload();
});

gulp.task('watch',function(){
  gulp.watch(path.src.dir_templates, ['templates','browser-reload']);
  gulp.watch(path.src.dir_scss, ['sass','browser-reload']);
  gulp.watch(path.src.concat_angular, ['angular-files','browser-reload']);
});
