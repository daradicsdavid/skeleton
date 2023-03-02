import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["icon", "background", "container"]);

const FeaturedIcon = helpers.defineMultiStyleConfig({
  baseStyle: {
    icon: {
      borderRadius: "0.25rem"
    },
    background: {
      display: "none"
    }
  },
  sizes: {
    xs: {
      icon: {
        w: 6,
        h: 6,
        p: "0.375rem"
      },
      background: {
        w: 6,
        h: 6,
        mt: "-0.15625rem",
        ml: "0.15625rem"
      }
    },
    sm: {
      icon: {
        w: 8,
        h: 8,
        p: "0.5rem"
      },
      background: {
        w: 8,
        h: 8,
        mt: "-0.20833rem",
        ml: "0.2083rem"
      }
    },
    md: {
      icon: {
        w: 10,
        h: 10,
        p: "0.625rem"
      },
      background: {
        w: 10,
        h: 10,
        mt: "-0.26041rem",
        ml: "0.26041rem"
      }
    },
    lg: {
      icon: {
        w: 12,
        h: 12,
        p: "0.75rem"
      },
      background: {
        w: 12,
        h: 12,
        mt: "-0.3125rem",
        ml: "0.3125rem"
      }
    },
    xl: {
      icon: {
        w: 14,
        h: 14,
        p: "0.875rem"
      },
      background: {
        w: 14,
        h: 14,
        mt: "-0.36458rem",
        ml: "0.36458rem"
      }
    }
  },
  variants: {
    light: {
      icon: {
        backgroundColor: "primary.100",
        color: "primary.600"
      }
    },
    mid: {
      icon: {
        backgroundColor: "primary.600",
        color: "white"
      }
    },
    dark: {
      icon: {
        backgroundColor: "primary.800",
        color: "white"
      }
    },
    modern: {
      icon: {
        backgroundColor: "white",
        color: "gray.700",
        borderColor: "gray.200",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "xs"
      }
    },
    glass: {
      container: {
        display: "grid",
        templateColumns: "1fr"
      },
      background: {
        display: "block",
        gridRowStart: 1,
        gridColumnStart: 1,
        borderRadius: "0.25rem",
        transform: "rotate(15deg)",
        background: "primary.700"
      },
      icon: {
        gridRowStart: 1,
        gridColumnStart: 1,
        color: "white",
        backgroundColor: "lightForBlur",
        backdropFilter: "auto",
        backdropBlur: "md",
        borderColor: "lightForBlur",
        borderWidth: "0.5px",
        borderStyle: "solid"
      }
    }
  },
  defaultProps: {
    size: "md",
    variant: "light"
  }
});

export default FeaturedIcon;
