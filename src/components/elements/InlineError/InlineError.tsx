import React from "react";
import { ServerErrorResponse } from "../../types";

export interface InlineErrorProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  error: ServerErrorResponse;
}

const InlineError = ({ error: data }: InlineErrorProps) => {
  if (!data || !data.error) {
    return null;
  }

  return <div className="flex text-danger">{data.error.message}</div>;
};

export default InlineError;
