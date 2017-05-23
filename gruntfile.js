module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/style.css': 'sass/style.sass'
                }
            }
        },

        browserSync: {
            bsFiles: {
                src: 'css/*.css'
            },
            options: {
                server: {
                    baseDir: "./"
                }
            }
        },

        jshint: {
            all: ['js/*.js']
        },

        watch: {
            scripts: {
                files: ['sass/*.sass'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true

                }
            }

        }

    });

    // Load the plugins tasks
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s)
    grunt.registerTask('default', ['sass', 'browserSync', 'jshint', 'watch']);
};
