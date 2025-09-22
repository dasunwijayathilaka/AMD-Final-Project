import { useAuth } from "@/context/AuthContext";
import { useLoader } from "@/context/LoaderContext";
import { createTask, getTaskId, updateTask } from "@/services/workoutService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TaskFormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isNew = !id || id === "new";

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter();
  const { hideLoader, showLoader } = useLoader();
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (!isNew && id) {
        try {
          showLoader();
          const task = await getTaskId(id);
          if (task) {
            setTitle(task.title);
            setDescription(task.description);
          }
        } finally {
          hideLoader();
        }
      }
    };
    load();
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required");
      return;
    }

    try {
      showLoader();
      if (isNew) {
        await createTask({ title, description, userId: user?.uid });
      } else {
        await updateTask(id, { title, description });
      }
      router.back();
    } catch (err) {
      console.error(`Error ${isNew ? "saving" : "updating"} task`, err);
      Alert.alert("Error", `Fail to ${isNew ? "save" : "update"} task`);
    } finally {
      hideLoader();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-gray-100"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-10"
      >
        {/* Header */}
        <Text className="text-3xl font-extrabold text-blue-600 mb-6">
          {isNew ? "Add Workout" : "Edit Workout"}
        </Text>

        {/* Input Card */}
        <View className="bg-white p-5 rounded-2xl shadow-md mb-5">
          <Text className="text-gray-700 font-semibold mb-2">
            Workout Title
          </Text>
          <TextInput
            placeholder="Enter workout title"
            className="px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View className="bg-white p-5 rounded-2xl shadow-md mb-6">
          <Text className="text-gray-700 font-semibold mb-2">Description</Text>
          <TextInput
            placeholder="Enter workout description"
            className="px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.8}
          className="bg-blue-600 py-4 rounded-2xl shadow-lg shadow-blue-400/40"
        >
          <Text className="text-white text-lg font-semibold text-center">
            {isNew ? "Add Workout" : "Update Workout"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TaskFormScreen;
