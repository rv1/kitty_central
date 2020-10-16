import React, { useEffect } from 'react'
import Header from './header'
import ReviewForm from './review_form'
import Review from './review'
import { Wrapper, Column, Main } from './kitty.styles'
import { ACTIONS, useKitty } from "../../providers/cat_provider";
import { fetchKittyBySlug, postReviewForKitty } from "../../clients/v1";

const sortByDescendingId = (a, b) => b.id - a.id

const Kitty = (props) => {
  const [state, dispatch] = useKitty()
  const { kitty, review, loading } = state

  useEffect(() => {
    const slug = props.match.params.slug
    fetchKittyBySlug(dispatch, slug)
  }, [])

  const handleChange = (e) => {
    dispatch({ type: ACTIONS.SET_REVIEW, payload: {...review, [e.target.name]: e.target.value}})
  }

  const handleSubmit = (e) => {
    postReviewForKitty(dispatch, review, kitty)
  }

  const setRating = (score, e) => {
    dispatch({ type: ACTIONS.SET_REVIEW, payload: {...review, score}})
  }

  if (loading) { return 'Loading...' }
  if (!kitty || !kitty.data) { return 'No kitty :(' }

  let reviews = kitty.included
      .sort(sortByDescendingId)
      .map((item, index) => {
        return (
          <Review
            key={index}
            title={item.attributes.title}
            description={item.attributes.description}
            score={item.attributes.score}
          />
        )
      })

  return (
    <Wrapper>
      <Column>
        <Main>
          <Header
            attributes={kitty.data.attributes}
            reviews={kitty.included}
          />
          {reviews}
        </Main>
      </Column>
      <Column>
        <ReviewForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setRating={setRating}
          attributes={kitty.data.attributes}
          review={review}
        />
      </Column>
    </Wrapper>
  )
}

export default Kitty
