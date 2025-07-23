const yearlyDataStarter = (startYear , endYear)=>{
    const result = []

    for(let year = startYear ; year <= endYear ; year++){
        result.push({
            year : year.toString(),
            fullDate : `01-01-${year}`,
            income : 0,
            expense : 0
        })
    }

    return result
}

export default yearlyDataStarter