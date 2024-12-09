// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express()
const port = 3000
const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

//Add your own bearer token from the previous lesson.
// const yourBearerToken = '08f3026d-9c6c-4d88-a3b2-c579dc106247'
// const config = {
//   headers: { Authorization: `Bearer ${yourBearerToken}` },
// }

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
