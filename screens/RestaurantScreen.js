import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../config/sanitySetup";
import {
  StarIcon,
  ArrowLeftIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  return (
    <>
      <BasketIcon />
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="absolute top-0 h-64 w-full"
      />
      <View className="mt-24" />
      <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
      >
        <ArrowLeftIcon size={20} color="#00CCBB" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="h-32" />
        <View className="bg-white" style={{borderRadius: 40}}>
          <View className="px-4 pt-4 ">
            <Text className="text-3xl font-bold">{title}</Text>
            <Text className="text-gray-500 my-2">{short_description}</Text>

            <View className="flex-row space-x-2 mb-4 ">
              <View className="flex-row items-center space-x-1">
                <StarIcon size={22} color="green" opacity={0.5} />
                <Text className="text-xs text-gray-500 font-semibold">
                  <Text className="text-green-500 ">{rating}</Text> . {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon size={22} color="#000" opacity={0.4} />
                <Text className="text-xs text-gray-500 font-semibold">
                  <Text className="text-gray-500">Nearby . {address}</Text>
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={28} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
                    {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
                    {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    height: 300,
    width: 500,
  },
});
export default RestaurantScreen;
