

var gulp            = require('gulp'),
    del = require('del'),
    clean           = require('gulp-clean'),
    cleanCSS = require('clean-css'),
    browsersync     = require('browser-sync').create(),
    concat          = require('gulp-concat'),
    sass            = require('gulp-sass')(require('sass')),
    autoprefixer = require('autoprefixer'),
    notify          = require('gulp-notify'),
    plumber         = require('gulp-plumber'),
    sourcemaps      = require('gulp-sourcemaps'),
    fileInclude     = require('gulp-file-include'),
    beautifyCode    = require('gulp-beautify-code'),
    postcss = require('gulp-postcss'),
    cached = require('gulp-cached'),
    
    // Source Folder Locations
    src = {
        'root': './src/',
        
        'rootHtml': './src/*.html',
        'rootPartials': './src/partials/',
        
        'fontsAll': './src/assets/fonts/**/*',
        
        'rootVendorCss': './src/assets/css/vendor/*.css',
        'rootPluginsCss': './src/assets/css/plugins/*.css',
        
        'styleScss': './src/assets/scss/*.scss',
        'rootScss': './src/assets/scss/*',
        'scssAll': './src/assets/scss/**/*',
        
        'rootVendorJs': './src/assets/js/vendor/*.js',
        'rootPluginsJs': './src/assets/js/plugins/*.js',
        
        
        'mainJs': './src/assets/js/main.js',
        
        'rootimage': './src/assets/images/**/*',
    },
    
    // Destination Folder Locations
    dest = {
        'root': './dest/',
        'fonts': './dest/assets/fonts/',
        'assets': './dest/assets/',
        'scss': './dest/assets/scss/',
        
        'rootCss': './dest/assets/css',
        'rootVendorCss': './dest/assets/css/vendor/',
        'rootPluginsCss': './dest/assets/css/plugins/',
        
        'rootJs': './dest/assets/js',
        'rootVendorJs': './dest/assets/js/vendor/',
        'rootPluginsJs': './dest/assets/js/plugins/',
        
        'images': './dest/assets/images',
    },

    base = {
        base: {
            dir: './'
        },
        node: {
            dir: './node_modules'
        },
        packageLock: {
            files: './package-lock.json'
        }
    },
    
    
    // Autoprefixer Options
    autoPreFixerOptions = [
        "last 4 version",
        "> 1%",
        "ie >= 9",
        "ie_mob >= 10",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 7",
        "opera >= 23",
        "ios >= 7",
        "android >= 4",
        "bb >= 10"
    ];


// const paths = {
//     config: {
//         tailwind: "./tailwind.config.js",
//     },
// }


/*-- 
    Live Synchronise & Reload
--------------------------------------------------------------------*/

gulp.task('browsersync', function (callback) {
    browsersync.init({
        server: {
            baseDir: [dest.root, src.root, base.base.dir]
        },
    });
    callback();
});

gulp.task('browsersyncReload', function (callback) {
    browsersync.reload();
    callback();
});



/*-- 
    All, Watch & Default Task
--------------------------------------------------------------------*/

gulp.task('watch', function () {
    gulp.watch(src.scssAll, gulp.series('styleCss', 'browsersyncReload'));
    gulp.watch(src.scssAll, gulp.series('scss', 'browsersyncReload'));
    gulp.watch(src.rootVendorCss, gulp.series('vendorCss', 'browsersyncReload'));
    gulp.watch(src.rootPluginsCss, gulp.series('pluginsCss', 'browsersyncReload'));

    //Js Here
    gulp.watch(src.rootVendorJs, gulp.series('vendorJs', 'browsersyncReload'));
    gulp.watch(src.rootPluginsJs, gulp.series('pluginsJs', 'browsersyncReload'));
    gulp.watch(src.mainJs, gulp.series('mainJs', 'browsersyncReload'));

    //Font
    gulp.watch(src.fontsAll, gulp.series('rbtFonts', 'browsersyncReload'));

    //Image
    gulp.watch(src.rootimage, gulp.series('rbtImage', 'browsersyncReload'));

    gulp.watch(src.rootPartials, gulp.series('html', 'browsersyncReload'));
    gulp.watch(src.rootHtml, gulp.series(['html', 'styleCss'], 'browsersyncReload'));
    
})



const cssOptions = {
    compatibility: "*", // (default) - Internet Explorer 10+ compatibility mode
    inline: ["all"], // enables all inlining, same as ['local', 'remote']
    level: 2, // Optimization levels. The level option can be either 0, 1 (default), or 2, e.g.
};

