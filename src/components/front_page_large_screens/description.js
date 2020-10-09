import React from 'react'
import styled from 'styled-components'
import { media } from '../../utils/mediaTemplate'

const Description = () => {
  return (
    <ContainerStyle>
      <TitleStyle>
        VÍSINDAVØKA BYGGIR BRÝR MILLUM <br /> GRANSKARAR OG ALMENNING
      </TitleStyle>
      <TextStyle>
        Á hvørjum ári skipa Granskingarráðið og granskingarstovnarnir í Føroyum fyri Vísindavøku.
        Endamálið er at økja um áhugan fyri gransking og fyri granskingarúrslitum í samfelagnum.
      </TextStyle >
      <TextStyle >
        Tiltakið er er sprottið úr átakinum European Researchers’ Night, sum hvørt ár verður fyriskipað seinasta fríggjakvøld í september og í døgunum frammanundan.
        Tiltakið verður hildið í býum kring alt Europa.
      </TextStyle>
      <TextStyle >
        Við Vísindavøkuni ynskja Granskingarráðið og stovnarnir at skapa øktan kunnleika til og áhuga fyri tí,
        sum fer fram innan føroyska granskingarheimin.
        Høvi er hjá stórum og smáum at hitta granskarar og síggja og hoyra, hvat teir arbeiða við og hvat hetta hevur at týða fyri fólk í Føroyum.
        </TextStyle >
      <TextStyle >
        Vísindavøkan 2020 verður 13. í røðini.
        </TextStyle >
      <TextStyle >
        Vísindavøkan 2020 verður seinni enn vanligt, hon verður 6. november.
        Á triðja sinni verður Vísindavøkan í Sjóvinnuhúsinum á Vestaru Bryggju í Havn. Eisini verður farið við Vísindavøku á ferð. Meira verður at frætta í næstum.
      </TextStyle>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 4px;
  display: block;
  margin: 0 200px;
  ${media.desktop3`
     display: none;
  `}
  z-index: 5
`

const TitleStyle = styled.div`
  padding: 50px;
  text-align: center;
  font: normal normal 600 26px/32px Lato;
  letter-spacing: 0px;
  color: #58A449;
`

const TextStyle = styled.div`
  padding: 20px;
  text-align: left;
  font: normal normal normal 24px/29px Lato;
  letter-spacing: 0px;
  color: #222222;
`

export default Description
