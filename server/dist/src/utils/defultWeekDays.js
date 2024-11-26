"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WEEKDAYS = [
    {
        day: "Mo",
        status: "open",
        available_time_from: "09:30",
        available_time_to: "16:00",
        appointment_duration: 60,
    },
    {
        day: "Di",
        status: "close",
        available_time_from: "09:00",
        available_time_to: "12:00",
        appointment_duration: 60,
    },
    {
        day: "Mi",
        status: "open",
        available_time_from: "09:00",
        available_time_to: "16:00",
        appointment_duration: 60,
    },
    {
        day: "Do",
        status: "open",
        available_time_from: "09:00",
        available_time_to: "16:00",
        appointment_duration: 60,
    },
    {
        day: "Fr",
        status: "open",
        available_time_from: "09:00",
        available_time_to: "13:00",
        appointment_duration: 60,
    },
    {
        day: "Sa",
        status: "close",
        available_time_from: "09:00",
        available_time_to: "09:00",
        appointment_duration: 60,
    },
    {
        day: "So",
        status: "close",
        available_time_from: "09:00",
        available_time_to: "09:00",
        appointment_duration: 0,
    },
];
exports.default = WEEKDAYS;
//# sourceMappingURL=defultWeekDays.js.map