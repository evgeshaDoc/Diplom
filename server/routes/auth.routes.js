import {Request, Response, Router} from "express";
import {hash} from 'bcrypt'
import {Users} from '../models'
// const {Router, Request, Response} = require('express')
// const bcrypt = require('bcrypt')
// const {Users} = require('../models')

const router: Router = Router()

router.post('/register', async (req: Request, res: Response) => {
  try {
    const {email, password, name, surname} = req.body
    const candidate = await Users.findOne({email})
    if (candidate) {
      res.status(400).json({
        message: 'Такой пользователь уже существует'
      })
    }

    const hashedPass = hash(password, 10)


  } catch (e) {
    res.status(500).json({
      message: 'Не удалось зарегистрироваться, попробуйте позже'
    })
  }
})

export default router