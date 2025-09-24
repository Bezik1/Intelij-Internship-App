export const groupByKey = (arr: any[], key: string) => {
    return arr.reduce((acc: any[], item) => {
        const found = acc.find((el) => el.name === item[key])
        if (found) {
            found.value += 1
        } else {
            acc.push({ name: item[key], value: 1 })
        }
        return acc
    }, [])
}