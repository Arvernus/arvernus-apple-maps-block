/**
 * Load Gulp Configuration.
 *
 * TODO: Customize your project in the gulp.config.js file.
 */
const config = require( './gulp.config.js' );

/**
 * Load Plugins.
 *
 * Load gulp plugins and passing them semantic names.
 */
const gulp = require( 'gulp' ); // Gulp of-course.

// Copy
const clean = require( 'gulp-clean' );
const zip = require( 'gulp-zip' );

// Utility related plugins.
const notify = require( 'gulp-notify' ); // Sends message notification to you.

/**
 * Custom Error Handler.
 *
 * @param Mixed err
 */
const errorHandler = r => {
	notify.onError( '\n\n❌  ===> ERROR: <%= error.message %>\n' )( r );
	// this.emit('end');
};


/**
 * Empty
 *
 * Empty Build directory
 */
gulp.task( 'emptyBuildDirectory', () => {
	return gulp
		.src( `${config.buildDestination}/${config.packageName}/*`, { })
		.pipe( clean() )
		.pipe( notify({ message: '\n\n✅  ===> EMPTYBUILDDIRECTORY — completed!\n', onLast: true }) );
});


/**
 * Copy
 *
 * Build directory
 */
gulp.task( 'copyToBuildDirectory', () => {
	return gulp
		.src( config.buildFiles )
		.pipe( gulp.dest( `${config.buildDestination}/${config.packageName}/` ) )
		.pipe( notify({ message: '\n\n✅  ===> COPYTOBUILDDIRECTORY — completed!\n', onLast: true }) );
});


/**
 * Zip
 *
 * Build directory
 */
gulp.task( 'zipBuildDirectory', () => {
	return gulp
		.src([ `${config.buildDestination}/**/*`, `!${config.buildDestination}/${config.packageName}.zip` ])
		.pipe( zip( `${config.packageName}.zip` ) )
		.pipe( gulp.dest( 'build' ) )
		.pipe( notify({ message: '\n\n✅  ===> ZIPBUILDDIRECTORY — completed!\n', onLast: true }) );
});

/**
 * Watch Tasks.
 *
 * Watches for file changes and runs specific tasks.
 */
gulp.task(
	'default',
	gulp.series( 'emptyBuildDirectory', 'copyToBuildDirectory', 'zipBuildDirectory' )
);
