/**
 * WordPress dependencies
 */
import {
	createNewPost,
	activatePlugin,
	insertBlock,
	getEditedPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';

describe( 'Add Block', () => {
	it( 'Can Add Block', async () => {
		await activatePlugin( 'arvernus-apple-maps-block' );
		await createNewPost();
		await insertBlock( 'Mapkit' );
		await publishPost();
		expect( await getEditedPostContent() ).toMatchSnapshot();
		await browser.close();
	} );
} );
