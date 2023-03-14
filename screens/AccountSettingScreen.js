import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import { TrashIcon, KeyIcon, PencilIcon } from "react-native-heroicons/outline";

import {
  ChevronRightIcon,
  UserIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../config/firebase";
import {
  selectTheme,
  setDarkTheme,
  setDefaultTheme,
} from "../features/themeSlice";

const AccountSettingScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    setName(user?.displayName);
    setEmail(user?.email);
  }, []);


  return (
    <SafeAreaView
      style={[
        styles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/**Header */}
      <View className={"border-b border-gray-400 px-3 bg-white"}>
        <View className="flex-row pb-3 items-center space-x-2 mt-2 ">
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeftIcon color="#00CCBB" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-xl font-bold mr-3">
            Account Information
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/**Account setting */}
        <View className="bg-white px-5">
          <View className="items-center justify-between ">
            <TouchableOpacity className="flex-row items-center py-5 space-x-2">
              <View className="bg-gray-300 h-20 w-20 rounded-full justify-center items-center">
                <UserIcon size={50} color="#00CCBB" />
              </View>
            </TouchableOpacity>
          </View>

          <View className=" border-b border-gray-300 mb-5">
            <Text className="font-bold text-gray-700">Name</Text>
            <View className="flex-row ">
              <TextInput
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder="Enter your name"
                className="h-50 flex-1 text-lg "
              />
              <PencilIcon color="#00CCBB" size={20} />
            </View>
          </View>

          <View className="border-b border-gray-300 mb-5 ">
            <Text className="font-bold text-gray-700">Phone 's number</Text>
            <View className="flex-row ">
              <TextInput
                onChangeText={(text) => setPhone(text)}
                value={phone}
                placeholder="Enter your phone"
                className="h-50 flex-1 text-lg "
                keyboardType="numeric"
              />
              <PencilIcon color="#00CCBB" size={20} />
            </View>
          </View>

          <View className="border-b border-gray-300 mb-5 ">
            <Text className="font-bold text-gray-700">Email address</Text>
            <View className="flex-row ">
              <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="example@example.com"
                className="h-50 flex-1 text-lg "
                keyboardType="email-address"
              />
              <PencilIcon color="#00CCBB" size={20} />
            </View>
          </View>

          <View className="border-b border-gray-300 mb-5 ">
            <Text className="font-bold text-gray-700">Sex</Text>
            <View className="flex-row ">
              <TextInput
                onChangeText={(text) => setSex(text)}
                value={sex}
                placeholder="male/female/other"
                className="h-50 flex-1 text-lg "
              />
              <PencilIcon color="#00CCBB" size={20} />
            </View>
          </View>

          <View className="border-b border-gray-300 mb-5">
            <Text className="font-bold text-gray-700">Date of birth</Text>
            <View className="flex-row  ">
              <TextInput
                onChangeText={(text) => setBirthday(text)}
                value={birthday}
                placeholder="DD/MM/YYYY"
                className="h-50 flex-1 text-lg "
                keyboardType="email-address"
              />
              <PencilIcon color="#00CCBB" size={20} />
            </View>
          </View>
        </View>

        <View className="border-b border-gray-200  mt-5 py-2 bg-white">
          <TouchableOpacity
            className="flex-row items-center space-x-4 px-3"
          >
            <KeyIcon color="#00CCBB" size={33} />
            <Text className="flex-1 font-semibold text-md">
              Change password
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="border-b border-gray-200 py-2 bg-white">
          <TouchableOpacity className="flex-row items-center space-x-4 px-3">
            <TrashIcon color="#00CCBB" size={33} />
            <Text className="flex-1 font-semibold text-md">Delete account</Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
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

export default AccountSettingScreen;
