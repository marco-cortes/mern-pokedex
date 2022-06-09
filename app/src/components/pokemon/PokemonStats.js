
export const PokemonStats = ({ stats }) => {
    return (
        <div className="pokemon-stats">
            <p className="statsTitle">Stats</p>
            <div className="stat">
                <span>
                    Attack:
                </span>
                <span>
                    {stats.attack}
                </span>
            </div>
            <div className="stat">
                <span>
                    Defense:
                </span>
                <span>
                    {stats.defense}
                </span>
            </div>
            <div className="stat">
                <span>
                    HP:
                </span>
                <span>
                    {stats.hp}
                </span>
            </div>
            <div className="stat">
                <span>
                    Special Attack:
                </span>
                <span>
                    {stats.specialAttack}
                </span>
            </div>
            <div className="stat">
                <span>
                    Special Defense:
                </span>
                <span>
                    {stats.specialDefense}
                </span>
            </div>
            <div className="stat">
                <span>
                    Speed:
                </span>
                <span>
                    {stats.speed}
                </span>
            </div>
        </div>
    )
}