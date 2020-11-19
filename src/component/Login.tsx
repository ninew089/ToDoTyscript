import React from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import {
  Container,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from '@material-ui/core'
import * as yup from 'yup'
import axios from 'axios'
const useStyles = makeStyles((theme: Theme) => ({
  input: {
    color: '#0f1626',
    fontWeight: 700,
    '& .MuiInputBase-root.MuiOutlineInput-root': {
      color: '#45A29E',
      borderColor: '#757575',
      fontWeight: 700,
    },
  },
  textfield: {
    marginTop: 10,

    '& .MuiFormHelperText-root.Mui-error ': {
      color: 'ff533d',
      fontWeight: 700,
      borderWidth: '3px',
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderColor: 'ff533d',
      borderWidth: '3px',
    },
    '& label.MuiFormLabel-root': {
      fontWeight: 700,
      '&:after .Mui-error': {
        borderColor: '#ff533d',
        borderWidth: '3px',
      },
    },
    '& label.Mui-focused': {
      color: '#132740',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ffae0c',
    },
    '& .MuiOutlinedInput-root': {
      borderWidth: '3px',
      '& fieldset': {
        borderColor: '#ffae0c',
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: '#a8c6ff',
        borderWidth: '3px',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#a8c6ff',
        borderWidth: '3px',
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ff533d',
        borderWidth: '3px',
      },
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),

    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    marginTop: '10px',
    background: '#ff533dcf',
    borderRadius: 20,
    padding: 8,
    color: '#fdfdfd',
    '&:hover': {
      background: '#ff533d',
    },
  },

  container: {
    display: 'flex',
    alignItems: 'center',
  },

  border: {
    borderBottom: '1px solid darkgray',
    width: '100%',
  },

  content: {
    padding: ' 0 10px 0 10px',
  },
  divider: {
    marginTop: '20px',
  },
  textdivider: {
    color: 'royalblue',
  },
  nav: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  form: {

    height: '100%',
    marginTop: '20px',
  },
  font: {
    fontWeight: 700,
    color: '#0f1726',
  },
  image: {
    margin: 10,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
}))

export default function SignIn() {
  const history =useHistory()
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    validationSchema: yup.object().shape({
      userid: yup.string().required()
        ,
      password: yup.string().required().min(4),
    }),
   
  })
  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState(false);

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
    
}
  

  
  const onLogin = async(loginInfo: object) => { 
        const result = await axios.post(
          `/tokens`,loginInfo,{headers}
        );
        setData(result.data);
        console.log(result.status)
    if (result.status === 200) {
        setStatus(true)
      document.cookie = `token=${result.data.token}`;
      history.push('/todo')
          }

    console.log(data)
  }

  return (
    <Container component="main" maxWidth="xs">
      <form autoComplete="off" className={classes.form}>
        <CssBaseline />
        <div className={classes.paper}>    
          <Typography component="h1" variant="h5" className={classes.font}>
                      Login To-Do
          </Typography>
                  {console.log(errors)}
          <form className={classes.form} noValidate>
            <TextField
              label="userid"
              name="userid"
              inputRef={register}
              variant="outlined"
              className={classes.textfield}
       
              fullWidth
              helperText={errors.userid && errors.userid.message }
              error={!!errors.userid}
            />
            <TextField
              className={classes.textfield}
              label="password"
              type="password"
              name="password"
              inputRef={register}
              fullWidth
              variant="outlined"
              helperText={errors.password && errors.password.message }
              error={!!errors.password}
       
            />
      
            <Button
              type="submit"
                          fullWidth
                          
              className={classes.submit}
              onClick={handleSubmit(onLogin)}
            >
                          LOGIN
            </Button>
                     
  
     
     
          </form>
        </div>
      </form>
    </Container>
  )
}