import React from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import {signOutIcon, settingIcon} from '../SVG'
import Profile from '../Profile/Profile'

const useStyles = makeStyles({
  root: {
    width: 230,
  },
})

export default function TypographyMenu({toProfile, signOut}) {

 const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Paper className={classes.root}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            {settingIcon}				
          </ListItemIcon>
          <Typography variant="inherit" noWrap onClick={handleClickOpen}>
            Profile
          </Typography>
          <Profile fullScreen open={open} handleClose={handleClose} />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            {signOutIcon}
          </ListItemIcon>
          <Typography variant="inherit" noWrap onClick={signOut}>
            Sign Out 
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}
