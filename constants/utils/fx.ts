// Capitalize first letter of each word in a string
export const capitalizeFirstLetter = (string: string) => {
  return string
    ? string?.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
      )
    : "";
};
