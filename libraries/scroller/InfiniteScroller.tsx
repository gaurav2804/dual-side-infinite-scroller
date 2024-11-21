import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { InfiniteScrollerProps } from "./types/infiniteScrollerTypes";

const InfiniteScroller: React.FC<PropsWithChildren<InfiniteScrollerProps>> = ({
  dataLength,
  topCallback,
  bottomCallback,
  hasMoreBottom,
  hasMoreTop,
  scrollableTarget,
  children,
}) => {
  const [isLoadingTop, setIsLoadingTop] = useState(false);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const observerInitialized = useRef({ top: false, bottom: false });
  const rootContainer = useRef<Element | null>(null);
  const hasCallTriggered = useRef({ top: false, bottom: false });
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);
  const currentScrollHeight = useRef(0);
  useEffect(() => {
    const intersectionObserverOptions: IntersectionObserverInit = {};
    const getRootElement = () => {
      if (scrollableTarget) {
        return document.getElementById(scrollableTarget);
      }
      return rootContainer.current;
    };
    intersectionObserverOptions.root = getRootElement();
    rootContainer.current = getRootElement();
    intersectionObserverOptions.threshold = 0.1;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === topSentinelRef.current) {
          console.log(entry);

          if (observerInitialized.current.top && hasMoreTop) {
            if (!entry.isIntersecting) {
              return;
            }
            if (!hasCallTriggered.current.top) {
              topCallback();
              setIsLoadingTop(true);
              hasCallTriggered.current.top = true;
            }
          } else {
            observerInitialized.current.top = true;
          }
        } else if (entry.target === bottomSentinelRef.current) {
          console.log(entry);

          if (observerInitialized.current.bottom && hasMoreBottom) {
            if (!entry.isIntersecting) {
              return;
            }
            if (!hasCallTriggered.current.bottom) {
              bottomCallback();
              setIsLoadingBottom(true);
              hasCallTriggered.current.bottom = true;
            }
          } else {
            observerInitialized.current.bottom = true;
          }
        }
      });
    });

    if (topSentinelRef.current) observer.observe(topSentinelRef.current);
    if (bottomSentinelRef.current) observer.observe(bottomSentinelRef.current);
    return () => {
      observerInitialized.current = { top: false, bottom: false };
      observer.disconnect();
    };
  }, [
    bottomCallback,
    hasMoreBottom,
    hasMoreTop,
    scrollableTarget,
    topCallback,
  ]);
  useEffect(() => {
    console.log(rootContainer);
    if (!rootContainer.current) {
      return;
    }
    if (hasCallTriggered.current.top) {
      setIsLoadingTop(false);
      hasCallTriggered.current.top = false;
      rootContainer.current.scrollTop =
        rootContainer.current.scrollHeight - currentScrollHeight.current || 0;
    }
    if (hasCallTriggered.current.bottom) {
      setIsLoadingBottom(false);
      hasCallTriggered.current.bottom = false;
    }
    currentScrollHeight.current = rootContainer.current?.scrollHeight || 0;
  }, [dataLength]);
  return (
    <div className="root-scroller">
      {isLoadingTop && <div>Loading top...</div>}
      <div ref={topSentinelRef} style={{ height: "1px" }} />
      {children}
      <div ref={bottomSentinelRef} style={{ height: "1px" }} />
      {isLoadingBottom && <div>Loading bottom...</div>}
    </div>
  );
};

export default InfiniteScroller;
