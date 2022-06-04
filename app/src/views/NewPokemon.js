import { useSelector } from "react-redux"
import { AuthInput } from "../components/auth/AuthInput";
import { Header } from "../components/ui/Header"
import { InputRange } from "../components/ui/InputRange";
import { useForm } from "../helpers/useForm"

export const NewPokemon = () => {

    const pokemon = useSelector(state => state.pokemon.pokemon);
    const user = useSelector(state => state.auth.user);

    const [form, setForm] = useForm({
        name: "" || pokemon.name,
        types: [] || pokemon.types,
        height: "" || pokemon.height,
        weight: "" || pokemon.weight,
        stats: {
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            specialAttack: "",
            specialDefense: "",
            total: ""
        } || pokemon.stats,
        abilities: [] || pokemon.abilities,
        images: [] || pokemon.images,
        user: user._id || pokemon.user,
    })

    const save = (e) => {
        e.preventDefault();
        console.log(form);
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
                    <AuthInput icon={"fa-images"} name={"images"} title={"Images"} type={"text"} value={form.images} setForm={setForm} placeholder={"Images"} />
                    <button className="btn btn-primary" type="submit">Save</button>
                     */
                    }
                    <AuthInput icon={"fa-dragon"} name={"name"} title={"Name"} type={"text"} value={form.name} setForm={setForm} placeholder={"Name"} />
                    <AuthInput icon={"fa-list"} name={"types"} title={"Types"} type={"text"} value={form.types} setForm={setForm} placeholder={"Types"} />
                    <div className="flex">
                        <AuthInput icon={"fa-ruler-combined"} name={"height"} title={"Height"} type={"text"} value={form.height} setForm={setForm} placeholder={"Height"} />
                        <AuthInput icon={"fa-weight-hanging"} name={"weight"} title={"Weight"} type={"text"} value={form.weight} setForm={setForm} placeholder={"Weight"} />
                    </div>
                    <InputRange icon={"fa-heart"} name={"hp"} title={"Health"} placeholder={"Input hp"} />
                    <InputRange icon={"fa-fist-raised"} name={"attack"} title={"Attack"} placeholder={"Input attack"} />
                    <InputRange icon={"fa-shield-alt"} name={"defense"} title={"Defense"} placeholder={"Input defense"} />
                    <InputRange icon={"fa-running"} name={"speed"} title={"Speed"} placeholder={"Input speed"} />
                    <InputRange icon={"fa-magic"} name={"specialAttack"} title={"Special Attack"} placeholder={"Input special attack"} />
                    <InputRange icon={"fa-magic"} name={"specialDefense"} title={"Special Defense"} placeholder={"Input special defense"} />
                    <InputRange icon={"fa-heart"} name={"total"} title={"Total"} placeholder={"Input total"} />

                    <button type="submit" className="profile-btn">Save</button>
                </form>
            </div>
        </div>
    )
}
