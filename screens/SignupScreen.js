import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { isValidEmail, isValidPassword } from "../Ultilies/Validation";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

const SignupScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  //states to store name,email,password,
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  //states to validation
  const [signupError, setSignupError] = useState("");

  const isValidationOK = () =>
    name.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) == true &&
    isValidPassword(password) == true &&
    password == retypePassword;

  const onSignupHandle = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userAuth) => {
          const newUser = userAuth.user;
          updateProfile(newUser, {
            displayName: name,
            photoURL:
              "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
          }).then(
            dispatch(
              login({
                email: user.email,
                uid: user.uid,
                displayName: name,
                photoUrl:
                  "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
              })
            )
          );
        }
      );
    } catch (error) {
      setSignupError(error);
    }
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView>
        <View className="px-6">
          <Text className="text-center text-3xl font-bold mt-12">
            Create Account
          </Text>
          <Text className="text-center text-3xl font-bold mb-8">
            to get started now!
          </Text>

          {/**name */}
          <Text className="text-lg font-semibold">Your Name</Text>
          <View className="flex-row items-center space-x-2 border border-gray-300 rounded-lg p-2 mt-1">
            <UserIcon color="#00CCBB" size={22} />
            <TextInput
              onChangeText={(text) => {
                setName(text);
              }}
              value={name}
              placeholder="Enter your name"
              className="h-50 flex-1 text-lg  "
            />
          </View>

          {/**email address */}
          <Text className="text-lg font-semibold mt-3">Email Address</Text>
          <View className="flex-row items-center space-x-2 border border-gray-300 rounded-lg p-2 mt-1">
            <EnvelopeIcon color="#00CCBB" size={22} />
            <TextInput
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
              placeholder="example@example.com"
              className="h-50 flex-1 text-lg  "
            />
          </View>

          {/**password */}
          <Text className="text-lg font-semibold mt-3">Password</Text>
          <View className="flex-row items-center space-x-2 border border-gray-300 rounded-lg p-2 mt-1">
            <LockClosedIcon color="#00CCBB" size={22} />
            <TextInput
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              className="h-50 flex-1 text-lg "
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon color="#00CCBB" size={25} />
              ) : (
                <EyeSlashIcon color="#00CCBB" size={25} />
              )}
            </TouchableOpacity>
          </View>

          {/**retype password */}
          <Text className="text-lg font-semibold mt-3">Retype Password</Text>
          <View className="flex-row items-center space-x-2 border border-gray-300 rounded-lg p-2 mt-1">
            <LockClosedIcon color="#00CCBB" size={22} />
            <TextInput
              onChangeText={(text) => {
                setRetypePassword(text);
              }}
              value={retypePassword}
              placeholder="Enter your password"
              secureTextEntry={!showRetypePassword}
              className="h-50 flex-1 text-lg "
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowRetypePassword(!showRetypePassword)}
            >
              {showRetypePassword ? (
                <EyeIcon color="#00CCBB" size={25} />
              ) : (
                <EyeSlashIcon color="#00CCBB" size={25} />
              )}
            </TouchableOpacity>
          </View>

          {signupError && (
            <View className="flex-row space-x-1 items-center mt-3">
              <Image
                className="h-5 w-5"
                source={require("../assets/warning.png")}
              />
              <Text className="text-[#fd2341] text-lg ">{signupError}</Text>
            </View>
          )}

          <TouchableOpacity
            disabled={isValidationOK() == false}
            onPress={onSignupHandle}
            activeOpacity={0.6}
            style={{
              backgroundColor: isValidationOK() ? "#00CCBB" : "gray",
              elevation: isValidationOK() == true ? 5 : 0,
            }}
            className="justify-center items-center mt-8 py-3
            rounded-full shadow-xl"
          >
            <Text className="text-xl text-white font-medium">Sign up</Text>
          </TouchableOpacity>

          <Text className="text-xs text-gray-500 text-center mt-6">
            By continuing, you agree to the
          </Text>
          <Text className="text-xs text-gray-500 text-center font-bold">
            Terms of Services & Privacy Policies
          </Text>

          <View className="flex-end flex-row mt-14 items-center justify-center">
            <Text className="text-sm text-gray-500 font-medium ">
              already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={navigation.goBack}>
              <Text className="text-sm text-[#1a78f1] font-medium">
                Sign in now{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#e6e9f1",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default SignupScreen;
