import React from 'react';
import {createShift} from "./createShift";
import {markVacations} from "./markVacations";

export function createSchedule({config, vacations, month, year}) {
    const monthNumber = month

    // подтягиваем графики для каждой смены
    const shift = createShift(year, monthNumber)

    // берём всех людей из конфига, которых нужно включать в график
    const people = config.filter(item => item.includeInSchedule === true)


    // добавляем им отпуска
    const content = people.reduce((acc, configItem) => {
        // Берём все отпуска первого человека
        const peopleVacation = vacations.filter(vacationItem => vacationItem.userId === configItem.userId)
        const schedule = {
            ...month,
            ...configItem,
            vacation: peopleVacation,
            data: JSON.parse(JSON.stringify(shift[configItem.shift]))
        }
        const workedDays = markVacations(schedule, monthNumber, year)

        const a = {
            ...month,
            ...configItem,
            data: workedDays
        }
        acc.push(a)
        return acc
    }, [])


    return content
}