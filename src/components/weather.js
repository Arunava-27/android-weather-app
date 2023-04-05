/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
// import weatherConditions from '../utils/weatherConditi

const Weather = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [conditions, setConditions] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [icon, setIcon] = useState(null);

  const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return 'https://images.unsplash.com/photo-1468436385273-8abca6dfd8c1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBzaGFyZXRocm91Z2glMjBwcm9wZXJ0aWVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80';
      case 'Clouds':
        return 'https://images.unsplash.com/photo-1550300248-c1e5b5c5df6a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWRzJTIwYnJvd25zdHJhaWdodHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80';
      case 'Rain':
      case 'Drizzle':
      case 'Mist':
        return 'https://images.unsplash.com/photo-1551076806-86b7f0a9b2e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbmUlMjBzaGFyZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
      case 'Thunderstorm':
        return 'https://images.unsplash.com/photo-1571756570733-4a212e9c2e48?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGh1bmRlcnN0b3JtfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80';
      case 'Snow':
        return 'https://images.unsplash.com/photo-1519680772-8b5c1b6b5f0d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25vd3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80';
      default: {
        return 'https://images.unsplash.com/photo-1468436385273-8abca6dfd8c1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBzaGFyZXRocm91Z2glMjBwcm9wZXJ0aWVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80';
      }
    }
  };

  useEffect(() => {
    if (backgroundImage) {
      Image.prefetch(backgroundImage);
    }
  }, [backgroundImage]);

  const handleFetchWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=32f5c2500860ff9eb89824308d4b98ef&units=metric`,
      )
      .then(response => {
        setTemperature(response.data.main.temp);
        setConditions(response.data.weather[0].description);
        setIcon(response.data.weather[0].icon);
        // setBackgroundImage(weatherConditions[response.data.weather[0].main].background);
        setBackgroundImage(getBackgroundImage(response.data.weather[0].main));
        axios
          .get(
            `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=z94C25d5iTQEj7FfM8cRZEsMVnMYejAy9agZ084iB40`,
          )
          .then(unsplashResponse =>
            setBackgroundImage(unsplashResponse.data.results[0].urls.regular),
          )
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      {backgroundImage && (
        <ImageBackground
          style={styles.backgroundImage}
          source={{uri: backgroundImage}}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={text => setCity(text)}
              placeholder="Enter city name"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleFetchWeather}>
              <Text style={styles.buttonText}>Get Weather</Text>
            </TouchableOpacity>
            {temperature && conditions && (
              <>
                <Image
                  style={styles.icon}
                  source={{uri: `http://openweathermap.org/img/w/${icon}.png`}}
                />
                <Text style={styles.temperature}>{temperature}°C</Text>
                <Text style={styles.conditions}>{conditions}</Text>
              </>
            )}
          </View>
        </ImageBackground>
      )}
      {!backgroundImage && (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={text => setCity(text)}
            placeholder="Enter city name"
          />
          <TouchableOpacity style={styles.button} onPress={handleFetchWeather}>
            <Text style={styles.buttonText}>Get Weather</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  temperature: {
    fontSize: 40,
    color: '#fff',
    marginVertical: 10,
  },
  conditions: {
    fontSize: 20,
    color: '#fff',
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default Weather;
