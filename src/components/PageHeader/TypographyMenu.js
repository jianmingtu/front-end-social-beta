import React from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import { signOutIcon, settingIcon } from '../SVG'

const useStyles = makeStyles({
  root: {
    width: 230,
  },
})

export default function TypographyMenu({toProfile, signOut}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <MenuList>
        <MenuItem onClick={toProfile}>
          <ListItemIcon>
            {settingIcon}				
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            {signOutIcon}
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Sign Out 
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}
