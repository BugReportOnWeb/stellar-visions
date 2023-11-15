import { APIData } from "../types/API";
import months from "./months";

const changeDate = (data: APIData) => {
    const [year, month, date] = data.date.split('-');
    const newMonth = months[parseInt(month) - 1];

    const newDate = `${date} ${newMonth} ${year}`;
    if (data != null) data.date = newDate;
}

// DEP: Unused
const getCurrentFormatedDate = () => {
    const currFullDate = new Date();

    const { currDate, currMonth, currYear } = {
        currDate: currFullDate.getDate(),
        currMonth: months[currFullDate.getMonth()],
        currYear: currFullDate.getFullYear()
    }

    const currFormatedDate = `${currDate} ${currMonth} ${currYear}`;

    return currFormatedDate;
}

// DEP: Unused
const getFormatedDate = (date: string) => {
    const [dateDate, month, year] = date.split(" ")
    const currFormatedDate = `${dateDate} ${months[parseInt(month) - 1]} ${year}`;
    return currFormatedDate;
}

export { 
    getCurrentFormatedDate,
    getFormatedDate,
    changeDate
};
