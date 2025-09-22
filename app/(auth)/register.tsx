import { register } from "@/services/authService";
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

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    await register(email, password)
      .then((res) => {
        setIsLoading(true);
        Alert.alert("Register Success");
        router.back();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        Alert.alert("Registration Failed , Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View className="justify-center flex-1 p-6 bg-gray-100">
      <Text className="mb-8 text-3xl font-extrabold text-center text-blue-700">
        Register for GymAPP
      </Text>
      <View className="mb-4">
        <TextInput
          placeholder="Email"
          className="px-4 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-blue-500"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="mb-6">
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="px-4 py-3 mb-3 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:border-blue-500"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        className="py-3 mb-4 bg-green-600 rounded-lg shadow-md active:bg-green-700"
        onPress={handleRegister}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text className="text-lg font-semibold text-center text-white">
            Register
          </Text>
        )}
      </TouchableOpacity>
      <Pressable onPress={() => router.back()}>
        <Text className="text-center text-blue-600 underline">
          Already have an account? Login
        </Text>
      </Pressable>
    </View>
  );
};

export default Register;
