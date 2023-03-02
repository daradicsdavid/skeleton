import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";
import outlines from "../../foundations/outlines";


const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {}
});

const outline = definePartsStyle({
  field: {
    _focus: {
      ...outlines.primaryOutline,
      borderColor: "primary.300",
      borderStyle: "solid",
      borderWidth: "1px"
    },
    _focus_visible: {
      ...outlines.primaryOutline
    }
  }
});

export default defineMultiStyleConfig({ baseStyle, variants: { outline } });
