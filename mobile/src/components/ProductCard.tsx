import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Product } from '../constants/data';

interface Props {
  product: Product;
  onPress: () => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map(i => (
        <MaterialIcons
          key={i}
          name={i <= Math.round(rating) ? 'star' : 'star-border'}
          size={11}
          color="#F59E0B"
        />
      ))}
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
}

export default function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.92}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.tag && (
          <View style={[
            styles.tag,
            product.tag === 'New' && styles.tagNew,
            product.tag === 'Best Seller' && styles.tagBest,
            product.tag === 'Top Rated' && styles.tagTop,
          ]}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <StarRating rating={product.rating} />
        <View style={styles.footer}>
          <Text style={styles.price}>From ${product.basePrice.toFixed(2)}</Text>
          <View style={styles.colorDots}>
            {product.colors.slice(0, 4).map((c, i) => (
              <View
                key={i}
                style={[
                  styles.colorDot,
                  { backgroundColor: c.hex },
                  c.hex === '#FFFFFF' && styles.colorDotBordered,
                ]}
              />
            ))}
            {product.colors.length > 4 && (
              <Text style={styles.moreColors}>+{product.colors.length - 4}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageWrap: {
    position: 'relative',
    backgroundColor: Colors.surfaceAlt,
  },
  image: {
    width: '100%',
    height: 170,
  },
  tag: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  tagNew: { backgroundColor: '#059669' },
  tagBest: { backgroundColor: Colors.accent },
  tagTop: { backgroundColor: '#7C3AED' },
  tagText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  info: {
    padding: 12,
  },
  category: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 19,
    marginBottom: 5,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 11,
    color: Colors.textMuted,
    marginLeft: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  colorDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  colorDotBordered: {
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  moreColors: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
