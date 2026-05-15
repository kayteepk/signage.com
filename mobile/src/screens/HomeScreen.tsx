import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, FlatList, Image, StatusBar, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { categories, products } from '../constants/data';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }: any) {
  const { itemCount } = useCart();
  const { user } = useAuth();

  const newArrivals = products.filter(p => p.newArrival);
  const bestSellers = products.filter(p => p.popular);
  const featuredProduct = products[1]; // Retractable Banner Stand

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.logo}>Signage<Text style={styles.logoDot}>.com</Text></Text>
        </View>
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Catalog')}>
            <MaterialIcons name="search" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
            <MaterialIcons name="shopping-bag" size={24} color={Colors.text} />
            {itemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{itemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Catalog')}
          activeOpacity={0.8}
        >
          <MaterialIcons name="search" size={20} color={Colors.textMuted} />
          <Text style={styles.searchPlaceholder}>Search products...</Text>
        </TouchableOpacity>

        {/* Hero Banner */}
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/hero-signage/800/420' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroEyebrow}>SPRING COLLECTION</Text>
            <Text style={styles.heroTitle}>Make Your{'\n'}Brand Unmissable</Text>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => navigation.navigate('Catalog')}
            >
              <Text style={styles.heroBtnText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Free shipping banner */}
        <View style={styles.shippingBanner}>
          <MaterialIcons name="local-shipping" size={16} color={Colors.success} />
          <Text style={styles.shippingBannerText}>
            Free shipping on orders over <Text style={{ fontWeight: '700' }}>$75</Text>
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            keyExtractor={c => c.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Catalog', { category: item.name })}
                activeOpacity={0.85}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
                <View style={styles.categoryOverlay} />
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Featured Product */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Product</Text>
          </View>
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => navigation.navigate('ProductDetail', { product: featuredProduct })}
            activeOpacity={0.92}
          >
            <Image
              source={{ uri: featuredProduct.images[0] }}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredCategory}>{featuredProduct.category}</Text>
              <Text style={styles.featuredName}>{featuredProduct.name}</Text>
              <Text style={styles.featuredDesc} numberOfLines={2}>
                {featuredProduct.description}
              </Text>
              <View style={styles.featuredFooter}>
                <Text style={styles.featuredPrice}>From ${featuredProduct.basePrice.toFixed(2)}</Text>
                <View style={styles.featuredCta}>
                  <Text style={styles.featuredCtaText}>Shop Now</Text>
                  <MaterialIcons name="arrow-forward" size={14} color={Colors.white} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* New Arrivals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={newArrivals}
            keyExtractor={p => p.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <View style={{ width: 180 }}>
                <ProductCard
                  product={item}
                  onPress={() => navigation.navigate('ProductDetail', { product: item })}
                />
              </View>
            )}
          />
        </View>

        {/* Best Sellers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Sellers</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {bestSellers.map(product => (
              <View key={product.id} style={styles.gridItem}>
                <ProductCard
                  product={product}
                  onPress={() => navigation.navigate('ProductDetail', { product })}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Trust Badges */}
        <View style={styles.trustRow}>
          {[
            { icon: 'verified', label: 'Quality Guarantee' },
            { icon: 'local-shipping', label: 'Fast Delivery' },
            { icon: 'replay', label: 'Easy Reorders' },
            { icon: 'support-agent', label: '24/7 Support' },
          ].map((b, i) => (
            <View key={i} style={styles.trustItem}>
              <MaterialIcons name={b.icon as any} size={22} color={Colors.accent} />
              <Text style={styles.trustLabel}>{b.label}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  logo: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  logoDot: { color: Colors.accent },
  topActions: { flexDirection: 'row', gap: 4 },
  iconBtn: { padding: 6, position: 'relative' },
  cartBadge: {
    position: 'absolute', top: 2, right: 2,
    backgroundColor: Colors.accent,
    borderRadius: 8, minWidth: 16, height: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  cartBadgeText: { color: Colors.white, fontSize: 9, fontWeight: '800' },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 16,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchPlaceholder: { fontSize: 14, color: Colors.textMuted },

  hero: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,
  },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute', inset: 0,
    backgroundColor: 'rgba(0,0,0,0.42)',
    padding: 22,
    justifyContent: 'flex-end',
  },
  heroEyebrow: {
    fontSize: 10, fontWeight: '700', color: Colors.accent,
    letterSpacing: 2, marginBottom: 6,
  },
  heroTitle: {
    fontSize: 26, fontWeight: '800', color: Colors.white,
    lineHeight: 32, marginBottom: 16,
  },
  heroBtn: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 8, alignSelf: 'flex-start',
  },
  heroBtnText: { color: Colors.text, fontWeight: '700', fontSize: 13 },

  shippingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  shippingBannerText: { fontSize: 13, color: Colors.success },

  section: { marginTop: 28 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.text },
  seeAll: { fontSize: 13, color: Colors.accent, fontWeight: '600' },

  categoryList: { paddingHorizontal: 16, gap: 10 },
  categoryCard: {
    width: 110, height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: { width: '100%', height: '100%' },
  categoryOverlay: {
    position: 'absolute', inset: 0,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  categoryName: {
    position: 'absolute',
    bottom: 8, left: 8, right: 8,
    fontSize: 12, fontWeight: '700',
    color: Colors.white,
  },

  featuredCard: {
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featuredImage: { width: '100%', height: 200 },
  featuredInfo: { padding: 16 },
  featuredCategory: {
    fontSize: 10, color: Colors.textMuted,
    fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
  },
  featuredName: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  featuredDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19, marginBottom: 14 },
  featuredFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  featuredPrice: { fontSize: 16, fontWeight: '700', color: Colors.text },
  featuredCta: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.accent,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
  },
  featuredCtaText: { color: Colors.white, fontWeight: '700', fontSize: 13 },

  horizontalList: { paddingHorizontal: 16, gap: 12 },

  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 12,
  },
  gridItem: { width: '47.5%' },

  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  trustItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 6,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  trustLabel: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary, textAlign: 'center' },
});
