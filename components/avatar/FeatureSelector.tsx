import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import type { AvatarFeature } from '@/types/avatar';

interface FeatureSelectorProps {
  features: AvatarFeature[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function FeatureSelector({ features, selectedIndex, onSelect }: FeatureSelectorProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {features.map((feature, index) => (
        <TouchableOpacity
          key={feature.id}
          onPress={() => onSelect(index)}
          style={[
            styles.featureButton,
            index === selectedIndex && styles.featureButtonSelected,
          ]}>
          <Text style={[
            styles.featureText,
            index === selectedIndex && styles.featureTextSelected,
          ]}>
            {feature.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    padding: 16,
    backgroundColor: '#fff',
  },
  featureButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
  },
  featureButtonSelected: {
    backgroundColor: '#007AFF',
  },
  featureText: {
    fontSize: 16,
    color: '#666',
  },
  featureTextSelected: {
    color: '#fff',
  },
});