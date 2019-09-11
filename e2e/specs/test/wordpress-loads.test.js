/**
 * WordPress dependencies
 */
import { visitAdminPage } from '@wordpress/e2e-test-utils';

describe( 'WordPress loads correctly', () => {
	it( 'Should load admin page properly', async () => {
		await visitAdminPage( '/' );
		const nodes = await page.$x( '//h2[contains(text(), "Welcome to WordPress!")]' );
		expect( nodes.length ).not.toEqual( 0 );
		await browser.close();
	} );
} );
