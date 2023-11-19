export const minutesToHoursAndMinutes = (minutes)=> {
    if (typeof minutes !== 'number') {
        return "0 мин";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
        return remainingMinutes === 0 ? "0 мин" : remainingMinutes + " мин";
    } else {
        return remainingMinutes === 0 ? hours + " ч" : hours + " ч " + remainingMinutes + " мин";
    }
}
