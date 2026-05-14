import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput,
  TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useCart } from '../context/CartContext';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutScreen({ navigation }: any) {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>('shipping');
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    name: '', company: '', address: '', city: '', state: '', zip: '', email: '',
  });
  const [payment, setPayment] = useState({
    cardNumber: '', expiry: '', cvv: '', nameOnCard: '',
  });

  const shippingCost = total >= 75 ? 0 : 9.99;
  const orderTotal = total + shippingCost;

  const steps: Step[] = ['shipping', 'payment', 'review'];
  const stepIndex = steps.indexOf(step);

  const placeOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    clearCart();
    Alert.alert(
      'Order Placed!',
      'Your order has been received. You\'ll get a confirmation email shortly.',
      [{ text: 'View Orders', onPress: () => { navigation.navigate('Orders'); } }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Step indicator */}
      <View style={styles.stepRow}>
        {['Shipping', 'Payment', 'Review'].map((label, i) => (
          <React.Fragment key={label}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, i <= stepIndex && styles.stepCircleActive]}>
                {i < stepIndex
                  ? <MaterialIcons name="check" size={14} color={Colors.white} />
                  : <Text style={[styles.stepNum, i <= stepIndex && styles.stepNumActive]}>{i + 1}</Text>
                }
              </View>
              <Text style={[styles.stepLabel, i <= stepIndex && styles.stepLabelActive]}>{label}</Text>
            </View>
            {i < 2 && <View style={[styles.stepLine, i < stepIndex && styles.stepLineActive]} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {step === 'shipping' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            {[
              { key: 'name', label: 'Full Name', placeholder: 'John Smith' },
              { key: 'company', label: 'Company (optional)', placeholder: 'Acme Corp' },
              { key: 'email', label: 'Email', placeholder: 'john@example.com' },
              { key: 'address', label: 'Street Address', placeholder: '123 Main St' },
              { key: 'city', label: 'City', placeholder: 'New York' },
              { key: 'state', label: 'State', placeholder: 'NY' },
              { key: 'zip', label: 'ZIP Code', placeholder: '10001' },
            ].map(field => (
              <View key={field.key} style={styles.field}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  placeholderTextColor={Colors.textMuted}
                  value={(shipping as any)[field.key]}
                  onChangeText={v => setShipping(s => ({ ...s, [field.key]: v }))}
                />
              </View>
            ))}
          </View>
        )}

        {step === 'payment' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <View style={styles.cardIconRow}>
              {['credit-card', 'payment'].map((icon, i) => (
                <View key={i} style={styles.cardIcon}>
                  <MaterialIcons name={icon as any} size={24} color={Colors.textSecondary} />
                </View>
              ))}
            </View>
            {[
              { key: 'nameOnCard', label: 'Name on Card', placeholder: 'John Smith' },
              { key: 'cardNumber', label: 'Card Number', placeholder: '•••• •••• •••• ••••' },
              { key: 'expiry', label: 'Expiry', placeholder: 'MM/YY' },
              { key: 'cvv', label: 'CVV', placeholder: '•••' },
            ].map(field => (
              <View key={field.key} style={styles.field}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={field.key === 'cvv'}
                  value={(payment as any)[field.key]}
                  onChangeText={v => setPayment(p => ({ ...p, [field.key]: v }))}
                />
              </View>
            ))}
          </View>
        )}

        {step === 'review' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {items.map((item, i) => (
              <View key={i} style={styles.reviewItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewName}>{item.product.name}</Text>
                  <Text style={styles.reviewMeta}>{item.size} · {item.material} · Qty {item.quantity}</Text>
                </View>
                <Text style={styles.reviewPrice}>${(item.product.basePrice * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.reviewTotals}>
              <View style={styles.totalLine}>
                <Text style={styles.totalLineLabel}>Subtotal</Text>
                <Text style={styles.totalLineValue}>${total.toFixed(2)}</Text>
              </View>
              <View style={styles.totalLine}>
                <Text style={styles.totalLineLabel}>Shipping</Text>
                <Text style={[styles.totalLineValue, shippingCost === 0 && { color: Colors.success }]}>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </Text>
              </View>
              <View style={[styles.totalLine, styles.grandTotal]}>
                <Text style={styles.grandTotalLabel}>Total</Text>
                <Text style={styles.grandTotalValue}>${orderTotal.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.shippingTo}>
              <MaterialIcons name="local-shipping" size={16} color={Colors.textMuted} />
              <Text style={styles.shippingToText}>
                Shipping to {shipping.name}{shipping.city ? `, ${shipping.city}` : ''}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.navBar}>
        {step !== 'shipping' && (
          <TouchableOpacity style={styles.backStepBtn} onPress={() => {
            setStep(steps[stepIndex - 1]);
          }}>
            <MaterialIcons name="arrow-back" size={18} color={Colors.text} />
            <Text style={styles.backStepText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextBtn, loading && { opacity: 0.7 }]}
          onPress={() => {
            if (step === 'review') { placeOrder(); }
            else { setStep(steps[stepIndex + 1]); }
          }}
          disabled={loading}
        >
          <Text style={styles.nextBtnText}>
            {step === 'review' ? (loading ? 'Placing Order...' : 'Place Order') : 'Continue'}
          </Text>
          {!loading && <MaterialIcons name="arrow-forward" size={18} color={Colors.white} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  stepRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 24, paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  stepItem: { alignItems: 'center', gap: 4 },
  stepCircle: {
    width: 30, height: 30, borderRadius: 15,
    borderWidth: 2, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  stepCircleActive: { borderColor: Colors.accent, backgroundColor: Colors.accent },
  stepNum: { fontSize: 13, fontWeight: '700', color: Colors.textMuted },
  stepNumActive: { color: Colors.white },
  stepLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },
  stepLabelActive: { color: Colors.accent },
  stepLine: { flex: 1, height: 2, backgroundColor: Colors.border, marginBottom: 14 },
  stepLineActive: { backgroundColor: Colors.accent },
  scroll: { padding: 20 },
  section: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16,
    shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 16 },
  field: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary, marginBottom: 6 },
  input: {
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10,
    padding: 12, fontSize: 15, color: Colors.text, backgroundColor: Colors.background,
  },
  cardIconRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  cardIcon: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: 8,
    padding: 8, backgroundColor: Colors.surfaceAlt,
  },
  reviewItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  reviewName: { fontSize: 14, fontWeight: '600', color: Colors.text },
  reviewMeta: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  reviewPrice: { fontSize: 14, fontWeight: '700', color: Colors.text },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  reviewTotals: { gap: 8 },
  totalLine: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLineLabel: { fontSize: 14, color: Colors.textSecondary },
  totalLineValue: { fontSize: 14, fontWeight: '600', color: Colors.text },
  grandTotal: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 10, marginTop: 4 },
  grandTotalLabel: { fontSize: 16, fontWeight: '700', color: Colors.text },
  grandTotalValue: { fontSize: 20, fontWeight: '800', color: Colors.text },
  shippingTo: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.surfaceAlt, borderRadius: 8, padding: 10, marginTop: 12,
  },
  shippingToText: { fontSize: 12, color: Colors.textSecondary, flex: 1 },
  navBar: {
    flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14, gap: 12,
    backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  backStepBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 14, paddingHorizontal: 16,
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12,
  },
  backStepText: { fontSize: 15, fontWeight: '600', color: Colors.text },
  nextBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', gap: 8,
    backgroundColor: Colors.accent, borderRadius: 12, paddingVertical: 14,
  },
  nextBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
