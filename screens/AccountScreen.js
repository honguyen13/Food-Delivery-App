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
} from "react-native";
import React, { useEffect, useState } from "react";

import {
  ClipboardDocumentListIcon,
  ChatBubbleLeftEllipsisIcon,
  QuestionMarkCircleIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  BanknotesIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  MoonIcon,
} from "react-native-heroicons/outline";

import {
  ChevronRightIcon,
  UserIcon,
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
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

const AccountScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const [isEnabledSwitch, setIsEnabledSwitch] = useState(false);

  const setTheme = () => {
    setIsEnabledSwitch(!isEnabledSwitch);
    if (isEnabledSwitch) {
      dispatch(setDefaultTheme());
    } else {
      dispatch(setDarkTheme());
    }
  };

  const logOut = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <SafeAreaView
      style={[
        styles.AndroidSafeArea,
        { backgroundColor: theme.colors.background},
      ]}
    >
      {/**Header */}
      <View className={"border-b border-gray-400 bg-white"}>
        <View className="flex-row pb-3 items-center mx-4 space-x-2 mt-2 ">
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
        <TouchableOpacity onPress={() => navigation.navigate('AccountSetting')} className="flex-row items-center px-3 py-3 space-x-2 bg-white">
          <View className="bg-gray-300 h-20 w-20 rounded-full justify-center items-center">
            <UserIcon size={50} color="#00CCBB" />
          </View>
          <View className="flex-1 mt-2">
            <Text className="font-bold text-xl">{user?.displayName}</Text>
            <Text className="text-xs font-semibold">ID: {user?.uid}</Text>
          </View>
          <TouchableOpacity>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/**utilities */}
        <View className="border-t border-gray-300 bg-white">
          <View className="flex-row justify-between py-5 mx-4">
            <TouchableOpacity className="justify-center items-center">
              <ClipboardDocumentListIcon color="#00CCBB" size={40} />
              <Text className="mt-2 font-bold text-xs text-gray-500">
                Purchase order
              </Text>
            </TouchableOpacity>
            <View className="border-r border-gray-200" />
            <TouchableOpacity className="justify-center items-center">
              <BuildingStorefrontIcon color="#00CCBB" size={40} />
              <Text className="mt-2 font-bold text-xs text-gray-500">
                Favorite restaurant
              </Text>
            </TouchableOpacity>
            <View className="border-r border-gray-200" />
            <TouchableOpacity className="justify-center items-center">
              <MapPinIcon color="#00CCBB" size={40} />
              <Text className="mt-2 font-bold text-xs text-gray-500">
                Address Books
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white mt-5">
          <View className="border-b border-gray-200 py-2">
            <TouchableOpacity className="flex-row items-center space-x-4 px-3">
              <BanknotesIcon color="#00CCBB" size={40} />
              <Text className="flex-1 font-semibold text-md">
                Payment Management
              </Text>
              <ChevronRightIcon color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white mt-5">
          <View className="border-b border-gray-200 py-2">
            <TouchableOpacity className="flex-row items-center space-x-4 px-3">
              <GlobeAltIcon color="#00CCBB" size={40} />
              <Text className="flex-1 font-semibold text-md">Language</Text>
              <ChevronRightIcon color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white">
          <View className="border-b border-gray-200 py-2">
            <TouchableOpacity className="flex-row items-center space-x-4 px-3">
              <MoonIcon color="#00CCBB" size={40} />
              <Text className="flex-1 font-semibold text-md">Dark Mode</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#00CCBB" }}
                thumbColor={isEnabledSwitch ? "#00CCBB" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setTheme()}
                value={isEnabledSwitch}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white mt-5">
          <View className="border-b border-gray-200 py-2">
            <TouchableOpacity className="flex-row items-center space-x-4 px-3">
              <InformationCircleIcon color="#00CCBB" size={40} />
              <Text className="flex-1 font-semibold text-md">
                Terms and Policies
              </Text>
              <ChevronRightIcon color="#00CCBB" />
            </TouchableOpacity>
          </View>

          <View className="border-b border-gray-200 py-2">
            <TouchableOpacity className="flex-row items-center space-x-4 px-3">
              <QuestionMarkCircleIcon color="#00CCBB" size={40} />
              <Text className="flex-1 font-semibold text-md">Help</Text>
              <ChevronRightIcon color="#00CCBB" />
            </TouchableOpacity>
          </View>

          <View className="border-b border-gray-200 py-2">
            <TouchableOpacity className="flex-row items-center space-x-4 px-3">
              <ChatBubbleLeftEllipsisIcon color="#00CCBB" size={40} />
              <Text className="flex-1 font-semibold text-md">Feedback</Text>
              <ChevronRightIcon color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="border-b border-gray-200 bg-white py-2 mt-5">
          <TouchableOpacity
            onPress={logOut}
            className="flex-row items-center space-x-4 px-3"
          >
            <ArrowRightOnRectangleIcon color="#00CCBB" size={40} />
            <Text className="flex-1 font-semibold text-md">Log out</Text>
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

export default AccountScreen;
