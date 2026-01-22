import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Colors from "@/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const ARCH_HEIGHT = SCREEN_HEIGHT * 0.58;

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Image
          source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/2gb6csr3j15jml6wu5vxm' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.archContainer}>
        <View style={styles.rectangle} />
        <View style={styles.ellipseContainer}>
          <Svg
            width="100%"
            height="80"
            viewBox="0 0 400 80"
            style={styles.svg}
            preserveAspectRatio="none"
          >
            <Ellipse
              cx="200"
              cy="80"
              rx="200"
              ry="80"
              fill={Colors.primary}
            />
          </Svg>
        </View>
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Guidance</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>A calmer way to manage </Text>
            <Text style={[styles.subtitle, styles.accentText]}>money.</Text>
          </View>

          <Text style={styles.tagline}>
            No pressure. No judgment. Just guidance.
          </Text>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.15,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },
  logo: {
    width: 100,
    height: 100,
  },
  archContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: ARCH_HEIGHT,
    overflow: "hidden",
  },
  rectangle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 80,
    backgroundColor: Colors.primary,
  },
  ellipseContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 16,
  },
  subtitleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.white,
  },
  accentText: {
    color: Colors.accent,
  },
  tagline: {
    fontSize: 15,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 24,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
});
