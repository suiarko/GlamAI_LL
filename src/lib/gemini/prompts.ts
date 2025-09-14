export const HAIRSTYLE_PROMPTS = {
  'short-bob': 'A modern short bob haircut that sits just above the shoulders, with subtle layers and a slight inward curve at the ends',
  'pixie-cut': 'A short, edgy pixie cut with textured layers and side-swept bangs',
  'long-layers': 'Long hair with face-framing layers and subtle movement throughout',
  'curly-short': 'Short curly hair with natural bounce and defined ringlets',
  'straight-long': 'Long, sleek straight hair with a center part and smooth finish',
  'wavy-medium': 'Medium-length wavy hair with natural texture and beachy waves',
  'bangs-long': 'Long hair with full bangs that sit just above the eyebrows',
  'asymmetrical': 'An asymmetrical cut with one side longer than the other',
  'updo-elegant': 'An elegant updo with soft curls and a sophisticated finish',
  'ponytail-high': 'A high ponytail with volume at the crown and smooth sides',
  'braid-crown': 'A crown braid that wraps around the head',
  'bob-lob': 'A long bob (lob) that sits just below the shoulders with subtle layers'
}

export const FACE_SHAPE_RECOMMENDATIONS = {
  oval: ['short-bob', 'pixie-cut', 'long-layers', 'wavy-medium'],
  round: ['pixie-cut', 'asymmetrical', 'long-layers', 'straight-long'],
  square: ['wavy-medium', 'curly-short', 'bangs-long', 'bob-lob'],
  heart: ['pixie-cut', 'short-bob', 'wavy-medium', 'bangs-long'],
  oblong: ['curly-short', 'wavy-medium', 'bangs-long', 'bob-lob']
}

export const STYLE_CATEGORIES = {
  short: ['short-bob', 'pixie-cut', 'curly-short', 'asymmetrical'],
  medium: ['wavy-medium', 'bob-lob', 'bangs-long'],
  long: ['long-layers', 'straight-long', 'braid-crown', 'updo-elegant'],
  curly: ['curly-short', 'wavy-medium', 'braid-crown']
}

export function getRecommendedStyles(faceShape: string, hairLength: string) {
  const shapeRecs = FACE_SHAPE_RECOMMENDATIONS[faceShape as keyof typeof FACE_SHAPE_RECOMMENDATIONS] || []
  const lengthRecs = STYLE_CATEGORIES[hairLength as keyof typeof STYLE_CATEGORIES] || []
  
  // Return intersection of both recommendations
  return shapeRecs.filter(style => lengthRecs.includes(style))
}

export function getStyleDescription(styleId: string): string {
  return HAIRSTYLE_PROMPTS[styleId as keyof typeof HAIRSTYLE_PROMPTS] || 'A beautiful hairstyle transformation'
}


