import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { Slot } from "expo-router";
import "./../global.css";

const Layout = () => {
  return (
    <LoaderProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </LoaderProvider>
  );
};

export default Layout;

// stack navigator

// const stack = []

// route.push

// stack['screen_1', 'screen_2' , 'screen_3']

// Routing  - > map

// Navigation - >
