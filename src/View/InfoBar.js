const InfoBar = ({player}) => {
    return (
        <div className="infobar">
            <div className="info">
                <p>Score: </p>
                <p>{Math.round(player.x/25)}</p>
            </div>
            <div className="info">
                <p>Life: </p>
                <p>{player.life}</p>
            </div>     
        </div>
    )
}
export default InfoBar