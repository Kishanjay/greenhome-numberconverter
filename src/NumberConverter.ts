interface NumberConverterOptions {
  lang: {
    zero: string,
    units: { // all numbers < 20 that have only a single translation
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
      [key: number]: string;
    },
    // numbers that can be part of a bigger number, reducing by a 'tens' should leave any
    // number < 10.
    // e.g. 42 => can be reduced by 'forthy' leaving 2.
    // e.g. 42 => cannot be reduced by 'twenty' as that would leave 22
    tens: {
      [key: number]: string;
      order: string;
      link?: string;
    },
    // numbers that can be part of a bigger number (factor 100), reducing by a 'hundrets' should
    // leave any number < 100
    hundreds: {
      1: string;
      [key: number]: string;
    },
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
        return this.options.lang.numberGroups[index] || `[undefined]${index}`;
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

    if (numberRemainder in this.options.lang.units) {
      return this.options.lang.units[numberRemainder];
    }

    if (numberRemainder >= 100) {
      const numberOfHundreds = Math.floor(numberRemainder / 100);
      result += this.options.lang.hundreds[numberOfHundreds]
        || this.options.lang.units[numberOfHundreds] + this.options.lang.hundreds[1];
      numberRemainder -= numberOfHundreds * 100;
    }

    if (numberRemainder in this.options.lang.units) {
      return result + this.options.lang.units[numberRemainder];
    }
    if (numberRemainder > 10) {
      const numberOfTens = Math.floor(numberRemainder / 10);
      numberRemainder -= numberOfTens * 10;

      let tensValue = numberOfTens > 1
        ? this.options.lang.units[numberOfTens] + this.options.lang.units[10]
        : this.options.lang.units[10];

      if (numberOfTens in this.options.lang.tens) {
        tensValue = this.options.lang.tens[numberOfTens];
      }

      const unitValue = this.options.lang.units[numberRemainder];
      const link = this.options.lang.tens.link || '';
      if (this.options.lang.tens.order === 'inverse') {
        result += unitValue ? unitValue + link + tensValue : tensValue;
      } else {
        result += unitValue ? tensValue + link + unitValue : tensValue;
      }

      return result;
    }

    if (numberRemainder > 0) {
      result += this.options.lang.units[numberRemainder];
    }

    return result;
  }

  numberToText(number: number): string {
    if (number === 0) {
      return this.options.lang.zero;
    }

    const groups = [];

    let numberGroupIndex = 0;
    let numberRemainder = number;

    while (numberRemainder >= 1) {
      const numberGroup = numberRemainder % 1000;
      const num = this.numberGroupToText(numberGroup);
      const groupName = this.numberGroupIndexName(numberGroupIndex);

      numberRemainder = Math.floor(numberRemainder / 1000);
      numberGroupIndex += 1;

      groups.push(groupName && numberGroup === 1 ? groupName : num + groupName);
    }

    return groups.reverse().join(' ').trim();
  }

  textToNumber(text: string): number {
    return text ? 0 : 1;
  }
}


export default NumberConverter;
