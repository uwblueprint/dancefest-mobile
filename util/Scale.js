import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(scale * PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(scale * PixelRatio.roundToNearestPixel(size)) - 2
  }
}
