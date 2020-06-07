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
      omitOne?: boolean;
      link?: string;
    },
    numberGroups: {
      1: string;
      [key: number]: string; // in increasing order the number groups
      omitOne?: boolean,
      link?: string,
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

  // Converts any [0 < number < 100] to its string representation
  private tensToText(number: number) {
    let numberRemainder = number;
    const numberOfTens = Math.floor(numberRemainder / 10);
    numberRemainder -= numberOfTens * 10;

    let tensValue = numberOfTens > 1
      ? this.options.lang.units[numberOfTens] + this.options.lang.units[10]
      : this.options.lang.units[10];

    if (numberOfTens in this.options.lang.tens) {
      tensValue = this.options.lang.tens[numberOfTens];
    }

    if (numberRemainder === 0) {
      return tensValue;
    }

    const unitValue = this.options.lang.units[numberRemainder];
    let link = this.options.lang.tens.link || '';
    if (this.options.lang.tens.order === 'inverse') {
      if (unitValue.slice(-1) === 'e' && link.charAt(0) === 'e') {
        link = `ë${link.slice(1)}`;
      }
      return unitValue + link + tensValue;
    }
    return tensValue + link + unitValue;
  }

  // Convert any [0 < number < 1000] to its string representation
  private numberGroupToText(number: number) {
    if (number >= 1000) {
      throw Error(`invalid numbergroup: ${number}`);
    }

    let result = '';
    let numberRemainder = number;

    if (numberRemainder in this.options.lang.units) {
      return this.options.lang.units[numberRemainder];
    }

    if (numberRemainder >= 100) {
      const numberOfHundreds = Math.floor(numberRemainder / 100);
      numberRemainder -= numberOfHundreds * 100;

      const link = this.options.lang.hundreds.link || '';

      if (numberOfHundreds in this.options.lang.hundreds) {
        if (!this.options.lang.hundreds.omitOne) {
          result += this.options.lang.units[numberOfHundreds] + link;
        }
        result += this.options.lang.hundreds[numberOfHundreds];
      } else {
        result += this.options.lang.units[numberOfHundreds] + link + this.options.lang.hundreds[1];
      }

      if (numberRemainder > 0) {
        result += link;
      }
    }

    if (numberRemainder in this.options.lang.units) {
      return result + this.options.lang.units[numberRemainder];
    }

    if (numberRemainder > 10) {
      return result + this.tensToText(numberRemainder);
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
      const currentGroupIndex = numberGroupIndex;

      numberRemainder = Math.floor(numberRemainder / 1000);
      numberGroupIndex += 1;

      if (numberGroup === 0) {
        continue;
      }

      const groupName = this.numberGroupIndexName(currentGroupIndex);
      if (numberGroup === 1 && this.options.lang.numberGroups.omitOne && groupName) {
        groups.push(groupName);
        continue;
      }

      const num = this.numberGroupToText(numberGroup);
      const link = this.options.lang.numberGroups.link || '';
      groups.push(num + link + groupName);
    }

    return groups.reverse().join(' ').trim();
  }

  textToNumber(text: string): number {
    return text ? 0 : 1;
  }
}


export default NumberConverter;
