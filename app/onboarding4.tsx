import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import Colors from "@/constants/colors";

export default function Onboarding4Screen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const logoScaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, logoScaleAnim]);

  const handleContinue = () => {
    router.push("/free-trial");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View
          style={[
            styles.logoContainer,
            { transform: [{ scale: logoScaleAnim }] },
          ]}
        >
          <View style={styles.doubleLogo}>
            <View style={styles.logoWrapper}>
              <GuidanceLogo size={100} color={Colors.white} />
            </View>
            <View style={[styles.logoWrapper, styles.logoWrapperOffset]}>
              <GuidanceLogo size={100} color={Colors.white} />
            </View>
          </View>
        </Animated.View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Your data is safe</Text>
          <Text style={styles.description}>
            Your financial information is private, secure, and never shared.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

function GuidanceLogo({
  size = 80,
  color = Colors.primary,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={color}
        strokeWidth="6"
      />
      <Path
        d="M 35 35 Q 50 25, 65 35 L 65 50 Q 65 65, 50 70 L 50 55 L 60 55 L 60 40 Q 55 35, 50 35 Q 40 35, 35 45 L 35 55 Q 35 70, 50 75 Q 65 70, 70 55"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  doubleLogo: {
    position: "relative",
    width: 200,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    position: "absolute",
  },
  logoWrapperOffset: {
    transform: [{ translateX: 40 }, { translateY: 20 }],
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.85,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  continueButton: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
});
