import NumberConverter from './NumberConverter';

import DUTCH_LANG from './locales/dutch';

function sample1() {
  const dutchNumberConverter = new NumberConverter({ lang: DUTCH_LANG });

  const r = dutchNumberConverter.numberToText(30);
  console.log({ r });

  const x = dutchNumberConverter.textToNumber('honderdduizend');
  console.log({ x });
}


sample1();
