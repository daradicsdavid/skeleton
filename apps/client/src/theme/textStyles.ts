const styles: Record<string, object> = {
  text_xs: {
    fontSize: "0.75rem",
    lineHeight: "1.125rem"
  },
  text_sm: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem"
  },
  text_md: {
    fontSize: "1rem",
    lineHeight: "1.5rem"
  },
  text_lg: {
    fontSize: "1,125rem",
    lineHeight: "1.75rem"
  },
  text_xl: {
    fontSize: "1.25rem",
    lineHeight: "1.875rem"
  },
  display_xs: {
    fontSize: "1.5rem",
    lineHeight: "2rem"
  },
  display_sm: {
    fontSize: "1.875rem",
    lineHeight: "2.375rem"
  },
  display_md: {
    fontSize: "2.25rem",
    lineHeight: "2.75rem",
    letterSpacing: "-2%"
  },
  display_lg: {
    fontSize: "3rem",
    lineHeight: "3.75rem",
    letterSpacing: "-2%"
  },
  display_xl: {
    fontSize: "3rem",
    lineHeight: "3.75rem",
    letterSpacing: "-2%"
  },
  display_2xl: {
    fontSize: "4.5rem",
    lineHeight: "5.625rem",
    letterSpacing: "-2%"
  }
};

function generateWeightedStyles() {
  const weights = ["regular", "medium", "semibold", "bold"];
  const result: Record<string, object> = {};
  Object.keys(styles).forEach(style => {
    weights.forEach(weight => {
      result[style + "_" + weight] = {
        ...styles[style],
        fontWeight: `var(--chakra-fontWeights-${weight})`
      };
    });

  });
  return result;
}

export default {
  ...generateWeightedStyles()
};
