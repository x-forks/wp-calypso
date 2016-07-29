/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import Button from 'components/button';
import { selectStep } from 'state/ui/guided-tours/selectors';
import { posToCss, getStepPosition, getValidatedArrowPosition, targetForSlug } from './positioning';

const bindTourName = ( nextFn, tourName ) => stepName =>
	nextFn( { tour: tourName, stepName } );

export const Tour = ( { name, context, children, state, next, quit } ) => {
	console.log( 'tour state ', state );
	console.log( 'tour props ', next, quit );
	const nextStep = selectStep( state, children );
	if ( ! nextStep || ! context( state ) ) {
		return null;
	}

	return React.cloneElement( nextStep, {
		state,
		quit,
		next: bindTourName( next, name )
	} );
};

Tour.propTypes = {
	name: PropTypes.string.isRequired
};

export class Step extends Component {
	constructor( props ) {
		super( props );
		this.next = this.next.bind( this );
		this.quit = this.quit.bind( this );
	}

	componentWillMount() {
		console.log( 'state', this.props.state );
		this.skipIfInvalidContext( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		this.skipIfInvalidContext( nextProps );
	}

	skipIfInvalidContext( props ) {
		const { context, state } = props;
		if ( context && ! context( state ) ) {
			this.next( props );
		}
	}

	next( props ) {
		const { next, nextStep } = props;
		next( nextStep );
	}

	quit( props ) {
		const { quit } = props;
		quit( /** finished **/ );
	}

	render() {
		const { context, children, state } = this.props;

		if ( context && ! context( state ) ) {
			return null;
		}

		const stepPos = getStepPosition( this.props );
		const stepCoords = posToCss( stepPos );
		const { text, onNext, onQuit, targetSlug, arrow } = this.props;

		const classes = [
			'guided-tours__step',
			'guided-tours__step-glow',
			targetSlug && 'guided-tours__step-pointing',
			targetSlug && 'guided-tours__step-pointing-' + getValidatedArrowPosition( {
				targetSlug,
				arrow,
				stepPos
			} ),
		].filter( Boolean );

		return (
			<Card className={ classNames( ...classes ) } style={ stepCoords } >
				{ React.Children.map( children, ( child ) =>
						React.cloneElement( child, {
						next: this.next.bind( this, this.props ),
						quit: this.quit.bind( this, this.props ),
						nextStep: this.props.nextStep,
					} ) )
				}
			</Card>
		);
	}
}

Step.propTypes = {
	name: PropTypes.string.isRequired,
};

export class Next extends Component {
	constructor( props ) {
		super( props );
		console.log( 'props', this.props );
		this.next = this.next.bind( this );
	}

	next() {
		const { next, nextStep } = this.props;
		console.log( 'next', next, this.props );
		next( nextStep );
	}

	render() {
		console.log( 'props', this.props );
		return (
			<Button primary onClick={ this.props.next }>
				{ this.props.children || 'Next' }
			</Button>
		);
	}
}

Next.propTypes = {
	children: PropTypes.node.isRequired,
};

export class Quit extends Component {
	constructor( props ) {
		super( props );
		this.quit = this.quit.bind( this );
	}

	quit() {
		const { quit } = this.props;
		quit( /** finished **/ );
	}

	render() {
		console.log( 'props', this.props );
		return (
			<Button onClick={ this.props.quit }>
				{ this.props.children || 'Quit' }
			</Button>
		);
	}
}

Next.propTypes = {
	children: PropTypes.node.isRequired,
};

export class Continue extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return <i>Click to continue</i>;
	}
}

export class Link extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return <a>Some link</a>;
	}
}