/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';

import {
	PanelBody,
	RangeControl,
} from '@wordpress/components';

 import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	PanelColorSettings,
	withColors,
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
function Edit( { 
	attributes,
	boxShadowColor,
	setAttributes,
	setBoxShadowColor,
} ) {
	const {
		horizontalOffset,
		verticalOffset,
		blur,
		spread,
	} = attributes;

	// Convert numbers into a string with pixel values (e.g. 5px 5px 10px 0px).
	const shadowPixelValues = [
		horizontalOffset,
		verticalOffset,
		blur,
		spread,
	].map(x => x + "px").join(' ');

	// Set custom color if added by user. Otherwise use text color as default.
	const shadowColor = boxShadowColor.color ? boxShadowColor.color : "currentColor";

	const blockProps = useBlockProps( {
		style: {
			boxShadow: `${shadowPixelValues} ${shadowColor}`,
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

				<PanelColorSettings 
					__experimentalHasMultipleOrigins
					title={__('Box shadow color')}
					colorSettings={[
						{
							value: boxShadowColor.color,
							onChange: setBoxShadowColor,
							label: __('Shadow')
						},
					]}
				/>

			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}

export default compose( [
	withColors( 'boxShadowColor' ),
] )( Edit );
