const imagemin = require("gulp-imagemin");
const browserlist = ["> 0.5%"];

module.exports = {
    css: {
        scss: {
            config: {
                outputStyle: "compressed" // nested, compact, expanded and compressed are available options
            }
        },

        sourcemaps: {
            enabled: "local"
        },

        autoprefixer: {
            enabled: true,
            config: {
                browsers: browserlist
            }
        },

        cleanCss: {
            enabled: true,
            config: {
                compatibility: "ie8"
            }
        }
    },

    js: {
        sourcemaps: {
            enabled: "local"
        },
        browserify: {
            enabled: false
        },
        uglify: {
            enabled: false
        },
        babeljs: {
            enabled: false,
            config: {
                minified: false,
                comments: false
            }
        }
    },

    clean: {
        enabled: "prod",
        paths: ["../luya/vendor/luyadev/luya-module-admin/src/resources/dist/**/*.map"]
    },

    images: {
        imagemin: {
            enabled: true,
            config: [
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({ plugins: [{ removeViewBox: true }] })
            ]
        }
    },

    svg: {
        svgmin: {
            enabled: true,
            config: {}
        }
    },

    extraTasks: {
        jsUglify: {
            runAsTask: 'js',
            sourcemaps: {
                enabled: "local"
            },
            browserify: {
                enabled: false
            },
            uglify: {
                enabled: "prod"
            },
            babeljs: {
                enabled: false,
                config: {
                    minified: false,
                    comments: false
                }
            }
        },
        purgeDist: {
            runAsTask: 'clean',
            enabled: true,
            paths: ["../luya/vendor/luyadev/luya-module-admin/src/resources/dist/*"]
        }
    },


    paths: {
        // "DESTINATION" : ['SOURCE']
        css: {
            "../luya/vendor/luyadev/luya-module-admin/src/resources/dist/css/": ["scss/**/*.scss"]
        },
        js: {
            "../luya/vendor/luyadev/luya-module-admin/src/resources/dist/js/main.js": [
                "bower/angular/angular.min.js",
                "vendorlibs/ng-colorwheel/ng-colorwheel.js",
                "bower/angular-loading-bar/build/loading-bar.min.js",
                "bower/angularjs-datepicker/dist/angular-datepicker.min.js",
                "bower/ui-router/release/angular-ui-router.min.js",
                "bower/ng-file-upload/ng-file-upload-shim.min.js",
                "bower/ng-file-upload/ng-file-upload.min.js",
                "bower/ng-flow/dist/ng-flow-standalone.min.js",
                "bower/ng-wig/dist/ng-wig.min.js",
                "bower/twigjs-bower/twig/twig.js",
                "bower/angular-filter/dist/angular-filter.min.js",
                // Colorwheel?
                "bower/bowser/src/useragent.js",
                "bower/bowser/src/bowser.js",
                "bower/echarts/dist/echarts.min.js",
            ]
        },
        jsUglify: {
            "../luya/vendor/luyadev/luya-module-admin/src/resources/dist/js/main.uglified.js": [
            	"js/dnd.js",
                "js/zaa.js",
                "js/services.js",
                "js/filters.js",
                "js/directives.js",
                "js/controllers.js",
            ],
            "../luya/vendor/luyadev/luya-module-admin/src/resources/dist/js/login.js": [
                "js/login.js"
            ]
        },
        images: {
            "images/": [
                "images/**/*.jpeg",
                "images/**/*.jpg",
                "images/**/*.png",
                "images/**/*.gif"
            ]
        },
        svg: {
            "svg/": ["svg/**/*.svg"]
        }
    },

    // All tasks above are available (css, js, images and svg)
    combinedTasks: {
        default: [["dist", "watch"]],
        dist: ["purgeDist", "css", "js", "jsUglify", "images", "svg", "clean"]
    },

    watchTask: {
        css: ["css"],
        js: ["js"],
        jsUglify: ["jsUglify"]
    }
};
