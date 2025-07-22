const monthOfYear = ['Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec']

const monthlyDataStarter = () => {
    const result = []
    for (let index = 0; index < 12; index++) {
        const newDate = new Date()
        newDate.setMonth(newDate.getMonth() - index)

        const monthName = monthOfYear[newDate.getMonth()]
        const year = newDate.getFullYear().toString().slice(-2)
        const formattedMonthYear = `${monthName} ${year}`
        const formattedDate = newDate.toISOString().split("T")[0]

        const data = {
            fullDate: formattedDate,
            month : formattedMonthYear,
            income: 0,
            expense: 0,
        }

        result.push(data)
    }

    return result
}

export default monthlyDataStarter