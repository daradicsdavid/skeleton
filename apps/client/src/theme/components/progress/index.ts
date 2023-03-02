import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["filledTrack", "track"]);

const Progress = helpers.defineMultiStyleConfig({
  variants: {
    primary: {
      filledTrack: {
        bg: "primary.600"
      },
      track: {
        bg: "primary.300"
      }
    }
  },
  defaultProps: {
    size: "xs",
    variant: "primary"
  }
});

export default Progress;
