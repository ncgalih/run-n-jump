const InfoBar = ({player, game}) => {
    return (
        <div className="infobar">
            {game.highscore>0 && 
                <div className="info">
                    <p>Highest Score: </p>
                    <p>{game.highscore}</p>
                </div>
            }
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