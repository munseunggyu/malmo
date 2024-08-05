"use client";
import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonUi({
  className = "w-full"
}: {
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
        <Skeleton />
      </SkeletonTheme>
    </div>
  );
}
