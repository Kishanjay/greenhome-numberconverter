import NumberConverter from './NumberConverter';
import DUTCH_LANG from './locales/dutch';


describe('numberToText [NL]', () => {
  const nlConverter = new NumberConverter({ lang: DUTCH_LANG });

  const TEST_SET = [
    [0, 'nul'],
    [1, 'een'],
    [9, 'negen'],
    [10, 'tien'],
    [11, 'elf'],
    [12, 'twaalf'],
    [13, 'dertien'],
    [14, 'veertien'],
    [15, 'vijftien'],
    [16, 'zestien'],
    [17, 'zeventien'],
    [18, 'achttien'],
    [19, 'negentien'],
    [20, 'twintig'],
    [21, 'eenentwintig'],
    [29, 'negenentwintig'],
    [40, 'veertig'],
    [41, 'eenenveertig'],
    [98, 'achtennegentig'],
    [100, 'honderd'],
    [101, 'honderdeen'],
    [112, 'honderdtwaalf'],
    [144, 'honderdvierenveertig'],
    [885, 'achthonderdvijfentachtig'],
    [1000, 'duizend'],
    [2000, 'tweeduizend'],
    [2001, 'tweeduizend een'],
    [2012, 'tweeduizend twaalf'],
    [10000, 'tienduizend'],
    [10300, 'tienduizend driehonderd'],
    [12012, 'twaalfduizend twaalf'],
    [42345, 'tweeenveertigduizend driehonderdvijfenveertig'],
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
