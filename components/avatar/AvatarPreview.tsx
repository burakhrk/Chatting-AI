import { View, Image, StyleSheet } from 'react-native';
import type { AvatarFeature } from '@/types/avatar';

interface AvatarPreviewProps {
  features: AvatarFeature[];
}

export function AvatarPreview({ features }: AvatarPreviewProps) {
  return (
    <View style={styles.container}>
      {features.map((feature) => {
        const selectedOption = feature.options[feature.currentIndex];
        return (
          <Image
            key={feature.id}
            source={{ uri: selectedOption.imageUrl }}
            style={[
              styles.layer,
              feature.id === 'background' && styles.backgroundLayer,
              feature.id === 'face' && styles.faceLayer,
              feature.id === 'eyes' && styles.eyesLayer,
              feature.id === 'mouth' && styles.mouthLayer,
              feature.id === 'accessories' && styles.accessoriesLayer,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    position: 'relative',
  },
  layer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  backgroundLayer: {
    zIndex: 1,
  },
  faceLayer: {
    zIndex: 2,
  },
  eyesLayer: {
    zIndex: 3,
  },
  mouthLayer: {
    zIndex: 4,
  },
  accessoriesLayer: {
    zIndex: 5,
  },
});