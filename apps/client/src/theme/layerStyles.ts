const blurs: Record<string, object> = {
  blur_sm: {
    backdropFilter: "blur(4px)"
  },
  blur_md: {
    backdropFilter: "blur(8px)"
  },
  blur_lg: {
    backdropFilter: "blur(12px)"
  },
  blur_xl: {
    backdropFilter: "blur(20px)"
  }
};

function generateColoredBlurs() {
  const colors = [
    { token: "light", color: "rgba(255, 255, 255, 0.6)" },
    { token: "dark", color: "rgba(52, 64, 84, 0.6)" }
  ];
  const result: Record<string, object> = {};
  Object.keys(blurs).forEach(blur => {
    colors.forEach(color => {
      result[blur + "_" + color.token] = {
        ...blurs[blur],
        background: color.color
      };
    });

  });
  return result;
}

export default {
  ...generateColoredBlurs()
};
