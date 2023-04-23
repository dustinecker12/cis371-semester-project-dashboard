import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import GoogleIcon from '@mui/icons-material/Google';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const userSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('Invalid email').required('required'),
  password: yup.string().required('required'),
});

type Creds = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) nav('/');
    if (error) console.log('Oh no!', error);
  });

  const handleFormSubmit = (values: Creds) => {
    setName(`${values.firstName} ${values.lastName}`);
    setEmail(values.email);
    setPassword(values.password);

    registerWithEmailAndPassword(
      `${values.firstName} ${values.lastName}`,
      values.email,
      values.password
    );
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
        Sign up
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
                color="primary"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  gridColumn: 'span 2',
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  gridColumn: 'span 2',
                }}
              />
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
                Sign up
              </Button>
              <Typography m="10px" color="primary">
                Or sign up using
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
                Already have an account?{' '}
                <Link to="/login" color="green">
                  Log in
                </Link>
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
