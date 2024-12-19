import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native'
import React from 'react'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { normalize } from '@/constants/normalizer';

const contactus = () => {
    const sendEmail = (recipient: string) => {
        const emailUrl = `mailto:${recipient}`;

        Linking.canOpenURL(emailUrl)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(emailUrl);
                } else {
                    Alert.alert('Error', 'No email app available to handle this request');
                }
            })
            .catch((err) => console.error('Error opening email app:', err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.bgEffect}>
            </View>
            <View style={styles.contactingContainer}>
                <TouchableOpacity style={styles.contactingInput} onPress={() => { sendEmail("Raneem.1322532@stemdakahlia.moe.edu.eg") }}>
                    <MaterialCommunityIcons name="microsoft-outlook" size={35} color="#0464b8" />
                    <Text style={styles.contactingInputText}>Contact Raneem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactingInput} onPress={() => { sendEmail("Mona.1322539@stemdakahlia.moe.edu.eg") }}>
                    <MaterialCommunityIcons name="microsoft-outlook" size={35} color="#0464b8" />
                    <Text style={styles.contactingInputText}>Contact Mona</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactingInput} onPress={() => { sendEmail("Mawadda.1322518@stemdakahlia.moe.edu.eg") }}>
                    <MaterialCommunityIcons name="microsoft-outlook" size={35} color="#0464b8" />
                    <Text style={styles.contactingInputText}>Contact Mawadda</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default contactus;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    },
    bgEffect: {
        backgroundColor: 'rgb(243, 239, 229)',
        height: 100,
        position: 'absolute',
        width: '100%'
    },
    contactingContainer: {
        padding: 20,
        gap: 10
    },
    contactingInput: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#ddd",
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contactingInputText: {
        fontWeight: 600,
        fontSize: normalize(22),
        color: "#0464b8"
    }
})