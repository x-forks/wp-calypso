/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';

const SharingButtonsPreviewAction = ( props ) => {
	const { active, position, icon, children } = props;
	const classes = classNames( 'sharing-buttons-preview-action', {
		'is-active': active,
		'is-top': 0 === position.indexOf( 'top' ),
		'is-right': -1 !== position.indexOf( '-right' ),
		'is-bottom': 0 === position.indexOf( 'bottom' ),
		'is-left': -1 !== position.indexOf( '-left' )
	} );

	return (
		<button type="button" className={ classes } { ...omit( props, [ 'active', 'position' ] ) }>
			{ icon && <span className={ 'noticon noticon-' + icon } /> }
			{ children }
		</button>
	);
};

SharingButtonsPreviewAction.propTypes = {
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

SharingButtonsPreviewAction.defaultProps = {
	active: true,
	position: 'top-left',
	onClick: () => {}
};

export default SharingButtonsPreviewAction;
