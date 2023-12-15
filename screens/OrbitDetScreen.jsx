import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setOrbit, resetOrbit } from '../store/orbitSlice';
import React from 'react';
import { axiosInstance } from '../api';

export default function OrbitDetScreen({ route, navigation }) {
  const { name } = route.params;
  const dispatch = useDispatch();
  const { orbit } = useSelector((store) => store.orbit);

  const orbitImages = {
    'Молния': 'Molniya.png',
    'Геостационарная орбита': 'GEO.png',
    'Геопереходная орбита': 'GTO.png',
    'Низкая околоземная орбита': 'LEO.png',
    'Средняя околоземная орбита': 'MEO.png',
    'Солнечно-синхронная орбита': 'SSO.png',
  };
  const imageName = orbitImages[orbit?.Name]


  useEffect(() => {
    async function getOneOrbit() {
      try {
        const response = await axiosInstance.get(`/orbits/${name?.toString()}`);
        dispatch(setOrbit(response?.data));
      } catch (error) {
        console.error('Ошибка получения орбиты:', error);
      }
    }

    getOneOrbit();

    return () => {
      dispatch(resetOrbit());
    };
  }, [dispatch, name]);

  return (
    <View style={styles.container}>
      <Text style={styles.brandTitle}> {orbit?.Name}</Text>
      <Image source={ { uri: `http://192.168.1.21:9000/pc-bucket/${imageName}` }} style={styles.image} />
      <View style={styles.rightContent}>
        <Text>Статус: {orbit?.IsAvailable ? 'Доступна' : 'Недоступна'}</Text>
        <Text>Апогей: {orbit?.Apogee}</Text>
        <Text>Перигей: {orbit?.Perigee}</Text>
        <Text>Наклонение: {orbit?.Inclination}</Text>
        <Text>Описание: {orbit?.Description}</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Орбиты')}
      >
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    padding: 16,
  },
  brandTitle: { color: 'black', fontSize: 20, fontWeight: 'bold' },
  image: { height: 260, alignSelf: 'stretch' },
  rightContent: {
    marginLeft: 8,
  },
  backButton: {
    marginTop: 16,
    backgroundColor: '#0E3E8DFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
};
