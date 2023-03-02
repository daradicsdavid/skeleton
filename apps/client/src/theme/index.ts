import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

// Foundational style overrides
import colors from "./foundations/colors";
import borderWidths from "./foundations/borderWidths";
import blur from "./foundations/blur";

import Button from "./components/button";
import sizes from "./foundations/sizes";
import space from "./foundations/space";
import shadows from "./foundations/shadows";
import Input from "./components/input";
import borders from "./foundations/borders";
import textStyles from "./textStyles";
import fontWeights from "./foundations/fontWeights";
import layerStyles from "./layerStyles";
import Card from "./components/card";
import Progress from "./components/progress";

const overrides = {
  blur,
  styles,
  colors,
  space,
  sizes,
  shadows,
  borders,
  borderWidths,
  fontWeights,
  textStyles,
  layerStyles,
  components: {
    Button,
    Input,
    Card,
    Progress
  }
};

export default extendTheme(overrides);
