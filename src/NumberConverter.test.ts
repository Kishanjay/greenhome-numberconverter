import NumberConverter from './NumberConverter';
import DUTCH_LANG from './locales/dutch';


describe('numberToText [NL]', () => {
  const nlConverter = new NumberConverter({ lang: DUTCH_LANG });

  const TEST_SET = [
    [0, 'nul'],
    [1, 'een'],
    [9, 'negen'],
    [10, 'tien'],
    [12, 'twaalf'],
    [98, 'achtennegentig'],
    [100, 'honderd'],
    [101, 'honderdeen'],
    [112, 'honderdtwaalf'],
    [144, 'honderdvierenveertig'],
    [885, 'achthonderdvijfentachtig'],
    [485421, 'vierhonderdvijfentachtigduizend vierhonderdeenentwintig'],
    [983740, 'negenhonderddrieentachtigduizend zevenhonderdveertig'],
  ];

  TEST_SET.forEach(([input, expectedOutput]) => {
    test(`if it converts ${input} correctly`, () => {
      const result = nlConverter.numberToText(input as number);
      expect(result).toBe(expectedOutput);
    });
  });
});
