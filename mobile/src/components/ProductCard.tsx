import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Product } from '../constants/data';

interface Props {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.popular && (
          <View style={[styles.badge, { backgroundColor: Colors.accent }]}>
            <Text style={styles.badgeText}>Popular</Text>
          </View>
        )}
        {product.new && (
          <View style={[styles.badge, { backgroundColor: Colors.success }]}>
            <Text style={styles.badgeText}>New</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>From ${product.basePrice.toFixed(2)}</Text>
          <View style={styles.turnaround}>
            <MaterialIcons name="schedule" size={12} color={Colors.textMuted} />
            <Text style={styles.turnaroundText}>{product.turnaround}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.surfaceAlt,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  info: {
    padding: 12,
  },
  category: {
    fontSize: 11,
    color: Colors.accent,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  turnaround: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  turnaroundText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
});
