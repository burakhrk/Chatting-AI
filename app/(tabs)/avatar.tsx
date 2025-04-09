import { View, StyleSheet } from 'react-native';
import { useAvatarCustomization } from '@/hooks/useAvatarCustomization';
import { FeatureSelector } from '@/components/avatar/FeatureSelector';
import { OptionSelector } from '@/components/avatar/OptionSelector';
import { AvatarPreview } from '@/components/avatar/AvatarPreview';

export default function AvatarScreen() {
  const {
    features,
    selectedFeatureIndex,
    selectFeature,
    updateFeatureOption,
  } = useAvatarCustomization();

  const selectedFeature = features[selectedFeatureIndex];

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <AvatarPreview features={features} />
      </View>
      <View style={styles.controls}>
        <FeatureSelector
          features={features}
          selectedIndex={selectedFeatureIndex}
          onSelect={selectFeature}
        />
        <OptionSelector
          options={selectedFeature.options}
          selectedIndex={selectedFeature.currentIndex}
          onSelect={(index) => updateFeatureOption(selectedFeatureIndex, index)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  controls: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});