/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import GridIcon from 'components/gridicon';
import {
	first,
	any,
	when
} from './functional';
import { connectChat } from 'state/happychat/actions';
import {
	getHappychatConnectionStatus,
	getHappychatMinimizingStatus
} from 'state/happychat/selectors';
import {
	openChat,
	closeChat,
	minimizeChat
} from 'state/ui/happychat/actions';
import {
	isConnected,
	isConnecting,
	isMinimizing,
	timeline,
	composer
} from './helpers';
import { translate } from 'i18n-calypso';

const isChatOpen = any( isConnected, isConnecting );
const isChatMinimizing = any( isMinimizing );

/**
 * Renders the title text of the chat sidebar when happychat is connecting.
 * @param {Object} params - parameters for the component
 * @param {function} params.onCloseChat - function called when close button is pressed
 * @returns {Object} react component for title bar
 */
const connectingTitle = ( { onCloseChat } ) => {
	return (
		<div className="happychat__active-toolbar">
		<span>{ translate( 'Starting chat' ) }</span>
			<div onClick={ onCloseChat }>
				<GridIcon icon="chevron-down" />
			</div>
		</div>
	);
};

/**
 * Returns the title bar for Happychat when it is connected
 * @private
 * @param {Object} params - parameters for the component
 * @param {function} params.onCloseChat - function called when close button is pressed
 * @returns {Object} react component for title bar
 */
const connectedTitle = ( { onCloseChat } ) => (
	<div className="happychat__active-toolbar">
	<h4>{ translate( 'WP.com' ) }</h4>
		<div onClick={ onCloseChat }>
			<GridIcon icon="chevron-down" />
		</div>
	</div>
);

/**
 * Function for rendering correct titlebar based on happychat client state
 */
const title = first(
	when( isConnected, connectedTitle ),
	when( isConnecting, connectingTitle ),
	( { onOpenChat } ) => {
		const onClick = () => onOpenChat();
		return <div onClick={ onClick }>{ translate( 'Support Chat' ) }</div>;
	}
);

/*
 * Main chat UI component
 */
const Happychat = React.createClass( {

	componentDidMount() {
		this.props.connectChat();
	},

	render() {
		const {
			connectionStatus,
			minimizingStatus,
			user,
			onCloseChat,
			onOpenChat
		} = this.props;

		return (
			<div className="happychat">
				<div
					className={ classnames( 'happychat__container', { 'is-open': isChatOpen( { connectionStatus } ) }, { 'is-minimizing': isChatMinimizing( { minimizingStatus } ) } ) }>
					<div className="happychat__title">
						{ title( {
							connectionStatus,
							minimizingStatus,
							user,
							onCloseChat,
							onOpenChat
						} ) }
					</div>
					{ timeline( { connectionStatus, minimizingStatus } ) }
					{ composer( { connectionStatus, minimizingStatus } ) }
				</div>
			</div>
		);
	}
} );

const mapState = state => {
	return {
		connectionStatus: getHappychatConnectionStatus( state ),
		minimizingStatus: getHappychatMinimizingStatus( state )
	};
};

const mapDispatch = ( dispatch ) => {
	return {
		onOpenChat() {
			dispatch( openChat() );
		},
		onCloseChat() {
			dispatch( minimizeChat() );
			setTimeout( function() {
				dispatch( closeChat() );
			}, 500 );
		},
		connectChat() {
			dispatch( connectChat() );
		}
	};
};

/*
 * Export redux connected component
 */
export default connect( mapState, mapDispatch )( Happychat );
