import styled from 'styled-components'
import {BsSearch} from 'react-icons/bs'

export const WebsiteLogo = styled.img`
  width: 200px;
`

export const DescriptionTxt = styled.p`
  font-size: 17px;
`

export const GetItNowBtn = styled.button`
  background: transparent;
`

export const NxtWatchPopupContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  border: 2px solid orange;
  width: 70vw;
  padding: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  display: ${props => (props.showPopUpStatus ? 'none' : 'flex')};
`

export const HomeContainer = styled.div`
  display: flex;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
`

export const NxtWatchPopupUpperContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const CloseButton = styled.button`
  background: transparent;
`

export const HomeSubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  border-radius: 8px;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
  margin-top: 20px;
  width: 50%;
`

export const SearchInput = styled.input`
  background-color: #f1f5f9;
  color: #0f172a;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  border: none;
  outline: none;
  flex-grow: 1;
`

export const SearchIcon = styled(BsSearch)`
  color: #475569;
  width: 20px;
  height: 20px;
`

export const VideoItemsContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
`
