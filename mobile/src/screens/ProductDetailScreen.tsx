import React, { useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../constants/colors';
import { Product } from '../constants/data';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ navigation, route }: any) {
  const product: Product = route.params.product;
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0]);
  const [quantity, setQuantity] = useState(1);
  const [artworkUri, setArtworkUri] = useState<string | undefined>();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      setArtworkUri(result.assets[0].uri);
    }
  };

  const handleAddToCart = () => {
    addItem({ product, quantity, size: selectedSize, material: selectedMaterial, artworkUri });
    Alert.alert('Added to cart!', `${product.name} has been added to your cart.`, [
      { text: 'Keep Shopping', style: 'cancel' },
      { text: 'View Cart', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  const unitPrice = product.basePrice;
  const lineTotal = (unitPrice * quantity).toFixed(2);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title & Category */}
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={15} color={Colors.textMuted} />
              <Text style={styles.metaText}>{product.turnaround}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="local-shipping" size={15} color={Colors.success} />
              <Text style={[styles.metaText, { color: Colors.success }]}>Free shipping over $75</Text>
            </View>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Size Selection */}
          <Text style={styles.optionLabel}>Size</Text>
          <View style={styles.optionGrid}>
            {product.sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[styles.optionChip, selectedSize === size && styles.optionChipActive]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[styles.optionChipText, selectedSize === size && styles.optionChipTextActive]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Material Selection */}
          <Text style={styles.optionLabel}>Material</Text>
          <View style={styles.optionGrid}>
            {product.materials.map(mat => (
              <TouchableOpacity
                key={mat}
                style={[styles.optionChip, selectedMaterial === mat && styles.optionChipActive]}
                onPress={() => setSelectedMaterial(mat)}
              >
                <Text style={[styles.optionChipText, selectedMaterial === mat && styles.optionChipTextActive]}>
                  {mat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity */}
          <Text style={styles.optionLabel}>Quantity</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(q => Math.max(1, q - 1))}
            >
              <MaterialIcons name="remove" size={20} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(q => q + 1)}
            >
              <MaterialIcons name="add" size={20} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.qtyPrice}>${unitPrice.toFixed(2)} each</Text>
          </View>

          {/* Artwork Upload */}
          <Text style={styles.optionLabel}>Your Artwork</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
            {artworkUri ? (
              <>
                <Image source={{ uri: artworkUri }} style={styles.artworkPreview} resizeMode="contain" />
                <Text style={styles.uploadChange}>Tap to change</Text>
              </>
            ) : (
              <>
                <MaterialIcons name="cloud-upload" size={36} color={Colors.accent} />
                <Text style={styles.uploadTitle}>Upload Artwork</Text>
                <Text style={styles.uploadSubtitle}>JPG, PNG, PDF • High res recommended</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${lineTotal}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <MaterialIcons name="add-shopping-cart" size={20} color={Colors.white} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 260, backgroundColor: Colors.surfaceAlt },
  backBtn: {
    position: 'absolute', top: 16, left: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, shadowRadius: 6, elevation: 4,
  },
  content: { padding: 20 },
  category: { fontSize: 12, color: Colors.accent, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  name: { fontSize: 24, fontWeight: '800', color: Colors.text, marginTop: 4, marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: Colors.textMuted },
  description: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22, marginBottom: 20 },
  optionLabel: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 10 },
  optionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  optionChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
    borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.surface,
  },
  optionChipActive: { borderColor: Colors.primary, backgroundColor: Colors.primary },
  optionChipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  optionChipTextActive: { color: Colors.white },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  qtyBtn: {
    width: 40, height: 40, borderRadius: 10,
    borderWidth: 1.5, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  qtyValue: { fontSize: 18, fontWeight: '700', color: Colors.text, minWidth: 30, textAlign: 'center' },
  qtyPrice: { fontSize: 13, color: Colors.textMuted },
  uploadArea: {
    borderWidth: 2, borderColor: Colors.border, borderStyle: 'dashed',
    borderRadius: 12, padding: 24, alignItems: 'center',
    backgroundColor: Colors.surfaceAlt, marginBottom: 20,
  },
  artworkPreview: { width: '100%', height: 120, marginBottom: 8 },
  uploadTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginTop: 8 },
  uploadSubtitle: { fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  uploadChange: { fontSize: 12, color: Colors.accent, fontWeight: '600', marginTop: 4 },
  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: Colors.surface,
    borderTopWidth: 1, borderTopColor: Colors.border,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 10,
  },
  totalLabel: { fontSize: 12, color: Colors.textMuted },
  totalPrice: { fontSize: 22, fontWeight: '800', color: Colors.text },
  addToCartBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.accent, borderRadius: 14,
    paddingVertical: 14, paddingHorizontal: 24,
  },
  addToCartText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
