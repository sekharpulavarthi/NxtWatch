import styled from 'styled-components'
import {BsMoon} from 'react-icons/bs'

export const NavHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
`

export const WebsiteLogo = styled.img`
  width: 200px;
`

export const BsMoonIcon = styled(BsMoon)`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`

export const ProfileImg = styled.img`
  width: 50px;
  margin-right: 20px;
`

export const LogoutBtn = styled.button`
  background: transparent;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  padding: 10px;
  border-radius: 7px;
`

export const HeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ThemeButton = styled.button`
  background: transparent;
  border: none;
`
