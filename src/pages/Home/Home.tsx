import React from "react";
import Frame from "../../components/Frame";
import { Modal } from "../../components/Modal";
import Register from "../../components/Register";

import { useToggle } from "../../hooks/useToggle";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../../store/counter/slice";
import { useAppDispatch } from "../../store/hooks";
import { showModal } from "../../store/modal/slice";

export default function Home() {
  const dispatch = useAppDispatch();

  return (
    <Frame title="首頁">
      <div className="my-10">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
          <button
            className="btn-secondary"
            onClick={() => dispatch(increment())}
          >
            {" "}
            +{" "}
          </button>
          <button
            className="btn-secondary"
            onClick={() => dispatch(decrement())}
          >
            {" "}
            +{" "}
          </button>
          <button
            className="btn-secondary"
            onClick={() => dispatch(incrementByAmount(2))}
          >
            {" "}
            + 2{" "}
          </button>
        </div>
      </div>
    </Frame>
  );
}
