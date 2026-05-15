import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Product } from '../constants/data';

interface Props {
  product: Product;
  onPress: () => void;
  horizontal?: boolean;
}

function Stars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <MaterialIcons key={i} name={i <= Math.round(rating) ? 'star' : 'star-border'} size={11} color={Colors.starYellow} />
      ))}
    </View>
  );
}

export default function ProductCard({ product, onPress, horizontal = false }: Props) {
  const salePrice = product.discount
    ? product.basePrice * (1 - product.discount / 100)
    : null;

  if (horizontal) {
    return (
      <TouchableOpacity style={styles.hCard} onPress={onPress} activeOpacity={0.88}>
        <Image source={{ uri: product.images[0] }} style={styles.hImage} resizeMode="cover" />
        <View style={styles.hInfo}>
          <Text style={styles.hCategory}>{product.category}</Text>
          <Text style={styles.hName} numberOfLines={2}>{product.name}</Text>
          <View style={styles.ratingRow}>
            <Stars rating={product.rating} />
            <Text style={styles.ratingNum}>{product.rating}</Text>
          </View>
          <View style={styles.priceRow}>
            {salePrice ? (
              <>
                <Text style={styles.salePrice}>${salePrice.toFixed(2)}</Text>
                <Text style={styles.originalPrice}>${product.basePrice.toFixed(2)}</Text>
              </>
            ) : (
              <Text style={styles.price}>From ${product.basePrice.toFixed(2)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.images[0] }} style={styles.image} resizeMode="cover" />
        {product.tag && (
          <View style={[styles.tag, tagColor(product.tag)]}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        )}
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.ratingRow}>
          <Stars rating={product.rating} />
          <Text style={styles.ratingNum}>{product.rating}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount.toLocaleString()})</Text>
        </View>
        <View style={styles.priceRow}>
          {salePrice ? (
            <>
              <Text style={styles.salePrice}>${salePrice.toFixed(2)}</Text>
              <Text style={styles.originalPrice}>${product.basePrice.toFixed(2)}</Text>
            </>
          ) : (
            <Text style={styles.price}>From ${product.basePrice.toFixed(2)}</Text>
          )}
        </View>
        <View style={styles.colorDots}>
          {product.colors.slice(0, 5).map((c, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: c.hex },
              c.hex === '#FFFFFF' && styles.dotBorder]} />
          ))}
          {product.colors.length > 5 && (
            <Text style={styles.moreDots}>+{product.colors.length - 5}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function tagColor(tag: string) {
  switch (tag) {
    case 'Best Seller': return { backgroundColor: Colors.primary };
    case 'New':         return { backgroundColor: '#059669' };
    case 'Top Rated':  return { backgroundColor: '#7C3AED' };
    case 'Sale':        return { backgroundColor: '#EA580C' };
    default:            return { backgroundColor: Colors.text };
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border,
  },
  imageWrap: { position: 'relative', backgroundColor: Colors.surface },
  image: { width: '100%', height: 165 },
  tag: {
    position: 'absolute', top: 10, left: 10,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5,
  },
  tagText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  discountBadge: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: '#EA580C',
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5,
  },
  discountText: { color: Colors.white, fontSize: 11, fontWeight: '800' },
  info: { padding: 11, gap: 4 },
  category: { fontSize: 10, color: Colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.7 },
  name: { fontSize: 13, fontWeight: '600', color: Colors.text, lineHeight: 18 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingNum: { fontSize: 11, fontWeight: '700', color: Colors.text },
  reviewCount: { fontSize: 10, color: Colors.textMuted },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  price: { fontSize: 14, fontWeight: '700', color: Colors.text },
  salePrice: { fontSize: 14, fontWeight: '800', color: Colors.primary },
  originalPrice: { fontSize: 12, color: Colors.textMuted, textDecorationLine: 'line-through' },
  colorDots: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  dot: { width: 11, height: 11, borderRadius: 6 },
  dotBorder: { borderWidth: 1, borderColor: Colors.borderDark },
  moreDots: { fontSize: 10, color: Colors.textMuted },

  // Horizontal card
  hCard: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderRadius: 12, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border,
  },
  hImage: { width: 110, height: 110 },
  hInfo: { flex: 1, padding: 12, gap: 4, justifyContent: 'center' },
  hCategory: { fontSize: 10, color: Colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  hName: { fontSize: 14, fontWeight: '700', color: Colors.text, lineHeight: 19 },
});
