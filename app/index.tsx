import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const Index = () => {
  const router = useRouter();

  const handleStart = () => {
    router.replace("/(auth)/login"); // navigate to login
  };

  return (
    <LinearGradient
      colors={["#0f172a", "#1e293b", "#0f172a"]}
      className="flex-1 items-center justify-center px-6"
    >
      {/* Hero Illustration (can be replaced with your gym image/logo) */}
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/attractive-young-woman-her-trainer-running-treadmill-gym_496169-2730.jpg?semt=ais_hybrid&w=740&q=80",
        }}
        className="w-full h-36 mb-8"
        resizeMode="contain"
      />

      {/* App Title */}
      <Text className="text-3xl font-extrabold text-white tracking-wide mb-4">
        GymAPP
      </Text>

      {/* Subtitle */}
      <Text className="text-lg text-gray-300 mb-10 text-center leading-6">
        Your ultimate fitness companion.{"\n"}Track workouts, stay motivated,
        and transform your lifestyle.
      </Text>

      {/* Start Button */}
      <TouchableOpacity
        onPress={handleStart}
        activeOpacity={0.8}
        className="w-full"
      >
        <LinearGradient
          colors={["#3b82f6", "#2563eb"]}
          className="rounded-2xl py-4 items-center shadow-lg shadow-black/30"
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Index;
