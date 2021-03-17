import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

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
      <Button aria-controls="option-menu" aria-haspopup="true" onClick={handleClick}>
        Options
      </Button>
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
            <MenuItem>
              <Typography variant="inherit" noWrap onClick={editButton}>
                Edit
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="inherit" noWrap onClick={deleteButton} name={thisId}>
                Delete
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </div>
  )
}
