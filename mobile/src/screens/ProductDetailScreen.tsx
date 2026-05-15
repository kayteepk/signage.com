import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, StyleSheet,
  Alert, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../constants/colors';
import { Product, mockReviews } from '../constants/data';
import { useCart } from '../context/CartContext';
import ReviewCard from '../components/ReviewCard';

const { width: W } = Dimensions.get('window');

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <MaterialIcons key={i} name={i <= Math.round(rating) ? 'star' : 'star-border'} size={size} color={Colors.starYellow} />
      ))}
    </View>
  );
}

function RatingBar({ label, pct }: { label: string; pct: number }) {
  return (
    <View style={ratingBarStyles.row}>
      <Text style={ratingBarStyles.label}>{label}</Text>
      <View style={ratingBarStyles.track}>
        <View style={[ratingBarStyles.fill, { width: `${pct}%` as any }]} />
      </View>
      <Text style={ratingBarStyles.pct}>{pct}%</Text>
    </View>
  );
}
const ratingBarStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 12, color: Colors.textMuted, width: 20 },
  track: { flex: 1, height: 6, borderRadius: 3, backgroundColor: Colors.border, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3, backgroundColor: Colors.starYellow },
  pct: { fontSize: 11, color: Colors.textMuted, width: 28, textAlign: 'right' },
});

