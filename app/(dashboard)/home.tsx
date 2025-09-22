import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100 px-6 pt-12">
      {/* Header */}
      <Text className="text-3xl font-extrabold text-blue-700 mb-2">
        Welcome back 👋
      </Text>
      <Text className="text-lg text-gray-600 mb-6">
        Ready for your next workout?
      </Text>

      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Action Cards */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            className="flex-1 bg-white rounded-2xl p-5 mr-3 shadow-md shadow-gray-300"
            onPress={() => router.push("/(dashboard)/tasks")}
          >
            <Ionicons name="barbell-outline" size={28} color="#2563eb" />
            <Text className="mt-3 text-lg font-semibold text-gray-900">
              Workouts
            </Text>
            <Text className="text-sm text-gray-500">View & add workouts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-white rounded-2xl p-5 ml-3 shadow-md shadow-gray-300"
            onPress={() => router.push("/(dashboard)/settings")}
          >
            <Ionicons name="settings-outline" size={28} color="#16a34a" />
            <Text className="mt-3 text-lg font-semibold text-gray-900">
              Settings
            </Text>
            <Text className="text-sm text-gray-500">Manage your account</Text>
          </TouchableOpacity>
        </View>

        {/* Motivation Section */}
        <View className="bg-blue-600 rounded-2xl p-6 shadow-lg shadow-blue-400/40 mb-6">
          <Text className="text-white text-xl font-bold mb-2">
            Stay consistent 💪
          </Text>
          <Text className="text-white text-base">
            Small steps every day lead to big results. Keep going!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
