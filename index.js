const Jimp = require('jimp')

const corps = [
    { id: 1, name: 'Corp A', phone: '1234'},
    { id: 2, name: 'Corp B', phone: '1235'},
    { id: 3, name: 'Corp C', phone: '1236'},
    { id: 4, name: 'Corp D', phone: '1237'},
    { id: 5, name: 'Corp E', phone: '1238'},
]

const genImage = async (text) => {
    const image = await new Jimp(50, 15)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)
    image.print(font, 0,0, text)
    return image
}

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.get('/', (req, res)=> {
    res.render('index', { corps })
})
app.get('/image/:ind', async (req, res)=> {
    const image = await genImage(corps[req.params.ind].phone)
    image.getBuffer(Jimp.MIME_JPEG, (err, data)=> {
        res.header('Content-type', 'image/png')
        res.send(data)
    })
})

app.listen(3000, ()=> console.log('running...'))