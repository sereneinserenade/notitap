/* eslint-disable react/jsx-props-no-spreading */
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useId,
  useInteractions,
  useRole,
} from "@floating-ui/react-dom-interactions";
import React, { cloneElement, useState } from "react";

interface Props {
  render: (data: {
    close: () => void;
    labelId: string;
    descriptionId: string;
  }) => React.ReactNode;
  placement?: Placement;
  children: JSX.Element;
}

export const Popover: React.FC<Props> = ({ children, render, placement }) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift()],
    placement,
    whileElementsMounted: autoUpdate,
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { enabled: true }),
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      {open && (
        <FloatingFocusManager
          context={context}
          modal={false}
          order={["reference", "content"]}
          returnFocus={false}
        >
          <div
            {...getFloatingProps({
              className: "Popover",
              ref: floating,
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              },
              "aria-labelledby": labelId,
              "aria-describedby": descriptionId,
            })}
          >
            {render({
              labelId,
              descriptionId,
              close: () => {
                setOpen(false);
              },
            })}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};

Popover.defaultProps = {
  placement: "top",
};
