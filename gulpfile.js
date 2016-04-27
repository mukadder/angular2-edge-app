var gulp = require('gulp'),
    inject = require('gulp-inject'),

    config = {

        public: './public',

        // VendorJs
        vendorJsToMove: [
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/es6-shim/es6-shim.map',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system-polyfills.js.map',
            'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/angular2/bundles/http.dev.js',
            'node_modules/socket.io-client/socket.io.js'
        ],

        vendorJs: [
            './public/assets/vendorJs/es6-shim.min.js',
            './public/assets/vendorJs/system-polyfills.js',
            './public/assets/vendorJs/shims_for_IE.js',
            './public/assets/vendorJs/angular2-polyfills.js',
            './public/assets/vendorJs/system.src.js',
            './public/assets/vendorJs/Rx.js',
            './public/assets/vendorJs/angular2.dev.js',
            './public/assets/vendorJs/router.dev.js',
            './public/assets/vendorJs/http.dev.js',
            './public/assets/vendorJs/socket.io.js'
        ],


        vendorJsFolder: './public/assets/vendorJs'
    };

// Dev Tasks
gulp.task('move-vendorJs', () => {
    gulp.src(config.vendorJsToMove)
        .pipe(gulp.dest(config.vendorJsFolder))
});

gulp.task('inject-development', () => {
    var target = gulp.src(config.public + '/index.html');
    var vendorStream = gulp.src(config.vendorJs, {read: false});

    return target
        .pipe(inject(vendorStream, {relative: true}))
        .pipe(gulp.dest(config.public));
});