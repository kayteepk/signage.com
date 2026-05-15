import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, Alert, FlatList, Dimensions, NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../constants/colors';
import { Product } from '../constants/data';
import { useCart } from '../context/CartContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const mockReviews = [
  { id: '1', name: 'Sarah M.', rating: 5, date: 'Jan 12, 2024', text: 'Absolutely love the quality! Colors are vibrant and the material feels very premium. Shipped fast too.' },
  { id: '2', name: 'James R.', rating: 5, date: 'Jan 8, 2024', text: 'Used these for our storefront. Professional look and exactly as described. Will order again.' },
  { id: '3', name: 'Lisa T.', rating: 4, date: 'Dec 29, 2023', text: 'Great product overall. Shipping was quick and packaging protected the item well.' },
];

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <MaterialIcons
          key={i}
          name={i <= Math.round(rating) ? 'star' : 'star-border'}
          size={size}
          color="#F59E0B"
        />
      ))}
    </View>
  );
}

export default function ProductDetailScreen({ navigation, route }: any) {
  const product: Product = route.params.product;
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0]);
  const [quantity, setQuantity] = useState(1);
  const [artworkUri, setArtworkUri] = useState<string | undefined>();
  const [descExpanded, setDescExpanded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const scrollRef = useRef<FlatList>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveImage(idx);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library.'); return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) setArtworkUri(result.assets[0].uri);
  };

  const handleAddToCart = () => {
    addItem({
      product,
      quantity,
      size: selectedSize,
      material: selectedMaterial,
      artworkUri,
    });
    Alert.alert('Added to bag!', `${product.name} (${selectedSize}) has been added to your cart.`, [
      { text: 'Keep Shopping', style: 'cancel' },
      { text: 'View Cart', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  const lineTotal = (product.basePrice * quantity).toFixed(2);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Floating header buttons */}
      <View style={styles.floatingHeader}>
        <TouchableOpacity style={styles.floatingBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.floatingRight}>
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={() => setWishlist(w => !w)}
          >
            <MaterialIcons
              name={wishlist ? 'favorite' : 'favorite-border'}
              size={20}
              color={wishlist ? Colors.accent : Colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingBtn}>
            <MaterialIcons name="share" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={scrollRef}
            data={product.images}
            keyExtractor={(_, i) => String(i)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.carouselImage}
                resizeMode="cover"
              />
            )}
          />
          {/* Dot indicators */}
          <View style={styles.dots}>
            {product.images.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeImage && styles.dotActive]} />
            ))}
          </View>
          {/* Thumbnail strip */}
          <View style={styles.thumbStrip}>
            {product.images.map((img, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setActiveImage(i);
                  scrollRef.current?.scrollToIndex({ index: i, animated: true });
                }}
              >
                <Image
                  source={{ uri: img }}
                  style={[styles.thumb, i === activeImage && styles.thumbActive]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          {/* Category + Name */}
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>

          {/* Rating row */}
          <View style={styles.ratingRow}>
            <StarRow rating={product.rating} />
            <Text style={styles.ratingValue}>{product.rating}</Text>
            <Text style={styles.ratingCount}>({product.reviewCount.toLocaleString()} reviews)</Text>
          </View>

          {/* Price */}
          <Text style={styles.price}>From ${product.basePrice.toFixed(2)}</Text>

          <View style={styles.divider} />

          {/* Color selection */}
          <View style={styles.optionSection}>
            <View style={styles.optionLabelRow}>
              <Text style={styles.optionLabel}>Color</Text>
              <Text style={styles.optionValue}>{selectedColor.name}</Text>
            </View>
            <View style={styles.colorSwatches}>
              {product.colors.map(color => (
                <TouchableOpacity
                  key={color.name}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.swatchOuter,
                    selectedColor.name === color.name && styles.swatchOuterSelected,
                  ]}
                >
                  <View
                    style={[
                      styles.swatch,
                      { backgroundColor: color.hex },
                      color.hex === '#FFFFFF' && styles.swatchBordered,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Size selection */}
          <View style={styles.optionSection}>
            <View style={styles.optionLabelRow}>
              <Text style={styles.optionLabel}>Size</Text>
              <Text style={styles.optionValue}>{selectedSize}</Text>
            </View>
            <View style={styles.sizeGrid}>
              {product.sizes.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeChip, selectedSize === size && styles.sizeChipActive]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeChipText, selectedSize === size && styles.sizeChipTextActive]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Material selection */}
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Material</Text>
            <View style={styles.materialList}>
              {product.materials.map(mat => (
                <TouchableOpacity
                  key={mat}
                  style={[styles.materialRow, selectedMaterial === mat && styles.materialRowActive]}
                  onPress={() => setSelectedMaterial(mat)}
                >
                  <View style={[
                    styles.radioOuter,
                    selectedMaterial === mat && styles.radioOuterActive,
                  ]}>
                    {selectedMaterial === mat && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.materialText, selectedMaterial === mat && { color: Colors.text, fontWeight: '600' }]}>
                    {mat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Quantity */}
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Quantity</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
              >
                <MaterialIcons name="remove" size={18} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(q => q + 1)}
              >
                <MaterialIcons name="add" size={18} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Artwork upload */}
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Upload Your Artwork</Text>
            <TouchableOpacity style={styles.uploadArea} onPress={pickImage} activeOpacity={0.8}>
              {artworkUri ? (
                <View style={styles.artworkPreviewWrap}>
                  <Image source={{ uri: artworkUri }} style={styles.artworkPreview} resizeMode="contain" />
                  <View style={styles.artworkActions}>
                    <MaterialIcons name="check-circle" size={16} color={Colors.success} />
                    <Text style={styles.artworkUploaded}>Artwork uploaded</Text>
                    <TouchableOpacity onPress={() => setArtworkUri(undefined)}>
                      <Text style={styles.artworkRemove}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <View style={styles.uploadIcon}>
                    <MaterialIcons name="cloud-upload" size={28} color={Colors.accent} />
                  </View>
                  <Text style={styles.uploadTitle}>Tap to upload artwork</Text>
                  <Text style={styles.uploadSubtitle}>PNG, JPG, PDF • 300 DPI recommended</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <TouchableOpacity
            style={styles.descSection}
            onPress={() => setDescExpanded(e => !e)}
            activeOpacity={0.8}
          >
            <Text style={styles.optionLabel}>Description</Text>
            <MaterialIcons
              name={descExpanded ? 'expand-less' : 'expand-more'}
              size={22}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
          {descExpanded && (
            <View style={styles.descContent}>
              <Text style={styles.descText}>{product.description}</Text>
              <Text style={styles.featuresTitle}>Features</Text>
              {product.features.map((f, i) => (
                <View key={i} style={styles.featureRow}>
                  <MaterialIcons name="check" size={15} color={Colors.success} />
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.divider} />

          {/* Shipping info */}
          <View style={styles.shippingInfo}>
            {[
              { icon: 'schedule', text: `Turnaround: ${product.turnaround}` },
              { icon: 'local-shipping', text: 'Free shipping on orders over $75' },
              { icon: 'replay', text: 'Easy returns within 30 days' },
            ].map((item, i) => (
              <View key={i} style={styles.shippingRow}>
                <MaterialIcons name={item.icon as any} size={17} color={Colors.textMuted} />
                <Text style={styles.shippingText}>{item.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Reviews */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.optionLabel}>Customer Reviews</Text>
              <View style={styles.reviewsSummary}>
                <StarRow rating={product.rating} size={16} />
                <Text style={styles.reviewsAvg}>{product.rating} / 5</Text>
              </View>
              <Text style={styles.reviewsCount}>
                Based on {product.reviewCount.toLocaleString()} reviews
              </Text>
            </View>

            {mockReviews.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewTop}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{review.name[0]}</Text>
                  </View>
                  <View>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <View style={{ marginLeft: 'auto' }}>
                    <StarRow rating={review.rating} size={13} />
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${lineTotal}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart} activeOpacity={0.9}>
          <MaterialIcons name="shopping-bag" size={18} color={Colors.white} />
          <Text style={styles.addToCartText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },

  floatingHeader: {
    position: 'absolute', top: 16, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, zIndex: 10,
  },
  floatingRight: { flexDirection: 'row', gap: 8 },
  floatingBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 4,
  },

  carouselContainer: { backgroundColor: Colors.surfaceAlt },
  carouselImage: { width: SCREEN_WIDTH, height: 320 },
  dots: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 5, paddingVertical: 10,
  },
  dot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: Colors.border,
  },
  dotActive: { backgroundColor: Colors.text, width: 18 },
  thumbStrip: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 16, paddingBottom: 14,
  },
  thumb: {
    width: 56, height: 56, borderRadius: 8,
    borderWidth: 2, borderColor: 'transparent',
  },
  thumbActive: { borderColor: Colors.text },

  content: { padding: 20 },

  category: {
    fontSize: 11, color: Colors.textMuted, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6,
  },
  name: { fontSize: 22, fontWeight: '700', color: Colors.text, lineHeight: 28, marginBottom: 10 },

  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  ratingValue: { fontSize: 13, fontWeight: '700', color: Colors.text },
  ratingCount: { fontSize: 13, color: Colors.textMuted },

  price: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 4 },

  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 18 },

  optionSection: { gap: 12 },
  optionLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionLabel: { fontSize: 15, fontWeight: '700', color: Colors.text },
  optionValue: { fontSize: 13, color: Colors.textSecondary },

  colorSwatches: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  swatchOuter: {
    width: 34, height: 34, borderRadius: 17,
    borderWidth: 2, borderColor: 'transparent',
    padding: 2, justifyContent: 'center', alignItems: 'center',
  },
  swatchOuterSelected: { borderColor: Colors.text },
  swatch: { width: 26, height: 26, borderRadius: 13 },
  swatchBordered: { borderWidth: 1, borderColor: Colors.borderDark },

  sizeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sizeChip: {
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 8, borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  sizeChipActive: { backgroundColor: Colors.text, borderColor: Colors.text },
  sizeChipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  sizeChipTextActive: { color: Colors.white },

  materialList: { gap: 10 },
  materialRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 10,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  materialRowActive: { borderColor: Colors.text, backgroundColor: Colors.surfaceAlt2 },
  radioOuter: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  radioOuterActive: { borderColor: Colors.text },
  radioInner: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: Colors.text,
  },
  materialText: { fontSize: 14, color: Colors.textSecondary },

  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: {
    width: 40, height: 40, borderRadius: 10,
    borderWidth: 1.5, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  qtyValue: { fontSize: 18, fontWeight: '700', color: Colors.text, minWidth: 30, textAlign: 'center' },

  uploadArea: {
    borderWidth: 1.5, borderColor: Colors.border, borderStyle: 'dashed',
    borderRadius: 12, padding: 24, alignItems: 'center',
    backgroundColor: Colors.surfaceAlt2,
  },
  uploadIcon: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: Colors.accent + '12',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 10,
  },
  uploadTitle: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: 4 },
  uploadSubtitle: { fontSize: 12, color: Colors.textMuted },
  artworkPreviewWrap: { width: '100%', alignItems: 'center' },
  artworkPreview: { width: '100%', height: 120, marginBottom: 10 },
  artworkActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  artworkUploaded: { fontSize: 13, color: Colors.success, fontWeight: '600' },
  artworkRemove: { fontSize: 13, color: Colors.accent, fontWeight: '600' },

  descSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  descContent: { marginTop: 12, gap: 10 },
  descText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  featuresTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginTop: 4 },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  featureText: { fontSize: 13, color: Colors.textSecondary, flex: 1, lineHeight: 20 },

  shippingInfo: { gap: 10 },
  shippingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  shippingText: { fontSize: 13, color: Colors.textSecondary },

  reviewsSection: { gap: 14 },
  reviewsHeader: { gap: 6 },
  reviewsSummary: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reviewsAvg: { fontSize: 15, fontWeight: '700', color: Colors.text },
  reviewsCount: { fontSize: 12, color: Colors.textMuted },
  reviewCard: {
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: 12, padding: 14, gap: 10,
  },
  reviewTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewAvatar: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center', alignItems: 'center',
  },
  reviewAvatarText: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  reviewName: { fontSize: 13, fontWeight: '700', color: Colors.text },
  reviewDate: { fontSize: 11, color: Colors.textMuted },
  reviewText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },

  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07, shadowRadius: 10, elevation: 10,
  },
  totalLabel: { fontSize: 11, color: Colors.textMuted, marginBottom: 2 },
  totalPrice: { fontSize: 22, fontWeight: '800', color: Colors.text },
  addToCartBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.text,
    paddingVertical: 15, paddingHorizontal: 28,
    borderRadius: 12,
  },
  addToCartText: { color: Colors.white, fontSize: 15, fontWeight: '700' },
});
