export const SeasonOptions = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
  Winter: 4,
};

export const SeasonLabels = {
  1: "Spring",
  2: "Summer",
  3: "Fall",
  4: "Winter",
};

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const yearsArray = [];

  for (let i = currentYear - 20; i <= currentYear + 10; i++) {
    yearsArray.push(i);
  }
  return yearsArray;
};

export const getSemesterNumbers = () => {
  const numbers = Array.from({ length: 25 }, (_, index) => index + 1);
  return numbers;
};

export const getSemesterSeason = () => {
  const now = new Date();
  const month = now.getMonth(); // 0 = January, 11 = December

  if (month >= 0 && month <= 4) {
    return "Spring"; // January to May
  } else if (month >= 5 && month <= 6) {
    return "Summer"; // June to July
  } else {
    return "Fall"; //  August to December
  }
};


