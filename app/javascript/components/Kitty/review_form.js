import React, { Fragment } from 'react'
import {
  RatingContainer, RatingBox, Field, SubmitBtn, ReviewWrapper, ReviewHeadline, RatingBoxTitle,
} from './review_form.styles'

const ReviewForm = (props) => {
  const ratingOptions = [5, 4, 3, 2, 1].map((score, index) => (
    <Fragment key={index}>
      <input type="radio" value={score} checked={props.review.score == score} onChange={() => console.log('onChange')} name="rating" id={`rating-${score}`} />
      <label onClick={props.setRating.bind(this, score)} />
    </Fragment>
  ))

  return (
    <ReviewWrapper>
      <form>
        <ReviewHeadline>
          Have An Experience with
          {props.name}
          ? Add Your Review!
        </ReviewHeadline>
        <Field>
          <input onChange={props.handleChange} type="text" name="title" placeholder="Review Title" value={props.review.title || ''} />
        </Field>
        <Field>
          <input onChange={props.handleChange} type="text" name="description" placeholder="Review Description" value={props.review.description || ''} />
        </Field>
        <Field>
          <RatingContainer>
            <RatingBoxTitle>Rate This Kitty</RatingBoxTitle>
            <RatingBox>
              {ratingOptions}
            </RatingBox>
          </RatingContainer>
        </Field>
        <SubmitBtn type="button" onClick={props.handleSubmit}>Create Review</SubmitBtn>
      </form>
    </ReviewWrapper>
  )
}

export default ReviewForm
