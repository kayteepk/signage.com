import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { products, categories } from '../constants/data';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  { key: 'recommended', label: 'Recommended' },
  { key: 'price_asc',   label: 'Price: Low to High' },
  { key: 'price_desc',  label: 'Price: High to Low' },
  { key: 'rating',      label: 'Top Rated' },
  { key: 'newest',      label: 'New Arrivals' },
];

export default function CatalogScreen({ navigation, route }: any) {
  const initialCat = route?.params?.category ?? 'All';
  const [search,      setSearch]      = useState('');
  const [category,    setCategory]    = useState(initialCat);
  const [sort,        setSort]        = useState('recommended');
  const [showSort,    setShowSort]    = useState(false);
  const [layout,      setLayout]      = useState<'grid' | 'list'>('grid');

  const allCats = ['All', ...categories.map(c => c.name)];

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchCat    = category === 'All' || p.category === category;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    switch (sort) {
      case 'price_asc':  return [...list].sort((a, b) => a.basePrice - b.basePrice);
      case 'price_desc': return [...list].sort((a, b) => b.basePrice - a.basePrice);
      case 'rating':     return [...list].sort((a, b) => b.rating - a.rating);
      case 'newest':     return [...list].filter(p => p.newArrival).concat(list.filter(p => !p.newArrival));
      default:           return list;
    }
  }, [search, category, sort]);

  const sortLabel = sortOptions.find(o => o.key === sort)?.label ?? 'Sort';

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Search bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <MaterialIcons name="close" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipList}
      >
        {allCats.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, category === cat && styles.chipActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={styles.count}>{filtered.length} products</Text>
        <View style={styles.toolbarRight}>
          {/* Sort */}
          <TouchableOpacity style={styles.sortBtn} onPress={() => setShowSort(s => !s)}>
            <MaterialIcons name="sort" size={16} color={Colors.text} />
            <Text style={styles.sortBtnText} numberOfLines={1}>{sortLabel}</Text>
            <MaterialIcons name={showSort ? 'expand-less' : 'expand-more'} size={16} color={Colors.text} />
          </TouchableOpacity>
          {/* Layout toggle */}
          <TouchableOpacity
            style={styles.layoutBtn}
            onPress={() => setLayout(l => l === 'grid' ? 'list' : 'grid')}
          >
            <MaterialIcons name={layout === 'grid' ? 'view-list' : 'grid-view'} size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sort dropdown */}
      {showSort && (
        <View style={styles.sortDropdown}>
          {sortOptions.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={styles.sortOption}
              onPress={() => { setSort(opt.key); setShowSort(false); }}
            >
              <Text style={[styles.sortOptionText, sort === opt.key && styles.sortOptionActive]}>
                {opt.label}
              </Text>
              {sort === opt.key && (
                <MaterialIcons name="check" size={16} color={Colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Product list */}
      <FlatList
        key={layout}
        data={filtered}
        keyExtractor={p => p.id}
        numColumns={layout === 'grid' ? 2 : 1}
        contentContainerStyle={layout === 'grid' ? styles.grid : styles.list}
        columnWrapperStyle={layout === 'grid' ? { gap: 12 } : undefined}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={56} color={Colors.border} />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySub}>Try a different search or category</Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => { setSearch(''); setCategory('All'); }}
            >
              <Text style={styles.emptyBtnText}>Clear filters</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) =>
          layout === 'grid' ? (
            <View style={{ flex: 1 }}>
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              />
            </View>
          ) : (
            <ProductCard
              product={item}
              horizontal
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  searchRow: {
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8,
  },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.surface, borderRadius: 12,
    paddingHorizontal: 14, height: 46,
    borderWidth: 1, borderColor: Colors.border,
  },
  searchInput: { flex: 1, fontSize: 15, color: Colors.text },
  chipScroll: { maxHeight: 50 },
  chipList: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  chipActive: { backgroundColor: Colors.text, borderColor: Colors.text },
  chipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  chipTextActive: { color: Colors.white },
  toolbar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  count: { fontSize: 13, color: Colors.textMuted, fontWeight: '500' },
  toolbarRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sortBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 8, borderWidth: 1, borderColor: Colors.border,
  },
  sortBtnText: { fontSize: 12, fontWeight: '600', color: Colors.text, maxWidth: 120 },
  layoutBtn: {
    padding: 6, borderRadius: 8,
    borderWidth: 1, borderColor: Colors.border,
  },
  sortDropdown: {
    marginHorizontal: 16, backgroundColor: Colors.white,
    borderRadius: 12, borderWidth: 1, borderColor: Colors.border,
    zIndex: 10, elevation: 10,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12,
  },
  sortOption: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  sortOptionText: { fontSize: 14, color: Colors.textSecondary },
  sortOptionActive: { color: Colors.primary, fontWeight: '700' },
  grid: { padding: 16, gap: 12 },
  list: { padding: 16, gap: 12 },
  empty: { alignItems: 'center', paddingTop: 80, gap: 10 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: 13, color: Colors.textMuted },
  emptyBtn: {
    marginTop: 8, paddingHorizontal: 20, paddingVertical: 10,
    backgroundColor: Colors.primary, borderRadius: 8,
  },
  emptyBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
});
