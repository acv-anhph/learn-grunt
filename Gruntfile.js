module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            input: 'development',
            inputSCSS: 'development/sass',
            inputJS: 'development/js',
            inputHTMLELements: 'development/html',
            output: 'production',
            outputCSS: 'production/css',
            outputJS: 'production/js'
        },
        cssmin: {
            options: {},
            target: {
                files: {
                    '<%= dirs.outputCSS %>/main.css': '<%= dirs.outputCSS %>/main.css'
                }
            }
        },
        uglify: {
            options: {
                beautify: false,
                compress: {
                    drop_console: false
                }
            },
            my_target: {
                files: {
                    '<%= dirs.outputJS %>/menu.js': ['<%= dirs.inputJS %>/menu.js']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'nested'
                },
                files: [{
                    '<%= dirs.outputCSS %>/main.css': '<%= dirs.inputSCSS %>/main.sass'
                }]
            }
        },
        watch: {
            scripts: {
                files: [
                    '<%= dirs.inputSCSS %>/*.sass',				// development/sass/*.scss
                    '<%= dirs.inputSCSS %>/*/*.sass',			// development/sass/*/*.scss
                    '<%= dirs.inputJS %>/*.js',
                    '<%= dirs.input %>/index.html',
                    '<%= dirs.inputHTMLELements %>/*.html'		// development/html-elements/*.html
                    //'<%= dirs.inputHTMLELements %>/*/*.html',	// development/html-elements/*/*.html
                ],
                tasks: ['sass', 'includes', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        // Plugin 06: connect
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9236,
                    base: '<%= dirs.output %>/',
                    livereload: true
                }
            }
        },
        includes: {
            files: {
                src: [
                    '<%= dirs.input %>/index.html'
                ], // Source files
                dest: '<%= dirs.output %>/',
                flatten: true,
                cwd: '.',
                options: {
                    silent: true,
                    banner: ''
                }
            }
        },
    });

    //load plugins
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-includes');

    grunt.registerTask('dev', [
        'includes',
        'sass',
        'uglify',
        'connect',
        'watch'
    ]);

    // Task Publish Project
    grunt.registerTask('publish', [
        'cssmin',
        'uglify',
        'htmlmin'
    ]);
};
