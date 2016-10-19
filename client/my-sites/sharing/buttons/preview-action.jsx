/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { omit, noop } from 'lodash';

export default class SharingButtonsPreviewAction extends Component {
	static propTypes = {
		active: PropTypes.bool,
		position: PropTypes.oneOf( [
			'top-left',
			'top-right',
			'bottom-left',
			'bottom-right'
		] ),
		icon: PropTypes.string,
		onClick: PropTypes.func
	};

	static defaultProps = {
		active: true,
		position: 'top-left',
		onClick: noop
	};

	render() {
		const { active, position, icon, children } = this.props;
		const classes = classNames( 'sharing-buttons-preview-action', {
			'is-active': active,
			'is-top': 0 === position.indexOf( 'top' ),
			'is-right': -1 !== position.indexOf( '-right' ),
			'is-bottom': 0 === position.indexOf( 'bottom' ),
			'is-left': -1 !== position.indexOf( '-left' )
		} );

		return (
			<button type="button" className={ classes } { ...omit( this.props, [ 'active', 'position' ] ) }>
				{ icon && <span className={ 'noticon noticon-' + icon } /> }
				{ children }
			</button>
		);
	}
}
