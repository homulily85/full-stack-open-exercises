const express = require("express")
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('post-info', function (req) {
    if (req.method === "POST") {
        return `${JSON.stringify(req.body)}`
    } else return ""
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-info", {
    skip: function (req, res) {
        return req.method !== "POST"
    }
}))

app.use(morgan("tiny", {
    skip: function (req, res) {
        return req.method === "POST"
    }
}))


let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const result = persons.find(p => p.id === id)
    if (result) {
        res.json(result)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post("/api/persons", (req, res) => {
    if (!req.body.name || !req.body.number) {
        res.status(400).json({"error": "The name or number is missing"})
        return
    }
    if (persons.find(p => p.name.toLowerCase() === req.body.name.trim().toLowerCase())) {
        res.status(400).json({"error": "name must be unique"})
        return
    }
    const newItem = {
        id: Math.floor(Math.random() * 10000 + 5).toString(),
        name: req.body.name.trim(),
        number: req.body.number.trim()
    }
    persons.push(newItem)
    res.json(newItem)
})

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})