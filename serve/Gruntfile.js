module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'public/javascripts/bundle.js': ['public/javascripts/app.js']
    },
    watch: {
      options: {
        livereload: true,
      },
      main: {
        files: [ "public/javascripts/*.js", "!public/javascripts/bundle.js"],
        tasks: [ 'browserify' ]
      },
      test: {
        options: {
          spawn: false,
        },
        files: [ "public/javascripts/*.js", "test/*.js", "!public/javascripts/bundle.js"],
        tasks: [ 'clear', 'mochaTest:all', 'jshint:codeBase' ]
      }
    },
    exec: {
    	start: "node ./bin/www",
	    test: "node ./node_modules/mocha/bin/_mocha --reporter spec",
	    testnyan: "node ./node_modules/mocha/bin/_mocha --reporter nyan"
    },
    concurrent: {
      develop: ['watch:main', 'exec:start'],
      developTest: ['watch:test', 'exec:start'],
      test: ['jshint', 'mocha']
    },
    jshint: {
      options: { //http://jshint.com/docs/options/
        asi: true, //This option suppresses warnings about missing semicolons.
        boss: false, //This option suppresses warnings about the use of assignments in cases where comparisons are expected. More often than not, code like if (a = 10) {} is a typo. 
        curly: false, //This option requires you to always put curly braces around blocks in loops and conditionals.

        eqeqeq: false, //This options prohibits the use of == and != in favor of === and !==. The former try to coerce values before comparing them which can lead to some unexpected results. The latter don't do any coercion so they are generally safer.
        eqnull: true, //This option suppresses warnings about == null comparisons.
        esnext: true, //This option tells JSHint that your code uses ECMAScript 6 specific syntax.
        browser: true, //This option defines globals exposed by modern browsers

        module: true, //This option informs JSHint that the input code describes an ECMAScript 6 module.


        globals: {
          jQuery: true
        },
      },
      codeBase: {
        files: {
          src: [ "public/javascripts/*.js", "!public/javascripts/bundle.js" ]
        }
      },
      bundle:{
        options: {
          undef: true,
        },
        files: {
          src: ['public/javascripts/bundle.js']
        }
      }
    },
    mochaTest: {
      all: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false) 
          clearRequireCache: true // Clear the require cache before running tests so that the tests actually run on the new code
        },
        src:['test/**/*.js']
      }
    }
  })

  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-clear')
  grunt.loadNpmTasks('grunt-concurrent')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-exec')
  grunt.loadNpmTasks('grunt-mocha-test')


  grunt.registerTask('default', ['jshint:codeBase', 'mochaTest:all', 'browserify', 'uglify', 'jshint:bundle']);
  grunt.registerTask('develop', ['browserify', 'concurrent:develop']);
  grunt.registerTask('developTest', ['browserify', 'concurrent:developTest']);
  
  //grunt.registerTask('test', ['watch:test']);
  grunt.registerTask('test', 'runs my tasks', function () {
      var tasks = ['mochaTest:all', 'jshint:codeBase', 'watch:test'];

      // Use the force option for all tasks declared in the previous line
      // This allows tests to fail and still run jshint after
      grunt.option('force', true);

      grunt.task.run(tasks);
  });


  var defaultTestSrc = grunt.config('mochaTest.all.src');

  var defaultJsHintSrc = grunt.config('jshint.codeBase.files.src');
  // on watch:test events configure mochaTest.all to only run on changed file
  grunt.event.on('watch', function(action, filepath, target) {
    if(target == "test"){
      //debug
      console.log("Test: "+ target + " | "+ action + " | " + filepath)

      //Set Syntax Check
      grunt.config('jshint.codeBase.files.src', filepath)

      //change reporter to nyan for compressed output
      grunt.config('mochaTest.all.options.reporter', 'nyan')

      //make my own filepath storage
      var file = filepath;

      //if the path is not already a test then target the correct test
      if(file.indexOf('public\\javascripts\\') === 0) {
        //change file target
        file = "test\\test."+file.substring(19);
        console.log("Test: "+file+"|"+ file.substring(19)); //debug

      }

      if(grunt.file.exists(file)){
        console.log("Targeted test found running...");
        //put file path in array for mochaTest
        //file = [file];

        //Set test target
        grunt.config('mochaTest.all.src', file);
      } else{
        grunt.fail.warn('File ' + file + ' doesn\'t exist.');
        //run the all the tests if file not found
        console.log("Targeted test not found running all...");
        grunt.config('mochaTest.all.src', defaultTestSrc);
      }
    }
  });
}