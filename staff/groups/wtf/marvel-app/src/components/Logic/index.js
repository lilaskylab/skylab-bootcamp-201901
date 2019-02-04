'use strict'

import marvelApi from '../../marvel-api'
import userApi from '../../user-api'

const logic = {

    __userId__: null,
    __userApiToken__: null,

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirm 
    * 
    * @throws {TypeError} - If any param is not a string.
    * @throws {Error} - If any param is empty.
    * @throws {Error} - If password and password confirmation do not match.
    * 
    * @returns {String} - User Id.
    */

   register(name, surname, email, password, passwordConfirm) {
    if (typeof name !== 'string') throw TypeError(name + ' is not a string')

    if (!name.trim().length) throw Error('name is empty')

    if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

    if (!surname.trim().length) throw Error('surname is empty')

    if (typeof email !== 'string') throw TypeError(email + ' is not a string')

    if (!email.trim().length) throw Error('email is empty')

    if (typeof password !== 'string') throw TypeError(password + ' is not a string')

    if (!password.trim().length) throw Error('password is empty')

    if (typeof passwordConfirm !== 'string') throw TypeError(passwordConfirm + ' is not a string')

    if (!passwordConfirm.trim().length) throw Error('password confirmation is empty')

    if (password !== passwordConfirm) throw Error('passwords do not match')

    return userApi.register(name, surname, email, password)
        .then(() => { })
},

/**
     * Login by credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @throws {TypeError} - If any param is not a string.
     * @throws {Error} - If any param is empty.
     * 
     * @returns {Object} - Contains user Id and Token.
     */
    login(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password is empty')

        return userApi.authenticate(email, password)
            .then(response => {
                const { data: {id, token}, status } = response

                if (status === 'OK') {
                    this.__userId__ = id
                    this.__userApiToken__ = token
                    return true
                }
                throw Error(response.error)
            })
    },

    /**
     * Retrieve user data.
     * 
     * @param {string} id
     * @param {string} token
     * 
     * @throws {TypeError} - If any param is not a string.
     * @throws {Error} - If any param is empty.
     * 
     * @returns {Object} - With all user info.
     */

    retrieveUser(id, token) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return userApi.retrieve(id, token)
            .then(response => {
                const { name } = response

                if (name) return response
                throw Error(reponse.error)
            })
    },

    /**
     * 
     * Search characters
     * 
     * @param {string} query 
     * 
     * @returns {Promise}
     */

    searchCharacter(query) {
        if(typeof query !== 'string') throw TypeError (`${query} is not a string`)
        if (!query.trim().length) throw Error ('query is empty')
    
        return marvelApi.searchCharacter(query)
    },

     /**
     * 
     * Retrieve character
     * 
     * @param {string} characterId 
     * 
     * @returns {Promise}
     */

    retrieveCharacter (characterId) {
        if(typeof characterId !== 'string') throw TypeError(`${characterId} is not a string`)
        if (!characterId.trim().length) throw Error (`characterId is empty`)

        return marvelApi.retrieveCharacter(characterId)
    },

     /**
     * 
     * Retrieve comic
     * 
     * @param {string} comicId 
     * 
     * @returns {Promise}
     */

    retrieveComic (comicId) {
        if(typeof comicId !== 'string') throw TypeError(`${comicId} is not a string`)
        if (!comicId.trim().length) throw Error (`comicId is empty`)

        return marvelApi.retrieveComic(comicId)
    }
}

export default logic
