const url = "https://still-anchorage-81422.herokuapp.com/https://www.mrsoft.by/data.json"

const getData = async () => {
    try {
        const response = await fetch(url)
        const { data } = await response.json()
        return data
    } catch (err) {
        alert(new Error('check url'))
    }
}
export { getData }