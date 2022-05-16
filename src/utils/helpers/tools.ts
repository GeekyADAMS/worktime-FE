export const flattenNonDupObj = (obj) => {
  const result = {};

  for (const i in obj) {
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const tempObj = flattenNonDupObj(obj[i]);

      for (const j in tempObj) {
        if (!result[j]) result[j] = tempObj[j];
      }
    } else {
      if (!result[i]) result[i] = obj[i];
    }
  }

  return result;
};
