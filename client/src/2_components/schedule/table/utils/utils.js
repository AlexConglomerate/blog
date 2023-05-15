// эта функция, принимает массив всех графиков с бекенда,
// и конвертирует в массив, из которого создаётся выпадающий список с графиками

const monthNames = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
    7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December',
};

export const createScheduleName = ({month, year}) => {
    return month !== '' ? `${monthNames[month]} ${year}` : 'Select a schedule'
}

export const prepareDropdownList = (source) => {
    if (!source) return null


    // Создаем новый объект, где ключи - это даты, а значения - это массивы объектов с версиями
    const dataByDate = source.reduce((acc, cur) => {
        const date = `${monthNames[cur.month]} ${cur.year}`;
        const version = {name: cur.versionName, id: cur._id};
        if (!acc[date]) {
            acc[date] = {name: date, version: []};
        }
        acc[date].version.push(version);
        return acc;
    }, {});

    // Преобразуем объект в массив значений и сортируем его по датам
    const result = Object.values(dataByDate).sort((a, b) => {
        const dateA = new Date(a.name);
        const dateB = new Date(b.name);
        return dateA - dateB;
    });

    return result;
}

// convertMonthToDayWeek принимает объект const month = {year: 2024, month: 2}
// И выводит массив из объектов  [{ value: 1, dayOfTheWeek: 'Mo' }, { value: 2, dayOfTheWeek: 'Tu' },]
// Эта функция используется для создания шапки главной таблицы
export const convertMonthToDayWeek = (month) => {
    const {year, month: monthNumber} = month;
    const dayWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const daysInMonth = new Date(year, monthNumber, 0).getDate();
    const date = new Date(year, monthNumber - 1, 1);
    const firstDayOfWeekIndex = date.getDay();

    return Array.from({length: daysInMonth}, (_, index) => {
        const dayOfWeek = dayWeek[(firstDayOfWeekIndex + index) % 7];
        return {value: index + 1, dayOfTheWeek: dayOfWeek};
    });
}
