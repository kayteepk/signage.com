import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
}

export default function SignageLogo({ size = 'md', inverted = false }: Props) {
  const scales = { sm: 0.75, md: 1, lg: 1.4 };
  const s = scales[size];
  const textColor = inverted ? Colors.white : Colors.text;
  const dotColor = Colors.primary;

  return (
    <View style={styles.row}>
      <View style={[styles.iconWrap, { width: 28 * s, height: 28 * s, borderRadius: 7 * s, backgroundColor: Colors.primary }]}>
        <MaterialIcons name="signpost" size={16 * s} color={Colors.white} />
      </View>
      <Text style={[styles.text, { fontSize: 20 * s, color: textColor }]}>
        Signage<Text style={{ color: dotColor }}>.</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconWrap: { justifyContent: 'center', alignItems: 'center' },
  text: { fontWeight: '800', letterSpacing: -0.5 },
});
