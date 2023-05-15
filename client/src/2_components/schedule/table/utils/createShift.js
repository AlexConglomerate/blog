const getDays = (shift, dayCount) => {
    /*
     Расшифровка значения массива arr
     0 - нет смены
     1 - дневная смена, 12 часов
     2 - ночная смена, 12 часов
     */
    const arr = [
        [0, 0, 1, 1, 0, 2, 2, 0,], // 1 вахта
        [2, 0, 0, 0, 1, 1, 0, 2,], // 2 вахта
        [0, 2, 2, 0, 0, 0, 1, 1,], // 3 вахта
        [1, 1, 0, 2, 2, 0, 0, 0,], // 4 вахта
    ]

    let a = arr[shift - 1][dayCount]
    return {
        value: a != 0 ? 12 : 0,
        night: a === 2 ? true : false,
    }
}


export const createShift = (year, month) => {
    const lastDate = new Date(year, month, 0).getDate()
    const firstDate = new Date(year, month, 1)
    let numberDay = Math.ceil((firstDate.getTime() / 86400000 + 1))
    let cycleDay = numberDay % 8
    const arr = {day: [], 1: [], 2: [], 3: [], 4: [],}

    for (let i = 1; i <= lastDate; i++) {
        const rem = (numberDay += 1) % 7
        arr.day.push({day: i, holiday: rem == 6 || rem == 0 ? true : false})

        arr[1].push(getDays(1, cycleDay))
        arr[2].push(getDays(2, cycleDay))
        arr[3].push(getDays(3, cycleDay))
        arr[4].push(getDays(4, cycleDay))
        cycleDay++
        if (cycleDay == 8) cycleDay = 0
    }
    return arr
}
