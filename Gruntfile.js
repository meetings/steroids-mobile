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
          'app/scripts/**/*.js'
          //'app/images/**/*'
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
  grunt.registerTask('ios','templatizer build ios_build');
  grunt.registerTask('android','templatizer build android_build');
  grunt.registerTask('web','templatizer build web_build');


  /* previous perl script was failing at random, use this instead */
  var buildifyFile = function(buildType, html){

    var startExp      = new RegExp("<!-- start build include: [^\\-]* -->"),
        endExp        = new RegExp("<!-- stop build include -->"),
        buildTypeExp  = new RegExp("<!-- start build include: ([^\\-]*) -->"),
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
        if (tagType.indexOf(buildType) != -1 ) {
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
  };

   var mvFiles = function( cb ) {
      var exec = require('child_process').exec;
      var fs = require('fs');

      // empty scripts dir that yeoman pollutes
      //grunt.file.expand('agapp/www/scripts/**/*.js').forEach(function(path){
      //  fs.unlinkSync(__dirname + '/' + path)
      //});
      exec('rm -rf '+ __dirname +'/agapp/www/*', function(){
        console.log("/agapp/www cleared");

        exec('mkdir -p agapp;cp -rf ' + __dirname +'/steroids_skeleton/* ' + __dirname + '/agapp', function(){
          console.log("Copied /steroids_skeleton/* to agapp/");

          // use copy, because mv will not overwrite subdirs
          exec('cp -rf ' + __dirname +'/dist/* ' + __dirname + '/agapp/www/', function(){
            console.log("Copied dist to agapp/www");
            // remove dist
            exec('rm -rf ' + __dirname +'/dist', function(){
              console.log("Removed dist/");
              // cleanup scss files because sass compilation in steroids fails for some rules in them
              // and they are useless files for build anyways
              grunt.file.expand('agapp/www/**/*.scss').forEach(function(path){
                console.log("Removed SCSS: " + __dirname + '/' + path);
                fs.unlinkSync(__dirname + '/' + path);
              });
              cb();
            });
          });
        });
      });
  };

  var buildifyExpandForTarget = function( expand_dir, build_target ) {
      grunt.file.expand( expand_dir ).forEach(function(path){
          var fullPath = __dirname + '/' + path;
          var preBuildContent = grunt.file.read(fullPath);
          grunt.file.write(fullPath, buildifyFile(build_target, preBuildContent));
      });
  }
  grunt.registerTask('steroids_prepare', 'templatizer comassizer' );

  grunt.registerTask('steroids_ios', 'Processes html build comments in steroids for ios and cleans breaking scss files', function() {
      buildifyExpandForTarget('steroids/dist/*.html', 'ios' );
      var done = this.async();
      var exec = require('child_process').exec;
      exec('rm -Rf '+ __dirname +'/steroids/dist/styles/*.scss', function(){
        done();
      });
  });

  grunt.registerTask('ios_build', 'Processes html build comments for ios', function() {
      var done = this.async();
      buildifyExpandForTarget('dist/*.html', 'ios' );
      mvFiles(function(){
          done();
      });
  });
  grunt.registerTask('android_build', 'Processes html build comments for android', function() {
      var done = this.async();
      buildifyExpandForTarget('dist/*.html', 'android' );
      mvFiles(function(){
          done();
      });
  });

  grunt.registerTask('web_build', 'Processes html build comments', function() {
      buildifyExpandForTarget('dist/*.html', 'web' );
  });

  // Do the nesessary modifications
  grunt.registerTask('templatizer', 'Builds the templates', function() {
      var templatizer = require('templatizer');
      templatizer(__dirname + '/app/scripts/templates', __dirname + '/app/scripts/templates/all.js');
  });
  grunt.registerTask('comassizer', 'Builds the css files', function() {
      var done = this.async();
      var exec = require('child_process').exec;
      exec('compass compile --sass-dir ' + __dirname +'/app/styles/ --css-dir ' + __dirname + '/app/styles/', function(){
        done();
      });
  });

  grunt.renameTask('server', 'old-server');
  grunt.registerTask('server', 'templatizer old-server');  
};
