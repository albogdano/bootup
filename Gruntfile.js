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
		vendor: grunt.file.readJSON(".bowerrc").directory,
		h5bp: "<%= vendor %>/h5bp",
		// Lint JavaScript
		jshint: {
			all: ["Gruntfile.js", "<%= site.helpers %>/*.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		// Build HTML from templates and data
		assemble: {
			options: {
				flatten: true,
				layouts: "<%= site.layouts %>",
				layout: "<%= site.layout %>",
				partials: ["<%= site.partials %>/*.html", templateDir + "/partials/*.html"],
				template: "<%= site.template %>",
				// Metadata
				pkg: "<%= pkg %>",
				site: "<%= site %>",
				data: ["<%= site.data %>"]
			},
			htmls: {
				files: {"<%= site.dest %>/": [templateDir + "/*.html"]}
			},
			phps: ("<%= assemble.options.template %>" === "modern-business") ? {
				options: {
					ext: ".php"
				},
				files: {"<%= site.dest %>/": [templateDir + "/contact.php"]}
			} : {}
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
		// Copy H5BP files to new project, using replacement
		// patterns to convert files into templates.
		copy: {
			content: {
				files: [
//					{flatten: true, expand: true, cwd: "<%= vendor %>/h5bp/", src: ["doc/**"], dest: "tmp/content/"}
					cssCopy, jsCopy,
					{flatten: true, expand: true, cwd: templateDir + "/img/", src: ["*.*"], dest: "<%= site.dest %>/img/"},
					{flatten: true, expand: true, cwd: templateDir + "/", src: ["*.html", "*.php"], dest: "<%= site.dest %>/"}					
				]
			},
			essentials: {
				files: [
//					{expand: true, cwd: "<%= vendor %>/h5bp/", src: ["**/*", "!**/index.html", "!**/docs"], dest: "<%= site.dest %>/"}
					{expand: true, cwd: "<%= h5bp %>", src: ["humans.txt"], dest: "<%= site.dest %>"},
					{expand: true, cwd: "<%= h5bp %>", src: ["robots.txt"], dest: "<%= site.dest %>"},
					{expand: true, cwd: "<%= h5bp %>", src: ["favicon.ico"], dest: "<%= site.dest %>"},
					{expand: true, cwd: "<%= h5bp %>", src: ["apple-touch*"], dest: "<%= site.dest %>"}
				]
			},
			onlycss: { files: [cssCopy] },
			onlyjs: { files: [jsCopy] }
		},
		// Before generating new files remove files from previous build.
		clean: {
			dest: ["<%= site.dest %>/**"]
		},
		
		watch: {
			assemble: {
				files: [templateDir + "/{,*/}*.{md,yml,html}"],
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
	grunt.loadNpmTasks("assemble");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-prettify");

	// Default tasks to be run.
	grunt.registerTask("default", ["test", "copy:content", "assemble", "copy:essentials", "prettify"]);

	// Linting and tests.
	grunt.registerTask("test", ["clean", "jshint"]);
	grunt.registerTask("cb", ["clean", "default"]);	// clean & build
	grunt.registerTask("server", ["cb", "connect:livereload", "watch"]); // watch & live reload
};