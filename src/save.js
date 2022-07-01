/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const {
		horizontalOffset,
		verticalOffset,
		blur,
		spread,
		boxShadowColor,
		customBoxShadowColor,
	} = attributes;

	// Convert numbers into a string with pixel values (e.g. 5px 5px 10px 0px).
	const shadowPixelValues = [
		horizontalOffset,
		verticalOffset,
		blur,
		spread,
	].map(x => x + "px").join(' ');

	// Set custom color if added by user. Otherwise use text color as default.
	let shadowColor;
	if ( boxShadowColor != undefined ) {
		shadowColor = `var(--wp--preset--color--${boxShadowColor})`;
	} else if ( customBoxShadowColor != undefined ) {
		shadowColor = customBoxShadowColor;
	} else {
		shadowColor = "currentColor";
	}

	const blockProps = useBlockProps.save( {
		style: {
			boxShadow: `${shadowPixelValues} ${shadowColor}`,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	return <div { ...innerBlocksProps } />;
}
