import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import GoogleIcon from '@mui/icons-material/Google';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const initialValues = {
  email: '',
  password: '',
};

const userSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('required'),
  password: yup.string().required('required'),
});

type Creds = {
  email: string;
  password: string;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) nav('/');
    if (error) console.log('Oh no!', error);
  }, [user, loading]);

  const handleFormSubmit = (values: Creds) => {
    setEmail(values.email);
    setPassword(values.password);

    logInWithEmailAndPassword(values.email, values.password);
  };

  return (
    <Box
      m="20px auto"
      p="100px 20px"
      maxWidth="500px"
      sx={{
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h2" mb="20px" color="primary">
        Log in
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: 'span 4',
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{
                  gridColumn: 'span 4',
                }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              mt="20px"
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ margin: '0 5px 0 5px', borderRadius: '20px' }}
              >
                Log in
              </Button>
              <Typography m="10px" color="primary">
                Or log in using
                <IconButton
                  onClick={signInWithGoogle}
                  size="small"
                  sx={{
                    ml: '5px',
                    color: '#DB4437',
                  }}
                >
                  <GoogleIcon />
                </IconButton>
              </Typography>
              <Typography m="10px" color="primary">
                Don't have an account?{' '}
                <Link to="/signup" color="green">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
