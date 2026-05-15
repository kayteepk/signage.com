import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Review } from '../constants/data';

interface Props {
  review: Review;
}

function Stars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <MaterialIcons key={i} name={i <= rating ? 'star' : 'star-border'} size={13} color={Colors.starYellow} />
      ))}
    </View>
  );
}

export default function ReviewCard({ review }: Props) {
  const initial = review.userAvatar ?? review.userName?.[0] ?? '?';
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  const onHelpful = () => {
    if (!voted) { setHelpfulCount(c => c + 1); setVoted(true); }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.meta}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{review.userName}</Text>
            {review.verified && (
              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={11} color={Colors.success} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
          <Text style={styles.date}>{review.date}</Text>
        </View>
        <Stars rating={review.rating} />
      </View>

      <Text style={styles.text}>{review.text}</Text>

      <View style={styles.footer}>
        <Text style={styles.helpfulLabel}>Helpful?</Text>
        <TouchableOpacity style={[styles.helpfulBtn, voted && styles.helpfulBtnVoted]} onPress={onHelpful}>
          <MaterialIcons name="thumb-up" size={13} color={voted ? Colors.primary : Colors.textMuted} />
          <Text style={[styles.helpfulCount, voted && { color: Colors.primary }]}>{helpfulCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: 12, padding: 16, gap: 12,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.primary + '18',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  meta: { flex: 1, gap: 2 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { fontSize: 13, fontWeight: '700', color: Colors.text },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  verifiedText: { fontSize: 10, color: Colors.success, fontWeight: '600' },
  date: { fontSize: 11, color: Colors.textMuted },
  text: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  helpfulLabel: { fontSize: 12, color: Colors.textMuted },
  helpfulBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1, borderColor: Colors.border,
  },
  helpfulBtnVoted: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  helpfulCount: { fontSize: 12, fontWeight: '600', color: Colors.textMuted },
});
