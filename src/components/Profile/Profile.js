import React, { useState } from 'react';
import { TextField, Card, Tabs, Close, Tab, CardContent, CardHeader, Button, IconButton, Typography, CardMedia } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import {PRIMARY_COLOR, BUTTON_COLOR, BKG_COLOR }  from '../../constant'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles((theme) => ({
    root: {
        
    },

    appBar: {
        position: 'relative',
        color: 'black',
        backgroundColor: 'white',
        height: 60,
    },

    title: {
        marginLeft: "auto",
        marginRight: "auto",
  
    },

    formContainer: {
        margin: "40px",
    },    

    form: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        '& > *': {
        margin: "10px 0"
    }},

    uploadRow : {
        display: 'flex',
        justifyContent: "space-around",       
    },
    input: {
        display: 'none',
    },
    uploadIcon : {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "50%",
    },
    imagePreview: {
        maxWidth: 200,
        maxHeight: 300,
        margin: 0,
        position: "relative"
    },
    imagePreviewHeader: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        padding: 0
    },
    submitRow : {
        display: 'flex',
        justifyContent: "center"
    },
    submitButton : {

        borderRadius: 35,
        backgroundColor: PRIMARY_COLOR,
        padding: "4px 20px",
        color: "white",
        fontSize: "1.2rem"
    }
}));





export default function Profile( {open, handleClose, error }) {
 const classes = useStyles();
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
   const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")

   const submit = event => {
    event.preventDefault()
    // if (tabValue === 0) {
    //   onSubmit({type: "url", imageUrl, description})
    // } else {
    //   onSubmit({type: "file", file, description})
    // }
  }

    const deleteImage = image => {
    setFile(null)
    setFilePreview(null)
  }

  	const fileSelected = (event) => {
    const file = event.target.files[0]
		setFile(file)
    const reader = new FileReader()
    reader.onload = e => setFilePreview(e.target.result)
    reader.readAsDataURL(file)
	}


  return (
    <div>

      <Dialog  fullWidth='true'
        maxWidth='md'  open={open} onClose={handleClose} className={classes.root} >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" style={{color : PRIMARY_COLOR}} onClick={handleClose} aria-label="close">
                <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Profile
            </Typography>
          </Toolbar>
        </AppBar>
 <div className={classes.formContainer}>
    <form onSubmit={submit} className={classes.form}>

        <div className={classes.uploadRow}>
            <input accept="image/*" className={classes.input} onChange={fileSelected} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file" className="uploadIcon">
                <Typography>Upload Photo</Typography>
                <IconButton style={{color : PRIMARY_COLOR}}  aria-label="upload picture" component="span" >
                <PhotoCamera fontSize="large" />
                </IconButton>
            </label>
       
            <Card className={classes.imagePreview}>
                <CardHeader className={classes.imagePreviewHeader}
                    action={
                    <IconButton aria-label="close" onClick={deleteImage}  size="large">
                        <CloseIcon  />
                    </IconButton>
                    }
                />
                <CardMedia
                    component="img"
                    image={filePreview}
                />
            </Card>
         </div>

        <Divider />
        <Typography>Describe Yourself</Typography>

        <TextareaAutosize aria-label="empty textarea" placeholder="Bio" 
            value={description} 
            rowsMin = {4} 
            onChange={e => setDescription(e.target.value)} 
        />
        { !!error && <Typography>{error}</Typography>}
        <span className={classes.submitRow}><Button size="medium"  type="submit"  className={classes.submitButton} 
    variant="contained" >Submit</Button> </span>

    </form>
</div>
      </Dialog>
    </div>
  );
}
