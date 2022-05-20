

const subtractYears = (numOfYears, date = new Date()) => {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
}

const getAgeByYear = (dateOfBirth) => {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(dateOfBirth).getFullYear();
    return (currentYear - birthYear)
}

module.exports = {
    subtractYears,
    getAgeByYear
}