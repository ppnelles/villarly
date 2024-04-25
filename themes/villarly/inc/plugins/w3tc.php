<?php


/*// Schedule Cron Job Event
 
function w3tc_cache_flush() {
	if ( ! wp_next_scheduled( 'w3_flush_cache' ) ) {
		wp_schedule_event( current_time( 'timestamp' ), 'twicedaily', 'w3_flush_cache' );
	}
}
 
add_action( 'wp', 'w3tc_cache_flush' );*/