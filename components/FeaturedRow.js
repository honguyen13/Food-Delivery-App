import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import { getPosts } from "../config/sanitySetup";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetch(
      `https://oy7rm9i7.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%20%22featured%22%20%26%26%20_id%20%3D%3D%20%22${id}%22%5D%7B%0A%20%20%20%20%20%20...%2C%0A%20%20%20%20%20%20restaurants%5B%5D-%3E%7B%0A%20%20%20%20%20%20%20%20...%2C%0A%20%20%20%20%20%20%20%20dishes%5B%5D-%3E%2C%0A%20%20%20%20%20%20%20%20type%20-%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%2C%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%5B0%5D`
    )
      .then((res) => res.json())
      .then((resJson) => setRestaurants(resJson.result?.restaurants));
  }, []);

  return (
    <View>
      <View className="mt-2 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="pt-4"
      >
        {/**Restaurants Card */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            dishes={restaurant.dishes}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            short_description={restaurant.short_description}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
        
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
