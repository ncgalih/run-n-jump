const Building = ({x, h, w, color}) => {
    return (
        <div className="building" style={{
            height: h,
            width: w,
            left: x,
            backgroundColor: color,
            borderTopStyle: 'solid',
            borderLeftStyle: 'solid',
            borderColor: 'gray',
            borderWidth: '1px'
        }}>

        </div>
    )
}

export default Building