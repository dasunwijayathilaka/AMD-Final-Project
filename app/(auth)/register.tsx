import { register } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(formAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleRegister = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert("Validation Error", "Please enter your full name");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email address");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Validation Error", "Please enter a password");
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long"
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password);
      Alert.alert(
        "Success",
        "Registration successful! Please sign in to continue."
      );
      router.back();
    } catch (error: any) {
      console.log(error);
      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "An account with this email already exists.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
      }

      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header with Back Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="px-6 pt-12 pb-4"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center bg-white rounded-2xl px-4 py-3 self-start shadow-sm border border-gray-100"
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
            <Text className="ml-2 text-base font-semibold text-gray-700">
              Back
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View className="flex-1 px-6 justify-center min-h-screen">
          {/* Logo and Title */}
          <Animated.View
            style={{
              opacity: logoAnim,
              transform: [
                {
                  scale: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            }}
            className="items-center mb-8"
          >


          {/* Registration Form */}
          <Animated.View
            style={{
              opacity: formAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-200 border border-gray-100 mb-8"
          >
            {/* Full Name Input */}
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <View className="bg-red-500 w-1 h-6 rounded-full mr-3" />
                <Text className="text-gray-800 font-bold text-base">
                  Full Name
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Enter your full name"
                  className="px-5 py-4 text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl pr-14 focus:border-red-500"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  style={{ fontSize: 16 }}
                />
                <View className="absolute right-4 top-4 bg-gray-100 w-8 h-8 rounded-xl items-center justify-center">
                  <Ionicons name="person-outline" size={18} color="#6b7280" />
                </View>
              </View>
            </View>

            {/* Email Input */}
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <View className="bg-red-500 w-1 h-6 rounded-full mr-3" />
                <Text className="text-gray-800 font-bold text-base">
                  Email Address
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Enter your email address"
                  className="px-5 py-4 text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl pr-14 focus:border-red-500"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ fontSize: 16 }}
                />
                <View className="absolute right-4 top-4 bg-gray-100 w-8 h-8 rounded-xl items-center justify-center">
                  <Ionicons name="mail-outline" size={18} color="#6b7280" />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <View className="bg-red-500 w-1 h-6 rounded-full mr-3" />
                <Text className="text-gray-800 font-bold text-base">
                  Password
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Enter secure password (min. 6 characters)"
                  secureTextEntry={!showPassword}
                  className="px-5 py-4 text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl pr-14 focus:border-red-500"
                  value={password}
                  onChangeText={setPassword}
                  style={{ fontSize: 16 }}
                />
                <TouchableOpacity
                  className="absolute right-4 top-4 bg-gray-100 w-8 h-8 rounded-xl items-center justify-center"
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View className="mb-8">
              <View className="flex-row items-center mb-3">
                <View className="bg-red-500 w-1 h-6 rounded-full mr-3" />
                <Text className="text-gray-800 font-bold text-base">
                  Confirm Password
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  placeholder="Confirm your password"
                  secureTextEntry={!showConfirmPassword}
                  className="px-5 py-4 text-base text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl pr-14 focus:border-red-500"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={{ fontSize: 16 }}
                />
                <TouchableOpacity
                  className="absolute right-4 top-4 bg-gray-100 w-8 h-8 rounded-xl items-center justify-center"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={18}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
              className="mb-6"
            >
              <View
                className="py-5 rounded-2xl shadow-lg shadow-red-500/25"
                style={{ backgroundColor: "#dc2626" }}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <>
                      <Ionicons
                        name="person-add-outline"
                        size={20}
                        color="white"
                        style={{ marginRight: 8 }}
                      />
                      <Text className="text-lg font-bold text-white">
                        Create Your Account
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            {/* Terms and Privacy */}
            <View className="bg-red-50 rounded-2xl p-4 mb-8">
              <Text className="text-center text-sm text-gray-700 leading-5">
                By creating an account, you agree to our{" "}
                <Text className="text-red-600 font-bold">Terms of Service</Text>{" "}
                and{" "}
                <Text className="text-red-600 font-bold">Privacy Policy</Text>
              </Text>
            </View>

            {/* Divider */}
            <View className="flex-row items-center mb-8">
              <View className="flex-1 h-px bg-gray-200" />
              <View className="bg-gray-100 px-4 py-2 rounded-full mx-4">
                <Text className="text-gray-500 font-semibold text-sm">
                  Or continue with
                </Text>
              </View>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Registration Buttons */}
            <View className="flex-row space-x-4 mb-8">
              <TouchableOpacity
                className="flex-1 bg-gray-50 py-4 rounded-2xl border border-gray-200 shadow-sm"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  <View className="bg-white w-8 h-8 rounded-xl items-center justify-center mr-3 shadow-sm">
                    <Ionicons name="logo-google" size={18} color="#ea4335" />
                  </View>
                  <Text className="font-bold text-gray-700 text-base">
                    Google
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-gray-50 py-4 rounded-2xl border border-gray-200 shadow-sm"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  <View className="bg-white w-8 h-8 rounded-xl items-center justify-center mr-3 shadow-sm">
                    <Ionicons name="logo-apple" size={18} color="#000000" />
                  </View>
                  <Text className="font-bold text-gray-700 text-base">
                    Apple
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View className="bg-gray-50 rounded-2xl p-4 items-center">
              <View className="flex-row">
                <Text className="text-gray-600 font-medium text-base">
                  Already have an account?{" "}
                </Text>
                <Pressable
                  onPress={() => router.back()}
                  style={{ marginLeft: 4 }}
                >
                  <Text className="text-red-600 font-bold text-base">
                    Sign In Here
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Decorative Elements */}
        <View className="absolute top-32 right-8 w-24 h-24 bg-red-50 rounded-full opacity-20" />
        <View className="absolute bottom-40 left-6 w-16 h-16 bg-red-100 rounded-full opacity-15" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
