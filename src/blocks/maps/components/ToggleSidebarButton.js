/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

const ToggleSidebarButton = ( {
	isEditorSidebarOpened,
	openGeneralSidebar,
} ) => {
	if ( isEditorSidebarOpened ) {
		return null;
	}
	return (
		<Button className="is-button is-primary" onClick={ openGeneralSidebar }>
			Open Block Settings
		</Button>
	);
};

export default compose(
	withSelect( ( select ) => {
		return {
			isEditorSidebarOpened: select( 'core/edit-post' ).isEditorSidebarOpened(),
		};
	} ),
	withDispatch( ( dispatch, ownProps, { select } ) => {
		const { getBlockSelectionStart } = select( 'core/editor' );
		const { openGeneralSidebar, closeGeneralSidebar } = dispatch( 'core/edit-post' );

		return {
			openGeneralSidebar: () =>
				openGeneralSidebar( getBlockSelectionStart() ? 'edit-post/block' : 'edit-post/document' ),
			closeGeneralSidebar,
		};
	} )
)( ToggleSidebarButton );
