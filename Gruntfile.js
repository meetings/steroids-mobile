module.exports = function( grunt ) {
  'use strict';
  //
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    // Project configuration
    // ---------------------

    // specify an alternate install location for Bower
    bower: {
      dir: 'app/components'
    },

    // Coffee to JS compilation
    coffee: {
      compile: {
        files: {
          'temp/scripts/*.js': 'app/scripts/**/*.coffee'
        },
        options: {
          basePath: 'app/scripts'
        }
      }
    },

    // compile .scss/.sass to .css using Compass
    compass: {
      dist: {
        // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
        options: {
          css_dir: 'temp/styles',
          sass_dir: 'app/styles',
          images_dir: 'app/images',
          javascripts_dir: 'temp/scripts',
          force: true
        }
      }
    },

    // generate application cache manifest
    manifest:{
      dest: ''
    },

    // headless testing through PhantomJS
    mocha: {
      all: ['test/**/*.html']
    },

    // default watch configuration
    watch: {
      coffee: {
        files: 'app/scripts/**/*.coffee',
        tasks: 'coffee reload'
      },
      compass: {
        files: [
          'app/styles/**/*.{scss,sass}'
        ],
        tasks: 'compass reload'
      },
      templatizer: {
        files: [
          'app/scripts/**/*.jade'
        ],
        tasks: 'templatizer reload'
      },
      reload: {
        files: [
          'app/*.html',
          'app/styles/**/*.css',
          'app/scripts/**/*.js',
          'app/images/**/*'
        ],
        tasks: 'reload'
      }
    },

    // default lint configuration, change this to match your setup:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
    lint: {
      files: [
        'Gruntfile.js',
        'app/scripts/**/*.js',
        'spec/**/*.js'
      ]
    },

    // specifying JSHint options and globals
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },

    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: 'temp',
    // final build output
    output: 'dist',

    mkdirs: {
      staging: 'app/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'styles/main.css': ['styles/**/*.css']
    },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: 'scripts/**/*.js',
      css: 'styles/**/*.css',
      img: 'images/**'
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css']
    },

    // HTML minification
    html: {
      files: ['**/*.html']
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: '<config:rev.img>'
    },

    // rjs configuration. You don't necessarily need to specify the typical
    // `path` configuration, the rjs task will parse these values from your
    // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
    //
    // name / out / mainConfig file should be used. You can let it blank if
    // you're using usemin-handler to parse rjs config from markup (default
    // setup)
    rjs: {
      // no minification, is done by the min task
      optimize: 'none',
      baseUrl: './scripts',
      wrap: true
    }
  });

  // Alias the `test` task to run the `mocha` task instead
  grunt.registerTask('test', 'mocha');

  // Custom task for building the app version
  grunt.registerTask('mobile','build mobile_build mv_files');
  grunt.registerTask('normal','build normal_build');


  /* previous perl script was failing at random, use this instead */
  var buildifyHTML = function(buildType, html){

    var startExp      = new RegExp("<!-- start build include: \\S* -->"),
        endExp        = new RegExp("<!-- stop build include -->"),
        buildTypeExp  = new RegExp("<!-- start build include: (\\S*) -->"),
        lines         = html.split(/\r?\n/),
        withinTag     = false,
        tagType       = undefined,
        tempContent   = [],
        content       = [];

    // loop each html document line
    lines.forEach(function(line){
      // new tag start
      if (startExp.test(line) && !withinTag) {
        tagType = line.match(buildTypeExp)[1];
        withinTag = true;

      // tag end
      } else if (endExp.test(line) && withinTag) {
        // when we have build we want, use that content
        if (tagType === buildType) {
          content = content.concat(tempContent);

        }
        // reset for next iteration
        tempContent = [];
        tagType = undefined;
        withinTag = false;

      // inside tag, collect line to tempContent
      } else if (withinTag) {
        tempContent.push(line);

      // normal content, just add it
      } else {
        content.push(line);
      }
    });
    // return merged string with line breaks
    return content.join("\n");
  }


  grunt.registerTask('mobile_build', 'Processes html build comments', function() {

      grunt.file.expand('dist/*.html').forEach(function(path){
        var fullPath = __dirname + '/' + path,
            preBuildContent = grunt.file.read(fullPath);

        grunt.file.write(fullPath, buildifyHTML("mobile", preBuildContent));

      });

  });

  grunt.registerTask('normal_build', 'Processes html build comments', function() {
    grunt.file.expand('dist/*.html').forEach(function(path){
      var fullPath = __dirname + '/' + path,
          preBuildContent = grunt.file.read(fullPath);

      grunt.file.write(fullPath, buildifyHTML("normal", preBuildContent));

    });
  });


  grunt.registerTask('mv_files', 'Moves the dist folder to agapp/www', function() {
      var exec = require('child_process').exec;
      var done = this.async();
      var fs = require('fs');

      // empty scripts dir that yeoman pollutes
      grunt.file.expand('agapp/www/scripts/**/*.js').forEach(function(path){
        fs.unlinkSync(__dirname + '/' + path)
      });


      console.log("Copying dist to agapp/www");
      // use copy, because mv will not overwrite subdirs
      exec('cp -rf ' + __dirname +'/dist/* ' + __dirname + '/agapp/www/', function(){
        console.log("Copied dist to agapp/www");
        // remove dist
        exec('rm -rf ' + __dirname +'/dist', function(){
          console.log("Removed dist/");
          // cleanup scss files because sass compilation in steroids fails for some rules in them
          // and they are useless files for build anyways
          grunt.file.expand('agapp/www/**/*.scss').forEach(function(path){
            console.log("Removed SCSS: " + __dirname + '/' + path)
            fs.unlinkSync(__dirname + '/' + path)
          });
          done(); // just ensure async operations above get run
        });
      });
  });

  // Do the nesessary modifications
  grunt.registerTask('templatizer', 'Builds the templates', function() {
      var templatizer = require('templatizer');
      templatizer(__dirname + '/app/scripts/templates', __dirname + '/app/scripts/templates/all.js');
  });
  grunt.registerTask('templatizer', 'Builds the templates', function() {
      var templatizer = require('templatizer');
      templatizer(__dirname + '/app/scripts/templates', __dirname + '/app/scripts/templates/all.js');
  });
};
