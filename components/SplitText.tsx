"use client";

import { motion, type Variants } from "framer-motion";
import { isValidElement, type ReactNode } from "react";

/**
 * SplitText
 *
 * Renders the given text/children as individually animated **words** that
 * sweep into place when the heading scrolls into view. Pure presentation —
 * accepts the same JSX you'd normally put inside an <h2>.
 *
 * Highlight nodes (e.g. <span className="text-gradient-brand">) are kept
 * intact as a single animated unit so the gradient doesn't break.
 *
 * Example:
 *   <SplitText as="h2" className="section-title">
 *     One workspace, <span className="text-gradient-brand">every signal</span>.
 *   </SplitText>
 */
type SplitTextProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  id?: string;
  /** Delay (s) before the first word starts */
  delay?: number;
  /** Stagger (s) between consecutive words */
  stagger?: number;
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "60%", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Flatten children into a list of words (preserving styled spans). */
function buildTokens(children: ReactNode): ReactNode[] {
  const tokens: ReactNode[] = [];

  const processNode = (node: ReactNode) => {
    if (typeof node === "string") {
      node.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) tokens.push(part);
        else tokens.push(part);
      });
    } else if (Array.isArray(node)) {
      node.forEach(processNode);
    } else if (isValidElement(node)) {
      // Keep highlight spans intact as a single token
      tokens.push(node);
    } else if (node !== null && node !== undefined && node !== false) {
      tokens.push(String(node));
    }
  };

  processNode(children);
  return tokens;
}

export default function SplitText({
  children,
  as = "span",
  className = "",
  id,
  delay = 0,
  stagger = 0.06,
}: SplitTextProps) {
  const Tag = as as keyof JSX.IntrinsicElements;
  const tokens = buildTokens(children);

  return (
    <Tag className={className} id={id}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {tokens.map((token, i) => {
          if (typeof token === "string" && /^\s+$/.test(token)) {
            // Preserve whitespace literally — keeps line breaks natural
            return <span key={`s-${i}`}>{token}</span>;
          }

          return (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom pb-[0.06em]"
            >
              <motion.span
                variants={wordVariants}
                className="inline-block will-change-transform"
              >
                {token}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
