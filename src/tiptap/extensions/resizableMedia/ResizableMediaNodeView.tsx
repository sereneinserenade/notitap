/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";

import { resizableMediaActions } from "./resizableMediaMenuUtil";

import "./styles.scss";

export const ResizableMediaNodeView = ({
  node,
  updateAttributes,
}: NodeViewProps) => {
  const [mediaType, setMediaType] = useState<"img" | "video">();

  useEffect(() => {
    setMediaType(node.attrs["media-type"]);
  }, [node.attrs]);

  const [aspectRatio, setAspectRatio] = useState(0);

  const [proseMirrorContainerWidth, setProseMirrorContainerWidth] = useState(0);

  const [mediaActionActiveState, setMediaActionActiveState] = useState<
    Record<string, boolean>
  >({});

  const resizableImgRef = useRef<HTMLImageElement | HTMLVideoElement | null>(
    null
  );

  const calculateMediaActionActiveStates = () => {
    const activeStates: Record<string, boolean> = {};

    resizableMediaActions.forEach(({ tooltip, isActive }) => {
      activeStates[tooltip] = !!isActive?.(node.attrs);
    });

    setMediaActionActiveState(activeStates);
  };

  useEffect(() => {
    calculateMediaActionActiveStates();
  }, [node.attrs]);

  const mediaSetupOnLoad = () => {
    // ! TODO: move this to extension storage
    const proseMirrorContainerDiv = document.querySelector(".ProseMirror");

    if (proseMirrorContainerDiv)
      setProseMirrorContainerWidth(proseMirrorContainerDiv?.clientWidth);

    // When the media has loaded
    if (!resizableImgRef.current) return;

    if (mediaType === "video") {
      // Aspect Ratio from its original size
      setTimeout(() => {
        setAspectRatio(
          (resizableImgRef as unknown as HTMLVideoElement).videoWidth /
            (resizableImgRef.current as HTMLVideoElement).videoHeight
        );

        // for the first time when video is added with custom width and height
        // and we have to adjust the video height according to it's width
        onHorizontalResize("left", 0);
      }, 200);
    } else {
      resizableImgRef.current.onload = () => {
        // Aspect Ratio from its original size
        setAspectRatio(
          (resizableImgRef.current as HTMLImageElement).naturalWidth /
            (resizableImgRef.current as HTMLImageElement).naturalHeight
        );

        onHorizontalResize("left", 0);
      };
    }

    setTimeout(() => calculateMediaActionActiveStates(), 200);
  };

  useEffect(() => {
    mediaSetupOnLoad();
  });

  const [isHorizontalResizeActive, setIsHorizontalResizeActive] =
    useState(false);

  const [lastCursorX, setLastCursorX] = useState(-1);

  interface WidthAndHeight {
    width: number;
    height: number;
  }

  const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) =>
    width < 100 || height < 100;

  const startHorizontalResize = (e: MouseEvent) => {
    setIsHorizontalResizeActive(true);
    setLastCursorX(e.clientX);

    document.addEventListener("mousemove", onHorizontalMouseMove);
    document.addEventListener("mouseup", stopHorizontalResize);
  };

  const stopHorizontalResize = () => {
    setIsHorizontalResizeActive(false);
    setLastCursorX(-1);

    document.removeEventListener("mousemove", onHorizontalMouseMove);
    document.removeEventListener("mouseup", stopHorizontalResize);
  };

  const onHorizontalResize = (
    directionOfMouseMove: "right" | "left",
    diff: number
  ) => {
    debugger;

    if (!resizableImgRef.current) {
      console.error("Media ref is undefined|null", {
        resizableImg: resizableImgRef.current,
      });
      return;
    }

    const currentMediaDimensions = {
      width: resizableImgRef.current?.width,
      height: resizableImgRef.current?.height,
    };

    const newMediaDimensions = {
      width: -1,
      height: -1,
    };

    if (directionOfMouseMove === "left") {
      newMediaDimensions.width = currentMediaDimensions.width - Math.abs(diff);
    } else {
      newMediaDimensions.width = currentMediaDimensions.width + Math.abs(diff);
    }

    if (newMediaDimensions.width > proseMirrorContainerWidth)
      newMediaDimensions.width = proseMirrorContainerWidth;

    newMediaDimensions.height = newMediaDimensions.width / aspectRatio;

    if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return;

    updateAttributes(newMediaDimensions);
  };

  const onHorizontalMouseMove = (e: MouseEvent) => {
    const { clientX } = e;

    const diff = lastCursorX - clientX;

    setLastCursorX(clientX);

    if (diff === 0) return;

    const directionOfMouseMove: "left" | "right" = diff > 0 ? "left" : "right";

    onHorizontalResize(directionOfMouseMove, Math.abs(diff));
  };

  const [isVerticalResizeActive, setIsVerticalResizeActive] = useState(false);

  const [lastCursorY, setLastCursorY] = useState(-1);

  const startVerticalResize = (e: MouseEvent) => {
    setIsVerticalResizeActive(true);
    setLastCursorY(e.clientY);

    document.addEventListener("mousemove", onVerticalMouseMove);
    document.addEventListener("mouseup", stopVerticalResize);
  };

  const stopVerticalResize = () => {
    setIsVerticalResizeActive(false);
    setLastCursorY(-1);

    document.removeEventListener("mousemove", onVerticalMouseMove);
    document.removeEventListener("mouseup", stopVerticalResize);
  };

  const onVerticalMouseMove = (e: MouseEvent) => {
    if (!isVerticalResizeActive) return;

    const { clientY } = e;

    const diff = lastCursorY - clientY;

    setLastCursorY(clientY);

    if (diff === 0) return;

    const directionOfMouseMove: "up" | "down" = diff > 0 ? "up" : "down";

    if (!resizableImgRef.current) {
      console.error("Media ref is undefined|null", {
        resizableImg: resizableImgRef.current,
      });
      return;
    }

    const currentMediaDimensions = {
      width: resizableImgRef.current?.width,
      height: resizableImgRef.current?.height,
    };

    const newMediaDimensions = {
      width: -1,
      height: -1,
    };

    if (directionOfMouseMove === "up") {
      newMediaDimensions.height =
        currentMediaDimensions.height - Math.abs(diff);
    } else {
      newMediaDimensions.height =
        currentMediaDimensions.height + Math.abs(diff);
    }

    newMediaDimensions.width = newMediaDimensions.height * aspectRatio;

    if (newMediaDimensions.width > proseMirrorContainerWidth) {
      newMediaDimensions.width = proseMirrorContainerWidth;

      newMediaDimensions.height = newMediaDimensions.width / aspectRatio;
    }

    if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return;

    updateAttributes(newMediaDimensions);
  };

  const [isFloat, setIsFloat] = useState<boolean>();

  useEffect(() => {
    setIsFloat(node.attrs.dataFloat);
  }, [node.attrs]);

  const [isAlign, setIsAlign] = useState<boolean>();

  useEffect(() => {
    setIsAlign(node.attrs.dataAlign);
  }, [node.attrs]);

  return (
    <NodeViewWrapper
      as="article"
      className={`
        media-node-view flex pos-relative not-prose
        ${(isFloat && `f-${node.attrs.dataFloat}`) || ""}
        ${(isAlign && `align-${node.attrs.dataAlign}`) || ""}
      `}
    >
      <div className="w-fit flex relative">
        {mediaType === "img" && (
          <img
            src={node.attrs.src}
            ref={resizableImgRef as any}
            className={`rounded-lg ${`float-${node.attrs.dataFloat}`} ${`align-${node.attrs.dataAlign}`}`}
            draggable="true"
            alt={node.attrs.src}
            width={node.attrs.width}
            height={node.attrs.height}
          />
        )}

        {mediaType === "video" && (
          <video
            ref={resizableImgRef as any}
            className={`rounded-lg ${`float-${node.attrs.dataFloat}`} ${`align-${node.attrs.dataAlign}`}`}
            draggable="true"
            controls
            width={node.attrs.width}
            height={node.attrs.height}
          >
            <source src={node.attrs.src} />
          </video>
        )}

        <div
          className={`horizontal-resize-handle ${
            isHorizontalResizeActive ? "horizontal-resize-active" : ""
          }`}
          title="Resize"
          onMouseDown={(e) => startHorizontalResize(e as any)}
          onMouseUp={() => stopHorizontalResize()}
        />

        <div
          className={`vertical-resize-handle ${
            isHorizontalResizeActive ? "vertical-resize-active" : ""
          }`}
          title="Resize"
          onMouseDown={(e) => startVerticalResize(e as any)}
          onMouseUp={() => stopVerticalResize()}
        />
      </div>
    </NodeViewWrapper>
  );
};
