import { createNewPost, insertBlock, getEditedPostContent } from '@wordpress/e2e-test-utils';

describe( 'maps', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	test( 'block post content stays the same', async () => {
		await insertBlock( 'Mapkit' );
		expect( await getEditedPostContent() ).toMatchSnapshot();
	} );
} );
