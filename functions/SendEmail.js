/* eslint-disable */
/*eslint-disable-next-line no-undef*/
exports.handler = function (event) {
  //import sendgrid mail npm package
  /*eslint-disable-next-line no-undef*/
  const sgMail = require(`@sendgrid/mail`)
  /*eslint-disable-next-line no-undef*/
  const dotenv = require(`dotenv-flow`)
  //only listen to POST requests
  if (event.httpMethod === `POST`) {
    //set sendgrid API Key which you created on the dashboard under settings
    dotenv.config()
    sgMail.setApiKey(`${process.env.GATSBY_GRID_API_KEY}`)
    //get arguments from event body

    const { to, subject, message, html } = JSON.parse(event.body)

    const msg = {
      to: to,
      from: `Vísindavøka <info@visindavoka.fo>`,
      subject: subject,
      text: message,
      html: html,
    }

    sgMail
      .send(msg)
      .then(response => {
        //return successful response
        return {
          statusCode: 200,
          //to enable cors on local development when we test our client
          headers: {
            'Access-Control-Allow-Origin': `*`,
            'Access-Control-Allow-Headers': `Origin, X-Requested-With, Content-Type, Accept`,
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: JSON.stringify({
            result: response.values,
          }),
        }
      })
      .catch(error => {
        console.log("error code 400", JSON.stringify(error))

        //return error object with status 400
        return {
          statusCode: 400,
          //to enable cors on local development when we test our client
          headers: {
            'Access-Control-Allow-Origin': `*`,
            'Access-Control-Allow-Headers': `Origin, X-Requested-With, Content-Type, Accept`,
          },
          body: JSON.stringify(error),
        }
      })

  } else {
    return {
      statusCode: 400,
      //to enable cors on local development when we test our client
      headers: {
        'Access-Control-Allow-Origin': `*`,
        'Access-Control-Allow-Headers': `Origin, X-Requested-With, Content-Type, Accept`,
      },
      body: {},
    }
  }
}
