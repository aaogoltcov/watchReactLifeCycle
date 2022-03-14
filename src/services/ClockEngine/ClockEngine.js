export default class ClockEngine {
    getHour(date) {
        return ((date.getHours() + 11) % 12 + 1) * 30;
    }

    getMinute(date) {
        return date.getMinutes() * 6;
    }

    getSecond(date) {
        return date.getSeconds() * 6;
    }
}