export default function ProductDetailScreen({ navigation, route }: any) {
  const product: Product = route.params.product;
  const { addItem } = useCart();

  const [imgIndex,     setImgIndex]     = useState(0);
  const [selColor,     setSelColor]     = useState(product.colors[0]);
  const [selSize,      setSelSize]      = useState(product.sizes[0]);
  const [selMaterial,  setSelMaterial]  = useState(product.materials[0]);
  const [qty,          setQty]          = useState(1);
  const [artworkUri,   setArtworkUri]   = useState<string>();
  const [wishlist,     setWishlist]     = useState(false);
  const [descOpen,     setDescOpen]     = useState(false);
  const [featOpen,     setFeatOpen]     = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const imgRef = useRef<FlatList>(null);
  const reviews = mockReviews.slice(0, 3);

  const salePrice   = product.discount ? product.basePrice * (1 - product.discount / 100) : null;
  const displayPrice = salePrice ?? product.basePrice;
  const lineTotal    = (displayPrice * qty).toFixed(2);

  const onImgScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    setImgIndex(Math.round(e.nativeEvent.contentOffset.x / W));

  const pickArtwork = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission needed', 'Allow photo library access.'); return; }
    const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!r.canceled) setArtworkUri(r.assets[0].uri);
  };

  const addToCart = () => {
    addItem({ product, quantity: qty, size: selSize, material: selMaterial, artworkUri });
    Alert.alert('Added to bag!', `${product.name} (${selSize}) added.`, [
      { text: 'Continue Shopping', style: 'cancel' },
      { text: 'View Bag', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  return (
    <SafeAreaView style={s.root} edges={['bottom']}>
      {/* Floating buttons */}
      <View style={s.floating}>
        <TouchableOpacity style={s.floatBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color={Colors.text} />
        </TouchableOpacity>
        <View style={s.floatRight}>
          <TouchableOpacity style={s.floatBtn} onPress={() => setWishlist(v => !v)}>
            <MaterialIcons name={wishlist ? 'favorite' : 'favorite-border'} size={20} color={wishlist ? Colors.primary : Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={s.floatBtn}>
            <MaterialIcons name="ios-share" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image carousel */}
        <View style={s.carousel}>
          <FlatList
            ref={imgRef}
            data={product.images}
            keyExtractor={(_, i) => String(i)}
            horizontal pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onImgScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={s.carouselImg} resizeMode="cover" />
            )}
          />
          <View style={s.dots}>
            {product.images.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => {
                setImgIndex(i);
                imgRef.current?.scrollToIndex({ index: i, animated: true });
              }}>
                <View style={[s.dot, i === imgIndex && s.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Thumbnails */}
        <View style={s.thumbRow}>
          {product.images.map((img, i) => (
            <TouchableOpacity key={i} onPress={() => {
              setImgIndex(i);
              imgRef.current?.scrollToIndex({ index: i, animated: true });
            }}>
              <Image source={{ uri: img }} style={[s.thumb, i === imgIndex && s.thumbActive]} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.body}>
          {/* Name + category */}
          <Text style={s.catLabel}>{product.category}</Text>
          {product.tag && <View style={[s.tag, tagBg(product.tag)]}><Text style={s.tagText}>{product.tag}</Text></View>}
          <Text style={s.name}>{product.name}</Text>

          {/* Rating */}
          <TouchableOpacity style={s.ratingRow} onPress={() => {}}>
            <Stars rating={product.rating} size={16} />
            <Text style={s.ratingVal}>{product.rating}</Text>
            <Text style={s.ratingCount}>({product.reviewCount.toLocaleString()} reviews)</Text>
            <MaterialIcons name="chevron-right" size={16} color={Colors.textMuted} />
          </TouchableOpacity>

          {/* Price */}
          <View style={s.priceRow}>
            {salePrice ? (
              <>
                <Text style={s.salePrice}>${salePrice.toFixed(2)}</Text>
                <Text style={s.origPrice}>${product.basePrice.toFixed(2)}</Text>
                <View style={s.discountTag}>
                  <Text style={s.discountTagText}>-{product.discount}%</Text>
                </View>
              </>
            ) : (
              <Text style={s.price}>From ${product.basePrice.toFixed(2)}</Text>
            )}
          </View>

          <View style={s.divider} />

          {/* Color */}
          <View style={s.optSection}>
            <View style={s.optRow}>
              <Text style={s.optLabel}>Color</Text>
              <Text style={s.optVal}>{selColor.name}</Text>
            </View>
            <View style={s.swatches}>
              {product.colors.map(c => (
                <TouchableOpacity
                  key={c.name}
                  onPress={() => setSelColor(c)}
                  style={[s.swatchRing, selColor.name === c.name && s.swatchRingActive]}
                >
                  <View style={[s.swatch, { backgroundColor: c.hex },
                    c.hex === '#FFFFFF' && s.swatchBorder]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={s.divider} />

          {/* Size */}
          <View style={s.optSection}>
            <View style={s.optRow}>
              <Text style={s.optLabel}>Size</Text>
              <Text style={s.optVal}>{selSize}</Text>
            </View>
            <View style={s.sizeGrid}>
              {product.sizes.map(sz => (
                <TouchableOpacity
                  key={sz}
                  style={[s.sizeChip, selSize === sz && s.sizeChipActive]}
                  onPress={() => setSelSize(sz)}
                >
                  <Text style={[s.sizeChipText, selSize === sz && s.sizeChipTextActive]}>{sz}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={s.divider} />

          {/* Material */}
          <View style={s.optSection}>
            <Text style={s.optLabel}>Material</Text>
            {product.materials.map(mat => (
              <TouchableOpacity
                key={mat}
                style={[s.matRow, selMaterial === mat && s.matRowActive]}
                onPress={() => setSelMaterial(mat)}
              >
                <View style={[s.radio, selMaterial === mat && s.radioActive]}>
                  {selMaterial === mat && <View style={s.radioDot} />}
                </View>
                <Text style={[s.matText, selMaterial === mat && { color: Colors.text, fontWeight: '600' }]}>{mat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={s.divider} />

          {/* Quantity */}
          <View style={s.optSection}>
            <Text style={s.optLabel}>Quantity</Text>
            <View style={s.qtyRow}>
              <TouchableOpacity style={s.qtyBtn} onPress={() => setQty(q => Math.max(1, q - 1))}>
                <MaterialIcons name="remove" size={18} color={Colors.text} />
              </TouchableOpacity>
              <Text style={s.qtyVal}>{qty}</Text>
              <TouchableOpacity style={s.qtyBtn} onPress={() => setQty(q => q + 1)}>
                <MaterialIcons name="add" size={18} color={Colors.text} />
              </TouchableOpacity>
              <Text style={s.qtyNote}>× ${displayPrice.toFixed(2)} each</Text>
            </View>
          </View>

          <View style={s.divider} />

          {/* Artwork upload */}
          <View style={s.optSection}>
            <Text style={s.optLabel}>Upload Artwork</Text>
            <TouchableOpacity style={s.uploadBox} onPress={pickArtwork} activeOpacity={0.8}>
              {artworkUri ? (
                <View style={{ alignItems: 'center', gap: 8 }}>
                  <Image source={{ uri: artworkUri }} style={s.artworkPreview} resizeMode="contain" />
                  <View style={s.artworkMeta}>
                    <MaterialIcons name="check-circle" size={15} color={Colors.success} />
                    <Text style={s.artworkOk}>Artwork uploaded</Text>
                    <TouchableOpacity onPress={() => setArtworkUri(undefined)}>
                      <Text style={s.artworkRemove}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <View style={s.uploadIconWrap}>
                    <MaterialIcons name="cloud-upload" size={28} color={Colors.primary} />
                  </View>
                  <Text style={s.uploadTitle}>Tap to upload your design</Text>
                  <Text style={s.uploadSub}>PNG, JPG, PDF · 300 DPI recommended</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={s.divider} />

          {/* Accordion: Description */}
          <TouchableOpacity style={s.accordion} onPress={() => setDescOpen(v => !v)}>
            <Text style={s.optLabel}>Description</Text>
            <MaterialIcons name={descOpen ? 'expand-less' : 'expand-more'} size={22} color={Colors.textMuted} />
          </TouchableOpacity>
          {descOpen && <Text style={s.descText}>{product.description}</Text>}

          {/* Accordion: Features */}
          <View style={s.divider} />
          <TouchableOpacity style={s.accordion} onPress={() => setFeatOpen(v => !v)}>
            <Text style={s.optLabel}>Features</Text>
            <MaterialIcons name={featOpen ? 'expand-less' : 'expand-more'} size={22} color={Colors.textMuted} />
          </TouchableOpacity>
          {featOpen && (
            <View style={{ gap: 8, paddingTop: 12 }}>
              {product.features.map((f, i) => (
                <View key={i} style={s.featureRow}>
                  <MaterialIcons name="check-circle" size={15} color={Colors.success} />
                  <Text style={s.featureText}>{f}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Accordion: Shipping */}
          <View style={s.divider} />
          <TouchableOpacity style={s.accordion} onPress={() => setShippingOpen(v => !v)}>
            <Text style={s.optLabel}>Shipping & Turnaround</Text>
            <MaterialIcons name={shippingOpen ? 'expand-less' : 'expand-more'} size={22} color={Colors.textMuted} />
          </TouchableOpacity>
          {shippingOpen && (
            <View style={{ gap: 10, paddingTop: 12 }}>
              {[
                { icon: 'schedule',        text: `Production: ${product.turnaround}` },
                { icon: 'local-shipping',  text: 'Free shipping on orders over $75' },
                { icon: 'replay',          text: '30-day satisfaction guarantee' },
                { icon: 'inventory',       text: 'Ships in protective packaging' },
              ].map((item, i) => (
                <View key={i} style={s.shippingRow}>
                  <MaterialIcons name={item.icon as any} size={17} color={Colors.textMuted} />
                  <Text style={s.shippingText}>{item.text}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={s.divider} />

          {/* Reviews Summary */}
          <View style={s.reviewsSummary}>
            <View style={s.reviewsLeft}>
              <Text style={s.reviewsBig}>{product.rating}</Text>
              <Stars rating={product.rating} size={18} />
              <Text style={s.reviewsCount}>{product.reviewCount.toLocaleString()} reviews</Text>
            </View>
            <View style={s.ratingBars}>
              <RatingBar label="5" pct={72} />
              <RatingBar label="4" pct={18} />
              <RatingBar label="3" pct={6} />
              <RatingBar label="2" pct={2} />
              <RatingBar label="1" pct={2} />
            </View>
          </View>

          <View style={{ gap: 12, marginTop: 16 }}>
            {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
          </View>

          <TouchableOpacity
            style={s.allReviewsBtn}
            onPress={() => navigation.navigate('Reviews', { product })}
          >
            <Text style={s.allReviewsBtnText}>See all {product.reviewCount.toLocaleString()} reviews</Text>
            <MaterialIcons name="chevron-right" size={18} color={Colors.primary} />
          </TouchableOpacity>

          <View style={{ height: 110 }} />
        </View>
      </ScrollView>

      {/* Sticky bottom bar */}
      <View style={s.bottomBar}>
        <View>
          <Text style={s.totalLabel}>Total</Text>
          <Text style={s.totalPrice}>${lineTotal}</Text>
        </View>
        <TouchableOpacity style={s.addBtn} onPress={addToCart} activeOpacity={0.9}>
          <MaterialIcons name="shopping-bag" size={18} color={Colors.white} />
          <Text style={s.addBtnText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function tagBg(tag: string) {
  switch (tag) {
    case 'Best Seller': return { backgroundColor: Colors.primary };
    case 'New':         return { backgroundColor: '#059669' };
    case 'Top Rated':  return { backgroundColor: '#7C3AED' };
    case 'Sale':        return { backgroundColor: '#EA580C' };
    default:            return { backgroundColor: Colors.text };
  }
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  floating: {
    position: 'absolute', top: 16, left: 0, right: 0, zIndex: 10,
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  floatRight: { flexDirection: 'row', gap: 8 },
  floatBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 6, elevation: 4,
  },
  carousel: { backgroundColor: Colors.surface },
  carouselImg: { width: W, height: 320 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, paddingVertical: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.border },
  dotActive: { width: 20, backgroundColor: Colors.primary },
  thumbRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingBottom: 14 },
  thumb: { width: 58, height: 58, borderRadius: 8, borderWidth: 2, borderColor: 'transparent' },
  thumbActive: { borderColor: Colors.primary },
  body: { padding: 18 },
  catLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  tag: {
    alignSelf: 'flex-start', marginTop: 6, marginBottom: 4,
    paddingHorizontal: 9, paddingVertical: 4, borderRadius: 5,
  },
  tagText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '800', color: Colors.text, lineHeight: 28, marginBottom: 10 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  ratingVal: { fontSize: 14, fontWeight: '700', color: Colors.text },
  ratingCount: { fontSize: 13, color: Colors.textMuted },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  price: { fontSize: 22, fontWeight: '800', color: Colors.text },
  salePrice: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  origPrice: { fontSize: 16, color: Colors.textMuted, textDecorationLine: 'line-through' },
  discountTag: { backgroundColor: '#EA580C', borderRadius: 5, paddingHorizontal: 7, paddingVertical: 3 },
  discountTagText: { color: Colors.white, fontSize: 12, fontWeight: '800' },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 18 },
  optSection: { gap: 12 },
  optRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optLabel: { fontSize: 15, fontWeight: '700', color: Colors.text },
  optVal: { fontSize: 13, color: Colors.textSecondary },
  swatches: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  swatchRing: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 2, borderColor: 'transparent',
    padding: 3, justifyContent: 'center', alignItems: 'center',
  },
  swatchRingActive: { borderColor: Colors.text },
  swatch: { width: 26, height: 26, borderRadius: 13 },
  swatchBorder: { borderWidth: 1, borderColor: Colors.borderDark },
  sizeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sizeChip: {
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 8, borderWidth: 1.5, borderColor: Colors.border,
  },
  sizeChipActive: { backgroundColor: Colors.text, borderColor: Colors.text },
  sizeChipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  sizeChipTextActive: { color: Colors.white },
  matRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 10, borderWidth: 1.5, borderColor: Colors.border,
  },
  matRowActive: { borderColor: Colors.text, backgroundColor: Colors.surface },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { borderColor: Colors.text },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.text },
  matText: { fontSize: 14, color: Colors.textSecondary },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  qtyBtn: {
    width: 40, height: 40, borderRadius: 10,
    borderWidth: 1.5, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  qtyVal: { fontSize: 18, fontWeight: '700', color: Colors.text, minWidth: 28, textAlign: 'center' },
  qtyNote: { fontSize: 13, color: Colors.textMuted },
  uploadBox: {
    borderWidth: 1.5, borderColor: Colors.border, borderStyle: 'dashed',
    borderRadius: 12, padding: 24, alignItems: 'center', backgroundColor: Colors.surface,
  },
  uploadIconWrap: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  uploadTitle: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: 4 },
  uploadSub: { fontSize: 12, color: Colors.textMuted },
  artworkPreview: { width: '100%', height: 120 },
  artworkMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  artworkOk: { fontSize: 13, color: Colors.success, fontWeight: '600' },
  artworkRemove: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  accordion: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 },
  descText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22, paddingTop: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  featureText: { fontSize: 14, color: Colors.textSecondary, flex: 1, lineHeight: 20 },
  shippingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  shippingText: { fontSize: 13, color: Colors.textSecondary },
  reviewsSummary: {
    flexDirection: 'row', gap: 16,
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: Colors.border,
  },
  reviewsLeft: { alignItems: 'center', gap: 4, minWidth: 80 },
  reviewsBig: { fontSize: 42, fontWeight: '900', color: Colors.text },
  reviewsCount: { fontSize: 11, color: Colors.textMuted, textAlign: 'center' },
  ratingBars: { flex: 1, gap: 6, justifyContent: 'center' },
  allReviewsBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4,
    marginTop: 16, paddingVertical: 14,
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10,
  },
  allReviewsBtnText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.border,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07, shadowRadius: 10, elevation: 10,
  },
  totalLabel: { fontSize: 11, color: Colors.textMuted, marginBottom: 2 },
  totalPrice: { fontSize: 22, fontWeight: '900', color: Colors.text },
  addBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', gap: 8, marginLeft: 16,
    backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 15,
  },
  addBtnText: { color: Colors.white, fontSize: 16, fontWeight: '800' },
});
