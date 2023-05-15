// Функция берёт все отпуска человека, и возвращает только отпуска этого месяца.
// Возвращает в формате числа
const prepareVacation = (vacation, month, year) => {
    return vacation.reduce((acc, item) => {
        const arr = {
            vacationStart: Math.ceil(new Date(item.start) / 86400000 + 1), // одна дата отпуска
            vacationEnd: Math.ceil(new Date(item.end) / 86400000 + 1), // вторая дата отпуска
            monthStart: Math.ceil(new Date(year, month - 1, 1) / 86400000 + 1), // Начало выбранного месяца
            monthEnd: Math.ceil(new Date(year, month, 0) / 86400000 + 1), // Конец выбранного месяца (берём нулевой день у следующего месяца)
            type: item.type,
        }
        if (checkIntersection(arr)) acc.push(arr)
        return acc
    }, [])
}

// функция проверяет, есть ли в этом месяце отпуск
const checkIntersection = (item) => {
    const [aa, bb, xx, yy] = [item.vacationStart, item.vacationEnd, item.monthStart, item.monthEnd]
    // Располагаем их в порядке возрастания. Чтобы start был раньше, чем end
    const [a, b] = aa < bb ? [aa, bb] : [bb, aa]
    const [x, y] = xx < yy ? [xx, yy] : [yy, xx]

    if (b <= x || a >= y) return false // отрезки не пересекаются
    return true
}


// функция устанавливает отпуска
const setVacations = (cropVacations, data) => {
    cropVacations.forEach(item => {
        const {vacationStart, vacationEnd, monthStart, type} = item
        const [aa, bb] = [vacationStart, vacationEnd]
        const [start, end] = aa > bb ? [bb, aa] : [aa, bb]
        for (let i = start; i <= end; i++) {
            const index = i - monthStart
            if (index >= 0 && index < data.length) {
                data[index].value = type
                data[index].night = false
            }
        }
    })
    return data
}

export const markVacations = (schedule, monthNumber, year) => {
    // получаем отпуска, которые "задевают" этот месяц
    const cropVacations = prepareVacation(schedule.vacation, monthNumber, year)
    const result = setVacations(cropVacations, schedule.data)
    return result
}
