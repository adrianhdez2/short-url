import shortid from 'shortid'
import { ShortUrl } from '../models/mongodb.js'

export class UrlController {
    static async getPage(req, res) {
        res.render('index.ejs')
    }

    static async saveUrl(req, res) {
        const { input_url } = req.body
        const shorUrl = shortid.generate()

        await ShortUrl.create({
            full: input_url,
            short: shorUrl
        })

        res.redirect(`/preview/${shorUrl}`)
    }

    static async redirect(req, res) {
        const { link } = req.params

        const shortUrl = await ShortUrl.findOne({ short: link })

        if (!shortUrl) return res.render('404.ejs') // --> redireccionar a pagina de error

        shortUrl.clicks++
        shortUrl.save()

        res.redirect(shortUrl.full)
    }

    static async preview(req, res) {
        const { link } = req.params

        const shortUrl = await ShortUrl.findOne({ short: link })

        if (!shortUrl) return res.status(404).redirect('/') // --> redireccionar a pagina de inicio

        res.render('preview.ejs', { shortUrl: shortUrl })
    }

    static async error(req, res) {
        res.render('404.ejs')
    }
}