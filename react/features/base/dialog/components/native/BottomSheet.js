// @flow

import React, { PureComponent, type Node } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { ColorSchemeRegistry } from '../../../color-scheme';
import { SlidingView } from '../../../react';
import { connect } from '../../../redux';
import { StyleType } from '../../../styles';

import { bottomSheetStyles as styles } from './styles';

/**
 * The type of {@code BottomSheet}'s React {@code Component} prop types.
 */
type Props = {

    /**
     * The color-schemed stylesheet of the feature.
     */
    _styles: StyleType,

    /**
     * The children to be displayed within this component.
     */
    children: Node,

    /**
     * Handler for the cancel event, which happens when the user dismisses
     * the sheet.
     */
    onCancel: ?Function
};

/**
 * A component emulating Android's BottomSheet.
 */
class BottomSheet extends PureComponent<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _styles } = this.props;

        return (
            <SlidingView
                onHide = { this.props.onCancel }
                position = 'bottom'
                show = { true }>
                <View
                    pointerEvents = 'box-none'
                    style = { styles.sheetContainer }>
                    <View
                        pointerEvents = 'box-none'
                        style = { styles.sheetAreaCover } />
                    <View
                        style = { [
                            styles.sheetItemContainer,
                            _styles.sheet
                        ] }>
                        <SafeAreaView>
                            <ScrollView
                                bounces = { false }
                                showsVerticalScrollIndicator = { false } >
                                { this.props.children }
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </View>
            </SlidingView>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _styles: StyleType
 * }}
 */
function _mapStateToProps(state) {
    return {
        _styles: ColorSchemeRegistry.get(state, 'BottomSheet')
    };
}

export default connect(_mapStateToProps)(BottomSheet);
