/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import { LOAD_STATUS } from './constants';
import {
	SHORTCODE_FETCH,
	SHORTCODE_RECEIVE
} from 'state/action-types';

const siteShortcodeStatus = createReducer( null, {
	[ SHORTCODE_FETCH ]: ( state ) => {
		return { ...state, ...{ status: LOAD_STATUS.LOADING } };
	},
	[ SHORTCODE_RECEIVE ]: ( state, { error } ) => {
		return { ...state, ...{ status: error ? LOAD_STATUS.ERROR : LOAD_STATUS.LOADED } };
	},
} );

const siteShortcodes = ( state = {}, action ) => {
	switch ( action.type ) {
		case SHORTCODE_FETCH:
		case SHORTCODE_RECEIVE:
			const { shortcode } = action;
			return { ...state, ...{ [ shortcode ]: siteShortcodeStatus( state[ shortcode ] || {}, action ) } };
	}

	return state;
};

export default ( state = {}, action ) => {
	switch ( action.type ) {
		case SHORTCODE_FETCH:
		case SHORTCODE_RECEIVE:
			const { siteId } = action;
			return { ...state, ...{ [ siteId ]: siteShortcodes( state[ siteId ] || {}, action ) } };
	}

	return state;
};
