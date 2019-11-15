import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import Colors from '../../Template/Constants/colors';
import Title from '../../Atom/Title/Title';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Title style={styles.headerTitle}>{props.title}</Title>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        //paddingTop: 0,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'black',
        //fontSize: 18,
    }
});

export default Header;