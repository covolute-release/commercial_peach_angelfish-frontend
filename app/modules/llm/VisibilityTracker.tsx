// components/VisibilityTracker.tsx
// Necessary if used within Next.js App Router client-side logic

import type React from "react";
import { useEffect, useRef, useCallback, memo, type JSX } from "react";

// Define the structure for the Intersection Observer options
type ObserverOptions = IntersectionObserverInit;

// Define the props the component accepts
interface VisibilityTrackerProps {
  /** A unique identifier (string or number) for the item being tracked. */
  identifier: string;
  type?: string;
  /** Callback function triggered when visibility status changes. Receives the identifier and a boolean indicating visibility. */
  onVisibilityChange?: (identifier: string | number, isVisible: boolean) => void;
  /** The actual content/component(s) to wrap and track. */
  children: React.ReactNode;
  /** Optional IntersectionObserver options (threshold, rootMargin, etc.). */
  observerOptions?: ObserverOptions;
  /** Optional flag to disable observation dynamically. Defaults to true. */
  enabled?: boolean;
  /** Optional: specify the HTML tag for the wrapper ('span' for inline). Defaults to 'div'. 'display: contents' makes this less critical for layout. */
  tag?: keyof JSX.IntrinsicElements;
}

/**
 * A reusable component that tracks whether its children are visible within the viewport
 * using IntersectionObserver. It renders a layout-neutral wrapper (`display: contents`)
 * and calls `onVisibilityChange` when visibility status changes.
 */
const VisibilityTracker: React.FC<VisibilityTrackerProps> = ({
  identifier,
  onVisibilityChange,
  children,
  observerOptions = { threshold: 0.1 }, // Default: trigger when 10% is visible
  enabled = true,
  tag = "div",
  type,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);

  // Memoize the callback to ensure stability if the parent passes an inline function
  // This prevents unnecessary observer re-creation.
  const stableOnVisibilityChange = useCallback(onVisibilityChange ?? (() => {}), [onVisibilityChange]);

  useEffect(() => {
    // Ensure we have an element reference and tracking is enabled
    const currentElement = elementRef.current;
    if (!currentElement || !enabled) {
      // If tracking was previously active and is now disabled,
      // we might want to explicitly report it as not visible.
      // However, the IntersectionObserver handles leaving the viewport,
      // so usually, just returning is fine.
      return;
    }

    // --- Observer Logic ---
    let wasVisible: boolean | null = null; // Track previous state within this effect scope

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // There should typically be only one entry per observer instance here
      entries.forEach((entry) => {
        const isCurrentlyVisible = entry.isIntersecting;
        // Only call the callback if the visibility state actually changes
        // or if it's the initial check (wasVisible === null)
        if (isCurrentlyVisible !== wasVisible) {
          stableOnVisibilityChange(identifier, isCurrentlyVisible);
          wasVisible = isCurrentlyVisible; // Update the tracked state
        }
      });
    };

    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing the target element
    observer.observe(currentElement);

    // --- Cleanup Function ---
    // This runs when the component unmounts or dependencies change
    return () => {
      // Stop observing the specific element
      // Check currentElement again as it's captured in closure
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      // Disconnect the observer instance entirely
      observer.disconnect();
      // Optionally report leaving if unmounting while visible
      // if (wasVisible) {
      //   stableOnVisibilityChange(identifier, false);
      // }
    };

    // Dependencies for the useEffect hook
  }, [identifier, stableOnVisibilityChange, observerOptions, enabled]); // Add elementRef.current is NOT needed as dependency

  // Render the specified tag (div, span, etc.) with 'display: contents'
  // This makes the wrapper itself invisible to the layout engine.
  const Tag = tag;

  return (
    // @ts-expect-error wtf
    <Tag
      // @ts-expect-error wtf
      ref={elementRef}
      data-type={type}
      data-id={identifier}
      className="contents"
    >
      {children}
    </Tag>
  );
};

// Memoize the component to prevent re-renders if props haven't changed.
// Useful especially if used in large lists.
export default memo(VisibilityTracker);
