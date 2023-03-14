import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import haversine from "haversine";


const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  const [duration, setDuration] = React.useState(33);
  const [distance, setDistance] = React.useState();

  const [origin, setOrigin] = useState({
    latitude: "10.848713571152368",
    longitude: "106.77353378151732",
  });

  const [destination, setDestination] = React.useState({
    latitude: restaurant.lat,
    longitude: restaurant.long,
  });

  useEffect(() => {
    getCurrentLocation()
      .then((location) => setOrigin(location))
      .catch((error) => alert(error.message));
  }, []);

  const getCurrentLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Mylocation");
      const results = jsonValue.split(",");
      return { latitude: results[0], longitude: results[1] };
    } catch (e) {}
  };

  const getDistance = (lat, long) => {
    const destination = {
      latitude: lat,
      longitude: long,
    };
    return haversine(origin, destination, { unit: "km" }).toFixed(1);
  };

  return (
    <View style={styles.AndroidSafeArea}>
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-5 z-50 shadow-md ">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">{duration} Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://i.giphy.com/media/gsr9MG7bDvSRWWSD1Y/giphy.webp",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={60} indeterminate={true} color="#00CCBB" />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared
          </Text>
          <Text className=" text-gray-500">
            Distance: {getDistance(restaurant.lat,restaurant.long)} km
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        className="flex-1 -mt-19 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          color="#00CCBB"
        />

        {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onReady={(result) => {
            setDistance(result.distance);
            setDuration(result.duration);
          }}
        /> */}
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Ho Nguyen</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#00CCBB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default DeliveryScreen;
