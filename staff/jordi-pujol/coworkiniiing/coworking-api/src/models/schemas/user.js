const { Schema } = require('mongoose')
const { Types: { ObjectId }} = Schema

const User = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: email => {
                return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },

    password: {
        type: String,
        required: true
    },

    isAdmin:{
        type: String,
        required: true
    },

    workspace:{
        type: ObjectId,
        required: false,
        ref: 'Workspace'
    }
})

module.exports = User