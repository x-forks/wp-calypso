/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { omit, noop } from 'lodash';

export default React.createClass( {
	displayName: 'SharingButtonsPreviewAction',

	propTypes: {
		active: PropTypes.bool,
		position: PropTypes.oneOf( [
			'top-left',
			'top-right',
			'bottom-left',
			'bottom-right'
		] ),
		icon: PropTypes.string,
		onClick: PropTypes.func
	},

	getDefaultProps() {
		return {
			active: true,
			position: 'top-left',
			onClick: noop
		};
	},

	getIconElement() {
		if ( this.props.icon ) {
			return <span className={ 'noticon noticon-' + this.props.icon } />;
		}
	},

	render() {
		const classes = classNames( 'sharing-buttons-preview-action', {
			'is-active': this.props.active,
			'is-top': 0 === this.props.position.indexOf( 'top' ),
			'is-right': -1 !== this.props.position.indexOf( '-right' ),
			'is-bottom': 0 === this.props.position.indexOf( 'bottom' ),
			'is-left': -1 !== this.props.position.indexOf( '-left' )
		} );

		return (
			<button type="button" className={ classes } { ...omit( this.props, [ 'active', 'position' ] ) }>
				{ this.getIconElement() }
				{ this.props.children }
			</button>
		);
	}
} );
