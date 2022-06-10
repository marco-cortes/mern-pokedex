export const PokemonUser = ({name, lastName, photo}) => {
    return(
        <div  className="PokemonUser">
            <img className="user-photo"
                src={photo}
                alt="User photo" />
            <div className="user-info">
                <p>This pokemon was uploaded by:</p>
                <p className="user-name">
                    <strong>{name}</strong> {lastName}
                </p>
            </div>
        </div>
    )
}