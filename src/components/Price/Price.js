import React from "react";

export default function Price(props) {
  const { price, discountPrice } = props;

  return (
    <>
      {discountPrice ? (
        <div className="inline-block font-sans subpixel-antialiased">
          <span className="text-[1.15rem] text-[#bfbfbf] line-through mr-4">
            {price}
          </span>
          <span className="text-3xl text-[#d0011b]">{discountPrice}</span>
        </div>
      ) : (
        <div className="inline-block subpixel-antialiased">
          <span className="font-sans font-medium text-3xl">{price}</span>
        </div>
      )}
    </>
  );
}
