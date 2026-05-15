import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale,   { toValue: 1, useNativeDriver: true, tension: 80 }),
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <Animated.View style={[styles.content, { opacity, transform: [{ scale }] }]}>
        <View style={styles.logoWrap}>
          <MaterialIcons name="signpost" size={40} color={Colors.white} />
        </View>
        <Text style={styles.name}>Signage<Text style={styles.dot}>.</Text></Text>
        <Text style={styles.tagline}>Professional signage, on demand</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  content: { alignItems: 'center', gap: 16 },
  logoWrap: {
    width: 88, height: 88, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)',
  },
  name: {
    fontSize: 38, fontWeight: '900', color: Colors.white, letterSpacing: -1,
  },
  dot: { color: 'rgba(255,255,255,0.6)' },
  tagline: { fontSize: 15, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },
});
