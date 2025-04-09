import { useState, useCallback } from 'react';
import type { AvatarState, AvatarFeature } from '@/types/avatar';

const initialFeatures: AvatarFeature[] = [
  {
    id: 'background',
    name: 'Background',
    options: [
      { id: 'blue', name: 'Blue', imageUrl: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400&h=400&fit=crop&crop=faces&q=80' },
      { id: 'pink', name: 'Pink', imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop&crop=faces&q=80' },
      { id: 'yellow', name: 'Yellow', imageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=400&fit=crop&crop=faces&q=80' },
    ],
    currentIndex: 0,
  },
  {
    id: 'face',
    name: 'Face Shape',
    options: [
      { id: 'round', name: 'Round', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?face=round&backgroundColor=transparent' },
      { id: 'square', name: 'Square', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?face=square&backgroundColor=transparent' },
      { id: 'oval', name: 'Oval', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?face=oval&backgroundColor=transparent' },
    ],
    currentIndex: 0,
  },
  {
    id: 'eyes',
    name: 'Eyes',
    options: [
      { id: 'happy', name: 'Happy', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?eyes=happy&backgroundColor=transparent' },
      { id: 'wink', name: 'Wink', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?eyes=wink&backgroundColor=transparent' },
      { id: 'hearts', name: 'Hearts', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?eyes=hearts&backgroundColor=transparent' },
      { id: 'stars', name: 'Stars', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?eyes=stars&backgroundColor=transparent' },
    ],
    currentIndex: 0,
  },
  {
    id: 'mouth',
    name: 'Mouth',
    options: [
      { id: 'smile', name: 'Smile', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?mouth=smile&backgroundColor=transparent' },
      { id: 'laugh', name: 'Laugh', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?mouth=laugh&backgroundColor=transparent' },
      { id: 'tongue', name: 'Tongue', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?mouth=tongue&backgroundColor=transparent' },
    ],
    currentIndex: 0,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    options: [
      { id: 'none', name: 'None', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?accessories=none&backgroundColor=transparent' },
      { id: 'glasses', name: 'Glasses', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?accessories=glasses&backgroundColor=transparent' },
      { id: 'sunglasses', name: 'Sunglasses', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?accessories=sunglasses&backgroundColor=transparent' },
      { id: 'hat', name: 'Hat', imageUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?accessories=hat&backgroundColor=transparent' },
    ],
    currentIndex: 0,
  },
];

export function useAvatarCustomization() {
  const [state, setState] = useState<AvatarState>({
    features: initialFeatures,
    selectedFeatureIndex: 0,
  });

  const selectFeature = useCallback((index: number) => {
    setState(prev => ({ ...prev, selectedFeatureIndex: index }));
  }, []);

  const updateFeatureOption = useCallback((featureIndex: number, optionIndex: number) => {
    setState(prev => ({
      ...prev,
      features: prev.features.map((feature, idx) =>
        idx === featureIndex ? { ...feature, currentIndex: optionIndex } : feature
      ),
    }));
  }, []);

  const getCurrentAvatar = useCallback(() => {
    return state.features.map(feature => ({
      featureId: feature.id,
      optionId: feature.options[feature.currentIndex].id,
    }));
  }, [state.features]);

  return {
    features: state.features,
    selectedFeatureIndex: state.selectedFeatureIndex,
    selectFeature,
    updateFeatureOption,
    getCurrentAvatar,
  };
}