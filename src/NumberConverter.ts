interface NumberConverterOptions {
  lang: {
    units: {
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: string;
      9: string;
      10: string;
      100: string;
      [key: number]: string; // any other exception for digits
    }
    numberGroups: {
      1: string;
      [key: number]: string; // in increasing order the number groups
    }
  }
}

class NumberConverter {
  options: NumberConverterOptions;

  constructor(options: NumberConverterOptions) {
    this.options = options;
  }

  private numberGroupIndexName(index: number): string {
    switch (index) {
      case 0: {
        return '';
      }
      default: {
        return this.options.lang.numberGroups[index] || 'undefined';
      }
    }
  }


  // convert any number from 0 to 1000 to a string
  // use general rules unless exceptions are specified
  private numberGroupToText(number: number) {
    if (number >= 1000) {
      throw Error(`invalid hunderds: ${number}`);
    }

    let result = '';
    let numberRemainder = number;

    if (numberRemainder >= 100) {
      const hundreds = Math.floor(numberRemainder / 100);
      result += this.options.lang.units[hundreds];
      numberRemainder -= hundreds * 100;
    }

    if (numberRemainder >= 10) {
      const tens = Math.floor(numberRemainder / 10);
      result += this.options.lang.units[tens * 10] || this.options.lang.units[tens];
      numberRemainder -= tens * 10;
    }

    if (numberRemainder === 0 && result === '') {
      return this.options.lang.units[numberRemainder];
    }

    if (numberRemainder !== 0) {
      result += this.options.lang.units[numberRemainder];
    }

    return result;
  }

  numberToText(number: number): string {
    let result = '';

    let numberGroupIndex = 0;
    let numberRemainder = number;
    while (numberRemainder >= 1) {
      const numberGroup = numberRemainder % 1000;
      const num = this.numberGroupToText(numberGroup);
      const groupName = this.numberGroupIndexName(numberGroupIndex);

      numberRemainder /= 1000;
      numberGroupIndex += 1;

      result += num + groupName;
    }

    return `${result}`;
  }

  textToNumber(text: string): number {
    return text ? 0 : 1;
  }
}


export default NumberConverter;
