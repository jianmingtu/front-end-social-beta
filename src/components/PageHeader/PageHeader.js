import React, {useState} from 'react'
import { useHistory } from 'react-router-dom' 

import styles from './PageHeader.module.css'
import FadeMenu from './FadeMenu'
import { PRIMARY_COLOR }  from '../../constant'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar, Avatar, Link, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
        border: '3px solid #18A0FB' 
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: PRIMARY_COLOR,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    fontSize: "1.2rem",
    color: PRIMARY_COLOR
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },

    loginButton : {
    borderRadius: 35,
    backgroundColor: PRIMARY_COLOR,
    padding: "4px 20px",
    color: "white",
    fontSize: "1.2rem"
  }

}));

export default function PageHeader({user, toProfile, signOut, onSearch}) {
  const history = useHistory();
  const classes = useStyles()

    const [search, setSearch] = useState("")

  const searching = event => {
    event.preventDefault()
    onSearch({search})
  }


  return (
    <div className={styles.container}>
      <p className={styles.leftContainer}><button className={styles.logoButton} onClick={() => history.push("/")}>
        <img src="./logo.png" alt="socialCafe"  width="200px"  height="30px"  />
      </button>


          <form className={classes.search} onSubmit={searching}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Post / User …"
              value={search}
              onChange={e => setSearch(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </form>



</p>
      {
        !!user ?
          <span className={styles.rightContainer}>
            <img className={styles.avatar} src={user.avatar} />
            <p style={{color : PRIMARY_COLOR, fontSize: "1.2rem", fontWeight: "bold" }} >{user["cognito:username"]}</p>
            <FadeMenu toProfile={toProfile} signOut={signOut} />
          </span>        
        :
          <span className={styles.rightContainer}>
            <Button size="medium" className={classes.loginButton} onClick = {() => history.push("/login")} variant="contained">Login</Button>
          </span>
      }
    </div>
  )
}
