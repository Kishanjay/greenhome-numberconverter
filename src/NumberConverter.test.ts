import NumberConverter from './NumberConverter';
import DUTCH_LANG from './locales/dutch';


describe('numberToText [NL]', () => {
  const nlConverter = new NumberConverter({ lang: DUTCH_LANG });

  test('if it converts 0 correctly', () => {
    const result = nlConverter.numberToText(0);
    expect(result).toBe('nul');
  });
});
