import NumberConverter from './NumberConverter';
import DUTCH_LANG from './locales/dutch';
import ENGLISH_LANG from './locales/english';


describe('numberToText', () => {
  const nlConverter = new NumberConverter({ lang: DUTCH_LANG });
  const enConverter = new NumberConverter({ lang: ENGLISH_LANG });

  const TEST_SET = [
    [0, 'nul', 'zero'],
    [1, 'een', 'one'],
    [9, 'negen', 'nine'],
    [10, 'tien', 'ten'],
    [11, 'elf', 'eleven'],
    [12, 'twaalf', 'twelve'],
    [13, 'dertien', 'thirteen'],
    [14, 'veertien', 'fourteen'],
    [15, 'vijftien', 'fifteen'],
    [16, 'zestien', 'sixteen'],
    [17, 'zeventien', 'seventeen'],
    [18, 'achttien', 'eighteen'],
    [19, 'negentien', 'nineteen'],
    [20, 'twintig', 'twenty'],
    [21, 'eenentwintig', 'twenty-one'],
    [29, 'negenentwintig', 'twenty-nine'],
    [33, 'drieëndertig', 'thirty-three'],
    [40, 'veertig', 'forty'],
    [41, 'eenenveertig', 'forty-one'],
    [98, 'achtennegentig', 'ninety-eight'],
    [100, 'honderd', 'one hundred'],
    [101, 'honderdeen', 'one hundred one'],
    [112, 'honderdtwaalf', 'one hundred twelve'],
    [144, 'honderdvierenveertig', 'one hundred forty-four'],
    [885, 'achthonderdvijfentachtig', 'eight hundred eighty-five'],
    [1000, 'duizend', 'one thousand'],
    [2000, 'tweeduizend', 'two thousand'],
    [2001, 'tweeduizend een', 'two thousand one'],
    [2012, 'tweeduizend twaalf', 'two thousand twelve'],
    [10000, 'tienduizend', 'ten thousand'],
    [10300, 'tienduizend driehonderd', 'ten thousand three hundred'],
    [12012, 'twaalfduizend twaalf', 'twelve thousand twelve'],
    [42345, 'tweeënveertigduizend driehonderdvijfenveertig', 'forty-two thousand three hundred forty-five'],
    [485421, 'vierhonderdvijfentachtigduizend vierhonderdeenentwintig', 'four hundred eighty-five thousand four hundred twenty-one'],
    [983740, 'negenhonderddrieëntachtigduizend zevenhonderdveertig', 'nine hundred eighty-three thousand seven hundred forty'],
    [1000000, 'miljoen', 'one million'],
    [1000001, 'miljoen een', 'one million one'],
    [2000001, 'tweemiljoen een', 'two million one'],
    [421001000, 'vierhonderdeenentwintigmiljoen duizend', 'four hundred twenty-one million one thousand'],
    [100100100, 'honderdmiljoen honderdduizend honderd', 'one hundred million one hundred thousand one hundred'],
  ];

  TEST_SET.forEach(([input, nlExpectedOutput, enExpectedOutput]) => {
    test(`if it converts ${input} correctly`, () => {
      let result = nlConverter.numberToText(input as number);
      expect(result).toBe(nlExpectedOutput);

      result = enConverter.numberToText(input as number);
      expect(result).toBe(enExpectedOutput);
    });
  });
});
