export interface AvatarFeature {
  id: string;
  name: string;
  options: AvatarOption[];
  currentIndex: number;
}

export interface AvatarOption {
  id: string;
  imageUrl: string;
  name: string;
}

export interface AvatarState {
  features: AvatarFeature[];
  selectedFeatureIndex: number;
}