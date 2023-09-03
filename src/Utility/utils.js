import { CedarmapToken } from "@/constants/Const";
import axios from "axios";

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

// for map
export const getLocationName = async (center, returnAllData = false) => {
  let name;
  const requestUrl =
    "https://api.cedarmaps.com/v1/geocode/cedarmaps.streets/" +
    center[0] +
    "," +
    center[1] +
    ".json?access_token=" +
    CedarmapToken;

  await axios.get(requestUrl).then((res) => {
    const result = res.data.result;
    if (returnAllData) {
      name = result;
    } else {
      name = `${result.city} - ${result.address}`;
    }
  });

  return name;
};

// for map
export const getPathCoordinates = async (path) => {
  // path = [[source_lat,source_lng],[destination_lat,destination_lng]]
  let coordinates = [];
  let distance = 0;
  let time = 0;

  const url = `https://api.cedarmaps.com/v1/direction/cedarmaps.driving/${path[0][0]},${path[0][1]};${path[1][0]},${path[1][1]}?access_token=${CedarmapToken}`;
  await axios.get(url).then((res) => {
    coordinates = res.data.result.routes[0].geometry.coordinates;
    distance = res.data.result.routes[0].distance / 1000;
    time = res.data.result.routes[0].time / 1000 / 60;
  });

  return { coordinates, distance, time };
};

// cedarmaps api give lng first and lat second.
// leaflet api works with lat first and lng second.
// so we need to reverse Routes.
export const reverseRoutes = (coordinates) => {
  let reversed = [];

  coordinates.forEach((arr) => {
    reversed.push(arr.reverse());
  });

  return reversed;
};

// calculate zoom for map
export const calculateZoom = (n) => {
  if (n > 0 && n < 0.044) {
    return 12;
  } else if (n > 0.044 && n < 0.14) {
    return 11;
  } else if (n > 0.14 && n < 1) {
    return 9;
  } else if (n > 1 && n < 2) {
    return 7;
  } else {
    return 6;
  }
};

// find bigger number
export const findBiggerNumber = (num1, num2) => {
  num1 = Math.abs(num1);
  num2 = Math.abs(num2);

  if (num1 > num2) {
    return num1;
  } else {
    return num2;
  }
};
