import {
  formatDateToMonthAndOrdinal,
  convertDecimalHoursToHoursAndMinutes,
  getDifferenceInMinutes,
  getTimeDuration,
  formatTimeAMPM,
} from '../dateUtils';

describe('dateUtils', () => {
  describe('formatDateToMonthAndOrdinal', () => {
    it('formats date string to "Month dayOrdinal"', () => {
      expect(formatDateToMonthAndOrdinal('2023-04-01')).toBe('March 31st');
      expect(formatDateToMonthAndOrdinal('2023-04-05')).toBe('April 4th');
      expect(formatDateToMonthAndOrdinal('2023-04-03')).toBe('April 2nd');
      expect(formatDateToMonthAndOrdinal('2023-04-04')).toBe('April 3rd');
      expect(formatDateToMonthAndOrdinal('')).toBe('');
    });
  });

  describe('convertDecimalHoursToHoursAndMinutes', () => {
    it('converts decimal hours to hours and minutes format', () => {
      expect(convertDecimalHoursToHoursAndMinutes(1.5)).toBe('1h 30min');
      expect(convertDecimalHoursToHoursAndMinutes(2.25)).toBe('2h 15min');
      expect(convertDecimalHoursToHoursAndMinutes(0)).toBe('0h 0min');
    });
  });

  describe('getDifferenceInMinutes', () => {
    it('calculates the difference in minutes between two dates', () => {
      expect(getDifferenceInMinutes('2023-04-01T00:00:00', '2023-04-01T01:00:00')).toBe(60);
      expect(getDifferenceInMinutes('2023-04-01T00:00:00', '2023-04-01T00:30:00')).toBe(30);
    });
  });

  describe('getTimeDuration', () => {
    it('calculates time duration between two dates in hours and minutes', () => {
      expect(getTimeDuration('2023-04-01T00:00:00', '2023-04-01T01:30:00')).toBe('1 h 30 min');
      expect(getTimeDuration('2023-04-01T00:00:00', '2023-04-01T02:45:00')).toBe('2 h 45 min');
      expect(getTimeDuration('', '')).toBe('');
    });
  });

  describe('formatTimeAMPM', () => {
    it('formats date string to AM/PM format', () => {
      expect(formatTimeAMPM('2023-04-01T13:00:00')).toBe('01:00 PM');
      expect(formatTimeAMPM('2023-04-01T00:00:00')).toBe('12:00 AM');
      expect(formatTimeAMPM('')).toBe('');
    });
  });
});
