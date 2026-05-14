import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Modal, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { mockOrders, Order } from '../constants/data';

const statusConfig = {
  'Processing': { color: Colors.warning, icon: 'hourglass-empty' as const },
  'In Production': { color: '#3B82F6', icon: 'precision-manufacturing' as const },
  'Shipped': { color: Colors.accent, icon: 'local-shipping' as const },
  'Delivered': { color: Colors.success, icon: 'check-circle' as const },
};

const steps = ['Processing', 'In Production', 'Shipped', 'Delivered'];

export default function OrdersScreen() {
  const [selected, setSelected] = useState<Order | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.subtitle}>{mockOrders.length} orders</Text>
      </View>

      <FlatList
        data={mockOrders}
        keyExtractor={o => o.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const cfg = statusConfig[item.status];
          return (
            <TouchableOpacity style={styles.orderCard} onPress={() => setSelected(item)} activeOpacity={0.85}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{item.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: cfg.color + '18' }]}>
                  <MaterialIcons name={cfg.icon} size={13} color={cfg.color} />
                  <Text style={[styles.statusText, { color: cfg.color }]}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.orderDate}>{item.date}</Text>
              <Text style={styles.orderItems}>
                {item.items.map(i => `${i.name} (x${i.qty})`).join(', ')}
              </Text>
              <View style={styles.orderFooter}>
                <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
                <View style={styles.detailLink}>
                  <Text style={styles.detailLinkText}>View details</Text>
                  <MaterialIcons name="chevron-right" size={16} color={Colors.accent} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Modal visible={!!selected} animationType="slide" presentationStyle="pageSheet">
        {selected && (
          <SafeAreaView style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Details</Text>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <MaterialIcons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {/* Progress tracker */}
              <View style={styles.progressCard}>
                <Text style={styles.progressTitle}>Order Status</Text>
                <View style={styles.progressSteps}>
                  {steps.map((s, i) => {
                    const currentIndex = steps.indexOf(selected.status);
                    const done = i <= currentIndex;
                    const cfg = statusConfig[s as keyof typeof statusConfig];
                    return (
                      <View key={s} style={styles.progressStep}>
                        <View style={styles.progressStepCol}>
                          <View style={[styles.progressDot, done && { backgroundColor: cfg.color, borderColor: cfg.color }]}>
                            {done && <MaterialIcons name="check" size={12} color={Colors.white} />}
                          </View>
                          {i < steps.length - 1 && (
                            <View style={[styles.progressLine, i < currentIndex && { backgroundColor: cfg.color }]} />
                          )}
                        </View>
                        <Text style={[styles.progressLabel, done && { color: Colors.text, fontWeight: '600' }]}>{s}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Items */}
              <View style={styles.detailCard}>
                <Text style={styles.detailCardTitle}>Items Ordered</Text>
                {selected.items.map((item, i) => (
                  <View key={i} style={styles.detailItem}>
                    <View style={styles.detailItemIcon}>
                      <MaterialIcons name="inventory" size={18} color={Colors.accent} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailItemName}>{item.name}</Text>
                      <Text style={styles.detailItemMeta}>{item.size} · Qty {item.qty}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Tracking */}
              {selected.trackingNumber && (
                <View style={styles.detailCard}>
                  <Text style={styles.detailCardTitle}>Tracking</Text>
                  <View style={styles.trackingRow}>
                    <MaterialIcons name="local-shipping" size={20} color={Colors.accent} />
                    <Text style={styles.trackingNumber}>{selected.trackingNumber}</Text>
                  </View>
                </View>
              )}

              {/* Total */}
              <View style={styles.detailCard}>
                <Text style={styles.detailCardTitle}>Payment</Text>
                <View style={styles.payRow}>
                  <Text style={styles.payLabel}>Order Total</Text>
                  <Text style={styles.payValue}>${selected.total.toFixed(2)}</Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  list: { padding: 20, gap: 12 },
  orderCard: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  orderId: { fontSize: 14, fontWeight: '700', color: Colors.text },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '700' },
  orderDate: { fontSize: 12, color: Colors.textMuted, marginBottom: 6 },
  orderItems: { fontSize: 13, color: Colors.textSecondary, marginBottom: 12 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderTotal: { fontSize: 16, fontWeight: '700', color: Colors.text },
  detailLink: { flexDirection: 'row', alignItems: 'center' },
  detailLinkText: { fontSize: 13, color: Colors.accent, fontWeight: '600' },
  modal: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: Colors.text },
  modalContent: { padding: 20, gap: 16 },
  progressCard: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  progressTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 16 },
  progressSteps: { gap: 0 },
  progressStep: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  progressStepCol: { alignItems: 'center', width: 24 },
  progressDot: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: Colors.border,
    backgroundColor: Colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  progressLine: { width: 2, height: 28, backgroundColor: Colors.border, marginVertical: 4 },
  progressLabel: { fontSize: 13, color: Colors.textMuted, paddingVertical: 4, flex: 1 },
  detailCard: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  detailCardTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 12 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  detailItemIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.accent + '15',
    justifyContent: 'center', alignItems: 'center',
  },
  detailItemName: { fontSize: 14, fontWeight: '600', color: Colors.text },
  detailItemMeta: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  trackingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  trackingNumber: { fontSize: 14, fontWeight: '600', color: Colors.text, fontFamily: 'monospace' },
  payRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  payLabel: { fontSize: 14, color: Colors.textSecondary },
  payValue: { fontSize: 18, fontWeight: '800', color: Colors.text },
});
