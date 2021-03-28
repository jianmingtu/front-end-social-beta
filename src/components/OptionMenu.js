import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { PRIMARY_COLOR, BUTTON_COLOR }  from '../constant'

export default function OptionMenu({editButton, deleteButton, thisId}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>

      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        fontSize="large"
      >
        <MoreVertIcon style={{ color: PRIMARY_COLOR }} />
      </IconButton>

      <Menu
        id="option-menu"
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
        <Paper>
          <MenuList>
            <MenuItem onClick={editButton}>
              <Typography variant="inherit" noWrap>
                Edit
              </Typography>
            </MenuItem>
            <MenuItem onClick={deleteButton}>
              <Typography variant="inherit" noWrap name={thisId}>
                Delete
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </div>
  )
}
