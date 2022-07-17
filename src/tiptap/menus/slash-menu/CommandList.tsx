import React, { useEffect, useImperativeHandle, useState } from "react";
import { stopPrevent } from "../../utils";

import "./styles/CommandList.scss";

interface CommandListProps {
  items: any[];
  command: (...args: any[]) => any;
}

export const CommandList = React.forwardRef(
  ({ items, command }: CommandListProps, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          stopPrevent(event);
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          stopPrevent(event);
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          stopPrevent(event);
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    const upHandler = () => {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    const selectItem = (index: number) => {
      const item = items[index];

      if (item) setTimeout(() => command(item));
    };
    return (
      <div className="items hide-scrollbar min-w-[20rem]">
        {items.length ? (
          <>
            {items.map((item, index) => {
              return (
                <button
                  type="button"
                  className={`
                  item
                  ${index === selectedIndex ? "is-selected" : ""} 
                `}
                  key={item.title}
                  onClick={() => selectItem(index)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onKeyDown={(e) => e.code === "Enter" && selectItem(index)}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-10 w-10 flex items-center justify-center bg-white border border-slate-400 rounded">
                      <i className={`${item.iconClass} scale-150`} />
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.highlightedTitle || item.title,
                      }}
                    />
                  </span>
                  {item.shortcut && <code>{item.shortcut}</code>}
                </button>
              );
            })}
          </>
        ) : (
          <div className="item"> No result </div>
        )}
      </div>
    );
  }
);
