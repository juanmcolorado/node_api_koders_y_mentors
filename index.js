const express = require('express')
const fs = require('fs')
const fsPromise = require('fs/promises')
const app = express()
app.use(express.json()) //sin esta linea no puedo leer el body

app.get('/' , (request, response) => {
    response.send('Hola desde mi primer API')
})

app.get('/file-async', async (request, response) => {
    const data = await fsPromise.readFile('APIS.txt', 'utf8')
    response.send(data)
  }) 
  
  //podemos pones los dos puntos y seguikra usando la misma ruta
  
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
  app.post('/koders', async (request, response) => {  
  
  const data = await fsPromise.readFile('kodemia.json', 'utf8')
  const db = JSON.parse(data)
  
  const newKoderId = db.koders.length + 1
  const newKoderData = {
      id: newKoderId,
      ...request.body
  }
  db.koders.push(request.body)
  
  const dbAsString = JSON.stringify(db, '\n', 2)
  await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')
  
  response.json(db.koders)
  })
  
  //eliminar 
  app.delete('/koders/:id', async (request, response) => {
      const id = parseInt(request,params.id)
      const data = fsPromise.readFile('kodemia.json','utf8')
      const db = JSON.parse(data)        
      
      const newKodersArray = db.koders.filter((koder)=> id != koders.id)
      db.koders = newKodersArray
  
      const dbAsString = JSON.stringify(db, '\n', 2)
      await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')
  
      response.json(db.koders)
  })
  
  //actualizar
  
  app.patch('/koders', async (request, response) => {  
      const id = parseInt(request,params,id)
      
      if(id === NaN){
          response.status(400)
          response.json({
              message: 'koder not found'
          })
      }

      const data = await fsPromise.readFile('kodemia.json', 'utf8')
      const db = JSON.parse(data)
  
      const koderFoundIndex = db.koders.findIndex((koder)=> id != koders.id)
      
      if(koderFoundIndex < 0 ){
          response.status(404)
          response.json({
              message: 'koder not found'
          })
      }

      db.koders[koderFoundIndex] = {
          ...db.koders[koderFoundIndex],
          ...request.body,
      }
  
      const dbAsStringify = JSON.stringify(db, '\n', 2)
      await fsPromise.writeFile('kodemia.json', dbAsStringify, 'utf8')
  
      response.json(db.koders[koderFoundIndex])
  
  })
  
  


app.listen(8080, () => {
    console.log('Server is listening')
})
