/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	SHORTCODE_FETCH,
	SHORTCODE_RECEIVE
} from 'state/action-types';

export function fetchShortcode( siteId, shortcode ) {
	return ( dispatch ) => {
		dispatch( {
			type: SHORTCODE_FETCH,
			payload: { siteId, shortcode }
		} );

		return wpcom.undocumented().site( siteId ).shortcodes( {
			shortcode: shortcode
		}, ( error, data ) => {
			dispatch( {
				type: SHORTCODE_RECEIVE,
				payload: { siteId, shortcode, data },
				error: error
			} );
		} );
	};
}
