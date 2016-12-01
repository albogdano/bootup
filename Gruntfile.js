/*
 * bootUP
 * https://github.com/albogdano/bootup
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

	var cssCopy = {
		flatten: true,
		expand: true,
		cwd: "<%= site.templates %>/<%= site.template %>/css/",
		src: ["*.*"],
		dest: "<%= site.dest %>/css/"
	};

	var jsCopy = {
		flatten: true,
		expand: true,
		cwd: "<%= site.templates %>/<%= site.template %>/js/",
		src: ["*.*"],
		dest: "<%= site.dest %>/js/"
	};

	var templateDir = "<%= site.templates %>/<%= site.template %>";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		site: grunt.file.readJSON("assemble.json"),
		// Build HTML from templates and data
		assemble: {
			options: {
				flatten: true,
				layouts: "<%= site.layouts %>",
				layout: "<%= site.layout %>",
				plugins: ["assemble-partial-data", "<%= site.plugins %>/*.js"],
				helpers: ["handlebars-helper-mdpartial", "<%= site.helpers %>/*.js"],
				partials: ["<%= site.partials %>/*.{html,md}", templateDir + "/partials/*.{html,md}"],
				template: "<%= site.template %>",
				templateDir: templateDir,
				marked: {
					breaks: true,
					gfm: true,
					highlight: function (code) {
						return require("highlight.js").highlightAuto(code).value;
					},
					pedantic: true,
					sanitize: false,
					silent: false
				},
				// Metadata
				pkg: "<%= pkg %>",
				site: "<%= site %>"
			},
			htmls: {
				files: {"<%= site.dest %>/": [templateDir + "/*.html"]}
			},
			phps: ("<%= assemble.options.template %>" === "modern-business") ? {
				options: {ext: ".php"},
				files: { "<%= site.dest %>/": [templateDir + "/contact.php"] }
			} : {}
		},
		// Lint JavaScript
		jshint: {
			all: ["Gruntfile.js", "<%= site.helpers %>/{,*/}*.js", "<%= site.plugins %>/{,*/}*.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		// Validate HTML
		validation: {
			options: {
				reset: true,
				stoponerror: false,
				reportpath: false,
				relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta."] //ignores these errors
			},
			files: {
				src: ["<%= site.dest %>/{,*/}*.html"]
			}
		},
		// Prettify test HTML pages from Assemble task.
		prettify: {
			all: {
				files: [
					{expand: true, cwd: "<%= site.dest %>", src: ["*.html"], dest: "<%= site.dest %>/", ext: ".html"}
				]
			}
		},
		// concat and minify scripts
		uglify: {
		},
		// copy files task
		copy: {
			content: {
				files: [
					cssCopy, jsCopy,
					{flatten: true, expand: true, cwd: templateDir + "/img/", src: ["*.*"], dest: "<%= site.dest %>/img/"},
					{flatten: true, expand: true, cwd: templateDir + "/", src: ["*.html", "*.php"], dest: "<%= site.dest %>/"}
				]
			},
			misc: {
				files: [
					{expand: true, cwd: "<%= site.templates %>/misc", src: ["*.*"], dest: "<%= site.dest %>"},
				]
			},
			onlycss: { files: [cssCopy] },
			onlyjs: { files: [jsCopy] }
		},
		// Before generating new files remove files from previous build.
		clean: {
			options: {
				force: true
			},
			dest: ["<%= site.dest %>/**"]
		},

		watch: {
			assemble: {
				files: [templateDir + "/{,*/}*.{md,yml,html}", "<%= site.layouts %>/*.html"],
				tasks: ["assemble"]
			},
			css: {
				files: templateDir + "/css/*.css",
				tasks: ["copy:onlycss"],
				options: {
					livereload: true
				}
			},
			js: {
				files: templateDir + "/js/*.js",
				tasks: ["copy:onlyjs"],
				options: {
					livereload: true
				}
			},
			livereload: {
				options: {
					livereload: "<%= connect.options.livereload %>"
				},
				files: [
					"<%= site.dest %>/{,*/}*.html",
					"<%= site.dest %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
				]
			}
		},
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to "0.0.0.0" to access the server from outside
				hostname: "localhost"
			},
			livereload: {
				options: {
					open: true,
					base: [
						"<%= site.dest %>"
					]
				}
			}
		}
	});

	// Load npm plugins to provide necessary tasks.
	grunt.loadNpmTasks("grunt-assemble");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-prettify");

	// Default tasks to be run.
	grunt.registerTask("default", ["test", "copy:content", "assemble", "copy:misc", "prettify"]);

	// Linting and tests.
	grunt.registerTask("test", ["clean"]);
	grunt.registerTask("validate", ["jshint"]);	// html && js validation
	grunt.registerTask("cb", ["clean", "default"]);	// clean & build
	grunt.registerTask("server", ["default", "connect:livereload", "watch"]); // watch & live reload
};