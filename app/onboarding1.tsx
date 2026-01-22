import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import Colors from "@/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Onboarding1Screen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const options = [
    "Understand my spending",
    "Save more money",
    "Feel less stressed about money",
    "Build better habits",
    "Something else",
  ];

  const handleContinue = () => {
    if (selectedOption) {
      router.push("/onboarding2");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <GuidanceLogo size={80} color={Colors.white} />
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>What would you like{"\n"}help with?</Text>
            <Text style={styles.subtitle}>You can change this anytime.</Text>

            <View style={styles.optionsContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.optionButtonSelected,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedOption(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                !selectedOption && styles.continueButtonDisabled,
              ]}
              activeOpacity={0.8}
              onPress={handleContinue}
              disabled={!selectedOption}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
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
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
  },
  optionsContainer: {
    width: "100%",
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 12,
    alignItems: "center",
  },
  optionButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  optionTextSelected: {
    color: Colors.white,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 48,
    width: "70%",
    alignItems: "center",
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});
