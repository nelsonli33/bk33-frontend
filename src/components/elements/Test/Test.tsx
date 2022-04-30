import React from "react";
import { useIntl } from "react-intl";

export default function Test() {
  const intl = useIntl();
  return (
    <div>
      {intl.formatMessage({
        id: "App.DatePicker.today",
      })}
    </div>
  );
}
