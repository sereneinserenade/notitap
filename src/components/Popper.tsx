import { useState, FC, ReactNode } from "react";
import { useFloating } from "@floating-ui/react-dom-interactions";

interface PopperProps {
  open: boolean;
  referenceChild: ReactNode;
  popper: ReactNode;
}

export const Popper: FC<PopperProps> = ({ open, popper, referenceChild }) => {
  const [internalOpen, setInternalOpenOpen] = useState(false);

  const { x, y, reference, floating, strategy } = useFloating({
    open: internalOpen,
    onOpenChange: setInternalOpenOpen,
  });

  return (
    <>
      <div ref={reference}>{referenceChild}</div>
      {open && (
        <article
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
        >
          {popper}
        </article>
      )}
    </>
  );
};
