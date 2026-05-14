import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, FlatList, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { categories, products } from '../constants/data';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }: any) {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const popularProducts = products.filter(p => p.popular);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {user ? `Hello, ${user.name.split(' ')[0]}` : 'Welcome back'}
            </Text>
            <Text style={styles.tagline}>Custom signage at your fingertips</Text>
          </View>
          <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
            <MaterialIcons name="shopping-cart" size={24} color={Colors.white} />
            {itemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{itemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Print Your Vision</Text>
            <Text style={styles.heroSubtitle}>
              Professional signage delivered fast. Free shipping on orders over $75.
            </Text>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => navigation.navigate('Catalog')}
            >
              <Text style={styles.heroBtnText}>Shop All Products</Text>
              <MaterialIcons name="arrow-forward" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { icon: 'local-shipping', label: 'Fast Shipping', value: '2-5 days' },
            { icon: 'verified', label: 'Quality Guarantee', value: '100%' },
            { icon: 'support-agent', label: 'Expert Support', value: '24/7' },
          ].map((stat, i) => (
            <View key={i} style={styles.statItem}>
              <MaterialIcons name={stat.icon as any} size={22} color={Colors.accent} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
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
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                onPress={() => navigation.navigate('Catalog', { category: item.name })}
              />
            )}
          />
        </View>

        {/* Popular Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Products</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productGrid}>
            {popularProducts.map(product => (
              <View key={product.id} style={styles.productGridItem}>
                <ProductCard
                  product={product}
                  onPress={() => navigation.navigate('ProductDetail', { product })}
                />
              </View>
            ))}
          </View>
        </View>

        {/* How It Works */}
        <View style={[styles.section, styles.howItWorksSection]}>
          <Text style={[styles.sectionTitle, { color: Colors.white, marginBottom: 20 }]}>
            How It Works
          </Text>
          {[
            { step: '1', icon: 'photo-library', title: 'Upload Your Design', desc: 'Upload artwork or use our online editor' },
            { step: '2', icon: 'tune', title: 'Choose Options', desc: 'Select size, material, and quantity' },
            { step: '3', icon: 'local-shipping', title: 'We Print & Ship', desc: 'Fast production and free shipping over $75' },
          ].map((item, i) => (
            <View key={i} style={styles.howStep}>
              <View style={styles.howStepNum}>
                <Text style={styles.howStepNumText}>{item.step}</Text>
              </View>
              <View style={styles.howStepIcon}>
                <MaterialIcons name={item.icon as any} size={22} color={Colors.accent} />
              </View>
              <View style={styles.howStepText}>
                <Text style={styles.howStepTitle}>{item.title}</Text>
                <Text style={styles.howStepDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  greeting: { fontSize: 20, fontWeight: '700', color: Colors.white },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  cartBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute', top: -2, right: -2,
    backgroundColor: Colors.accent, borderRadius: 9,
    minWidth: 18, height: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  cartBadgeText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  heroContent: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    padding: 22,
  },
  heroTitle: { fontSize: 26, fontWeight: '800', color: Colors.white },
  heroSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 6, lineHeight: 20 },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.white, borderRadius: 25,
    paddingVertical: 10, paddingHorizontal: 18,
    alignSelf: 'flex-start', marginTop: 16,
  },
  heroBtnText: { color: Colors.primary, fontWeight: '700', fontSize: 14 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginTop: -1,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 8,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: 14, fontWeight: '700', color: Colors.text },
  statLabel: { fontSize: 10, color: Colors.textMuted, textAlign: 'center' },
  section: { marginTop: 24 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.text },
  seeAll: { fontSize: 13, color: Colors.accent, fontWeight: '600' },
  productGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 20, gap: 12,
  },
  productGridItem: { width: '47%' },
  howItWorksSection: {
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
  },
  howStep: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  howStepNum: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center',
  },
  howStepNumText: { color: Colors.white, fontWeight: '700', fontSize: 13 },
  howStepIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  howStepText: { flex: 1 },
  howStepTitle: { fontSize: 14, fontWeight: '700', color: Colors.white },
  howStepDesc: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
});
