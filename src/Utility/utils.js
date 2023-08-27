// should return farsi number with giver input
export function enToFaNumber(number) {
  if (number === 0) return "۰";
  if (!number) return null;
  const data = {
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
    0: "۰",
  };
  let result = "";
  number = number.toString();

  for (var i = 0; i < number.length; i++) {
    if (data[number[i]]) result += data[number[i]];
    else result += number[i];
  }

  return result;
}

// should return english number with given input
export function faToEnNumber(number) {
  if (number === "۰") return 0;
  if (!number) return null;
  const data = {
    "۱": 1,
    "۲": 2,
    "۳": 3,
    "۴": 4,
    "۵": 5,
    "۶": 6,
    "۷": 7,
    "۸": 8,
    "۹": 9,
    "۰": 0,
  };
  let result = "";
  number = number.toString();

  for (var i = 0; i < number.length; i++) {
    if (data[number[i]]) result += data[number[i]];
    else result += number[i];
  }

  return result;
}

// separate 3 by 3 digits of number with comma in farsi
export function numberWithCommas(number) {
  if (number === 0) return "۰";
  if (!number) return null;

  number = faToEnNumber(number);

  number = number.toString().replaceAll(",", "");
  number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return enToFaNumber(number);
}

// separate 3 by 3 digits of number with comma in english
export function numberWithCommasEn(number) {
  if (number === 0) return 0;
  if (!number) return null;

  number = number.toString().replaceAll(",", "");
  number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return number;
}

// validate number input
var numberRegex = /^\d+$/;
export const validateNumberInput = (val) => {
  const valueInput = val.replaceAll(",", "").replaceAll(" ", "");

  if (!numberRegex.test(valueInput) && valueInput.length > 1) {
    return false;
  }

  return true;
};
