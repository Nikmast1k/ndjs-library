const express = require('express')
const { v4: uuid} = require('uuid')

class CRUD {
    constructor(title = '', description = '', authors = '', favourite = '', fileCover = '', fileName = '', id = uuid()) {
        this.description = description
        this.authors = authors
        this.favourite = favourite
        this.fileCover = fileCover
        this.fileName = fileName
        this.title = title
        this.id = id
    }
}

const stor = {
    crud: []
}

const app = express()
app.use(express.json())

app.get('/api/books', (req, res) => {
    const {crud} = stor
    res.json(crud)
})

app.get('/api/books/:id', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(crud[idx])
    } else {
        res.status(404)
        res.json('404 | Страница не найдена')
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx !== -1) {
        crud.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | Страница не найдена')
    }
})


app.post('/api/books', (req, res) => {
    const {crud} = stor
    const {title, description, authors, favourite, fileCover, fileName} = req.body

    const newCrud = new CRUD(title, description, authors, favourite, fileCover, fileName)
    crud.push(newCrud)
    res.status(201)
    res.json(newCrud)
})

app.put('/api/books/:id', (req, res) => {
    const {crud} = stor
    const {title, description, authors, favourite, fileCover, fileName} = req.body
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx !== -1) {
        crud[idx] = {
            ...crud[idx],
            title,
            description,
            authors,
            favourite,
            fileCover,
            fileName,
        }
        res.json(crud[idx])
    } else {
        res.status(404)
        res.json('404 | Страница не найдена')
    }
})


app.post('/api/user/login', (req, res) => {
    const result = { id: 1, mail: "test@mail.ru" }
    res.status(201)
    res.json(result)
})


const PORT = process.env.PORT || 3000
console.log('Server is listening port 3000')

app.listen(PORT)
