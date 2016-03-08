module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // we could just concatenate everything, really
        // but we like to have it the complex way.
        // also, in this way we do not have to worry
        // about putting files in the correct order
        // (the dependency tree is walked by r.js)
        less: {
            dist: {
                options: {
                    paths: [],
                    strictMath: false,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '++theme++eganovo_pokrova.theme5/styles/theme5-compiled.css.map',
                    sourceMapFilename: 'src/eganovo_pokrova/theme5/theme/styles/theme5-compiled.css.map',
                    modifyVars: {
                        "isPlone": "false"
                    }
                },
                files: {
                    'src/eganovo_pokrova/theme5/theme/styles/theme5-compiled.css':
                      'src/eganovo_pokrova/theme5/theme/styles/main.less',
                    'src/eganovo_pokrova/theme5/theme/styles/theme5-compiled.css.map':
                      'src/eganovo_pokrova/theme5/theme/styles/*.less'
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/eganovo_pokrova/theme5/theme/styles/*.less'],
                tasks: ['less']
            }
        },
        browserSync: {
            html: {
                bsFiles: {
                    src : ['src/eganovo_pokrova/theme5/theme/styles/*.less']
                },
                options: {
                    watchTask: true,
                    debugInfo: true,
                    server: {
                        baseDir: "."
                    }
                }
            },
            plone: {
                bsFiles: {
                    src : ['src/eganovo_pokrova/theme5/theme/styles/*.less']
                },
                options: {
                    watchTask: true,
                    debugInfo: true,
                    proxy: "lh:8081"
                }
            }
        }
    });

    // grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('bsync', ["browserSync:html", "watch"]);
    grunt.registerTask('plone-bsync', ["browserSync:plone", "watch"]);
};
