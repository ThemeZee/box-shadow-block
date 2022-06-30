/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import {
	PanelBody,
	RangeControl,
} from '@wordpress/components';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
 import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
 export default function Edit( { 
	attributes,
	setAttributes,
} ) {
	const {
		horizontalOffset,
		verticalOffset,
		blur,
		spread,
	} = attributes;

	// Convert numbers into a string with pixel values (e.g. 5px 5px 10px 0px).
	const boxShadowPixel = [
		horizontalOffset,
		verticalOffset,
		blur,
		spread,
	].map(x => x + "px").join(' ');

	const blockProps = useBlockProps( {
		style: {
			boxShadow: boxShadowPixel + " #000000",
		},
	} );

	const innerBlocksProps = useInnerBlocksProps( { ...blockProps } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Box shadow settings' ) }>

					<RangeControl
						label={ __( 'Horizontal offset' ) }
						value={ horizontalOffset }
						onChange={ ( value ) => setAttributes( { horizontalOffset: value } ) }
						min={ -100 }
						max={ 100 }
					/>
					
					<RangeControl
						label={ __( 'Vertical offset' ) }
						value={ verticalOffset }
						onChange={ ( value ) => setAttributes( { verticalOffset: value } ) }
						min={ -100 }
						max={ 100 }
					/>
					
					<RangeControl
						label={ __( 'Blur' ) }
						value={ blur }
						onChange={ ( value ) => setAttributes( { blur: value } ) }
						min={ 0 }
						max={ 100 }
					/>
					
					<RangeControl
						label={ __( 'Spread' ) }
						value={ spread }
						onChange={ ( value ) => setAttributes( { spread: value } ) }
						min={ 0 }
						max={ 100 }
					/>

				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
