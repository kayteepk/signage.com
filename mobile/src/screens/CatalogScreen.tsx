import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TextInput,
  TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { products, categories } from '../constants/data';
import ProductCard from '../components/ProductCard';

const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

export default function CatalogScreen({ navigation, route }: any) {
  const initialCategory = route?.params?.category || 'All';
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sort, setSort] = useState('Recommended');
  const [showSort, setShowSort] = useState(false);

  const allCategories = ['All', ...categories.map(c => c.name)];

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === 'Price: Low to High') list = [...list].sort((a, b) => a.basePrice - b.basePrice);
    if (sort === 'Price: High to Low') list = [...list].sort((a, b) => b.basePrice - a.basePrice);
    if (sort === 'Top Rated') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, selectedCategory, sort]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <MaterialIcons name="close" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.sortBtn} onPress={() => setShowSort(s => !s)}>
          <MaterialIcons name="sort" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Sort dropdown */}
      {showSort && (
        <View style={styles.sortDropdown}>
          {sortOptions.map(opt => (
            <TouchableOpacity
              key={opt}
              style={styles.sortOption}
              onPress={() => { setSort(opt); setShowSort(false); }}
            >
              <Text style={[styles.sortOptionText, sort === opt && styles.sortOptionActive]}>
                {opt}
              </Text>
              {sort === opt && <MaterialIcons name="check" size={16} color={Colors.accent} />}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryList}
      >
        {allCategories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, selectedCategory === cat && styles.chipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results count */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>{filtered.length} products</Text>
        {sort !== 'Recommended' && (
          <TouchableOpacity onPress={() => setSort('Recommended')} style={styles.clearSort}>
            <Text style={styles.clearSortText}>Clear sort</Text>
            <MaterialIcons name="close" size={13} color={Colors.accent} />
          </TouchableOpacity>
        )}
      </View>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={p => p.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={52} color={Colors.border} />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySubtitle}>Try a different search or category</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 10, paddingHorizontal: 12, height: 44,
    borderWidth: 1, borderColor: Colors.border,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.text },
  sortBtn: {
    width: 44, height: 44,
    borderRadius: 10,
    borderWidth: 1, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: Colors.white,
  },
  sortDropdown: {
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1, borderColor: Colors.border,
    overflow: 'hidden',
    zIndex: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  sortOptionText: { fontSize: 14, color: Colors.textSecondary },
  sortOptionActive: { color: Colors.accent, fontWeight: '700' },
  categoryScroll: { maxHeight: 48 },
  categoryList: {
    paddingHorizontal: 16, gap: 8,
    alignItems: 'center', paddingBottom: 4,
  },
  chip: {
    paddingHorizontal: 16, paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  chipActive: { backgroundColor: Colors.text, borderColor: Colors.text },
  chipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  chipTextActive: { color: Colors.white },
  resultsRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  resultsText: { fontSize: 12, color: Colors.textMuted },
  clearSort: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  clearSortText: { fontSize: 12, color: Colors.accent, fontWeight: '600' },
  grid: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginTop: 14 },
  emptySubtitle: { fontSize: 13, color: Colors.textMuted, marginTop: 4 },
});
