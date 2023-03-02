import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {},
  header: {},
  body: {},
  footer: {}
});

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "xl"
    }
  })
};

const variants = {
  elevated: definePartsStyle({
    container: {
      backgroundColor: "white",
      boxShadow: "sm"
    }
  })
};

const defaultProps = {
  size: "md"
} as const;

export default defineMultiStyleConfig({ defaultProps, baseStyle, sizes, variants });
