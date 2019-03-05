"use strict";

const { Player, Match, Team } = require("../models");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//const webData = require("../models/scrapping");
const fs = require("fs");
const webData = require("../models/scrapping/webData.json");

const {
  SchemaTypes: { ObjectId },
  Schema
} = mongoose;

const logic = {
  /**
   *
   * Register a new user
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} username
   * @param {string} password
   *
   * @throws {TypeError} - When any param is not a string.
   * @throws {Error} - When any param is empty.
   * @throws {Error} - When API returns an error.
   *
   * @returns {Object} - User Id.
   *
   */

  registerPlayer(name, surname, email, password, link, preferedPosition) {
    if (typeof name !== "string") throw TypeError(`${name} is not string`);
    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof surname !== "string")
      throw TypeError(`${surname} is not string`);
    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof email !== "string") throw TypeError(`${email} is not string`);
    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(`${password} is not string`);
    if (!password.trim().length) throw Error("password cannot be empty");

    if (typeof link !== "string") throw TypeError(`${link} is not string`);
    if (!link.trim().length) throw Error("link cannot be empty");

    if (typeof preferedPosition !== "string")
      throw TypeError(`${preferedPosition} is not string`);
    if (!preferedPosition.trim().length)
      throw Error("preferedPosition cannot be empty");

    return (async () => {
      const player = await Player.findOne({ email });

      if (player) {
        throw Error(`player wiith email ${player.email} already exists`);
      }

      const hash = await bcrypt.hash(password, 10);

      const { id } = await Player.create({
        name,
        surname,
        email,
        password: hash,
        link,
        preferedPosition
      });
      //a player le anyado un campo que es id
      return id;
    })();
  },

  /**
   * Authenticates user by its credentials.
   *
   * @param {string} email
   * @param {string} password
   */
  authenticatePlayer(email, password) {
    if (typeof email !== "string") throw TypeError(email + " is not string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not string");

    if (!password.trim().length) throw Error("password cannot be empty");

    return (async () => {
      const player = await Player.findOne({ email });

      if (!player) throw Error(`player with email ${email} not found`);

      const match = await bcrypt.compare(password, player.password);

      if (!match) throw Error("wrong credentials");

      return player.id;
    })();
  },

  retrieveScoreData(link) {
    if (typeof link !== "string") throw TypeError(link + " is not string");

    if (!link.trim().length) throw Error("link cannot be empty");

    return webData[0].find(playerObj => {
      return playerObj.link === link;
    }).score;
  },

  addScoreToPlayer(playerId, score) {
    if (typeof playerId !== "string")
      throw TypeError(`${playerId} is not string`);

    if (!playerId.trim().length) throw Error("playerId cannot be empty");

    if (typeof score !== "string") throw TypeError(score + " is not string");

    if (!score.trim().length) throw Error("score cannot be empty");

    return (async () => await Player.findByIdAndUpdate(playerId, { score }))();
  }
};

module.exports = logic;
