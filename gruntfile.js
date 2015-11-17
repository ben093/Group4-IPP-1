module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
 		// concatenates files
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [
					'public/libs/angular/angular.min.js',
					'public/libs/angular-ui-router/release/angular-ui-router.min.js',
					'public/libs/bootstrap/dist/js/bootstrap.min.js',
					'public/libs/jquery/dist/jquery.min.js',
					'public/js/app.js',
					'public/js/index.js',
					'public/js/controllers/game.js',
					'public/js/controllers/highScores.js',
					'public/js/controllers/info.js',
					'public/js/controllers/main.js',
					'public/js/controllers/playGame.js',
					'public/js/controllers/reviewGame.js',
					'public/js/factories/gameData.js',
					'public/js/factories/imageSets.js',
					'public/js/factories/userData.js'
				],
				dest: 'dist/<%= pkg.name %>.js'
			}

		},
		// minify js
		uglify: {
			options: {
				banner: '/*! <%= pkg.name%> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name%>.min.js': [
						'<%= concat.dist.dest %>'
					]
				}
			}
		}
	});

	// load plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify')

	// default task(s)
	grunt.registerTask('default', ['concat', 'uglify']);
};
