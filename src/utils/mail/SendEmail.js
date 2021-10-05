const URL = `/.netlify/functions/SendEmail`

//function to make a post request to lambda function using the fetch API
const SendEmail = async (url = URL, data = {}) => {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: `POST`,
      'Content-Type': `application/json`,
      'Accept': `application/json`,
      body: JSON.stringify(data)
    })
    return await response.json() // parses JSON response into native JavaScript objects
  } catch (error) {
    console.log("error", error)
    return error
  }

}

export default SendEmail
