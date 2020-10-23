import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import SendEmail from '../../utils/mail/SendEmail'
import { navigate } from 'gatsby'


const SignupForm = ({ selectedItems }) => {
  const { register, handleSubmit, watch, formState, errors } = useForm()
  const watchSignupType = watch("signup_type")
  const { isSubmitSuccessful, isSubmitted } = formState;

  const [emailDraft, setEmailDraft] = useState(``)
  const onSubmit = async data => {

    const {
      firstname,
      lastname,
      email,
      signup_type,
      participant_nr,
      work_place,
      school_class
    } = data

    const orderedList = []
    for (const iterator of selectedItems) {
      orderedList.push(`<li>${iterator}</li>`)
    }
    if (orderedList.length > 0) {
      setEmailDraft({
        to: `gransking@gransking.fo`,
        subject: `Nýggj skráseting`,
        html: `<h1>Ein nýggjur luttakari er skrásettur</h1> <br/>
                <p>Niðanfyri eru upplýsingar, ið luttakarin hevur upplýst.</p>
                  <p>Navn: ${firstname} ${lastname}.</p>
                  <p>Teldupostur: ${email}</p>
                  <p>Melda til sum: ${signup_type === "alone" ? "Einstaklingur" : "Bólkur"}</p>
                   ${signup_type === "group" ? ` <p>Tal av luttakarum: ${participant_nr}</p>` : ``}
                  <p>Arbeiðstaður: ${work_place}</p>
                 ${school_class ? `<p>Skúlaflokkur: </p><br/>` : ``}
                  <ol>
                    ${orderedList.toString().replaceAll(`,`, ``)}
                  </ol>
                 <p>
                   tøkni.fo<br>
                   Niels Finsensgøta 16<br>
                   FO-100 Tórshavn<br>
                   Faroe Islands
                 </p>`
      })
    }

  }

  useEffect(() => {
    if (isSubmitted && isSubmitSuccessful && emailDraft && selectedItems.length > 0) {
      SendEmail(`${process.env.GATSBY_EMAIL_END_POINT}`, emailDraft)
      let olavursEmail = emailDraft
      olavursEmail.to = "oe@tokni.com"
      SendEmail(`${process.env.GATSBY_EMAIL_END_POINT}`, olavursEmail)

      navigate(`/registered`)
    } else if (isSubmitted && selectedItems.length === 0) {
      alert("Vinaliga vel ein fyrilest")
    }

  }, [isSubmitted, isSubmitSuccessful, emailDraft, selectedItems])


  return (
    <ContainerStyle>
      <TitleStyle>Tilmelding til Vísindavøku 2020</TitleStyle>
      {formState.isSubmitting && <div>SENDING EMAIL</div>}


      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputStyle name="firstname" ref={register({ required: true })} placeholder="Fornavn" />
          <InputStyle name="lastname" ref={register({ required: true })} placeholder="Eftirnavn" />
        </InputContainer>
        <InputStyle name="email" ref={register({ required: true })} placeholder="Teldupostur" />
        <div style={{ backgroundColor: "#F5F5F5", width: "97%", margin: "5px" }}>
          <LabelInput>
            Eg meldi til sum einstaklingur
          <input name="signup_type" type="radio" value="alone" ref={register({ required: true })} />
          </LabelInput>
          <LabelInput>
            Eg meldi til sum bólkur
          <input name="signup_type" type="radio" value="group" ref={register({ required: true })} />
          </LabelInput>
        </div>
        {watchSignupType === "group" && <>
          <InputStyle name="participant_nr" ref={register({ required: true })} placeholder="Hvussu nógv eru í bólkinum" />
          {errors.participant_nr && <ErrorParagraph>Tú mást upplýsa, hvussu nógv tit ereu, um tú vilt skráset teg við bólki </ErrorParagraph>}
          <InputStyle name="school_class" ref={register({ required: false })} placeholder="Vinaliga skriva flokkin, um talan er um ein skúlaflokk" />
        </>}
        <InputStyle name="work_place" ref={register({ required: true })} placeholder="Arbeiðsstaður" />

        <LabelContainer>
          <LabelStyle htmlFor="accepted-terms">
            Eg vátti við hesum, at upplýsingarnar omanfyri eru rættar og gevi loyvi til at visindavoka.fo kann deila upplýsingar um meg við fyriskiparan av tiltakinum.
          </LabelStyle>
          <CheckboxStyle id="accepted-terms" type="checkbox" name="accepted_terms" ref={register({ required: true })} />
          {errors.accepted_terms && <ErrorParagraph>Tú mást góðkenna treytirnar fyri at skráseta teg</ErrorParagraph>}
        </LabelContainer>

        <SubmitButton type="submit" >Skráset</SubmitButton>
      </FormStyle>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #FFFFFF;
  margin: 20px;
  width: 90%;
  max-width: 380px;
`

const TitleStyle = styled.h1`
  color: #6DA745;
  font-size: 20px;
  margin: 10px;
`

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
`

const InputStyle = styled.input`
  height: 40px;
  width: 95%;
  margin: 5px;
  background-color: #F5F5F5;
  border: none;
`


const LabelStyle = styled.label`
  height: 40px;
  width: 50%;
  margin: 0px 10px;
  text-align: left;
`

const LabelInput = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 5px;
`


const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  input {
    margin: 10px 0;
    width: 45%;
  }
`

const LabelContainer = styled.div`
  margin: 5px 10px;
  max-width: 300px;
  width: 97%;
`

const SubmitButton = styled.button`
  background-color: #74AB58;
  color: white;
  width: 95%;
  height: 40px;
  margin: 5px 0;
  border: none;
  &:active {
    opacity: 0.1;
  }
  cursor: pointer;
`

const CheckboxStyle = styled(InputStyle)`
  height: 20px;
`

const ErrorParagraph = styled.p`
  color: red;
  margin: 5px 10px;
  width: 300px;
`
export default SignupForm
