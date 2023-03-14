import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { login } from "../features/userSlice";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  //states to store email/password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //states to error email/password
  const [loginError, setLoginError] = useState("");

  const onLoginHandle = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userAuth) => {
          const user = userAuth.user;
          dispatch(
            login({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: user.photoURL,
            })
          );
        }
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setLoginError("That email address is already in use!");
      }
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-not-found"
      ) {
        setLoginError("That email address is invalid!");
      }
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/internal-error"
      ) {
        setLoginError("That password is invalid!");
      }
    }
  };

  // const _signInWithGoogle = async () => {
  //   try {
  //     GoogleSignin.configure({
  //       offlineAccess: false,
  //       webClientId:
  //         "10635631812-04dr86m0em20ucve5vsvq2vsnnm2jacp.apps.googleusercontent.com",
  //       scopes: ["profile", "email"],
  //     });
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // this.setState({ userInfo });
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View className="px-6">
          <Text className="text-center text-4xl font-bold mt-12">Welcome,</Text>
          <Text className="text-center text-3xl font-bold mb-8">
            Glad to see you!
          </Text>

          <Text className="text-xl font-semibold mt-6">Email Address</Text>
          <View className="flex-row items-center space-x-3 border border-gray-300 rounded-lg p-2 mt-1">
            <EnvelopeIcon color="#00CCBB" size={25} />
            <TextInput
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
              placeholder="example@gmail.com"
              className="h-50 flex-1 text-lg py-1 "
            />
          </View>

          <Text className="text-xl font-semibold mt-3">Password</Text>
          <View className="flex-row items-center space-x-3 border border-gray-300 rounded-lg p-2 mt-1">
            <LockClosedIcon color="#00CCBB" size={25} />
            <TextInput
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              className="h-50 flex-1 text-lg py-1"
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

          <View className="items-end">
            <TouchableOpacity className="pt-2">
              <Text className="text-sm text-gray-500 font-medium">
                Recovery password
              </Text>
            </TouchableOpacity>
          </View>

          {loginError != "" ? (
            <View className="flex-row space-x-1 items-center mt-3">
              <Image
                className="h-5 w-5"
                source={require("../assets/warning.png")}
              />
              <Text className="text-[#fd2341] text-lg ">{loginError}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onLoginHandle}
            className="bg-[#00CCBB] justify-center items-center mt-8 py-3 rounded-full shadow-xl"
          >
            <Text className="text-xl text-white font-medium">Sign in</Text>
          </TouchableOpacity>

          <View className="flex-row mt-8 items-center">
            <View className="border-t border-gray-400 flex-1" />
            <Text className="px-3 text-xs text-gray-500 ">
              Or countinue with
            </Text>
            <View className="border-t border-gray-400 flex-1" />
          </View>

          <View className="flex-row justify-evenly mt-8">
            <TouchableOpacity className=" p-4 border-2 border-gray-300 rounded-xl">
              <Image
                className="h-10 w-10"
                source={require("../assets/google-logo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity className=" p-4 border-2 border-gray-300 rounded-xl">
              <Image
                className="h-10 w-10"
                source={require("../assets/facebook-logo.png")}
              />
            </TouchableOpacity>
          </View>
          <View className="mt-14 flex-row items-center justify-center">
            <Text className="text-sm text-gray-500 font-medium ">
              don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text className="text-sm text-[#1a78f1] font-medium">
                Sign up now{" "}
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

export default LoginScreen;
