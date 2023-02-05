import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { savePokemon } from "../../redux/actions/pokemon"
import { ImagesPokemon } from "../ui/ImagesPokemon"
import { InputAbilities } from "../ui/InputAbilities"
import { InputPokemon } from "../ui/InputPokemon"
import { InputRange } from "../ui/InputRange"
import { InputSelect } from "../ui/InputSelect"

export const PokemonForm = ({ title, subtitle }) => {

    const pokemon = useSelector(state => state.pokemon.pokemon);
    const dispatch = useDispatch();

    const save = (e) => {
        e.preventDefault();
        if (checkUndefinedOrNull(pokemon.name) || checkStringEmpty(pokemon.name))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter a name for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.types) || checkArrayEmpty(pokemon.types))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must select a type for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.height) || checkStringEmpty(pokemon.height))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter a height for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.weight) || checkStringEmpty(pokemon.weight))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter a weight for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.abilities) || checkArrayEmpty(pokemon.abilities))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must select abilities for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.images) || checkArrayEmpty(pokemon.images))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must select images for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.stats.hp) || checkStringEmpty(pokemon.stats.hp))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter a HP for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.stats.attack) || checkStringEmpty(pokemon.stats.attack))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter an attack for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.stats.defense) || checkStringEmpty(pokemon.stats.defense))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter a defense for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.stats.specialAttack) || checkStringEmpty(pokemon.stats.specialAttack))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter a special attack for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.stats.specialDefense) || checkStringEmpty(pokemon.stats.specialDefense))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter a special defense for the pokemon"
            });
        if (checkUndefinedOrNull(pokemon.stats.speed) || checkStringEmpty(pokemon.stats.speed))
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter a speed for the pokemon"
            });

        dispatch(savePokemon(pokemon));
    }

    const checkUndefinedOrNull = (value) => {
        if (value === undefined || value === null)
            return true;
        return false;
    }
    const checkStringEmpty = (value) => {
        if (value === "")
            return true;
        return false;
    }

    const checkArrayEmpty = (value) => {
        if (value.length === 0)
            return true;
        return false;
    }
    return (
        <div className="new-pokemon-container animate__animated animate__fadeIn">
            <h3 className="auth-h3">{title || "New Pokemon"}</h3>
            <h1 className="auth-h1">{subtitle || "Start add a new Pokemon"}<span className="auth-blue">.</span></h1>
            <form className="profile-container" onSubmit={save}>
                <InputPokemon icon={"fa-dragon"} name={"name"} title={"Name"} type={"text"} placeholder={"Name"} />
                <div className="flex">
                    <InputPokemon icon={"fa-ruler-combined"} name={"height"} title={"Height"} type={"text"} placeholder={"Height"} />
                    <InputPokemon icon={"fa-weight-hanging"} name={"weight"} title={"Weight"} type={"text"} placeholder={"Weight"} />
                </div>
                <InputSelect text={"Select types"} name={"types"} />

                <InputAbilities />

                <div style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginTop: "1.5rem"
                }}>
                    <InputRange icon={"fa-heart"} name={"hp"} title={"Health"} placeholder={"Input hp"} />
                    <InputRange icon={"fa-fist-raised"} name={"attack"} title={"Attack"} placeholder={"Input attack"} />
                    <InputRange icon={"fa-shield-alt"} name={"defense"} title={"Defense"} placeholder={"Input defense"} />
                    <InputRange icon={"fa-running"} name={"speed"} title={"Speed"} placeholder={"Input speed"} />
                    <InputRange icon={"fa-magic"} name={"specialAttack"} title={"Special Attack"} placeholder={"Input special attack"} />
                    <InputRange icon={"fa-magic"} name={"specialDefense"} title={"Special Defense"} placeholder={"Input special defense"} />
                </div>

                <ImagesPokemon />
                <button type="submit" className="profile-btn" style={{
                    width: "100%"
                }}>Save</button>
            </form>
        </div>
    )
}
