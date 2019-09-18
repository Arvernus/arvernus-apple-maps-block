/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CheckApi from './components/CheckApi';
import ToggleSidebarButton from './components/ToggleSidebarButton';
import AdvancedBlockSidebar from './components/AdvancedBlockSidebar';
import BlockSidebar from './components/BlockSidebar';
import AuthenticatedEdit from './components/authenticatedEdit';

const edit = ( props ) => {
	const {
		attributes,
		attributes: { authenticated },
		setAttributes,
	} = props;

	return (
		<Fragment>
			<BlockSidebar attributes={ attributes } setAttributes={ setAttributes } />
			<AdvancedBlockSidebar
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<CheckApi { ...props } />
			{ authenticated ? (
				<AuthenticatedEdit { ...props } />
			) : (
				<p>
					{ __(
						'Please enter an API key in the block settings',
						'arvernus-apple-maps-block'
					) + ' ' }
					<ToggleSidebarButton />
				</p>
			) }
		</Fragment>
	);
};

export default edit;
