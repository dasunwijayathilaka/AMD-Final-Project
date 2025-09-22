import { login } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handelLogin = async () => {
    setIsLoading(true);
    await login(email, password)
      .then(() => {
        router.push("/home");
        Alert.alert("Login success");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Login Failed , Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View className="flex-1 p-6 bg-gray-100">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.replace("/")}
        className="flex-row items-center mb-8"
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text className="ml-2 text-base font-medium text-black">Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text className="mb-8 text-3xl font-extrabold text-center text-blue-700">
        Login to Gym App
      </Text>

      {/* Email Input */}
      <View className="mb-4">
        <TextInput
          placeholder="Email"
          className="px-4 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-blue-500"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="px-4 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-blue-500"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="py-3 mb-4 bg-black rounded-lg shadow-md active:bg-gray-200"
        onPress={handelLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-lg font-semibold text-center text-white">
            Login
          </Text>
        )}
      </TouchableOpacity>

      {/* Register Link */}
      <Pressable onPress={() => router.push("/register")}>
        <Text className="text-center text-blue-600 underline">
          Don't have an account? Register
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
