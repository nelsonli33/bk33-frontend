import React, { forwardRef } from "react";

const PageOverlayItem = forwardRef(({ ...props }, ref) => {
  return (
    <div {...props} ref={ref}>
      123
    </div>
  );
});

export default PageOverlayItem;
