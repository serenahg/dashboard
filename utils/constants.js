export const removeKeys = (data, keysToExclude) => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const extractedKeys = {};
      for (const key in item) {
        if (!keysToExclude.includes(key)) {
          extractedKeys[key] = item[key];
        }
      }
      return extractedKeys;
    });
  } else if (typeof data === "object") {
    const extractedKeys = {};
    for (const key in data) {
      if (!keysToExclude.includes(key)) {
        extractedKeys[key] = data[key];
      }
    }
    return extractedKeys;
  } else {
    // Handle unsupported data types if needed
    return data;
  }
};
