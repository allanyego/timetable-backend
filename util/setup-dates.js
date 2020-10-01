const SLOT_TIME_MAP = require("./constants");

/**
 * Calculate the start and end date and time of an event based off
 * of day and slot indices.
 * @param {Integer} day zero-indexed day of the week
 * @param {Integer} slot zero-indexed lesson slot
 * @returns {Object} the event start and end periods as fields
 */
function setupDates(day, slot) {
  const [hour, minute] = SLOT_TIME_MAP[slot]
    .split(":")
    .map((s) => Number.parseInt(s));
  const eventDay = new Date();
  const dayToday = eventDay.getDay();

  let daysToAdd;
  if (day < dayToday) {
    daysToAdd = 6 - dayToday + (day + 1);
    eventDay.setDate(eventDay.getDate() + daysToAdd);
  } else if (day > dayToday) {
    daysToAdd = day - dayToday;
    eventDay.setDate(eventDay.getDate() + daysToAdd);
  }

  eventDay.setHours(hour);
  eventDay.setMinutes(minute);

  return {
    eventDayStart: eventDay,
    eventDayEnd: eventDay.setMinutes(eventDay.getMinutes() + 40),
  };
}

module.exports = setupDates;
