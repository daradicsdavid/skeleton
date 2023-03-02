import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { ability, AppAbility } from "./ability";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AbilityContext = createContext<AppAbility>(ability);

export default createContextualCan(AbilityContext.Consumer);
