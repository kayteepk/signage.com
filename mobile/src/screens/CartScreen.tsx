import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image,
  StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }: any) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <MaterialIcons name="shopping-cart" size={72} color={Colors.border} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some products to get started</Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate('Catalog')}
          >
            <Text style={styles.shopBtnText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={items}
        keyExtractor={(item, i) => `${item.product.id}-${item.size}-${i}`}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.title}>Cart ({items.length})</Text>
            <TouchableOpacity onPress={() => {
              Alert.alert('Clear cart', 'Remove all items?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive', onPress: clearCart },
              ]);
            }}>
              <Text style={styles.clearBtn}>Clear all</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.product.images[0] }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.itemMeta}>{item.size} · {item.material}</Text>
              {item.artworkUri && (
                <Text style={styles.artworkLabel}>
                  <MaterialIcons name="check-circle" size={11} color={Colors.success} /> Artwork uploaded
                </Text>
              )}
              <View style={styles.itemFooter}>
                <View style={styles.qtyControl}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.product.id, item.size, item.material, item.quantity - 1)}
                  >
                    <MaterialIcons name="remove" size={16} color={Colors.text} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.product.id, item.size, item.material, item.quantity + 1)}
                  >
                    <MaterialIcons name="add" size={16} color={Colors.text} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemPrice}>
                  ${(item.product.basePrice * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => removeItem(item.product.id, item.size, item.material)}
            >
              <MaterialIcons name="delete-outline" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={[styles.summaryValue, { color: total >= 75 ? Colors.success : Colors.text }]}>
                {total >= 75 ? 'FREE' : '$9.99'}
              </Text>
            </View>
            {total < 75 && (
              <View style={styles.freeShippingBanner}>
                <MaterialIcons name="local-shipping" size={14} color={Colors.accent} />
                <Text style={styles.freeShippingText}>
                  Add ${(75 - total).toFixed(2)} more for free shipping
                </Text>
              </View>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${(total + (total >= 75 ? 0 : 9.99)).toFixed(2)}
              </Text>
            </View>
          </View>
        }
      />

      <View style={styles.checkoutBar}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
          <MaterialIcons name="arrow-forward" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.text, marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: Colors.textMuted, marginTop: 6, textAlign: 'center' },
  shopBtn: {
    marginTop: 24, backgroundColor: Colors.accent,
    paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14,
  },
  shopBtnText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  list: { padding: 20, gap: 12 },
  listHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 4,
  },
  title: { fontSize: 22, fontWeight: '800', color: Colors.text },
  clearBtn: { fontSize: 13, color: Colors.accent, fontWeight: '600' },
  cartItem: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 12,
    flexDirection: 'row', gap: 12,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  itemImage: { width: 80, height: 80, borderRadius: 8, backgroundColor: Colors.surfaceAlt },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', color: Colors.text },
  itemMeta: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  artworkLabel: { fontSize: 11, color: Colors.success, marginTop: 4 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 28, height: 28, borderRadius: 7,
    borderWidth: 1, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  qtyText: { fontSize: 14, fontWeight: '700', color: Colors.text, minWidth: 20, textAlign: 'center' },
  itemPrice: { fontSize: 15, fontWeight: '700', color: Colors.text },
  deleteBtn: { padding: 4, alignSelf: 'flex-start' },
  summary: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16,
    gap: 10, marginTop: 8,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 14, color: Colors.textSecondary },
  summaryValue: { fontSize: 14, fontWeight: '600', color: Colors.text },
  freeShippingBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.accent + '15', borderRadius: 8,
    padding: 10,
  },
  freeShippingText: { fontSize: 12, color: Colors.accent, fontWeight: '600' },
  totalRow: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 10 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: Colors.text },
  totalValue: { fontSize: 20, fontWeight: '800', color: Colors.text },
  checkoutBar: {
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: Colors.surface,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  checkoutBtn: {
    backgroundColor: Colors.accent, borderRadius: 14,
    paddingVertical: 16, flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center', gap: 8,
  },
  checkoutBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
