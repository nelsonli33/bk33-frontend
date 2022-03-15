import React from "react";
import Price from "../../../../components/Price";

export default function BookCard() {
  return (
    <div>
      <div className="rounded-xl bg-white outline-1 outline-transparent outline-solid shadow-card overflow-hidden -mt-40">
        <div className="card-header">
          <img
            alt=""
            width="100%"
            height="100%"
            className="object-cover object-center"
            src="http://images.everymit.com/hermansyah-7uXn7nudorc-unsplash-1080.jpeg"
          />
        </div>
        <div className="card-section flex flex-col my-3 space-y-5 px-6 py-2">
          <Price price="$179" />
          <div className="space-y-3">
            <button
              className="btn bg-brand-green-default w-full shadow-1 transition text-white font-bold border border-solid border-transparent
          hover:bg-brand-green-dark hover:shadow-2 focus:bg-brand-green-dark"
            >
              加入購物車
            </button>
            <button className="btn w-full transition bg-brand-green-light hover:bg-brand-green-light-hover font-medium border text-brand-green-default border-solid border-brand-green-default">
              直接購買
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
