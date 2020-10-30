import { gql, useMutation, useSubscription } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { graphql, navigate } from 'gatsby';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PetalMenu from '../components/front_page_large_screens/petalMenu';
import MenuContainer from '../components/header/menuContainer';
import Layout from '../components/layout';
import { media } from '../utils/mediaTemplate'


const Survey = ({ data }) => {
  const { user } = useAuth0()
  console.log("dfata: ", data)
  const { register, handleSubmit, watch, clearErrors, errors } = useForm()
  const { data: surveyData, loading } = useSubscription(gql`
  subscription FetchEmail($email: String!) {
    Survey(where: {email: {_eq: $email}}) {
     email
     id
    }
}
  `, {
    variables: {
      email: user?.email
    }
  })


  const watchRankedFields = watch([
    "visinda_voku_a_ferd",
    "framlogur_i_kongshøll",
    "snarroðukapping",
    "framsyningar_og_tiltøk_a_svalanum",
    "eksperimentir_í_telti_uttanfyri",
    "rundvisingar_a_granskingarstovnum"
  ])

  const [createSurveyAnwser] = useMutation(gql`
  mutation MyMutation(
    $email: String!,
    $ert_tu: String!,
    $hvat_evni: String!,
    $hvat_saknadi: String,
    $tad_besta: String,
    $hvorji_tiltok: String!,
    $hvorjum_tiltokum: String!,
    $samlad_meting: numeric!) {
  insert_Survey_one(object: {
    email: $email,
    ert_tu: $ert_tu,
    hvat_evni_vilt_tu_hoyra_meira_um_naestu_fer: $hvat_evni,
    hvat_saknadi_tu: $hvat_saknadi,
    hvat_var_tad_besta: $tad_besta,
    hvorji_tiltolk_skulu_vit_hava_komandi_ar: $hvorji_tiltok,
    hvorjum_tiltokum_luttokst_tu_i: $hvorjum_tiltokum,
    samlad_meting: $samlad_meting}) {
    id
  }
}

  `,)

  const onSubmit = async data => {

    const {
      er,
      which_events_participated,
      missed,
      the_best,
      visinda_voku_a_ferd,
      framlogur_i_kongshøll,
      snarroðukapping,
      framsyningar_og_tiltøk_a_svalanum,
      eksperimentir_í_telti_uttanfyri,
      rundvisingar_a_granskingarstovnum,
      nattura,
      heilsa,
      tokni,
      samfelag,
      hugvisindi,
      meting

    } = data

    const upcomingEvents = `Vísindavøku á ferð: ${visinda_voku_a_ferd},
            Framløgur í Kongshøll: ${framlogur_i_kongshøll},
            Snarrøðukapping: ${snarroðukapping},
            Framsýningar og tiltøk á svalanum: ${framsyningar_og_tiltøk_a_svalanum},
            Eksperimentir í telti uttanfyri: ${eksperimentir_í_telti_uttanfyri},
            Rundvísingar á granskingarstovnum: ${rundvisingar_a_granskingarstovnum}
            `
    if (er) {
      createSurveyAnwser({
        variables: {
          email: user.email,
          ert_tu: er,
          hvat_evni: `
          Heilsu: ${heilsa},
          Náttúru: ${nattura},
          Tøkni: ${tokni},
          Samfelag: ${samfelag},
          Hugvisindi: ${hugvisindi}
          `,
          hvat_saknadi: missed,
          tad_besta: the_best,
          hvorji_tiltok: upcomingEvents,
          hvorjum_tiltokum: which_events_participated.toString(),
          samlad_meting: meting,
        }
      }).then(() => {
        navigate(`/survey_registered`)
      })

    }
  }


  const assertNotsameRank = () => {

    const accumulatedValue =
      parseInt(watchRankedFields.eksperimentir_í_telti_uttanfyri) +
      parseInt(watchRankedFields.framlogur_i_kongshøll) +
      parseInt(watchRankedFields.framsyningar_og_tiltøk_a_svalanum) +
      parseInt(watchRankedFields.rundvisingar_a_granskingarstovnum) +
      parseInt(watchRankedFields.snarroðukapping) +
      parseInt(watchRankedFields.visinda_voku_a_ferd)

    if (accumulatedValue === 21) {

      clearErrors(
        "eksperimentir_í_telti_uttanfyri",
        "framlogur_i_kongshøll",
        "framsyningar_og_tiltøk_a_svalanum",
        "rundvisingar_a_granskingarstovnum",
        "snarroðukapping",
        "visinda_voku_a_ferd"
      )
      return true
    }

    return false
  }

  if (loading) return <ContainerStyle></ContainerStyle>

  if (surveyData?.Survey.length > 0) {
    return (
      <ContainerStyle>
        <Layout>
          <MenuContainer />
          <PetalContainer name="petal container">
            <PetalMenu />
          </PetalContainer>
          <TitleStyle>Nøgdsemiskanning</TitleStyle>
          <AnsweredStyle>Tú hevur longu svarað</AnsweredStyle>
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
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <FormTitle> 1. Ert tú? <RedText>*</RedText></FormTitle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Skúlanæmingur í 1.-6. flokki" ref={register({ required: true })} />
          Skúlanæmingur í 1.-6. flokki
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Skúlanæmingur í 7.-10. flokki" ref={register({ required: true })} />
            Skúlanæmingur í 7.-10. flokki
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Miðnámsskúlanæmingur" ref={register({ required: true })} />
            Miðnámsskúlanæmingur
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Fólkaskúlalærari" ref={register({ required: true })} />
            Fólkaskúlalærari
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Undirvísari á miðnámi" ref={register({ required: true })} />
            Undirvísari á miðnámi
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Námfrøðingur ella hjálparfólk" ref={register({ required: true })} />
            Námfrøðingur ella hjálparfólk
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Granskari" ref={register({ required: true })} />
            Granskari
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Starvsfólk á granskingarstovni(ikki granskari)" />
            Starvsfólk á granskingarstovni(ikki granskari)
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Annað" ref={register({ required: true })} />
            Annað
          </LabelStyle>
          </InputContainer>

          <InputContainer>
            <FormTitle>2. Hvørjum tiltøkum luttókst tú í?<RedText>*</RedText></FormTitle>
            <div style={{ fontSize: "13px", marginBottom: "10px" }}>Vel øll tiltøkini, sum tú vitjaði ella fylgdi á netinum.</div>
            <LabelStyle>
              <InputStyle type="checkbox" name="which_events_participated" value="Vísindavøku á ferð" ref={register()} />
          Vísindavøku á ferð
          </LabelStyle>
            <LabelStyle>
              <InputStyle type="checkbox" name="which_events_participated" value="Framløgur í Kongshøll" ref={register()} />
            Framløgur í Kongshøll
          </LabelStyle>
            <LabelStyle>
              <InputStyle type="checkbox" name="which_events_participated" value="Snarrøðukapping" ref={register()} />
            Snarrøðukapping
            </LabelStyle>
            <LabelStyle>
              <InputStyle type="checkbox" name="which_events_participated" value="Handan av Miðlaheiðurslønini" ref={register()} />
            Handan av Miðlaheiðurslønini
          </LabelStyle>
            <LabelStyle>
              <InputStyle type="checkbox" name="which_events_participated" value="Avdúking av vinnara í filmskappingini" ref={register()} />
            Avdúking av vinnara í filmskappingini
            </LabelStyle>
            <LabelStyle>
              <InputStyle type="checkbox" name="which_events_participated" value="Stuttfilmar um gransking í appini" ref={register()} />
            Stuttfilmar um gransking í appini
            </LabelStyle>
          </InputContainer>
          <InputContainer>
            <FormTitle>3. Hvat var tað besta?</FormTitle>
        <TextAreaStyle name="the_best" ref={register({ required: false })} />
          </InputContainer>
          <InputContainer>
            <FormTitle> 4. Hvat saknaði tú?</FormTitle>
        <TextAreaStyle name="missed" ref={register({ required: false })} />
          </InputContainer>
          <InputContainer>
            <FormTitle>5.Hvørji tiltøk skulu vit hava komandi ár?</FormTitle>
            <div style={{fontSize: "13px", marginBottom: "10px"}}> Raðfest tiltøkini, har 1 er fyrsta val, 2 er annað o.s.fr.</div>
             {
              errors?.visinda_voku_a_ferd?.type === "validate" &&
              <RedText style={{ margin: "0 5px" }}>Syrg fyri at onki tal er líka.</RedText>
            }
            <LabelStyleRank>
              Vísindavøku á ferð
              <InputStyle type="number" max="6" min="1" name="visinda_voku_a_ferd" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              Framløgur í Kongshøll
              <InputStyle type="number" max="6" min="1" name="framlogur_i_kongshøll" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              Snarrøðukapping
              <InputStyle type="number" max="6" min="1" name="snarroðukapping" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              Framsýningar og tiltøk á svalanum
              <InputStyle type="number" max="6" min="1" name="framsyningar_og_tiltøk_a_svalanum" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              Eksperimentir í telti uttanfyri
              <InputStyle type="number" max="6" min="1" name="eksperimentir_í_telti_uttanfyri" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              <div>Rundvísingar á granskingarstovnum</div>
              <InputStyle type="number" max="6" min="1" name="rundvisingar_a_granskingarstovnum" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
          </InputContainer>
          <InputContainer>
            <FormTitle>6. Hvat evni vilt tú hoyra meira um næstu ferð? <RedText>*</RedText></FormTitle>
            <ColumnStyle>
              <ParagraphStyle></ParagraphStyle>
              <ParagraphStyle>Als ikki</ParagraphStyle>
              <ParagraphStyle>Kanska</ParagraphStyle>
              <ParagraphStyle>ja</ParagraphStyle>
              <ParagraphStyle>Ja, gjarna</ParagraphStyle>
              <ParagraphStyle>Absolut</ParagraphStyle>
              <LabelStyle htmlFor="heilsa">Heilsu</LabelStyle>
              <InputStyle type="radio" name="heilsa" value="Als ikki" ref={register({ required: true })} />
              <InputStyle type="radio" name="heilsa" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="heilsa" value="Ja" ref={register({ required: true })} />
              <InputStyle type="radio" name="heilsa" value="Ja, gjarna" ref={register({ required: true })} />
              <InputStyle type="radio" name="heilsa" value="Absolut" ref={register({ required: true })} />
              <LabelStyle htmlFor="nattura">Náttúru</LabelStyle>
              <InputStyle type="radio" name="nattura" value="Als ikki" ref={register({ required: true })} />
              <InputStyle type="radio" name="nattura" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="nattura" value="Ja" ref={register({ required: true })} />
              <InputStyle type="radio" name="nattura" value="Ja, gjarna" ref={register({ required: true })} />
              <InputStyle type="radio" name="nattura" value="Absolut" ref={register({ required: true })} />
              <LabelStyle htmlFor="tokni">Tøkni</LabelStyle>
              <InputStyle type="radio" name="tokni" value="Als ikki" ref={register({ required: true })} />
              <InputStyle type="radio" name="tokni" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="tokni" value="Ja" ref={register({ required: true })} />
              <InputStyle type="radio" name="tokni" value="Ja, gjarna" ref={register({ required: true })} />
              <InputStyle type="radio" name="tokni" value="Absolut" ref={register({ required: true })} />
              <LabelStyle htmlFor="samfelag">Samfelag</LabelStyle>
              <InputStyle type="radio" name="samfelag" value="Als ikki" ref={register({ required: true })} />
              <InputStyle type="radio" name="samfelag" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="samfelag" value="Ja" ref={register({ required: true })} />
              <InputStyle type="radio" name="samfelag" value="Ja, gjarna" ref={register({ required: true })} />
              <InputStyle type="radio" name="samfelag" value="Absolut" ref={register({ required: true })} />
              <LabelStyle htmlFor="hugvisindi">Hugvísindi</LabelStyle>
              <InputStyle type="radio" name="hugvisindi" value="Als ikki" ref={register({ required: true })} />
              <InputStyle type="radio" name="hugvisindi" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="hugvisindi" value="Ja" ref={register({ required: true })} />
              <InputStyle type="radio" name="hugvisindi" value="Ja, gjarna" ref={register({ required: true })} />
              <InputStyle type="radio" name="hugvisindi" value="Absolut" ref={register({ required: true })} />
            </ColumnStyle>
          </InputContainer>
          <InputContainer>
            <FormTitle> 7. Samlað meting<RedText>*</RedText></FormTitle>
            <div style={{fontSize: "13px", marginBottom: "10px"}}>1-10 (har 10 er best)</div>
            <input type="number" min="1" max="10" name="meting" ref={register({ required: true })} />
          </InputContainer>
          <button type="submit">Góðkenn</button>
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
  align-items: fcenter;
  justify-content: flex-start;
  margin: 0 5px;
`

const LabelStyleRank = styled(LabelStyle)`
  justify-content: space-between;
  width: 70%;
  margin-bottom: 5px;
`

const InputStyle = styled.input`
  width: 20px;
  height: 20px;
`

const TextAreaStyle = styled.textarea`
    width: 90%;
    min-height: 120px;
    margin: 0px 5px;
`

const ColumnStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
`

const TitleStyle = styled.div`
  color: #58A449;
  display: none;
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
  flex-idrection: row;
  color: #58A449;
  margin-bottom: 5px;
  `

const ParagraphStyle = styled.p`
`

const RedText = styled.div`
  color: red;
  font-size: 14px;
`
export default Survey;

export const PageQuery = graphql`
query fetchAlreadyRegistered {
  allStrapiEftirmeting {
    nodes {
      tilfar
    }
  }
  allStrapiDiverses{
      edges {
        node {
          id
          title
          content
          link
          date
        }
      }
    }
}
`
