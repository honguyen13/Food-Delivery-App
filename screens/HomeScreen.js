import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { getPosts } from "../config/sanitySetup";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [currentAddress, setCurrentAddress] = useState("Current Address");

  useEffect(() => {
    getCurrentLocation();
    getPosts(`*[_type=="featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`).then((data) => setFeaturedCategories(data));
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied");
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;

      //save current position in local store
      storeLocation(latitude + "," + longitude);

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        let address = `${item.streetNumber} ${item.street}, ${item.subregion}, ${item.region}`;
        setCurrentAddress(address);
      }
    }
  };

  const storeLocation = async (value) => {
    try {
      await AsyncStorage.setItem("Mylocation", value);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea} className="bg-gray-100">
      {/**Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-lg">
            {currentAddress}
            <ChevronDownIcon color="#00CCBB" size={20} />
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <UserIcon size={35} color="#00CCBB" />
        </TouchableOpacity>
      </View>

      {/**Search */}
      <View className="flex-row items-center space-x-2 mx-4 px-2 bg-gray-200  rounded-xl ">
        <TouchableOpacity
          onPress={() => navigation.navigate("Search", { value: "" })}
          className="flex-row flex-1 space-x-2 py-3"
        >
          <MagnifyingGlassIcon color="gray" size={20} />
          <Text className="text-gray-400 ">Restaurants and cuisines</Text>
        </TouchableOpacity>
        <AdjustmentsVerticalIcon color="#00CCBB" size={30} />
      </View>

      {/**Body */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/**Categories */}
        <Categories />

        {/**Featured Rows */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: 5,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default HomeScreen;
