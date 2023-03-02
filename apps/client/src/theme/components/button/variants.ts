import { defineStyle } from "@chakra-ui/react";
import outlines from "../../foundations/outlines";

export const primary = defineStyle({
  backgroundColor: "primary.600",
  color: "white",
  _hover: {
    backgroundColor: "primary.700"
  },
  _focusVisible: { ...outlines.primaryOutline },
  _focus: { ...outlines.primaryOutline },
  _active: {
    backgroundColor: "primary.600"
  },
  _disabled: {
    _hover: {
      backgroundColor: "primary.200 !important"
    },
    backgroundColor: "primary.200"
  }
});

export const secondaryGray = defineStyle({
  backgroundColor: "white",
  color: "gray.700",
  borderColor: "gray.300",
  borderStyle: "solid",
  borderWidth: "1px",

  _hover: {
    backgroundColor: "gray.50"
  },
  _focusVisible: {
    ...outlines.secondaryGrayOutline
  },
  _focus: {
    ...outlines.secondaryGrayOutline
  },
  _active: {
    backgroundColor: "white"
  },
  _disabled: {
    backgroundColor: "white",
    color: "gray.300",
    borderColor: "gray.200"
  }
});

export const secondary = defineStyle({
  backgroundColor: "primary.50",
  color: "primary.700",

  _hover: {
    backgroundColor: "primary.100"
  },
  _focusVisible: {
    ...outlines.secondaryOutline
  },
  _focus: {
    ...outlines.secondaryOutline
  },
  _active: {
    backgroundColor: "primary.50"
  },
  _disabled: {
    backgroundColor: "primary.25",
    color: "primary.300"
  }
});


export const tertiaryGray = defineStyle({
  backgroundColor: "white",
  color: "gray.600",
  _hover: {
    backgroundColor: "gray.50"
  },
  _active: {
    backgroundColor: "white"
  },
  _disabled: {
    color: "gray.300"
  }
});

export const tertiary = defineStyle({
  color: "primary.700",
  backgroundColor: "white",
  _hover: {
    backgroundColor: "primary.50"
  },
  _active: {
    backgroundColor: "white"
  },
  _disabled: {
    color: "gray.300"
  }
});

export const linkGray = defineStyle({
  p: 0,
  color: "gray.600",
  _hover: {
    color: "gray.700",
    textDecoration: "none"
  },
  _active: {
    color: "gray.600"
  },
  _disabled: {
    color: "gray.300"
  }
});

export const linkColor = defineStyle({
  p: 0,
  color: "primary.600",
  _hover: {
    color: "primary.700",
    textDecoration: "none"
  },
  _active: {
    color: "primary.600"
  },
  _disabled: {
    color: "gray.300"
  }
});
