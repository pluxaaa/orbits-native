import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import OrbitScreen from '../screens/OrbitDetScreen'

export default function OrbitCard({ navigation, ...props }) {
    const orbitImages = {
        'Молния': 'Molniya.png',
        'Геостационарная орбита': 'GEO.png',
        'Геопереходная орбита': 'GTO.png',
        'Низкая околоземная орбита': 'LEO.png',
        'Средняя околоземная орбита': 'MEO.png',
        'Солнечно-синхронная орбита': 'SSO.png',
    };

    const handlePress = () => {
        navigation.navigate('Подробнее', { name: props.Name })
    }
    const imageName = orbitImages[props.Name];
    const imageUrl = `http://192.168.1.21:9000/pc-bucket/${imageName}`;
    const defaultImage = require('../assets/DEFAULT.jpg');
    return (
        <View style={styles.card}>
                <Text style={styles.brandTitle}>{props.Name}</Text>
            <Image
                style={styles.image}
                source={{ uri: imageUrl, cache: 'reload' }}
                defaultSource={defaultImage}
                resizeMode='contain'
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>Подробнее</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 20,
        textAlign: 'center',
        shadowColor: 'rgb(0, 18, 70)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    button: {
        marginTop: 16,
        backgroundColor: '#0E3E8DFF',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    image: { height: 320, alignSelf: 'stretch' },
    brandTitle: { color: 'black', fontSize: 20, fontWeight: 'bold' },
    text: { color: '#f0f0f0', fontSize: 16 },
});