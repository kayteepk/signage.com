import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  FlatList, Image, StatusBar, Dimensions, NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { categories, products } from '../constants/data';
import ProductCard from '../components/ProductCard';
import SignageLogo from '../components/SignageLogo';
import { useCart } from '../context/CartContext';

const { width: W } = Dimensions.get('window');

const banners = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/hero-sign1/900/500',
    eyebrow: 'FREE SHIPPING OVER $75',
    title: 'Make Your Brand\nUnmissable',
    cta: 'Shop Now',
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/hero-sign2/900/500',
    eyebrow: 'NEW ARRIVALS',
    title: 'Fresh Signage\nfor Spring',
    cta: 'Explore New',
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/hero-sign3/900/500',
    eyebrow: 'TRADE SHOW SEASON',
    title: 'Stand Out at\nEvery Event',
    cta: 'See Trade Show',
  },
];

export default function HomeScreen({ navigation }: any) {
  const { itemCount } = useCart();
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerRef = useRef<FlatList>(null);

  const newArrivals = products.filter(p => p.newArrival).slice(0, 6);
  const bestSellers = products.filter(p => p.popular).slice(0, 6);
  const onSale      = products.filter(p => p.discount).slice(0, 4);

  const onBannerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveBanner(Math.round(e.nativeEvent.contentOffset.x / W));
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* ── Top Bar ─────────────────────────────────────── */}
      <View style={styles.topBar}>
        <SignageLogo size="md" />
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Catalog')}>
            <MaterialIcons name="search" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
            <MaterialIcons name="shopping-bag" size={24} color={Colors.text} />
            {itemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount > 9 ? '9+' : itemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Hero Carousel ───────────────────────────── */}
        <View>
          <FlatList
            ref={bannerRef}
            data={banners}
            keyExtractor={b => b.id}
            horizontal pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onBannerScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View style={styles.heroBanner}>
                <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
                <View style={styles.heroOverlay}>
                  <Text style={styles.heroEyebrow}>{item.eyebrow}</Text>
                  <Text style={styles.heroTitle}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.heroBtn}
                    onPress={() => navigation.navigate('Catalog')}
                  >
                    <Text style={styles.heroBtnText}>{item.cta}</Text>
                    <MaterialIcons name="arrow-forward" size={14} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {/* Dots */}
          <View style={styles.heroDots}>
            {banners.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => bannerRef.current?.scrollToIndex({ index: i, animated: true })}
              >
                <View style={[styles.heroDot, i === activeBanner && styles.heroDotActive]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Perks strip ─────────────────────────────── */}
        <View style={styles.perks}>
          {[
            { icon: 'local-shipping',  text: 'Free Shipping $75+' },
            { icon: 'schedule',        text: 'Ships in 2–5 Days' },
            { icon: 'verified',        text: 'Quality Guarantee' },
          ].map((p, i) => (
            <React.Fragment key={i}>
              <View style={styles.perk}>
                <MaterialIcons name={p.icon as any} size={18} color={Colors.primary} />
                <Text style={styles.perkText}>{p.text}</Text>
              </View>
              {i < 2 && <View style={styles.perkDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* ── Categories ──────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
          </View>
          <FlatList
            data={categories}
            keyExtractor={c => c.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hPad}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.catCard}
                onPress={() => navigation.navigate('Catalog', { category: item.name })}
                activeOpacity={0.85}
              >
                <Image source={{ uri: item.image }} style={styles.catImage} resizeMode="cover" />
                <View style={styles.catOverlay} />
                <View style={styles.catInfo}>
                  <Text style={styles.catName}>{item.name}</Text>
                  <Text style={styles.catCount}>{item.count} items</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ── New Arrivals ─────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
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
            contentContainerStyle={styles.hPad}
            renderItem={({ item }) => (
              <View style={{ width: 175 }}>
                <ProductCard
                  product={item}
                  onPress={() => navigation.navigate('ProductDetail', { product: item })}
                />
              </View>
            )}
          />
        </View>

        {/* ── Featured banner ──────────────────────────── */}
        <TouchableOpacity
          style={styles.featureBanner}
          onPress={() => navigation.navigate('Catalog', { category: 'Trade Show' })}
          activeOpacity={0.92}
        >
          <Image
            source={{ uri: 'https://picsum.photos/seed/feature-tradeshow/900/400' }}
            style={styles.featureBannerImage}
            resizeMode="cover"
          />
          <View style={styles.featureBannerOverlay}>
            <Text style={styles.featureBannerEyebrow}>TRADE SHOW COLLECTION</Text>
            <Text style={styles.featureBannerTitle}>Everything you need{'\n'}to stand out</Text>
            <View style={styles.featureBannerBtn}>
              <Text style={styles.featureBannerBtnText}>Shop Trade Show</Text>
              <MaterialIcons name="arrow-forward" size={14} color={Colors.primary} />
            </View>
          </View>
        </TouchableOpacity>

        {/* ── Best Sellers ─────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
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

        {/* ── On Sale ──────────────────────────────────── */}
        {onSale.length > 0 && (
          <View style={styles.section}>
            <View style={styles.saleHeader}>
              <View style={styles.saleBadge}>
                <MaterialIcons name="local-offer" size={14} color={Colors.white} />
                <Text style={styles.saleBadgeText}>ON SALE</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.saleList}>
              {onSale.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  horizontal
                  onPress={() => navigation.navigate('ProductDetail', { product })}
                />
              ))}
            </View>
          </View>
        )}

        {/* ── Trust Row ─────────────────────────────────── */}
        <View style={styles.trustRow}>
          {[
            { icon: 'verified-user', title: 'Quality Guarantee', sub: '100% satisfaction or we reprint' },
            { icon: 'support-agent', title: '24/7 Support',      sub: 'Real experts, real answers' },
            { icon: 'replay',        title: 'Easy Reorders',     sub: 'One tap to reorder past jobs' },
          ].map((t, i) => (
            <View key={i} style={styles.trustItem}>
              <View style={styles.trustIcon}>
                <MaterialIcons name={t.icon as any} size={22} color={Colors.primary} />
              </View>
              <Text style={styles.trustTitle}>{t.title}</Text>
              <Text style={styles.trustSub}>{t.sub}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },

  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  topActions: { flexDirection: 'row', gap: 2 },
  iconBtn: { padding: 7, position: 'relative' },
  badge: {
    position: 'absolute', top: 4, right: 4,
    backgroundColor: Colors.primary, borderRadius: 8,
    minWidth: 16, height: 16, justifyContent: 'center', alignItems: 'center',
  },
  badgeText: { color: Colors.white, fontSize: 9, fontWeight: '800' },

  heroBanner: { width: W, height: 240 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute', inset: 0,
    backgroundColor: 'rgba(0,0,0,0.42)',
    padding: 24, justifyContent: 'flex-end',
  },
  heroEyebrow: {
    fontSize: 10, fontWeight: '800', color: Colors.primary,
    letterSpacing: 2, marginBottom: 8,
  },
  heroTitle: { fontSize: 28, fontWeight: '900', color: Colors.white, lineHeight: 34, marginBottom: 18 },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8,
  },
  heroBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
  heroDots: {
    flexDirection: 'row', justifyContent: 'center', gap: 6, paddingVertical: 12,
  },
  heroDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.border },
  heroDotActive: { width: 20, backgroundColor: Colors.primary },

  perks: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, padding: 14,
    borderWidth: 1, borderColor: Colors.border, borderRadius: 12,
  },
  perk: { flex: 1, alignItems: 'center', gap: 4 },
  perkText: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary, textAlign: 'center' },
  perkDivider: { width: 1, height: 30, backgroundColor: Colors.border },

  section: { marginTop: 28 },
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.text },
  seeAll: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  hPad: { paddingHorizontal: 16, gap: 12 },

  catCard: {
    width: 120, height: 88, borderRadius: 12, overflow: 'hidden', position: 'relative',
  },
  catImage: { width: '100%', height: '100%' },
  catOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  catInfo: { position: 'absolute', bottom: 8, left: 8, right: 8 },
  catName: { fontSize: 12, fontWeight: '800', color: Colors.white },
  catCount: { fontSize: 10, color: 'rgba(255,255,255,0.75)' },

  featureBanner: {
    marginHorizontal: 16, marginTop: 28,
    borderRadius: 16, overflow: 'hidden', height: 180,
  },
  featureBannerImage: { width: '100%', height: '100%' },
  featureBannerOverlay: {
    position: 'absolute', inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20, justifyContent: 'center',
  },
  featureBannerEyebrow: { fontSize: 10, fontWeight: '800', color: Colors.primary, letterSpacing: 2, marginBottom: 6 },
  featureBannerTitle: { fontSize: 22, fontWeight: '900', color: Colors.white, lineHeight: 28, marginBottom: 16 },
  featureBannerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.white, alignSelf: 'flex-start',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
  },
  featureBannerBtnText: { fontSize: 13, fontWeight: '700', color: Colors.primary },

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
  gridItem: { width: '47.5%' },

  saleHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, marginBottom: 14,
  },
  saleBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#EA580C', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6,
  },
  saleBadgeText: { color: Colors.white, fontWeight: '800', fontSize: 11, letterSpacing: 0.5 },
  saleList: { paddingHorizontal: 16, gap: 10 },

  trustRow: {
    flexDirection: 'row', marginHorizontal: 16, marginTop: 32, gap: 10,
  },
  trustItem: {
    flex: 1, alignItems: 'center', gap: 6,
    backgroundColor: Colors.surface, borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: Colors.border,
  },
  trustIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  trustTitle: { fontSize: 12, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  trustSub: { fontSize: 10, color: Colors.textMuted, textAlign: 'center', lineHeight: 14 },
});
