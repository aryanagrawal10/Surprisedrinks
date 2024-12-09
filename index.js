import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express()
const port = 3000
const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'


app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index.ejs', { content: 'Click on the button!!!' })
})

app.post('/random', async (req, res) => {
  try {
    const result = await axios.get(API_URL)
    console.log(
      result.data.drinks[0].strDrink,
      result.data.drinks[0].strDrinkThumb
    )
    res.render('index.ejs', {
      content: JSON.stringify(result.data.drinks[0].strDrink),
      img: result.data.drinks[0].strDrinkThumb,
    })
  } catch (error) {
    res.render('index.ejs', { content: JSON.stringify(error.response.data) })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
