const express = require('express')
const fs = require('fs')
const fsPromise = require('fs/promises')
const app = express()
app.use(express.json())

//async
app.get('/', async (request, response) => {
    const data = await fsPromise.readFile('APIS.txt', 'utf8')
    response.send(data)
})

app.get('/koders', async ( request, response ) => {
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)
    let kodersFound =  db.koders
    if (request.query.max_age){
        kodersFound = kodersFound.filter((koder) => {
            return koder.age <= parseInt(request.query.max_age)
        })
    }
    response.json(kodersFound)
})

app.get('/koders/id/:id', async (request, response) => {
    const nameId = request.params.id
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)

    const koderidFound = db.koders.find((koder)=>{
        return koder.nameId = nameId
    })
    response.json(koderidFound)
})

app.get('/koders/:name', async (request, response) => {
    const name = request.params.name
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)

    const koderFound = db.koders.find((koder)=>{
        return koder.name.toLowerCase() === name.toLowerCase()
    })
    response.json(koderFound)
})

app.get('/koders/sex/:sex', async (request, response) => {
    const sex = request.params.sex
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)

    const koderSex = db.koders.filter((koder)=>{
        return koder.sex.toLowerCase() === sex.toLowerCase()
    })
    response.json(koderSex)
})

//Nuevo Endpoint
//Crear un Koder
app.post('/koders', async (request,response) => {
    //aqui estamos leyendo toda la base de datos
    const data = await fsPromise.readFile('kodemia.json','utf8')
    //aqui estamos convirtiendo la db a json
    const db = JSON.parse(data)
    const newKoderID = db.koders.length + 1
    const newKoderData = {
        id: newKoderID,
        ... request.body
    }
    //estamos aregando al nueov koder sin grabarlo en la base de datos
    db.koders.push(newKoderData)
    //creamos una constante para pasar la base de datos a un string (obejto a string)
    //le estamos pasando un objeto y despues el salto de linea y 2 espacios despues de la linea
    const dbAsString = JSON.stringify(db, '\n', 2)
    //aqui grabamos bsAsString en kodemia.json con el nuevo koder
    await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')
    response.json(db.koders)
})
/*
{
	"name": "Ivonne",
	"age": 31,
	"nationality": "mexican",
	"generation number": 15,
	"hobbies": ["bailar", "cine"],
	"sex": "F",
	"city": "Toluca"
}
*/
app.delete('/koders/:id', async(request,response) => {
    const id = parseInt(request.params.id)
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)
    const newKodersArray = db.koders.filter((koder) => id != koder.id)
    db.koders = newKodersArray
    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json', dbAsString,'utf8')
    response.json(db.koders)
})

app.patch('/koders/:id', async(request, response) => {
    const id = parseInt(request.params.id)
    
    if(isNaN(id)){
        response.status(400)
        response.json({
            message: 'id must be a number'
        })
        return
    }
    
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)
    const koderFoundIndex = db.koders.findIndex((koder) => id === koder.id)
    
    if(koderFoundIndex < 0){
        response.status(404)
        response.json({
            message: 'Koder not found'
        })
        return
    }
    
    db.koders[koderFoundIndex] = {
        ...db.koders[koderFoundIndex],
        ...request.body
    }
    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')
    response.json(db.koders[koderFoundIndex])
})
//////////////////////////////////////////////////
//Mentores
//////////////////////////////////////////////////

app.get('/mentors', async ( request, response ) => {
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)
    let mentorsFound =  db.mentors
    if (request.query.max_age){
        mentorsFound = mentorsFound.filter((mentor) => {
            return mentors.age <= parseInt(request.query.max_age)
        })
    }
    response.json(mentorsFound)
})

app.post('/mentors', async (request,response) => {
    //aqui estamos leyendo toda la base de datos
    const data = await fsPromise.readFile('kodemia.json','utf8')
    //aqui estamos convirtiendo la db a json
    const db = JSON.parse(data)
    const newMentorsNumber = db.mentors.length + 1
    const newMentorsData = {
        number: newMentorsNumber,
        ... request.body
    }
    //estamos aregando al nueov koder sin grabarlo en la base de datos
    db.mentors.push(newMentorsData)
    //creamos una constante para pasar la base de datos a un string (obejto a string)
    //le estamos pasando un objeto y despues el salto de linea y 2 espacios despues de la linea
    const dbAsString = JSON.stringify(db, '\n', 2)
    //aqui grabamos bsAsString en kodemia.json con el nuevo koder
    await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')
    response.json(db.mentors)
})
/*
{
	"number": 1,
    "name": "Charles",
	"subject": "node",
	"sex": "m",
	"class": ["taller","module"],
	"age": 25
}
*/
app.delete('/mentors/:number', async(request,response) => {
    const number = parseInt(request.params.number)
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)
    const newMentorsArray = db.mentors.filter((mentor) => number != mentor.number)
    db.mentors = newMentorsArray
    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json', dbAsString,'utf8')
    response.json(db.mentors)
})

app.patch('/mentors/:number', async(request, response) => {
    const number = parseInt(request.params.number)
    
    if(isNaN(number)){
        response.status(400)
        response.json({
            message: 'must be a number'
        })
        return
    }
    
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)
    const mentorFoundIndex = db.mentors.findIndex((mentor) => number === mentor.number)
    
    if(mentorFoundIndex < 0){
        response.status(404)
        response.json({
            message: 'Mentor not found'
        })
        return
    }
    
    db.mentors[mentorFoundIndex] = {
        ...db.mentors[mentorFoundIndex],
        ...request.body
    }
    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')
    response.json(db.mentors[mentorFoundIndex])
})

app.listen(8084, () => {
    console.log('Server is listening')
})
