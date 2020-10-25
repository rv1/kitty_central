import axios from 'axios'
import { ACTIONS } from '../providers/cat_provider'

export async function fetchAllKitties(dispatch) {
  dispatch({ type: ACTIONS.START_LOADING })
  try {
    const response = await axios.get('/api/v1/kitties')
    dispatch({ type: ACTIONS.SET_KITTIES, payload: response.data.data })
  } catch (error) {
    console.error(error)
  } finally {
    dispatch({ type: ACTIONS.FINISH_LOADING })
  }
}

export async function fetchKittyBySlug(dispatch, slug) {
  dispatch({ type: ACTIONS.START_LOADING })
  try {
    const response = await axios.get(`/api/v1/kitties/${slug}`)
    dispatch({ type: ACTIONS.SET_KITTY, payload: response.data })
  } catch (error) {
    console.error(error)
  } finally {
    dispatch({ type: ACTIONS.FINISH_LOADING })
  }
}

export async function postReviewForKitty(dispatch, review, kitty) {
  dispatch({ type: ACTIONS.START_LOADING })
  try {
    const kitty_id = kitty.data.id
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    const response = await axios.post('/api/v1/reviews', { review, kitty_id })
    dispatch({ type: ACTIONS.POST_REVIEW, payload: response.data.data })
  } catch (error) {
    console.error(error)
  } finally {
    dispatch({ type: ACTIONS.FINISH_LOADING })
  }
}
