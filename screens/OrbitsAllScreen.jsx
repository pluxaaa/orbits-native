import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../api';
import { StyleSheet } from 'react-native';
import { setOrbits } from '../store/orbitSlice';
import OrbitCard from '../components/OrbitCard';

export default function OrbitsAllScreen({ navigation }) {
  const dispatch = useDispatch();
  const { orbits } = useSelector((store) => store.orbit);
  const [nameFilter, setNameFilter] = useState('');
  const [inclFilter, setInclFilter] = useState(false);
  const [isCircleFilter, setIsCircleFilter] = useState(false);

  const getAllOrbits = async () => {
    const response = await axiosInstance.get('/orbits', {
      params: {
        orbit_name: nameFilter,
        orbit_incl: inclFilter ? '1' : '',
        is_circle: isCircleFilter ? '1' : '',
      },
    });
    console.log("DATA:", response?.data)
    dispatch(setOrbits(response?.data));
  };

  const clearFilters = async () => {
    setNameFilter('');
    setInclFilter(false);
    setIsCircleFilter(false);
    
    const response = await axiosInstance.get('/orbits', {
        params: {
          orbit_name: '',
          orbit_incl: '',
          is_circle: '',
        },
      });
    dispatch(setOrbits(response?.data));
  };

  useEffect(() => {
    getAllOrbits();
    console.log('ORBITS: ', orbits);
  }, [dispatch]);

  return (
    <ScrollView>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Название орбиты"
          value={nameFilter}
          onChangeText={(text) => setNameFilter(text)}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={inclFilter}
            onValueChange={() => setInclFilter(!inclFilter)}
            style={styles.checkbox}
          />
          <Text>Наклонная</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isCircleFilter}
            onValueChange={() => setIsCircleFilter(!isCircleFilter)}
            style={styles.checkbox}
          />
          <Text>Круговая</Text>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={getAllOrbits}>
          <Text style={styles.filterButtonText}>Поиск</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={clearFilters}>
          <Text style={styles.filterButtonText}>Очистить</Text>
        </TouchableOpacity>
        {!!orbits &&
          orbits.map((orbit) => <OrbitCard key={orbit.ID} {...orbit} navigation={navigation}></OrbitCard>)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    margin: 12,
    padding: 10,
  },
  filterButton: {
    backgroundColor: '#0E3E8DFF',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  filterButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  page: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
});