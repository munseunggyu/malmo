import React from "react";
import styles from "./BubbleUi.module.css";

export default function BubbleUi({
  children,
  className,
  color = "divider"
}: {
  children: React.ReactNode;
  className: string;
  color?: string;
}) {
  return (
    <div className={`${styles.speech_bubble} ${styles[color]} ${className} `}>
      {children}
    </div>
  );
}
