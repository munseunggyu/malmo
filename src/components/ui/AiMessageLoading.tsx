import React from "react";

import styles from "./aiMessageLoading.module.css";

export default function AiMessageLoading({
  size = 50,
  className
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      style={{
        width: size
      }}
      className={`${styles.loader} ${className}`}
    ></span>
  );
}
