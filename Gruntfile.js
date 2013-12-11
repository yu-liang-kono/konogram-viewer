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
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-lsc');

    grunt.registerTask('default', ['sass', 'cssmin', 'lsc', 'uglify']);
};
