import moment from "moment";
import { useState, useEffect, useCallback } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Calendar, Clock } from "lucide-react";
import { ucFirst } from "@/utils/helper-support";

type onChangeInputFunc = (e: string | string[]) => void;

type InputType = {
    placeholder?: string;
    label?: string;
    id?: string;
    value?: string | string[];
    error?: string | null;
    disabled?: boolean;
    onChangeInput?: onChangeInputFunc;
    inputClass?: string;
    withTime?: boolean;
    onlyTime?: boolean;
    multiple?: boolean;
};

const DatePickerField = ({
    placeholder,
    label,
    id,
    value,
    error,
    onChangeInput,
    disabled = false,
    inputClass,
    withTime = false,
    onlyTime = false,
    multiple = false,
}: InputType) => {
    const Id = id ?? label;

    const parseInitialDates = useCallback((val: string | string[] | undefined) => {
        if (!val) return [];
        const values = Array.isArray(val) ? val : [val];
        return values
            .map((v) => {
                if (onlyTime) {
                    const m = moment(v, "HH:mm");
                    if (m.isValid()) {
                        m.set({
                            year: moment().year(),
                            month: moment().month(),
                            date: moment().date(),
                        });
                        return m.toDate();
                    }
                } else {
                    const format = withTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD";
                    const m = moment(v, format);
                    return m.isValid() ? m.toDate() : null;
                }
                return null;
            })
            .filter((d): d is Date => d !== null);
    }, [onlyTime, withTime]);

    const [dates, setDates] = useState<Date[]>([]);

    useEffect(() => {
        setDates(parseInitialDates(value));
    }, [parseInitialDates]);

    const formatDate = (date: Date) => {
        if (onlyTime) {
            return moment(date).format("HH:mm");
        } else if (withTime) {
            return moment(date).format("YYYY-MM-DD HH:mm");
        } else {
            return moment(date).format("YYYY-MM-DD");
        }
    };

    const onChangeDate = (selectedDates: Date[]) => {
        setDates(selectedDates);
        const formatted = selectedDates.map(formatDate);
        if (onChangeInput) {
            onChangeInput(multiple ? formatted : formatted[0] ?? "");
        }
    };

    const displayValue = () => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return placeholder ?? (onlyTime ? "hh:mm" : "dd/mm/yyyy");
        }
        const values = Array.isArray(value) ? value : [value];
        return values
            .map((v) => {
                if (onlyTime) {
                    return moment(v, "HH:mm").format("HH:mm");
                }
                if (withTime) {
                    return moment(v).format("DD/MM/YYYY HH:mm");
                }
                return moment(v).format("DD/MM/YYYY");
            })
            .join(", ");
    };

    return (
        <label htmlFor={Id} className="label">
            {label && <span>{label}</span>}
            <div
                className={`relative flex items-center justify-between w-full bg-white mt-1 input ${inputClass} ${error ? "border-red-500" : ""
                    } ${disabled ? "text-light-black" : ""}`}
            >
                <span>{displayValue()}</span>
                <div className="ml-5">
                    {onlyTime ? <Clock size={16} /> : <Calendar size={16} />}
                </div>
                <div className="absolute top-0 left-0 right-0 w-full h-full">
                    <Flatpickr
                        value={dates}
                        onChange={(dates) => onChangeDate(dates)}
                        options={{
                            mode: multiple ? "multiple" : "single",
                            dateFormat: onlyTime
                                ? "H:i"
                                : withTime
                                    ? "Y-m-d H:i"
                                    : "Y-m-d",
                            enableTime: withTime || onlyTime,
                            noCalendar: onlyTime,
                            allowInput: true,
                            time_24hr: false,
                        }}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={disabled}
                    />
                </div>
            </div>
            {error && (
                <p className="my-1 text-[13px] text-red-500 font-[400]">
                    {ucFirst(error)}
                </p>
            )}
        </label>
    );
};

export default DatePickerField;
