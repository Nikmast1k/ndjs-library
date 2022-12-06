const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')

class CRUD {
    constructor(title = '', description = '', authors = '', favourite = '', fileCover = '', fileName = '',  id = uuid()) {
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

router.get('/', (req, res) => {
    const {crud} = stor
    res.render('crud/index',{
        title: 'Crud',
        cruds: crud
    })
})

router.get('/create', (req, res) => {
    res.render("crud/create", {
        title: "Crud | create",
        crud: {}
    })
})

router.post('/create', (req, res) => {
    const {crud} = stor
    const {title, description, authors, favourite, fileCover, fileName} = req.body

    const newCrud = new CRUD(title, description, authors, favourite, fileCover, fileName)
    crud.push(newCrud)

    res.redirect('/crud')
})

router.get('/:id', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    res.render("crud/view", {
        title: "Crud | view",
        crud: crud[idx]
    })

})

router.get('/update/:id', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const idx = crud.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    res.render("crud/update", {
        title: "Crud | view",
        crud: crud[idx]
    })
})

router.post('/update/:id', (req, res) => {
    const {crud} = stor
    const {id} = req.params
    const {title, description, authors, favourite, fileCover, fileName} = req.body
    const idx = crud.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    crud[idx] = {
        ...crud[idx],
        title,
        description,
        authors,
        favourite,
        fileCover,
        fileName
    }
    res.redirect(`/crud/${id}`)
})


module.exports = router