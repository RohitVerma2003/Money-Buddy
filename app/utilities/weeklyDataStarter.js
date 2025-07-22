const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const weeklyDataStarter = () => {
    const result = []

    for (let index = 0; index < 7; index++) {
        const newDate = new Date()
        newDate.setDate(newDate.getDate() - index)
        const date = newDate.toISOString().split('T')[0]

        const data = {
            date: date,
            income: 0,
            expense: 0,
            day: weekDays[newDate.getDay()]
        }

        result.push(data)
    }

    return result
}

export default weeklyDataStarter