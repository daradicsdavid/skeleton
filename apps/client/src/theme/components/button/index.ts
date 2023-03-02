import { defineStyleConfig } from "@chakra-ui/react";
import { lg, md, sm, xl, xxl } from "./sizes";
import { linkGray, linkColor, primary, secondary, secondaryGray, tertiary, tertiaryGray } from "./variants";

export default defineStyleConfig({
  sizes: { sm, md, lg, xl, "2xl": xxl },
  variants: { primary, secondaryGray, secondary, tertiaryGray, tertiary, linkGray, linkColor },
  baseStyle: {
    borderRadius: "lg",
    fontWeight: "semibold",
    transition: "background-color 200ms linear"
  },
  defaultProps: {
    variant: "primary"
  }
});
