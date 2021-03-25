import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import Fade from '@material-ui/core/Fade'
import TypographyMenu from './TypographyMenu'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { IconButton, Typography } from '@material-ui/core'
import { PRIMARY_COLOR }  from '../../constant'

export default function FadeMenu({toProfile, signOut}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
    
      <IconButton style={{color : PRIMARY_COLOR}}   aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        <ArrowDropDownCircleIcon fontSize="large" />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}

        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
          }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <TypographyMenu toProfile={toProfile} signOut={signOut} />
      </Menu>
    </div>
  )
}
