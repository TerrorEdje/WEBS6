module.exports = function(grunt) {
   grunt.initConfig({
	   browserify: {
	   	js: {
	       src: 'app/js/app.js',
	       dest: 'dist/js/app.js',
	       options: {
	         external: ['angular'],
	         debug: true,
	         browserifyOptions: { debug: true }
	       }
	     }

	   },
	   copy: {
	   	all: {
	       // This copies all the html and css into the dist/ folder
	       expand: true,
	       cwd: 'app/',
	       src: ['**/*.html', '**/*.css'],
	       dest: 'dist/',
	     },
	     img: {
	     	cwd: 'app/css/res/',
	     	src: '**/*',
	     	dest: 'dist/css/res',
	     	expand:true
	     }

	   },
	   watch: {
	   	js: {
	       files: "app/**/*.js",
	       tasks: "browserify"
	     },
	     html: {
	       files: 'app/**/*.html',
	       tasks: 'copy'
	     },
	     css: {
	       files: 'app/**/*.scss',
	       tasks: 'sass'
	     },
	     img: {
	       files: 'app/css/res/*',
	       tasks: 'copy'
	     }
	   },
	   sass:{
	   	dist:{
	   		options: {
	   			style: 'expanded'
	   		},
	   		files: {
	   			'dist/css/app.css': 'app/css/app.scss'
	   		}
	   	}
	   }
	});

	// Load the npm installed tasks
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass')

	// The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', 'copy', 'sass']);


};