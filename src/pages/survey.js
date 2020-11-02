import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { graphql, navigate } from 'gatsby';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import PetalMenu from '../components/front_page_large_screens/petalMenu';
import MenuContainer from '../components/header/menuContainer';
import Layout from '../components/layout';
import { media } from '../utils/mediaTemplate'


const Survey = ({ data }) => {
  const { register, handleSubmit, watch, clearErrors, errors } = useForm()
  const [answer, setAnswer] = useState({})
  const watchRankedFields = watch([
    "visinda_voku_a_ferd",
    "framlogur_i_kongshøll",
    "snarroðukapping",
    "framsyningar_og_tiltøk_a_svalanum",
    "royndir_og_fiskar_i_telti_uttanfyri",
    "rundvisingar_a_granskingarstovnum"
  ])
  const watchDifferentInput = watch("er")
  const [createSurveyAnwser] = useMutation(gql`
  mutation CreateSurvey(
    $email: String,
    $ert_tu: String!,
    $hvat_evni: String!,
    $hvat_saknadi: String,
    $tad_besta: String,
    $hvorji_tiltok: String!,
    $hvorjum_tiltokum: String!,
    $samlad_meting: numeric!) {
  insert_survey_one(object: {
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
  `)

  const [fetchUser, { data: survey_data}] = useLazyQuery(gql`
query fetchemail($email: String!) {
  survey(where: {email: {_eq: $email}}) {
    id
  }
}
  `, {
    onCompleted() {
      if (survey_data.survey.length === 0) {

        createSurveyAnwser({
          variables: {
            email: answer.email,
            ert_tu: answer.er,
            hvat_evni: `
          Heilsu: ${answer.heilsa},
          Náttúru: ${answer.nattura},
          Tøkni: ${answer.tokni},
          Samfelag: ${answer.samfelag},
          Hugvisindi: ${answer.hugvisindi}
          `,
            hvat_saknadi: answer.missed,
            tad_besta: answer.the_best,
            hvorji_tiltok: answer.upcomingEvents,
            hvorjum_tiltokum: answer.which_events_participated.toString(),
            samlad_meting: answer.meting,
          }
        }).then(() => {
          navigate(`/survey_registered`)
        })
      }
    }
  })

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
      rundvisingar_a_granskingarstovnum,
      royndir_og_fiskar_i_telti_uttanfyri,
      nattura,
      heilsa,
      tokni,
      samfelag,
      hugvisindi,
      meting,
      email,
      text_er

    } = data

    const upcomingEvents = `
      Vísindavøku á ferð: ${visinda_voku_a_ferd},
      Framløgur í Kongshøll: ${framlogur_i_kongshøll},
      Snarrøðukapping: ${snarroðukapping},
      Framsýningar og tiltøk á svalanum: ${framsyningar_og_tiltøk_a_svalanum},
      Royndir og fiskar í telti uttanfyri: ${royndir_og_fiskar_i_telti_uttanfyri},
      Rundvísingar á granskingarstovnum: ${rundvisingar_a_granskingarstovnum}
    `

    if (
      er
      && which_events_participated
      && the_best
      && nattura
      && heilsa
      && tokni
      && samfelag
      && hugvisindi
      && meting) {
      await setAnswer({
        er: er !== "Annað" ? er : text_er,
        which_events_participated: which_events_participated,
        missed: missed,
        the_best: the_best,
        upcomingEvents: upcomingEvents,
        nattura: nattura,
        heilsa: heilsa,
        tokni: tokni,
        samfelag: samfelag,
        hugvisindi: hugvisindi,
        meting: meting,
      })
      await fetchUser({
        variables: {
          email: email ? email : ``
        }
      })

    }
  }


  const assertNotsameRank = () => {

    const accumulatedValue =
      parseInt(watchRankedFields.royndir_og_fiskar_i_telti_uttanfyri) +
      parseInt(watchRankedFields.framlogur_i_kongshøll) +
      parseInt(watchRankedFields.framsyningar_og_tiltøk_a_svalanum) +
      parseInt(watchRankedFields.rundvisingar_a_granskingarstovnum) +
      parseInt(watchRankedFields.snarroðukapping) +
      parseInt(watchRankedFields.visinda_voku_a_ferd)

    if (accumulatedValue === 21) {

      clearErrors(
        "royndir_og_fiskar_i_telti_uttanfyri",
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



  if (survey_data?.survey.length > 0) {
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
              <InputStyle name="er" type="radio" value="Íverksetari" ref={register({ required: true })} />
            Íverksetari
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Alment sett/ur" ref={register({ required: true })} />
            Alment sett/ur
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Privat sett/ur" ref={register({ required: true })} />
            Privat sett/ur
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Pensjónist" ref={register({ required: true })} />
            Pensjónist
          </LabelStyle>
            <LabelStyle>
              <InputStyle name="er" type="radio" value="Lesandi á hægri námi ella yrkisútbúgving" ref={register({ required: true })} />
            Lesandi á hægri námi ella yrkisútbúgving
          </LabelStyle>
            <LabelStyle style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <div>
                <InputStyle name="er" type="radio" value="Annað" ref={register({ required: true })} />
              Annað
              </div>
              {watchDifferentInput === "Annað" && <input type="text" name="text_er" ref={register({ required: true })} />}
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
            <FormTitle>3. Hvat var tað besta?<RedText>*</RedText></FormTitle>
            <TextAreaStyle name="the_best" ref={register({ required: true })} />
          </InputContainer>
          <InputContainer>
            <FormTitle> 4. Hvat saknaði tú?</FormTitle>
            <TextAreaStyle name="missed" ref={register({ required: false })} />
          </InputContainer>
          <InputContainer>
            <FormTitle>5.Hvørji tiltøk skulu vit hava komandi ár?<RedText>*</RedText></FormTitle>
            <div style={{ fontSize: "13px", marginBottom: "10px" }}> Raðfest tiltøkini, har 1 er fyrsta val, 2 er annað o.s.fr.</div>
            {
              errors?.visinda_voku_a_ferd?.type === "validate" &&
              <RedText style={{ margin: "0 5px" }}>Syrg fyri at onki tal er líka.</RedText>
            }
            <LabelStyleRank>
              Vísindavøku á ferð
              <InputBoxStyle type="number" max="6" min="1" name="visinda_voku_a_ferd" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              Framløgur í Kongshøll
              <InputBoxStyle type="number" max="6" min="1" name="framlogur_i_kongshøll" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              Snarrøðukapping
              <InputBoxStyle type="number" max="6" min="1" name="snarroðukapping" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              Framsýningar og tiltøk á svalanum
              <InputBoxStyle type="number" max="6" min="1" name="framsyningar_og_tiltøk_a_svalanum" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              Royndir og fiskar í telti uttanfyri
              <InputBoxStyle type="number" max="6" min="1" name="royndir_og_fiskar_i_telti_uttanfyri" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
            <LabelStyleRank>
              Rundvísingar á granskingarstovnum
              <InputBoxStyle type="number" max="6" min="1" name="rundvisingar_a_granskingarstovnum" ref={register({ required: true, validate: value => assertNotsameRank(value) === true })} />
            </LabelStyleRank>
          </InputContainer>
          <InputContainer>
            <FormTitle>6. Hvat evni vilt tú hoyra meira um næstu ferð? <RedText>*</RedText></FormTitle>
            <ColumnStyle>
              <ParagraphStyle></ParagraphStyle>
              <ParagraphStyle>Nei</ParagraphStyle>
              <ParagraphStyle>Kanska</ParagraphStyle>
              <ParagraphStyle>ja</ParagraphStyle>
              <LabelStyle htmlFor="heilsa">Heilsu</LabelStyle>
              <InputStyle type="radio" name="heilsa" value="Nei" ref={register({ required: true })} />
              <InputStyle type="radio" name="heilsa" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="heilsa" value="Ja" ref={register({ required: true })} />
              <LabelStyle htmlFor="nattura">Náttúru</LabelStyle>
              <InputStyle type="radio" name="nattura" value="Nei" ref={register({ required: true })} />
              <InputStyle type="radio" name="nattura" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="nattura" value="Ja" ref={register({ required: true })} />
              <LabelStyle htmlFor="tokni">Tøkni</LabelStyle>
              <InputStyle type="radio" name="tokni" value="Nei" ref={register({ required: true })} />
              <InputStyle type="radio" name="tokni" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="tokni" value="Ja" ref={register({ required: true })} />
              <LabelStyle htmlFor="samfelag">Samfelag</LabelStyle>
              <InputStyle type="radio" name="samfelag" value="Nei" ref={register({ required: true })} />
              <InputStyle type="radio" name="samfelag" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="samfelag" value="Ja" ref={register({ required: true })} />
              <LabelStyle htmlFor="hugvisindi">Hugvísindi</LabelStyle>
              <InputStyle type="radio" name="hugvisindi" value="Nei" ref={register({ required: true })} />
              <InputStyle type="radio" name="hugvisindi" value="Kanska" ref={register({ required: true })} />
              <InputStyle type="radio" name="hugvisindi" value="Ja" ref={register({ required: true })} />
            </ColumnStyle>
          </InputContainer>
          <InputContainer>
            <FormTitle> 7. Samlað meting<RedText>*</RedText></FormTitle>
            <div style={{ fontSize: "13px", marginBottom: "10px" }}>1-10  (har 10 er best)</div>
            <input type="number" min="1" max="10" name="meting" ref={register({ required: true })} />
          </InputContainer>
          <InputContainer>
            <FormTitle>Um tú ynskir at vera við í lutakastinum mást tú skriva tín teldupost her</FormTitle>
            <input type="text" name="email" ref={register({ required: false })} />
          </InputContainer>
          <SubmitButton type="submit">Góðkenn</SubmitButton>
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
  align-items: center;
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

const InputBoxStyle = styled(InputStyle)`
  width: 25px;
  height: 25px;
`

const TextAreaStyle = styled.textarea`
  width: 90%;
  min-height: 120px;
  margin: 0px 5px;
`

const ColumnStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

const SubmitButton = styled.button`
  background-color: #74AB58;
  color: white;
  width: 150px;
  height: 40px;
  margin: 5px 0;
  border: none;
  &:active {
    opacity: 0.1;
  }
  cursor: pointer;
`
export default Survey;

export const PageQuery = graphql`
query fetchAlreadyRegistered {
  allStrapiSurveyAlreadyRegistered {
    nodes {
      content
    }
  }
}
`
