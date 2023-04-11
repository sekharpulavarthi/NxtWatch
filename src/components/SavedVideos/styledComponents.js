import styled from 'styled-components'

export const SavedVideosContainer = styled.div`
  display: flex;
  ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
`

export const SavedVideosSubContainer = styled.ul`
  display: flex;
  list-style-type: none;
`
