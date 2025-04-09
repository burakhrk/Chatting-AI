import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import type { AvatarOption } from '@/types/avatar';

interface OptionSelectorProps {
  options: AvatarOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function OptionSelector({ options, selectedIndex, onSelect }: OptionSelectorProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => onSelect(index)}
          style={[
            styles.optionButton,
            index === selectedIndex && styles.optionButtonSelected,
          ]}>
          <Image
            source={{ uri: option.imageUrl }}
            style={styles.optionImage}
          />
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
  optionButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  optionButtonSelected: {
    borderColor: '#007AFF',
  },
  optionImage: {
    width: '100%',
    height: '100%',
  },
});