import { View, Text, Button, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../api';
import { StyleSheet } from 'react-native'
import { setOrbits } from '../store/orbitSlice';
import OrbitCard from '../components/OrbitCard';

export default function OrbitsScreen({ navigation }) {
    const dispatch = useDispatch()
    const {orbits} = useSelector((store) => store.orbit)

    useEffect(() => {
        async function getAllOrbits() {
            await axiosInstance.get('/orbits').then((response) => dispatch(setOrbits(response?.data)))
        }
        getAllOrbits()
        console.log("ORBITS: ", orbits)
    }, [dispatch])
    return (
        <ScrollView>
            <View>
                {!!orbits && 
                    orbits.map((orbit) => <OrbitCard key={orbit.ID} {...orbit} navigation={navigation}></OrbitCard>)
                    }
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
    },
});