import React from "react";
import styles from "./BubbleUi.module.css";

export default function BubbleUi({
  children,
  className
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className={`${className} ${styles.speech_bubble}`}>{children}</div>
  );
}
