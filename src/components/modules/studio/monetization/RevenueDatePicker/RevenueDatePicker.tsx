import React, { useState, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import DatePicker from "../../../../elements/DatePicker";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/shift-away-subtle.css";
import { CalendarIcon } from "@heroicons/react/outline";

export default function RevenueDatePicker() {
  const now = dayjs();

  const [{ month, year }, setDate] = useState({
    month: now.month(),
    year: now.year(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: dayjs().startOf("month").toDate(),
    end: now.toDate(),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  const formattedSelectedDates = useMemo(() => {
    const formattedStartDate = dayjs(selectedDates.start).format("YYYY/MM/DD");
    const formattedEndDate = dayjs(selectedDates.end).format("YYYY/MM/DD");
    return formattedStartDate.concat(" - ").concat(formattedEndDate);
  }, [selectedDates]);

  return (
    <div>
      <Tippy
        role="popover"
        content={
          <DatePicker
            month={month}
            year={year}
            disableDatesAfter={now.toDate()}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            multiMonth
            allowRange
          />
        }
        animation={"shift-away-subtle"}
        className="md:max-w-2xl"
        placement={"bottom-end"}
        offset={[0, 20]}
        arrow={false}
        trigger={"click"}
        interactive={true}
        maxWidth={""}
        duration={150}
      >
        <button className="btn-secondary border-gray-400">
          <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
          {formattedSelectedDates}
        </button>
      </Tippy>
    </div>
  );
}
