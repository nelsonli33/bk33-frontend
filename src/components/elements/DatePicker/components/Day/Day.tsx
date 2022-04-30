import React, { useEffect, useRef, memo } from "react";
import { useIntl } from "react-intl";
import { classNames } from "../../../../../utilities/css";
import { isSameDay } from "../../../../../utilities/dates";
import { monthName } from "../../utilities";

export interface DayProps {
  focused?: boolean;
  day?: Date;
  selected?: boolean;
  inRange?: boolean;
  inHoveringRange?: boolean;
  disabled?: boolean;
  lastDayOfMonth?: any;
  isLastSelectedDay?: boolean;
  isFirstSelectedDay?: boolean;
  isHoveringRight?: boolean;
  rangeIsDifferent?: boolean;
  weekday?: string;
  selectedAccessibilityLabelPrefix?: string;
  onClick?(day: Date): void;
  onHover?(day?: Date): void;
  onFocus?(day: Date): void;
}

export const Day = memo(function Day({
  day,
  focused,
  onClick,
  onHover = noop,
  onFocus = noop,
  selected,
  inRange,
  inHoveringRange,
  disabled,
  lastDayOfMonth,
  isLastSelectedDay,
  isFirstSelectedDay,
  isHoveringRight,
  rangeIsDifferent,
  weekday,
  selectedAccessibilityLabelPrefix,
}: DayProps) {
  const intl = useIntl();
  const dayNode = useRef<HTMLButtonElement>(null);
  const hoverValue = lastDayOfMonth || day;

  useEffect(() => {
    if (focused && dayNode.current) {
      dayNode.current.focus();
    }
  }, [focused]);

  if (!day) {
    return (
      <td
        className="m-0 p-0 w-[calc(100%_/_7)]"
        onMouseOver={() => onHover(hoverValue)}
      />
    );
  }
  const handleClick = onClick && !disabled ? onClick.bind(null, day) : noop;
  const today = isSameDay(new Date(), day);

  const dayCellClassName = classNames("m-0 p-0 pb-1 bg-transparent h-12 w-12");

  console.log(isLastSelectedDay);

  const dayClassName = classNames(
    `flex h-full w-full items-center justify-center mx-auto m-0 border-0 text-center 
     cursor-pointer hover:bg-brand-black hover:text-white hover:rounded-full`,
    selected && "rounded-full bg-brand-black text-white",
    disabled &&
      "bg-transparent text-gray-300 hover:bg-transparent hover:text-gray-300 cursor-default",
    today && "font-bold",
    (inRange || inHoveringRange) &&
      !disabled &&
      !isFirstSelectedDay &&
      !isLastSelectedDay &&
      "bg-gray-150 rounded-none"
  );

  const date = day.getDate();
  const tabIndex =
    (focused || selected || today || date === 1) && !disabled ? 0 : -1;

  const ariaLabel = [
    selected && selectedAccessibilityLabelPrefix
      ? `${selectedAccessibilityLabelPrefix} `
      : "",
    `${today ? intl.formatMessage({ id: "App.DatePicker.today" }) : ""}`,
    `${weekday ? weekday : ""} `,
    `${intl.formatMessage({
      id: `App.DatePicker.months.${monthName(day.getMonth())}`,
    })} `,
    `${date} `,
    `${day.getFullYear()}`,
  ].join("");

  return (
    <td className={dayCellClassName}>
      <button
        onFocus={() => onFocus(day)}
        type="button"
        ref={dayNode}
        tabIndex={tabIndex}
        className={dayClassName}
        onMouseOver={() => onHover(hoverValue)}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        aria-pressed={selected}
      >
        {date}
      </button>
    </td>
  );
});

function noop() {}
