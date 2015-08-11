module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'public/javascripts/bundle.js': ['public/javascripts/app.js']
    },
    watch: {
      files: [ "public/javascripts/*.js", "!public/javascripts/bundle.js"],
      tasks: [ 'browserify' ]
    },
    exec: {
    	start: "node ./bin/www",
	    test: "node ./node_modules/mocha/bin/_mocha --reporter spec",
	    testnyan: "node ./node_modules/mocha/bin/_mocha --reporter nyan"
    },
    concurrent: {
        develop: ['watch', 'exec:start'],
        test: ['jshint', 'mocha']
    }
  })
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-watch')


  grunt.registerTask('default', ['jshint', 'qunit', 'browserify', 'uglify']);
  grunt.registerTask('develop', ['jshint', 'qunit', 'browserify', 'uglify']);
}