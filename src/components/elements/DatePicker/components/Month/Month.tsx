import React, { useCallback, useMemo } from "react";

import { classNames } from "../../../../../utilities/css";
import {
  isDateBefore,
  isDateAfter,
  isSameDay,
  getWeeksForMonth,
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  getOrderedWeekdays,
  isDateDisabled,
} from "../../../../../utilities/dates";
import type { Range } from "../../../../../utilities/dates";
import { useIntl } from "react-intl";

import { Day } from "../Day";
import { Weekday } from "../Weekday";
import { monthName, weekdayName } from "../../utilities";

export interface MonthProps {
  focusedDate?: Date;
  selected?: Range;
  hoverDate?: Date;
  month: number;
  year: number;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  disableSpecificDates?: Date[];
  allowRange?: boolean;
  weekStartsOn: number;
  accessibilityLabelPrefixes: [string | undefined, string];
  onChange?(date: Range): void;
  onHover?(hoverEnd: Date): void;
  onFocus?(date: Date): void;
}

export function Month({
  focusedDate,
  selected,
  hoverDate,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  allowRange,
  onChange = noop,
  onHover = noop,
  onFocus = noop,
  month,
  year,
  weekStartsOn,
  accessibilityLabelPrefixes,
}: MonthProps) {
  const intl = useIntl();

  const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
  const now = new Date();
  const current = now.getMonth() === month && now.getFullYear() === year;
  const className = classNames(
    "flex-1 mt-0.5 pb-4 text-center",
    current && "font-bold"
  );
  const weeks = useMemo(
    () => getWeeksForMonth(month, year, weekStartsOn),
    [month, weekStartsOn, year]
  );
  const weekdays = getOrderedWeekdays(weekStartsOn).map((weekday) => (
    <Weekday
      key={weekday}
      title={intl.formatMessage({
        id: `App.DatePicker.daysAbbreviated.${weekdayName(weekday)}`,
      })}
      label={weekdayLabel(weekday)}
      current={current && new Date().getDay() === weekday}
    />
  ));

  const handleDateClick = useCallback(
    (selectedDate: Date) => {
      onChange(getNewRange(allowRange ? selected : undefined, selectedDate));
    },
    [allowRange, onChange, selected]
  );

  const lastDayOfMonth = useMemo(
    () => new Date(year, (month as number) + 1, 0),
    [month, year]
  );

  function renderWeek(day: Date, dayIndex: number) {
    if (day == null) {
      return (
        <Day key={dayIndex} onHover={onHover} lastDayOfMonth={lastDayOfMonth} />
      );
    }
    const disabled =
      (disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
      (disableDatesAfter && isDateAfter(day, disableDatesAfter)) ||
      (disableSpecificDates && isDateDisabled(day, disableSpecificDates));

    const isFirstSelectedDay =
      allowRange && selected && isDateStart(day, selected);
    const isLastSelectedDay =
      allowRange &&
      selected &&
      ((!isSameDay(selected.start, selected.end) && isDateEnd(day, selected)) ||
        (hoverDate &&
          isSameDay(selected.start, selected.end) &&
          isDateAfter(hoverDate, selected.start) &&
          isSameDay(day, hoverDate) &&
          !isFirstSelectedDay));
    const rangeIsDifferent = !(
      selected && isSameDay(selected.start, selected.end)
    );
    const isHoveringRight = hoverDate && isDateBefore(day, hoverDate);
    const [firstAccessibilityLabelPrefix, lastAccessibilityLabelPrefix] =
      accessibilityLabelPrefixes;
    let accessibilityLabelPrefix;

    if (
      (allowRange && isFirstSelectedDay) ||
      (!allowRange && firstAccessibilityLabelPrefix)
    ) {
      accessibilityLabelPrefix = firstAccessibilityLabelPrefix;
    } else if (allowRange && isLastSelectedDay) {
      accessibilityLabelPrefix = lastAccessibilityLabelPrefix;
    }

    return (
      <Day
        selectedAccessibilityLabelPrefix={accessibilityLabelPrefix}
        weekday={weekdayLabel(dayIndex)}
        focused={focusedDate != null && isSameDay(day, focusedDate)}
        day={day}
        key={dayIndex}
        onFocus={onFocus}
        onClick={handleDateClick}
        onHover={onHover}
        selected={selected != null && dateIsSelected(day, selected)}
        inRange={selected != null && dateIsInRange(day, selected)}
        disabled={disabled}
        inHoveringRange={
          selected != null &&
          hoverDate != null &&
          isInHoveringRange(day, selected, hoverDate)
        }
        isLastSelectedDay={isLastSelectedDay}
        isFirstSelectedDay={isFirstSelectedDay}
        isHoveringRight={isHoveringRight}
        rangeIsDifferent={rangeIsDifferent}
      />
    );
  }

  const weeksMarkup = weeks.map((week, index) => (
    <tr className="mb-5" key={index}>
      {week.map(renderWeek)}
    </tr>
  ));

  return (
    <div className="flex-[1_1_300px] mt-4 px-4 pb-4 max-w-[calc(100%_-_1rem)] min-w-[300px]">
      <table
        role="grid"
        className="w-full table-fixed border-collapse border-none"
      >
        <caption className={className}>
          {intl.formatMessage({
            id: `App.DatePicker.months.${monthName(month)}`,
          })}{" "}
          {year}
        </caption>
        <thead>
          <tr>{weekdays}</tr>
        </thead>
        <tbody>{weeksMarkup}</tbody>
      </table>
    </div>
  );

  function weekdayLabel(weekday: number) {
    return intl.formatMessage({
      id: `App.DatePicker.days.${weekdayName(weekday)}`,
    });
  }
}

function noop() {}

function hoveringDateIsInRange(
  day: Date | null,
  range: Range,
  hoverEndDate: Date
) {
  if (day == null) {
    return false;
  }
  const { start, end } = range;
  return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
}

function isDateEnd(day: Date | null, range: Range) {
  if (day == null) return false;
  const { end } = range;

  return Boolean(end && isSameDay(end, day));
}

function isDateStart(day: Date | null, range: Range) {
  if (day == null) return false;
  const { start } = range;

  return Boolean(start && isSameDay(start, day));
}