/*-- 
    Gulp Custom Notifier
--------------------------------------------------------------------*/
function customPlumber(errTitle) {
    return plumber({
        errorHandler: notify.onError({
            title: errTitle || "Error running Gulp",
            message: "Error: <%= error.message %>",
            sound: "Glass"
        })
    });
}




/*--------------------------
    All CSS Here  
----------------------------*/

/*-- Gulp Compile Scss to Css Task & Minify --*/

gulp.task('styleCss', function () {
    return gulp
    .src(src.styleScss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(postcss([
    //     tailwindcss(paths.config.tailwind),
    //     autoprefixer()
    // ]))

    .pipe(gulp.dest(dest.rootCss))

    // .on("data", function (file) {
    //     const buferFile = new cleanCSS(cssOptions).minify(file.contents);
    //     return (file.contents = Buffer.from(buferFile.styles));
    // })

    .pipe( sourcemaps.write( '../maps' ) )
    .pipe(gulp.dest(dest.rootCss));
})


/* Passing SCSS  */
gulp.task('scss', function () {
    return gulp
    .src(src.scssAll)
    .pipe(customPlumber('Error On Compiling Style Scss'))
    .pipe(gulp.dest(dest.scss));
})


/*-- Vendor CSS --*/
gulp.task('vendorCss', function () {
    return gulp
    .src(src.rootVendorCss)
    .pipe(customPlumber('Error On Copying Vendor CSS'))
    .pipe(gulp.dest(dest.rootVendorCss));
})


/*-- All CSS Plugins --*/
gulp.task('pluginsCss', function () {
    return gulp
    .src(src.rootPluginsCss)
    .pipe(customPlumber('Error On Copying Plugins CSS'))
    .pipe(gulp.dest(dest.rootPluginsCss));
})



/*-- 
    All HTMl Files Compile With Partial & Copy Paste To Destination Folder
--------------------------------------------------------------------*/



gulp.task('html', function () {
    return gulp
    .src(src.rootHtml)
    .pipe(customPlumber('Error On Compile HTML'))
    .pipe(fileInclude({ 
        prefix: '@@',
        basepath: src.rootPartials
    }))
    .pipe(gulp.dest(dest.root))
    .pipe(cached())
    .pipe(gulp.dest(dest.root))
    .pipe(customPlumber('Error On Compiling Style Scss'))
    .pipe(beautifyCode())
    .pipe(gulp.dest(dest.root));
})


/*--------------------------
    All JS Here  
----------------------------*/


gulp.task('vendorJs', function () {
    return gulp
    .src(src.rootVendorJs)
    .pipe(customPlumber('Error On Copying Vendor JS'))
    .pipe(gulp.dest(dest.rootVendorJs));
})

gulp.task('pluginsJs', function () {
    return gulp
    .src(src.rootPluginsJs)
    .pipe(customPlumber('Error On Combining & Minifying Vendor JS'))
    .pipe(gulp.dest(dest.rootPluginsJs));
})

gulp.task('mainJs', function () {
    return gulp
    .src(src.mainJs)
    .pipe(customPlumber('Error On Copying Main Js File'))
    .pipe(gulp.dest(dest.rootJs));
})

/*-- Copy Font Form Source to Destination Folder --*/

gulp.task('rbtFonts', function () {
    return gulp
    .src(src.fontsAll)
    .pipe(customPlumber('Error On Copy Fonts'))
    .pipe(gulp.dest(dest.fonts));
})


/*-- Image --*/

gulp.task('rbtImage', function () {
    return gulp
    .src(src.rootimage)
    .pipe(customPlumber('Error On Compiling Images'))
    .pipe(gulp.dest(dest.images));
})



gulp.task('clean:packageLock', function (callback) {
    del.sync(base.packageLock.files);
    callback();
});

gulp.task('clean:dist', function (callback) {
    del.sync(dest.root);
    callback();
});


// Default(Producation) Task
gulp.task('default', gulp.series(gulp.parallel('html','styleCss', 'scss', 'vendorCss', 'pluginsCss', 'vendorJs', 'pluginsJs', 'mainJs', 'rbtFonts', 'rbtImage', 'clean:packageLock', 'clean:dist'), gulp.parallel('browsersync', 'watch')));
gulp.task('build', gulp.series('html','styleCss', 'scss', 'vendorCss', 'pluginsCss', 'vendorJs', 'pluginsJs', 'mainJs', 'rbtFonts', 'rbtImage', 'clean:packageLock', 'clean:dist'));


