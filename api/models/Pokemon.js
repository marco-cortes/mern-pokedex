const { Schema, model } = require('mongoose');

const PokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: [String],
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    stats: {
        hp: {
            type: Number,
            required: true
        },
        attack: {
            type: Number,
            required: true
        },
        defense: {
            type: Number,
            required: true
        },
        speed: {
            type: Number,
            required: true
        },
        specialAttack: {
            type: Number,
            required: true
        },
        specialDefense: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    abilities: {
        type: [String],
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports = model("Pokemon", PokemonSchema);
