var dir_librerias="./assets/libs/";
var dir_angular="./assets/js/";
exports.src={
  "dir_scss":"./assets/scss/**/*.scss",
  "dir_index":"./assets/index.html",
  "dir_js":"./assets/js/**/*.js",
  "dir_fonts":"./assets/fonts",
  "dir_img":"./assets/images/**/*.{gif,png,jpg,jpeg}",
  "dir_models":"./assets/models/**/*.json",
  "dir_templates":"./assets/templates/**/*.html",
  "concat_libs":[
    dir_librerias+"angular.min.js",
    dir_librerias+"angular-ui-router.min.js",
    dir_librerias+"angular-route.min.js",
    dir_librerias+"d3.min.js"
  ],
  "concat_angular":[
    dir_angular+"module/init.module.js",
    dir_angular+"module/routes.module.js",
    dir_angular+"factories/*.js",
    dir_angular+"controllers/*.js",
    dir_angular+"directives/*.js",
  ]
}
exports.dist={
  "dir_css":"dist/css",
  "dir_index":"dist",
  "dir_models":"dist/models",
  "dir_js":"dist/js",
  "dir_img":"dist/images",
  "dir_fonts":"dist/fonts",
  "dir_angular":"dist/js/module",
  "dir_templates":"dist/templates",
  "dir_lib":"dist/libs"
}
exports.dev={
  "dir_css":"dev/css",
  "dir_models":"dev/models",
  "dir_index":"dev",
  "dir_js":"dev/js",
  "dir_img":"dev/images",
  "dir_fonts":"dev/fonts",
  "dir_angular":"dev/js/module",
  "dir_templates":"dev/templates",
  "dir_lib":"dev/libs"
}
exports.AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
