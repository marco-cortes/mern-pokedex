import { useDispatch, useSelector } from "react-redux"
import { InputPokemon } from "../components/ui/InputPokemon";
import { Header } from "../components/ui/Header"
import { InputRange } from "../components/ui/InputRange";
import { InputSelect } from "../components/ui/InputSelect";
import { InputAbilities } from "../components/ui/InputAbilities";
import { ImagesPokemon } from "../components/ui/ImagesPokemon";
import { savePokemon } from "../redux/actions/pokemon";

export const icons = require.context("../assets/images/types", true);

export const NewPokemon = () => {

    const types = [
        {
            id: 1,
            name: "Normal",
            icon: icons("./Icon_normal.webp")
        },
        {
            id: 2,
            name: "Fighting",
            icon: icons("./Icon_fighting.webp")
        },
        {
            id: 3,
            name: "Flying",
            icon: icons("./Icon_flying.webp")
        },
        {
            id: 4,
            name: "Poison",
            icon: icons("./Icon_poison.webp")
        },
        {
            id: 5,
            name: "Ground",
            icon: icons("./Icon_ground.webp")
        },
        {
            id: 6,
            name: "Rock",
            icon: icons("./Icon_rock.webp")
        },
        {
            id: 7,
            name: "Bug",
            icon: icons("./Icon_bug.webp")
        },
        {
            id: 8,
            name: "Ghost",
            icon: icons("./Icon_ghost.webp")
        },
        {
            id: 9,
            name: "Steel",
            icon: icons("./Icon_steel.webp")
        },
        {
            id: 10,
            name: "Fire",
            icon: icons("./Icon_fire.webp")
        },
        {
            id: 11,
            name: "Water",
            icon: icons("./Icon_water.webp")
        },
        {
            id: 12,
            name: "Grass",
            icon: icons("./Icon_grass.webp")
        },
        {
            id: 13,
            name: "Electric",
            icon: icons("./Icon_electric.webp")
        },
        {
            id: 14,
            name: "Psychic",
            icon: icons("./Icon_psychic.webp")
        },
        {
            id: 15,
            name: "Ice",
            icon: icons("./Icon_ice.webp")
        },
        {
            id: 16,
            name: "Dragon",
            icon: icons("./Icon_dragon.webp")
        },
        {
            id: 17,
            name: "Dark",
            icon: icons("./Icon_dark.webp")
        },
        {
            id: 18,
            name: "Fairy",
            icon: icons("./Icon_fairy.webp")
        }
    ]

    const pokemon = useSelector(state => state.pokemon.pokemon);
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

    const save = (e) => {
        e.preventDefault();
        console.log(pokemon);
        dispatch(savePokemon(pokemon));
        //reset();
    }

    if (!user) return <h1>Loading...</h1>

    return (
        <div className="container">
            <Header />
            <div className="new-pokemon-container">
                <h3 className="auth-h3">New Pokemon</h3>
                <h1 className="auth-h1">Start add a new Pokemon<span className="auth-blue">.</span></h1>
                <form className="profile-container" onSubmit={save}>
                    {/*
                    <InputPokemon icon={"fa-images"} name={"images"} title={"Images"} type={"text"} value={form.images} placeholder={"Images"} />
                    <button className="btn btn-primary" type="submit">Save</button>
                     */
                    }
                    <InputPokemon icon={"fa-dragon"} name={"name"} title={"Name"} type={"text"} placeholder={"Name"} />
                    <div className="flex">
                        <InputPokemon icon={"fa-ruler-combined"} name={"height"} title={"Height"} type={"text"} placeholder={"Height"} />
                        <InputPokemon icon={"fa-weight-hanging"} name={"weight"} title={"Weight"} type={"text"} placeholder={"Weight"} />
                    </div>
                    <InputSelect text={"Select types"} name={"types"} items={types} />
                    

                    <div style={{
                        borderRadius: "20px",
                        overflow: "hidden",
                    }}>
                        <InputRange icon={"fa-heart"} name={"hp"} title={"Health"} placeholder={"Input hp"} />
                        <InputRange icon={"fa-fist-raised"} name={"attack"} title={"Attack"} placeholder={"Input attack"} />
                        <InputRange icon={"fa-shield-alt"} name={"defense"} title={"Defense"} placeholder={"Input defense"} />
                        <InputRange icon={"fa-running"} name={"speed"} title={"Speed"} placeholder={"Input speed"} />
                        <InputRange icon={"fa-magic"} name={"specialAttack"} title={"Special Attack"} placeholder={"Input special attack"} />
                        <InputRange icon={"fa-magic"} name={"specialDefense"} title={"Special Defense"} placeholder={"Input special defense"} />
                    </div>

                    <InputAbilities />   

                    <ImagesPokemon />                 

                    <button type="submit" className="profile-btn">Save</button>
                </form>
            </div>
        </div>
    )
}
