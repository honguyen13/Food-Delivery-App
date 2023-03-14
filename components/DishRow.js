import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";
import React, { useState } from "react";
import { urlFor } from "../config/sanitySetup";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";
import { StyleSheet } from "react-native";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        activeOpacity={0.7}
        className={`bg-white border mx-4 mb-3 rounded-xl border-gray-200 ${
          isPressed && "border-b-0"
        } `}
        style={styles.shadow}
      >
        <View className="flex-row space-x-3">
          <Image
            source={{ uri: urlFor(image).url() }}
            className="w-28 rounded-bl-xl rounded-tl-xl"
          />
          <View className="flex-1 py-2">
            <Text className="text-lg mb-1 font-bold">{name}</Text>
            <Text className="text-gray-400">{description}</Text>

            <View className="flex-row justify-between items-center mt-1">
              <Text className="text-[#00CCBB] mt-2 font-bold ">
                <Currency quantity={price} currency="VND" pattern="##,### !" />
              </Text>

              {isPressed && (
                <View className="bg-white px-4">
                  <View className="flex-row items-center space-x-2">
                    <TouchableOpacity
                      onPress={removeItemFromBasket}
                      disabled={!items.length}
                    >
                      <MinusCircleIcon
                        color={items.length > 0 ? "#00CCBB" : "gray"}
                        size={40}
                      />
                    </TouchableOpacity>

                    <Text>{items.length}</Text>

                    <TouchableOpacity onPress={addItemToBasket}>
                      <PlusCircleIcon color="#00CCBB" size={40} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
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

    elevation: 6,
  },
});

export default DishRow;
