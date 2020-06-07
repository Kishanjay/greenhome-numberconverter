import NumberConverter from './NumberConverter';


function sample1() {
  const dutchNumberConverter = new NumberConverter({});

  dutchNumberConverter.numberToText(1394458);
  dutchNumberConverter.textToNumber('honderdduizend');
}


sample1();
