const generateColor = () => {
    const color = Math.floor(Math.random()*16777215).toString(16)
    console.log(color)
    return '#' + color
}
export default generateColor