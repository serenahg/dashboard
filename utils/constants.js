export const removeKeys = (data, keysToExclude) => {
  return data.map((item) => {
    const extractedKeys = {};
    for (const key in item) {
      if (!keysToExclude.includes(key)) {
        extractedKeys[key] = item[key];
      }
    }
    return extractedKeys;
  });
};
