import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const CategoryCard = ({ imgUrl, title }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Search", { value: title })}
      className="relative mr-2 mb-2 rounded-tr-xl rounded-bl-xl"
      disabled={title == "Offers"}      
      style={styles.shadow}
    >
      <Image
        source={{ uri: imgUrl }}
        className="h-20 w-20 rounded-bl-xl rounded-tr-xl "
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 5,
  }
})

export default CategoryCard;
