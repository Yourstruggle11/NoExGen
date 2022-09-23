import express from 'express'

const router = express.Router()

const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })

router.get('/', (req, res, next) => {
    return res.json({
        message: 'Server is running...',
        deployTime: time,
        env: process.env.NODE_ENV
    })
})

export default router