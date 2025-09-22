import { useLoader } from "@/context/LoaderContext";
import { deleteTask, taskRef } from "@/services/workoutService";
import { Task } from "@/types/task";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const TaskScreen = () => {
  const [task, setTask] = useState<Task[]>([]);
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const unsubscribe = onSnapshot(taskRef, (snap) => {
      const taskList = snap.docs.map((task) => {
        const data = task.data();
        return {
          id: task.id,
          title:
            data.title || (data.taskData && data.taskData.title) || "Untitled",
          description:
            data.description ||
            (data.taskData && data.taskData.description) ||
            "",
        };
      });
      setTask(taskList);
    });
    return () => unsubscribe();
  }, []);

  const handelDelete = async (id: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            showLoader();
            await deleteTask(id);
            Alert.alert("Task deleted successfully");
          } catch (error) {
            console.error("Error deleting task:", error);
            Alert.alert("Failed to delete task");
          } finally {
            hideLoader();
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-100 px-5 pt-10">
      {/* Header */}
      <Text className="text-3xl font-extrabold text-blue-600 text-center mb-6">
        Your Workouts
      </Text>

      {/* Task List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {task.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">
            No workouts yet. Tap + to add one!
          </Text>
        ) : (
          task.map((task) => (
            <View
              key={task.id}
              className="bg-white p-5 mb-4 rounded-2xl shadow-md shadow-gray-300"
            >
              <Text className="text-lg font-semibold text-gray-900 mb-1">
                {task.title}
              </Text>
              <Text className="text-gray-600 mb-3">{task.description}</Text>

              {/* Action Buttons */}
              <View className="flex-row justify-end space-x-4">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => router.push(`/(dashboard)/tasks/${task.id}`)}
                >
                  <MaterialIcons name="edit" size={22} color="#2563eb" />
                  <Text className="ml-1 text-blue-600 font-medium">Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => {
                    console.log("Deleting task:", task.id);
                    handelDelete(task.id || "");
                  }}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={22}
                    color="#dc2626"
                  />
                  <Text className="ml-1 text-red-600 font-medium">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 p-5 rounded-full shadow-lg shadow-blue-400/40"
        activeOpacity={0.8}
        onPress={() => router.push("/(dashboard)/tasks/new")}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskScreen;
