import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  ArrowLeftIcon,
  StarIcon,
  BuildingStorefrontIcon,
} from "react-native-heroicons/solid";
import { getPosts, urlFor } from "../config/sanitySetup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import haversine from "haversine";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const [filteredDataSource, setFilteredDataSource] = useState([]); //list show
  const [masterDataSource, setMasterDataSource] = useState([]); //list search

  const [myLocation, setMyLocation] = React.useState("");

  //value search from categories
  const {
    params: { value },
  } = useRoute();

  useEffect(() => {
    getCurrentLocation().then((location) => setMyLocation(location));
    
    getPosts(`*[_type=="restaurant"]{
        ...,
        dishes[]->,
      }`).then((data) => {
      setMasterDataSource(data);
      setFilteredDataSource(data);
    });
    searchFilterFunction(value)
    setSearch(value);
  }, []);

  const getCurrentLocation = async () => {
    const value = await AsyncStorage.getItem("Mylocation");
    const result = value.split(",");
    return { latitude: result[0], longitude: result[1] };
  };

  const getDistance = (lat, long) => {
    const destination = {
      latitude: lat,
      longitude: long,
    };
    return haversine(myLocation, destination, { unit: "km" }).toFixed(2);
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      //Flatlist item
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Restaurant", {
            id: item._id,
            imgUrl: item.image,
            title: item.name,
            rating: item.rating,
            genre: item.type?.name,
            address: item.address,
            short_description: item.short_description,
            dishes: item.dishes,
            long: item.long,
            lat: item.lat,
          })
        }
        className="bg-white p-4 border-gray-100 border-b"
      >
        <View className="flex-row">
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
                borderRadius: 8,
              }}
              source={{ uri: urlFor(item.image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>

          <View className="flex-1 pl-3">
            <View className="flex-row space-x-2 items-center mb-1">
              <BuildingStorefrontIcon color="#00CCBB" opacity={0.5} size={22} />
              <Text className="text-lg font-bold">{item.name}</Text>
            </View>
            <Text className="text-gray-400 text-xs mb-2">
              {item.short_description}
            </Text>
            <View className="flex-row items-center space-x-1">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-xs text-black-500">
                <Text>{item.rating} . </Text>
                <Text>{getDistance(item.lat, item.long)} km</Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View className="flex-row space-x-2 px-2 mx-2 items-center border-b border-gray-200 shadow-xs">
        <TouchableOpacity onPress={navigation.goBack}>
          <ArrowLeftIcon color="black" size={24} />
        </TouchableOpacity>
        <TextInput
          autoFocus={value == ""}
          placeholder="Restaurants and cuisines"
          placeholderTextColor="gray"
          keyboardType="default"
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          className="flex-1 text-lg text-[#000] py-2"
        />
      </View>

      <View className="mx-5 my-2">
        <Text className="font-bold text-gray-400">
          {filteredDataSource.length > 0
            ? filteredDataSource.length + " results were found for your search!"
            : "No results were found for your search!"}
        </Text>
      </View>

      <FlatList
        data={filteredDataSource}
        keyExtractor={(item) => item._id}
        renderItem={ItemView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: 5,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default SearchScreen;
