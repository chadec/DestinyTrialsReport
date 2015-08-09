// Generated on 2015-07-04 using generator-angular-heroku 0.0.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  //Heroku Settings
  var pkg = grunt.file.readJSON('package.json');
  var herokuAppName = pkg.name.replace(/[^a-z0-9]/gi, '');

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    yeoman: appConfig,

    //Heroku Settings
    mkdir: {
      heroku: {
        options: {
          create: ['heroku']
        }
      }
    },

    //Heroku Settings
    'file-creator': {
        heroku: {
            files: [{
                //Create Procfile required by Heroku
                file: 'heroku/Procfile',
                method: function(fs, fd, done) {
                    fs.writeSync(fd, 'web: node server.js');
                    done();
                }
            }, {
                //Create package.json for Heroku for adding dependencies (ExpressJS)
                file: 'heroku/package.json',
                method: function(fs, fd, done) {
                    var min = grunt.option('min');
                    fs.writeSync(fd, '{\n');
                    fs.writeSync(fd, '  "name": ' + (pkg.name ? '"' + pkg.name + '"' : '""') + ',\n');
                    fs.writeSync(fd, '  "version": ' + (pkg.version ? '"' + pkg.version + '"' : '""') + ',\n');
                    fs.writeSync(fd, '  "description": ' + (pkg.description ? '"' + pkg.description + '"' : '""') + ',\n');
                    fs.writeSync(fd, '  "main": "server.js",\n');
                    fs.writeSync(fd, '  "dependencies": {\n');
                    fs.writeSync(fd, '    "express": "3.*",\n');
                    fs.writeSync(fd, '    "request": "^2.57.0",\n');
                    fs.writeSync(fd, '    "adm-zip": "^0.4.7",\n');
                    fs.writeSync(fd, '    "request-promise": "^0.4.2",\n');
                    fs.writeSync(fd, '    "sqlite3": "^3.0.8",\n');
                    fs.writeSync(fd, '    "unzip": "^0.1.11",\n');
                    fs.writeSync(fd, '    "throng": "^1.0.0"\n');
                    if (min) {
                        fs.writeSync(fd, '\n');
                    } else {
                        fs.writeSync(fd, ',\n    "bower": "^1.3"\n');
                    }
                    fs.writeSync(fd, '  },\n');
                    fs.writeSync(fd, '  "scripts": {\n');
                    fs.writeSync(fd, '    "start": "node server.js"');
                    if (min) {
                        fs.writeSync(fd, '\n');
                    } else {
                        fs.writeSync(fd, ',\n    "postinstall": "bower install"\n');
                    }
                    fs.writeSync(fd, '  },\n');
                    fs.writeSync(fd, '  "author": ' + (pkg.author ? '"' + pkg.author + '"' : '""') + ',\n');
                    fs.writeSync(fd, '  "license": ' + (pkg.license ? '"' + pkg.license + '"' : '""') + '\n');
                    fs.writeSync(fd, '}');
                    done();
                }
            }, {
                //Create server.js used by ExpressJS within Heroku
                file: 'heroku/server.js',
                method: function(fs, fd, done) {
                    fs.writeSync(fd, 'var throng = require("throng");\n');
                    fs.writeSync(fd, 'var WORKERS = process.env.WEB_CONCURRENCY || 1;\n\n');
                    fs.writeSync(fd, 'throng(start, {\n');
                    fs.writeSync(fd, '  workers: WORKERS,\n');
                    fs.writeSync(fd, '  lifetime: Infinity\n');
                    fs.writeSync(fd, '});\n\n');

                    fs.writeSync(fd, 'function start() {\n');
                    fs.writeSync(fd, '  var express = require("express");\n');
                    fs.writeSync(fd, '  var request = require("request");\n');
                    fs.writeSync(fd, '  var app = express();\n');
                    fs.writeSync(fd, '  var domain = require("domain");\n');
                    fs.writeSync(fd, '  var d = domain.create();\n');

                    fs.writeSync(fd, '  d.on("error", function(err) {\n');
                    fs.writeSync(fd, '    console.error(err);\n');
                    fs.writeSync(fd, '  });\n\n');

                    fs.writeSync(fd, '  app.use(express.static(__dirname));\n');
                    fs.writeSync(fd, '  app.use(express.json());\n');
                    fs.writeSync(fd, '  app.use(express.urlencoded());\n');
                    fs.writeSync(fd, '  app.use(express.compress());\n');
                    fs.writeSync(fd, '  app.get("/:platform/:playerName", function(req, res){\n');
                    fs.writeSync(fd, '    res.sendfile(__dirname + "/index.html");\n');
                    fs.writeSync(fd, '  });\n\n');

                    fs.writeSync(fd, '  app.get("/:platform/:playerOne/:playerTwo/:playerThree", function(req, res){\n');
                    fs.writeSync(fd, '    res.sendfile(__dirname + "/index.html");\n');
                    fs.writeSync(fd, '  });\n');
                    fs.writeSync(fd, '  app.get("/bungie/*?", function(req, res){\n');
                    fs.writeSync(fd, '    res.setTimeout(25000);\n');
                    fs.writeSync(fd, '    var api_key = process.env.BUNGIE_API;\n');
                    fs.writeSync(fd, '    var options = {\n');
                    fs.writeSync(fd, '      url: "https://www.bungie.net/Platform/" + req.originalUrl.replace("/bungie/", ""),\n');
                    fs.writeSync(fd, '      headers: {\n');
                    fs.writeSync(fd, '        "X-API-Key": api_key\n');
                    fs.writeSync(fd, '      }\n');
                    fs.writeSync(fd, '    };\n');
                    fs.writeSync(fd, '    try {request(options, function(error, response, body) {\n');
                    fs.writeSync(fd, '      if (!error) {\n');
                    fs.writeSync(fd, '        res.write(body);\n');
                    fs.writeSync(fd, '      } else {\n');
                    fs.writeSync(fd, '        res.write(error);\n');
                    fs.writeSync(fd, '      }\n');
                    fs.writeSync(fd, '      res.end()})}\n');
                    fs.writeSync(fd, '    catch(e) {}\n');
                    fs.writeSync(fd, '  });\n');
                    fs.writeSync(fd, '  app.all("*", function (req, res, next) {\n');
                    fs.writeSync(fd, '    res.header("Access-Control-Allow-Origin", "http://www.destinytrialsreport.com");\n');
                    fs.writeSync(fd, '    return next();\n');
                    fs.writeSync(fd, '  });\n');
                    fs.writeSync(fd, '  var port = process.env.PORT || 9000;\n');
                    fs.writeSync(fd, '  app.listen(port, function() {\n');
                    fs.writeSync(fd, '    console.log("Listening on port " + port);\n');
                    fs.writeSync(fd, '  });\n');
                    fs.writeSync(fd, '}');
                    done();
                }
            }, {
                //Add .gitignore to ensure node_modules folder doesn't get uploaded
                file: 'heroku/.gitignore',
                method: function(fs, fd, done) {
                    fs.writeSync(fd, 'node_modules');
                    done();
                }
            }]
        }
    },
    //Heroku Settings
    shell: {
        'heroku-create': {
            command: [
                'cd heroku',
                'heroku create ' + herokuAppName,
                'heroku config:set PORT=80 --app ' + herokuAppName
            ].join('&&')
        },
        'heroku-dyno': {
            command: [
                'cd heroku',
                'heroku ps:scale web=1 --app trials-report'
            ].join('&&')
        },
        'heroku-git-init': {
            command: [
                'cd heroku',
                'git init',
                'git remote add heroku https://git.heroku.com/trials-report.git'
            ].join('&&')
        },
        'heroku-git-push': {
            command: [
                'cd heroku',
                'git add -A',
                'git commit -m "' + (grunt.option('gitm') ? grunt.option('gitm') : 'updated') + '"',
                'git push --force heroku master'
            ].join('&&')
        }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'postcss']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: ['.tmp', '.', appConfig.app],
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
            return middlewares;
          }
        },
        proxies: [{
          context: ['/ps', '/xbox'],
          host: 'localhost',
          port: 9000,
          https: false,
          xforward: false,
          rewrite: {
            '^/ps': '/#!ps',
            '^/xbox': '/#!xbox'
          }
        }, {
          context: '/bungie',
          host: 'www.bungie.net',
          port: 80,
          https: false,
          xforward: false,
          rewrite: {
            '^/bungie': '/Platform'
          },
          headers: {
            'host': 'www.bungie.net',
            'X-API-Key': 'dda6142418ea4acc9cb2adc44ea541e8'
          }
        }]
      },
      test: {
        options: {
          port: 9001,
          base: ['.tmp', 'test', '.', appConfig.app]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*',
            //Heroku Settings
            '!<%= yeoman.dist %>/Procfile',
            '!<%= yeoman.dist %>/manifest.js',
            '!<%= yeoman.dist %>/package.json',
            '!<%= yeoman.dist %>/server.js',
            '!<%= yeoman.dist %>/.gitignore'
          ]
        }]
      },
      //Heroku Settings
      heroku: {
          files: [{
              dot: true,
              src: [
                  'heroku/*',
                  '!heroku/.git*',
                  '!heroku/.gitignore',
                  '!heroku/.server.js',
                  '!heroku/.Procfile'
              ]
          }]
      },
      server: '.tmp'
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: 'last 1 version'}) // add vendor prefixes
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/**/*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      //jpg: {
      //  options: {
      //    progressive: true
      //  }
      //},
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    ngtemplates: {
      trialsReportApp: {
        cwd: '<%= yeoman.app %>',
        src: 'views/{,*/}*.html',
        dest: '.tmp/templates.js',
        options: {
          usemin: 'scripts/scripts.js',
          htmlmin: '<%= htmlmin.dist %>'
        }
      }
    },

    // gzip assets 1-to-1 for production
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: '<%= yeoman.dist %>/scripts/',
        src: ['**/*'],
        dest: '<%= yeoman.dist %>/scripts/',
        rename: function (dest, src) {
          return 'dist/scripts/' + src + '.gz';
        }
      }
    },
    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      //Heroku Settings
      heroku: {
          files: [{
              dest: 'heroku/bower.json',
              src: 'bower.json'
          }, {
              expand: true,
              dot: true,
              cwd: '<%= yeoman.app %>',
              dest: 'heroku',
              src: [
                  '**'
              ]
          }]
      },
      herokumin: {
          files: [{
              expand: true,
              dot: true,
              cwd: '<%= yeoman.dist %>',
              dest: 'heroku',
              src: [
                  '**'
              ]
          }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'newrelic.js',
            'views/{,*/}*.html',
            'json/{,*/}*.json',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*',
            'lib/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          dest: '<%= yeoman.dist %>',
          src: ['manifest.js']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/font-awesome/fonts/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'postcss:server',
      'configureProxies:livereload',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'postcss',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'compress'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  //Heroku Settings
  grunt.registerTask('heroku', function(method) {
      if (typeof grunt.option('min') === 'undefined') {
          grunt.option('min', true);
      }
      if (grunt.option('min')) {
          grunt.option('cwd', 'dist');
      } else {
          grunt.option('cwd', 'app');
      }
      if(method === 'init') {
        grunt.task.run([
            'mkdir:heroku'
        ]);
      }
      grunt.task.run([
          'clean:heroku',
          'file-creator:heroku'
      ]);
      if (grunt.option('min')) {
          grunt.task.run([
              'copy:herokumin'
          ]);
      } else {
          grunt.task.run([
              'copy:heroku'
          ]);
      }
      switch (method) {
          case 'init':
              grunt.task.run([
                  'shell:heroku-git-init',
                  'shell:heroku-git-push',
                  'shell:heroku-dyno'
              ]);
              break;
          case 'push':
              grunt.task.run([
                  'shell:heroku-git-push'
              ]);
              break;
          default:
              console.log('heroku:' + method + ' is not a valid target.');
              break;
      }
  });
};
