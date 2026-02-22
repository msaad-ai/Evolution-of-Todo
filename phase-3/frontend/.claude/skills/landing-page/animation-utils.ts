/**
 * Animation Utilities
 *
 * Helper functions and components for working with animations
 * in the landing page system.
 */

/**
 * Generate staggered animation delays for lists
 *
 * @param index - Item index in the list
 * @param delayMs - Base delay in milliseconds (default: 100)
 * @returns Style object with animationDelay
 *
 * @example
 * {items.map((item, index) => (
 *   <div style={staggerDelay(index)}>
 *     {item}
 *   </div>
 * ))}
 */
export function staggerDelay(index: number, delayMs: number = 100) {
  return {
    animationDelay: `${index * delayMs}ms`,
  };
}

/**
 * Animation class names
 */
export const animations = {
  fadeIn: "animate-fadeIn",
  slideInLeft: "animate-slideInLeft",
  slideInRight: "animate-slideInRight",
  scaleIn: "animate-scaleIn",
  shake: "animate-shake",
} as const;

/**
 * Hover effect class names
 */
export const hoverEffects = {
  lift: "hover:-translate-y-0.5 hover:shadow-xl transition-all",
  scale: "hover:scale-105 transition-transform",
  shadowGrow: "shadow-md hover:shadow-lg transition-shadow",
  brighten: "hover:brightness-110 transition-all",
  glow: "hover:shadow-lg hover:shadow-blue-500/50 transition-all",
} as const;

/**
 * Interactive state class names
 */
export const interactiveStates = {
  active: "active:scale-95 transition-transform",
  focus: "focus:outline-none focus:ring-4 focus:ring-blue-300",
  disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
} as const;

/**
 * Combine multiple class names
 *
 * @param classes - Array of class names or conditional classes
 * @returns Combined class string
 *
 * @example
 * cn(
 *   "base-class",
 *   isActive && "active-class",
 *   animations.fadeIn
 * )
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Animation timing presets
 */
export const timing = {
  fast: "duration-200",
  normal: "duration-300",
  slow: "duration-500",
  verySlow: "duration-700",
} as const;

/**
 * Easing presets
 */
export const easing = {
  linear: "ease-linear",
  in: "ease-in",
  out: "ease-out",
  inOut: "ease-in-out",
} as const;

/**
 * Create a custom animation delay
 *
 * @param ms - Delay in milliseconds
 * @returns Style object
 */
export function delay(ms: number) {
  return {
    animationDelay: `${ms}ms`,
  };
}

/**
 * Scroll-triggered animation hook
 * Use this to trigger animations when elements come into view
 *
 * @example
 * const ref = useScrollAnimation();
 * return <div ref={ref} className="opacity-0 animate-fadeIn">Content</div>
 */
export function useScrollAnimation() {
  if (typeof window === "undefined") return null;

  const ref = { current: null as HTMLElement | null };

  if (typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
  }

  return ref;
}

/**
 * Preset animation combinations
 */
export const presets = {
  card: cn(
    animations.scaleIn,
    hoverEffects.lift,
    interactiveStates.active,
    timing.normal
  ),
  button: cn(
    hoverEffects.lift,
    interactiveStates.active,
    interactiveStates.focus,
    timing.fast
  ),
  hero: cn(animations.fadeIn, timing.slow),
  feature: cn(animations.scaleIn, hoverEffects.shadowGrow, timing.normal),
} as const;

/**
 * Example usage in a component:
 *
 * import { animations, staggerDelay, cn, presets } from './animation-utils';
 *
 * function FeatureList({ features }) {
 *   return (
 *     <div className="grid grid-cols-3 gap-6">
 *       {features.map((feature, index) => (
 *         <div
 *           key={index}
 *           className={presets.card}
 *           style={staggerDelay(index)}
 *         >
 *           {feature.title}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */

export default {
  animations,
  hoverEffects,
  interactiveStates,
  timing,
  easing,
  presets,
  staggerDelay,
  delay,
  cn,
};
