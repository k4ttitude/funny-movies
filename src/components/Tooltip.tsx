import { PropsWithChildren } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

type Props = { tooltip: React.ReactNode };
const Tooltip: React.FC<PropsWithChildren<Props>> = ({ tooltip, children }) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={5}
            className="bg-white rounded py-2 px-4"
          >
            {tooltip}
            <TooltipPrimitive.Arrow className="fill-white" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
