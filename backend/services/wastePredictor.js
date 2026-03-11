export class WastePredictor {
  static predict(attendees, eventType, cateringScale = 'medium') {
    const baseWastePerPerson = {
      wedding: 0.8,
      festival: 1.2,
      exhibition: 0.4,
      corporate: 0.5
    };

    const cateringMultiplier = {
      small: 0.7,
      medium: 1.0,
      large: 1.5
    };

    const baseWaste = baseWastePerPerson[eventType] || 0.6;
    const multiplier = cateringMultiplier[cateringScale] || 1.0;

    const estimatedWaste = attendees * baseWaste * multiplier;

    return Math.round(estimatedWaste * 100) / 100;
  }

  static getWasteBreakdown(attendees, eventType) {
    const totalWaste = this.predict(attendees, eventType);

    return {
      total: totalWaste,
      organic: Math.round(totalWaste * 0.45 * 100) / 100,
      plastic: Math.round(totalWaste * 0.25 * 100) / 100,
      paper: Math.round(totalWaste * 0.15 * 100) / 100,
      other: Math.round(totalWaste * 0.15 * 100) / 100
    };
  }
}
