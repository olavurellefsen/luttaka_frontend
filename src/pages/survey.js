import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { graphql, navigate } from 'gatsby';
import React, { useState, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PetalMenu from '../components/front_page_large_screens/petalMenu';
import MenuContainer from '../components/header/menuContainer';
import Layout from '../components/layout';
import { media } from '../utils/mediaTemplate'
import SendEmail from '../utils/mail/SendEmail'

const Survey = ({ data }) => {
  const { register, handleSubmit, formState, watch, formState: { errors } } = useForm({ mode: 'onChange' })
  const [answer, setAnswer] = useState({})
  const [email, setEmail] = useState("")
  const [components, setComponents] = useState([])
  let watchFields = watch(data.allStrapiSurveyQuestions.nodes[0].Questionnaire.radio.map((radio) => {
    return radio.question?.split(". ")?.[1] ? radio.question?.split(". ")?.[1] : radio.question
  }))

  const [createSurveyAnwser] = useMutation(gql`
  mutation CreateSurvey($email: String!, $input: jsonb!, $schedule_title: String!) {
    insert_survey_json_one(object: {email: $email, input: $input, schedule_title : $schedule_title }) {
      email
    }
  }
  `)
  const [fetchUser, { data: survey_data }] = useLazyQuery(gql`
    query fetchemail($email: String) {
      survey_json(where: {_and: {email: {_eq: $email, _is_null: false, _neq: ""}}}) {
        id
      }
    }
  `, {
    onCompleted() {
      if (survey_data.survey_json.length === 0) {
        const sortedArray = data.allStrapiSurveyQuestions.nodes.sort((a, b) => {
          const yearA = a.schedule.date.split("-")[0]
          const yearB = b.schedule.date.split("-")[0]
          return yearA < yearB ? -1 : yearA === yearB ? 0 : 1
        })

        createSurveyAnwser({
          variables: {
            input: answer,
            email: email,
            schedule_title: sortedArray[0].schedule.placement
          }
        }).then(() => {
          const data = JSON.parse(answer)
          let elementString = ""
          for (const key in data) {
            elementString += `<p>${key.replaceAll("?", "")}:  ${data[key]}</p>`
          }
          try {
            SendEmail(`${process.env.GATSBY_EMAIL_END_POINT}`, {
              to: `gransking@gransking.fo`,
              subject: `Nýggj Eftirmeting`,
              html: `<h1>Ein nýggjur luttakari hevur eftirmett</h1> <br/>
                      <p>Niðanfyri eru upplýsingar, ið luttakarin hevur upplýst.</p>
                      ${elementString}
              `
            })
            SendEmail(`${process.env.GATSBY_EMAIL_END_POINT}`, {
              to: `heg@tokni.fo`,
              subject: `Nýggj Eftirmeting`,
              html: `<h1>Ein nýggjur luttakari hevur eftirmett</h1> <br/>
                      <p>Niðanfyri eru upplýsingar, ið luttakarin hevur upplýst.</p>
                      ${elementString}
              `
            })

          } finally {
            navigate(`/survey_registered`)
          }
        })
      }
    }
  })

  const onSubmit = async data => {
    if (
      !formState.isSubmitting) {
      setEmail(data.email)
      let tmpEmail = data.email
      delete data.email
      if (watchFields) {
        for (const key in data) {
          if (data[key] === "Annað") {
            data[key] = data[key + "_annað"]
            delete data[key + "_annað"]
          }
        }
      }
      setAnswer(JSON.stringify(data))
      await fetchUser({
        variables: {
          email: tmpEmail ? tmpEmail : ""
        }
      })
    }
  }

  const renderQuestionsRadio = (radio) => {
    return (<Fragment key={radio.id + "radio"}>
      <FormTitle>{radio.question}{radio.required && <RedText>*</RedText>}</FormTitle>
      {radio.description && radio.description !== " " && <DescriptionStyle>{radio.description}</DescriptionStyle>}
      {errors[radio.question?.split(". ")?.[1] ? radio.question?.split(". ")?.[1] : radio.question]?.type === "required" && <ErrorStyle>Skal útfyllast.</ErrorStyle>}
      {radio.options.map((option, index) => {
        return (
          <LabelStyle key={option.id + index + "radio option"}>
            <InputStyle name={radio.question?.split(". ")?.[1] ? radio.question?.split(". ")?.[1] : radio.question} type="radio" value={option.title} ref={register({ required: radio.required })} />
            {option.title}
          </LabelStyle>
        )
      })}
      {watchFields[radio.question?.split(". ")?.[1] ? radio.question?.split(". ")?.[1] : radio.question] === "Annað" && <TextInputStyle type="text" name={radio.question?.split(". ")?.[1] ? radio.question?.split(". ")?.[1] + "_annað" : radio.question + "_annað"} ref={register({ required: radio.required })} />}
    </Fragment>)
  }

  const renderQuestionsCheckbox = (checkbox) => {
    return (<Fragment key={checkbox.id + "checkbox"}>
      <FormTitle>{checkbox.question}{checkbox.required && <RedText>*</RedText>}</FormTitle>
      {checkbox.description && checkbox.description !== " " && <DescriptionStyle>{checkbox.description}</DescriptionStyle>}
      {errors[checkbox.question?.split(". ")?.[1] ? checkbox.question?.split(". ")?.[1] : checkbox.question]?.type === "required" && <ErrorStyle>Skal útfyllast.</ErrorStyle>}
      {checkbox.options.map((option) => {
        return (
          <LabelStyle key={option.id + "checkbox option"}>
            <InputStyle name={checkbox.question?.split(". ")?.[1] ? checkbox.question?.split(". ")?.[1] : checkbox.question} type="checkbox" value={option.title} ref={register({ required: checkbox.required })} />
            {option.title}
          </LabelStyle>
        )
      })}
    </Fragment>)

  }

  const renderQuestionText = (text) => {
    return (<Fragment key={text.id + "text"}>
      <FormTitle>{text.title}{text.required && <RedText>*</RedText>}</FormTitle>
      {text.description && text.description !== " " && <DescriptionStyle>{text.description}</DescriptionStyle>}
      {errors[text.title?.split(". ")?.[1] ? text.title?.split(". ")?.[1] : text.title]?.type === "required" && <ErrorStyle>Skal útfyllast.</ErrorStyle>}
      <LabelStyle key={text.id}>
        <TextAreaStyle name={text.title?.split(". ")?.[1] ? text.title?.split(". ")?.[1] : text.title} type="text" ref={register({ required: text.required })} />
      </LabelStyle>
    </Fragment>)
  }

  const renderQuestionsRadioMultiple = (radio) => {
    return (<Fragment key={radio.id}>
      <FormTitle>{radio.question}</FormTitle>
      {radio.description && radio.description !== " " && <DescriptionStyle>{radio.description}</DescriptionStyle>}
      <ColumnStyle>
        {radio.options_above.map((aboveOption, index) => {
          return <Fragment key={aboveOption.id}>
            {index === 0 ? <>
              <ParagraphStyle></ParagraphStyle><ParagraphStyle>{aboveOption.title}</ParagraphStyle>
            </> : <ParagraphStyle>{aboveOption.title}</ParagraphStyle>}
          </Fragment>
        })}
        {radio.options_to_the_side.map((sideOption) => {
          return <Fragment key={sideOption.id + "sideoption"}>
            <LabelStyle htmlFor={sideOption.title}>{sideOption.title}</LabelStyle>
            {radio.options_above.map((aboveOption, index) => (
              <InputStyle key={sideOption.id + index + "above_option_side"} type="radio" name={sideOption.title} value={aboveOption.title} ref={register({ required: false })} />
            ))}
          </Fragment>
        })}
      </ColumnStyle>
    </Fragment>)
  }

  const renderQuestionsNumber = (number) => {
    return <Fragment key={number.id + "number"}>
      {number.question && number.question !== " " && <FormTitle>{number.question}{number.required && <RedText>*</RedText>}</FormTitle>}
      <DescriptionStyle>{number.description}</DescriptionStyle>
      {errors[number.question?.split(". ")?.[1] ? number.question?.split(". ")?.[1] : number.question]?.type === "required" && <ErrorStyle>Skal útfyllast.</ErrorStyle>}
      <input type="number" min={number.min} max={number.max} name={number.question?.split(". ")?.[1] ? number.question?.split(". ")?.[1] : number.question} ref={register({ required: true })} />
    </Fragment>
  }


  const renderComponents = () => {
    return components.map((component, index) => {
      switch (component.type) {
        case "checkbox":
          return <InputContainer key={index}>
            {renderQuestionsCheckbox(component)}
          </InputContainer>
        case "text":
          return <InputContainer key={index}>
            {renderQuestionText(component)}
          </InputContainer>
        case "radio":
          return <InputContainer key={index}>
            {renderQuestionsRadio(component)}
          </InputContainer>
        case "radio_multiple":
          return <InputContainer key={index}>
            {renderQuestionsRadioMultiple(component)}
          </InputContainer>
        case "number":
          return <InputContainer key={index}>
            {renderQuestionsNumber(component)}
          </InputContainer>
        default:
          return null
      }
    })
  }



  useEffect(() => {
    if (data) {
      const array = []
      data.allStrapiSurveyQuestions.nodes[0].Questionnaire.checkbox.map((checkbox) => {
        checkbox.type = "checkbox"
        array.push(checkbox)
        return null
      })
      data.allStrapiSurveyQuestions.nodes[0].Questionnaire.radio.map((radio) => {
        radio.type = "radio"
        array.push(radio)
        return null

      })
      data.allStrapiSurveyQuestions.nodes[0].Questionnaire.radio_multiple.map((radio_multiple) => {
        radio_multiple.type = "radio_multiple"
        array.push(radio_multiple)
        return null
      })
      data.allStrapiSurveyQuestions.nodes[0].Questionnaire.text.map((text) => {
        text.type = "text"
        array.push(text)
        return null
      })
      data.allStrapiSurveyQuestions.nodes[0].Questionnaire.number.map((number) => {
        number.type = "number"
        array.push(number)
        return null
      })
      array.sort((a, b) => {
        let aNumber = 0
        let bNumber = 0
        if (a.question) {
          aNumber = a.question.split(". ")[0]
        } else if (a.title) {
          aNumber = a.title.split(". ")[0]
        }
        if (b.question) {
          bNumber = b.question.split(". ")[0]

        } else if (b.title) {
          bNumber = b.title.split(". ")[0]
        }
        return parseInt(aNumber) < parseInt(bNumber) ? -1 : parseInt(aNumber) === parseInt(bNumber) ? 0 : 1
      })
      setComponents([...array])
    }
  }, [data])

  if (survey_data?.survey_json?.length > 0) {
    return (
      <ContainerStyle>
        <Layout>
          <MenuContainer />
          <PetalContainer name="petal container">
            <PetalMenu />
          </PetalContainer>
          <TitleStyle>Nøgdsemiskanning</TitleStyle>
          <AnsweredStyle>{data.allStrapiSurveyAlreadyRegistered.nodes[0].content}</AnsweredStyle>
        </Layout>
      </ContainerStyle>
    )
  }

  return (
    <ContainerStyle>
      <Layout>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <TitleStyle>Nøgdsemiskanning</TitleStyle>
        <FormStyle onSubmit={handleSubmit(onSubmit)} >

          {renderComponents()}
          <InputContainer>
            <FormTitle>Um tú ynskir at vera við í lutakastinum, mást tú skriva tín teldupost her</FormTitle>
            <EmailStyle type="text" name="email" ref={register({ required: false })} />
          </InputContainer>
          <SubmitButton type="submit" disabled={formState.isSubmitting}>Góðkenn</SubmitButton>
        </FormStyle>
      </Layout>
    </ContainerStyle>
  )
}
const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const PetalContainer = styled.div`
  display: flex;
  ${media.desktop3`
    display: none;
  `}
`

const DescriptionStyle = styled.div`
  font-size: 13px;
  margin-bottom: 10px;
`

const FormStyle = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 20px 0;
  width: 100%;

`

const LabelStyle = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 5px;
`


const InputStyle = styled.input`
  width: 20px;
  height: 20px;
`
const EmailStyle = styled(InputStyle)`
  max-width: 312px;
  width: 100%;
`


const TextAreaStyle = styled.textarea`
  width: 90%;
  min-height: 120px;
  margin: 0px 5px;
  font-size: 16px;
`

const ColumnStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
`

const TitleStyle = styled.div`
  color: #58A449;
  font-size: 24px;
  ${media.desktop3`
    display: block;
    margin-top: 100px;
  `}
  `
const AnsweredStyle = styled.div`
  font-size: 18px;
  margin-top: 60px;
`

const FormTitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #58A449;
  margin-bottom: 5px;
  `

const ParagraphStyle = styled.p`
`

const RedText = styled.div`
  color: red;
  font-size: 14px;
`

const SubmitButton = styled.button`
  background-color: ${props => props.disabled ? "gray" : "#74AB58"};
  color: white;
  width: 150px;
  font-size: 16px;
  height: 40px;
  margin: 5px 0;
  border: none;
  &:active {
    opacity: 0.1;
  }
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
`


const ErrorStyle = styled.span`
  font-size: 12px;
  color: red;
`

const TextInputStyle = styled.input`
  min-width: 40px;
  margin-left: 10px;
  margin-top: 5px;
`

export default Survey;

export const PageQuery = graphql`
query fetchAlreadyRegistered {
  allStrapiSurveyAlreadyRegistered {
    nodes {
      content
    }
  }
  allStrapiSurveyQuestions {
    nodes {
      title
      schedule{
        date
        placement
      }
      Questionnaire {
        radio {
          id
          question
          description
          required
          options {
            id
            title
          }
        }
        checkbox {
          id
          question
          description
          required
          options {
            id
            title
          }
        }
        text {
          id
          title
          required
        }
        radio_multiple {
          id
          question
          description
          options_above {
            id
            title
          }
          options_to_the_side {
            id
            title
          }
        }
        number {
          id
          question
          description
          required
          min
          max
        }
      }
    }
  }
}
`
