module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        concat: {
            options: { //可选项配置
                separator: ';'   //使用;连接合并
            },
            dist: { //此名称任意
                src:  ["src/js/*.js"],  //合并哪些js文件
                dest: "build/js/build.js" //输出的js文件
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                files: {
                    'build/js/build1.min.js': ['build/js/build.js']
                }
            }
        },
        jshint : {
            options: {
                jshintrc : '.jshintrc' //指定配置文件
            },
            build : ['Gruntfile.js', 'src/js/*.js'] //指定检查的文件
        },
        cssmin:{
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: {
                    'build/css/output.min.css': ['src/css/*.css']
                }
            }
        },
        watch : {
            scripts : {
                files : ['src/js/*.js', 'src/css/*.css'],
                tasks : ['concat', 'jshint', 'uglify', 'cssmin'],
                options : {spawn : false}
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat','uglify','jshint','cssmin']);
    grunt.registerTask('myWatch', ['default','watch']);

};