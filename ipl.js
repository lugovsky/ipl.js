// Copyright (C) 2014, 12 Quarters Consulting
// All rights reserved.
// Redistribution and use are permitted under the modified BSD license
// available at https://raw.githubusercontent.com/MaxMotovilov/ipl.js/master/LICENSE

var path = require( 'path' ),
	stream = require( './lib/stream_utils' );

function IPL( config ) {

	this.include = stream.select.bind( stream,
		[].concat( config.include || [], path.join( __dirname, 'include' ) )
		  .map( function( x ) {
				return typeof x === 'function' ? x : stream.opener( x );
		  } )
	);

	this.encoding = config.encoding || null;
	this.dontRun = config.dontRun || false;
	this.env = config.env || {};

	this.cache = { html: {}, ipl: {}, build: {} };
}

IPL.prototype = require( './lib/prototype' );

module.exports = function( config ) {
	var ipl = new IPL( config || {} );
	if( arguments.length > 1 )
		return ipl.generate.apply( ipl, Array.prototype.slice.call( arguments, 1 ) );
	else
		return ipl.generate.bind( ipl );
}

