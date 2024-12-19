import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { normalize } from '@/constants/normalizer';

const aboutproject = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={require('../../assets/images/about1.jpg')}/>
                    <Image style={styles.img} source={require('../../assets/images/about2.jpg')}/>
                    <Image style={styles.img} source={require('../../assets/images/about3.jpg')}/>
                </View>
                <Text style={styles.text}>This project introduces a smart monitoring system designed to enhance poultry farm management by tracking critical environmental conditions in real time. The system integrates four key sensors to ensure the optimal health and productivity of poultry:</Text>

                <Text style={styles.text}>DHT22 Sensor: Measures temperature and humidity with high precision. It ensures the farm's temperature remains between 22°C and 32°C and humidity stays within 50%-70%, which are ideal conditions for poultry growth.</Text>
                <Text style={styles.text}>MQ-135 Sensor: Detects ammonia levels in the air, a critical factor in poultry health. Ammonia levels above 25 PPM (parts per million) trigger alerts, as prolonged exposure can cause respiratory issues in poultry.</Text>
                <Text style={styles.text}>LDR (Light-Dependent Resistor): Monitors light intensity to maintain adequate lighting, which is essential for the birds' behavior, feeding patterns, and overall well-being.</Text>
                <Text style={styles.text}>Buzzer System: Two buzzers provide immediate audio alerts if any readings exceed or fall below safe thresholds. This ensures quick corrective actions, such as ventilation adjustments or lighting changes.</Text>
                <Text style={styles.text}>The system is paired with an intuitive mobile app that displays real-time data from the sensors. For example, users can see precise values such as a temperature of 28°C, ammonia at 20 PPM, and light intensity measured in lux. The app also notifies users of critical readings, ensuring 24/7 monitoring.</Text>

                <Text style={styles.text}>By incorporating IoT technology, this project aims to enable remote access to farm data, reducing human error and improving efficiency. This innovative approach provides an affordable and reliable solution for maintaining safe and productive poultry farms.</Text>
            </ScrollView>
        </View>
    )
}

export default aboutproject;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    imgContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        justifyContent: 'center',
        marginBottom: 5

    },
    img: {
        width: '49%',
        aspectRatio: 1,
        borderRadius: 10
    },
    text: {
        fontSize: normalize(18),
        marginBottom: 10
    }
})