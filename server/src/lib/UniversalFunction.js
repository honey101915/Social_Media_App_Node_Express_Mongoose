const express = require("express")
const CommonMessages = require("../Constants/en")

const SendResponse = async (res, statusCode, message = "Success", data = {},) => {
    try {
        return res.status(statusCode).send({ statusCode, data, message: message })
    } catch (error) {

    }
}

const SendServerError = (res, error = {}, message = "Server error") => {
    try {
        return res.status(500).send({ statusCode: 500, error, message })
    } catch (error) {

    }
}

module.exports = {
    SendResponse,
    SendServerError
}