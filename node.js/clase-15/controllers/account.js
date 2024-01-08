import accountService from '../services/account.js';

function createAccount(req, res) {
    accountService.createAccount(req.body)
        .then(() => {
            res.status(201).json({ msg: "Cuenta creada con éxito" });
        })
        .catch(() => {
            res.status(500).json({ msg: "Fallo al crear la cuenta" })
        })
}

function login(req, res) {
    accountService.createSession(req.body)
        .then((session) => {
            res.status(201).json({ msg: "Cuenta creada con éxito", session });
        })
        .catch(() => {
            res.status(500).json({ msg: "Fallo iniciar sesion" })
        })
}

function logout(req, res) {
    accountService.deleteSession(req.token)
        .then((session) => {
            res.status(201).json({ msg: "Cuenta eliminada con éxito" });
        })
        .catch(() => {
            res.status(500).json({ msg: "Fallo cerrar sesion" })
        })
}

export default {
    createAccount,
    login,
    logout
}
