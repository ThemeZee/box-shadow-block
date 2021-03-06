/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';

import {
	PanelBody,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

 import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	useSetting,
	PanelColorSettings,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
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
	clientId,
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
		verticalOffset + "px",
		blur + "px",
		spread + "px",
	].join(' ');

	// Set custom color if added by user. Otherwise use text color as default.
	const shadowColor = boxShadowColor.color ? boxShadowColor.color : "currentColor";

	const blockProps = useBlockProps( {
		style: {
			boxShadow: `${shadowPixelValues} ${shadowColor}`,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps( { ...blockProps } );
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const availableUnitSettings = (
		useSetting( 'spacing.units' ) || undefined
	)?.filter( ( availableUnit ) => availableUnit !== '%' );

	const units = useCustomUnits( {
		availableUnits: availableUnitSettings || [
			'px',
			'em',
			'rem',
			'vw',
			'vh',
		],
		defaultValues: { px: 5, em: 0.3, rem: 0.3, vw: 0.3, vh: 0.5 },
	} );

	return (
		<>
			<InspectorControls>
				<ToolsPanel label={ __( 'Box Shadow' ) }>

					<ToolsPanelItem
						hasValue={ () => {
							return horizontalOffset === "5px" ? false : true;
						} }
						label={ __( 'Horizontal Offset' ) }
						onDeselect={ () => setAttributes( { horizontalOffset: "5px" } ) }
						resetAllFilter={ () => ( { horizontalOffset: "5px" } ) }
					>
						<UnitControl
							label={ __( 'Horizontal Offset' ) }
							isResetValueOnUnitChange
							value={ horizontalOffset }
							units={ units }
							onChange={ ( value ) => setAttributes( { horizontalOffset: value } ) }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () => {
							return verticalOffset === 0 ? false : true;
						} }
						label={ __( 'Vertical Offset' ) }
						onDeselect={ () => setAttributes( { verticalOffset: 0 } ) }
						resetAllFilter={ () => ( { verticalOffset: 0 } ) }
					>
						<RangeControl
							label={ __( 'Vertical Offset' ) }
							value={ verticalOffset }
							onChange={ ( value ) => setAttributes( { verticalOffset: value } ) }
							min={ -100 }
							max={ 100 }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () => {
							return blur === 0 ? false : true;
						} }
						label={ __( 'Blur' ) }
						onDeselect={ () => setAttributes( { blur: 0 } ) }
						resetAllFilter={ () => ( { blur: 0 } ) }
					>
						<RangeControl
							label={ __( 'Blur' ) }
							value={ blur }
							onChange={ ( value ) => setAttributes( { blur: value } ) }
							min={ 0 }
							max={ 100 }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () => {
							return spread === 0 ? false : true;
						} }
						label={ __( 'Spread' ) }
						onDeselect={ () => setAttributes( { spread: 0 } ) }
						resetAllFilter={ () => ( { spread: 0 } ) }
					>
						<RangeControl
							label={ __( 'Spread' ) }
							value={ spread }
							onChange={ ( value ) => setAttributes( { spread: value } ) }
							min={ 0 }
							max={ 100 }
						/>
					</ToolsPanelItem>

					<ColorGradientSettingsDropdown
						__experimentalHasMultipleOrigins
						__experimentalIsRenderedInSidebar
						settings={ [
							{
								colorValue: boxShadowColor.color,
								label: __( 'Color' ),
								onColorChange: setBoxShadowColor,
								isShownByDefault: false,
								resetAllFilter: () => ( {
									boxShadowColor: undefined,
									customBoxShadowColor: undefined,
								} ),
							},
						] }
						{ ...colorGradientSettings }
					/>

				</ToolsPanel>

			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}

export default compose( [
	withColors( 'boxShadowColor' ),
] )( Edit );
