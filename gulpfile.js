var gulp = require('gulp')
var tslint = require('gulp-tslint')
var eslint = require('gulp-eslint')
var ts = require('gulp-typescript')
var Server = require('karma').Server
var del = require('del')
var path = require('path')

gulp.task('default', ['tslint', 'eslint', 'clean'])

/**
 * Run the tslint task.
 */
gulp.task('tslint', function () {
    return gulp.src([
        './src/**/**.ts', './e2e/**/**.test.ts'
    ])
        .pipe(tslint({
            formatter: 'verbose',
            configuration: 'tslint.json'
        }))
        .pipe(tslint.report())
})

/**
 * Run the eslint task.
 */
gulp.task('eslint', () => {
    return gulp.src(['./server/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

/**
 * Clean the dist folder.
 */
gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb)
    return gulp.src([
        './src/**/**.ts', './e2e/**/**.test.ts'
    ])
})

/**
 * Compile typescript files.
 */
var tsProject = ts.createProject('tsconfig.json')
gulp.task('tsc', ['clean'], function () {
    var tsResult = gulp.src('packages/**/*.ts')
        .pipe(tsProject())
    return tsResult.js.pipe(gulp.dest('dist'))
})

/**
 * Run the karma test after the tsc task is finished.
 */
gulp.task('test', ['tsc'], function (done) {
    new Server({
        configFile: path.join(__dirname, '/karma.conf.js'),
        singleRun: true
    }, done).start()
})
