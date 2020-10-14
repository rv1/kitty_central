import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Header from './header'
import ReviewForm from './review_form'
import Review from './review'
import styled from 'styled-components'
import { 
  KittyDispatchContext,
  KittyStateContext, 
  fetchKittyBySlug,
  subscribeToKitties,
  unsubscribeFromKitties,
} from '../../context/KittyContext'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background: #000
  }
`

const Main = styled.div`
  padding-left: 50px;
`

const canDisplayReviews = (kitty) => !kitty.loading && kitty.included
const sortByDescendingId = (a, b) => b.id - a.id

const Kitty = (props) => {
  const dispatch = useContext(KittyDispatchContext)
  const { currentKitty } = useContext(KittyStateContext)
  const [review, setReview] = useState({})

  useEffect(() => {
    const slug = props.match.params.slug
    const channel = subscribeToKitties(dispatch)

    fetchKittyBySlug(dispatch, { slug })

    return () => unsubscribeFromKitties(channel)
  }, [])

  if (!currentKitty) { return 'No kitty :(' }
  if (currentKitty.loading) { return 'Loading...' }

  const handleChange = (e) => {
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    // Page reloads... This does nothing (and is 404 if we add e.preventDefault())
    const kitty_id = currentKitty.data.id
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post("/api/v1/reviews", { review, kitty_id })
      .then(response => {
        dispatch({ type: 'ADD_REVIEW', payload: response.data.data })
        setReview({ title: '', description: '', score: 0 })
      })
      .catch(error => console.error(error))
  }

  const setRating = (score, e) => {
    setReview({...review, score })
  }
  let reviews

  if (canDisplayReviews(currentKitty)) {
    reviews = currentKitty.included
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
  }

  return (
    <Wrapper>
      <Column>
        <Main>
          <Header
            attributes={currentKitty.data.attributes}
            reviews={currentKitty.included}
          />
          {reviews}
        </Main>
      </Column>
      <Column>
        <ReviewForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setRating={setRating}
          attributes={currentKitty.data.attributes}
          review={review}
        />
      </Column>
    </Wrapper>
  )
}

export default Kitty
