// HAPPY
// SAD
// ANGRY
// CONFUSED
// DISGUSTED
// SURPRISED
// CALM
// UNKNOWN
// FEAR

export const emotions = [
  'happy',
  'sad',
  'angry',
  'confused',
  'disgusted',
  'surprised',
  'calm',
  'unknown',
  'fear'
]

export const iconsStyles = [
  {
    emotion: 'happy',
    icon: 'smile-beam'
  },
  {
    emotion: 'sad',
    icon: 'sad-tear'
  },
  {
    emotion: 'angry',
    icon: 'angry'
  },
  {
    emotion: 'confused',
    icon: 'meh'
  },
  {
    emotion: 'disgusted',
    icon: 'grimace'
  },
  {
    emotion: 'surprised',
    icon: 'surprise'
  },
  {
    emotion: 'calm',
    icon: 'smile'
  },
  {
    emotion: 'unknown',
    icon: 'meh-blank'
  },
  {
    emotion: 'fear',
    icon: 'flushed'
  }
]

export const getEmotionIcon = (emotion) => {
  const iconStyleObj = iconsStyles.find(iconStyle => iconStyle.emotion === emotion)
  return iconStyleObj.icon
}
