module.exports = function (grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'app/scripts/main.js',
                dest: 'app/scripts/main.js'
            }
        },
        cssmin: {
            build: {
                src: 'app/styles/main.css',
                dest: 'app/styles/main.css'
            }
        },
/*
        shell: {
            livescript: {
                options: {
                    stdout: true
                },
                command: 'lsc -cp app/scripts/controllers/*.ls && date'
            }
        },
        concat: {
            build: {
                src: [
                    'app/scripts/controllers/NavbarController.js',
                    'app/scripts/controllers/SearchController.js',
                    'app/scripts/controllers/ExhibitionController.js'
                ],
                dest: 'app/scripts/main.js'
            }
        },
*/
        sass: {
            build: {
                src: 'app/styles/main.sass',
                dest: 'app/styles/main.css'
            }
        },
        lsc: {
            build: {
                src: 'app/scripts/controllers/*.ls',
                dest: 'app/scripts/main.js'
            }
        },
        watch: {
            lsc: {
                files: 'app/scripts/controllers/*.ls',
                tasks: 'lsc'
            },
            sass: {
                files: 'app/styles/*.sass',
                tasks: 'sass'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
/*
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-concat');
*/
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-lsc');

    grunt.registerTask('default', ['sass', 'cssmin', 'lsc', 'uglify']);
};
