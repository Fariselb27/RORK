import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, Image } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Colors from "@/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const INITIAL_HEIGHT = SCREEN_HEIGHT * 0.35;

export default function BreathInScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const archHeightAnim = React.useRef(new Animated.Value(INITIAL_HEIGHT)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.98,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      router.replace("/breath-out");
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, pulseAnim, router]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Image
          source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/2gb6csr3j15jml6wu5vxm' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.archContainer,
          {
            height: archHeightAnim,
          },
        ]}
      >
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
      </Animated.View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
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

});
