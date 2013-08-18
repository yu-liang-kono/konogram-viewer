module.exports = function (grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'app/scripts/main.js',
                dest: 'app/scripts/main.min.js'
            }
        },
        cssmin: {
            build: {
                src: 'app/styles/main.css',
                dest: 'app/styles/main.min.css'
            }
        },
        shell: {
            livescript: {
                command: 'lsc -c app/scripts/controllers/*.ls'
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
	sass: {
            build: {
	        src: 'app/styles/main.sass',
		dest: 'app/styles/main.css'
	    }
	}
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass', 'shell', 'concat', 'uglify', 'cssmin']);
};
