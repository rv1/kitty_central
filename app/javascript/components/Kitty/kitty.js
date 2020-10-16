import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './header'
import ReviewForm from './review_form'
import Review from './review'
import { Wrapper, Column, Main } from './kitty.styles'

const Kitty = (props) => {
  const [kitty, setKitty] = useState({})
  const [review, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const slug = props.match.params.slug
    const url = `/api/v1/kitties/${slug}`
    axios.get(url)
      .then(response => {
        setKitty(response.data)
        setLoaded(true)
      })
      .catch(response => console.log(response))
  }, [])

  const handleChange = (e) => {
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    const kitty_id = kitty.data.id
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post("/api/v1/reviews", {review, kitty_id})
      .then(response => {
        const included = [...kitty.included, response.data.data]
        setKitty({...kitty, included})
        setReview({title: '', description: '', score: 0})
      })
      .catch(response => {})
  }

  const setRating = (score, e) => {
    setReview({...review, score})
  }
  let reviews
  if (loaded && kitty.included) {
    reviews = kitty.included.map((item, index) => {
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
      {loaded &&
        <React.Fragment>
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
        </React.Fragment>
      }
    </Wrapper>
  )
}

export default Kitty
