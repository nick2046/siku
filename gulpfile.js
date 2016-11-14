var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	rev = require('gulp-rev'),
	inject = require('gulp-inject'),
	clean = require('gulp-clean'),
	sequence = require('gulp-sequence');

gulp.task('localhost',function(){
	return connect.server({
		root:'app/',
		port:8090
	})
});
gulp.task('less',function(){
	console.log('less编译=========');
	return gulp.src('app/less/*.less')
		   .pipe( less() )
		   .pipe( autoprefixer({
				browsers: [
				  "ie >= 8",
				  "ff >= 26",
				  "chrome >= 30",
				  "safari >= 6",
				  "opera >= 23"
				],
	            cascade: true
		}))
		   .pipe( gulp.dest('app/css/') )
		   .pipe( concat('app.min.css') )
		   .pipe( gulp.dest('app/') )
});
gulp.task('js',function(){
	console.log('js编译===========');
	return gulp.src('app/js/*.js')
		.pipe( concat('app.min.js') )
		.pipe( gulp.dest('app/') )
});
gulp.task('rev',function(){
	return gulp.src(['app/app.min.css','app/app.min.js'])
		   .pipe( rev() )
		   .pipe( gulp.dest('app/') )
		   .pipe( rev.manifest() )
		   .pipe( gulp.dest('app/') )
});
gulp.task('inject',function(){
	return gulp.src('app/view/home.html')
		   .pipe( inject(
		   			gulp.src(['app/app-*.min.*']),
				   	{ignorePath: 'app/'} )
		   		)
		   .pipe( gulp.dest('app/view/') )
})
gulp.task('cleanCss',function(){
	return gulp.src('app/app-*min.css')
		   .pipe(clean())
});
gulp.task('cleanJs',function(){
	return gulp.src('app/app-*.min.js')
		   .pipe(clean())
});
gulp.task('buildLess',function(cd){
	return sequence('cleanCss','less','rev','inject',cd)
});
gulp.task('buildJs',function(cd){
	return sequence('cleanJs','js','rev','inject',cd)
});
gulp.task('watch',function(){
	gulp.watch('app/less/*.less',['buildLess']);
	gulp.watch('app/js/*.js',['buildJs']);
})
gulp.task('default',['localhost','watch']);
