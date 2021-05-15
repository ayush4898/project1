import React, { Component } from 'react'
import { Formik } from 'formik'
import { object, ref, string } from 'yup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import {Grid,Paper } from '@material-ui/core';

import axios from 'axios'

import Spinner from './spinner'
import Alert from './alert'

export default class FormPasswordReset extends Component {
  state = {
    passChangeSuccess: false,
    message: ''
  }

  _handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false,
      message: ''
    }))
  }

  _renderModal = () => {
    const onClick = () => {
      this.setState(() => ({ passChangeSuccess: false ,message: ''}))
    }

    return (
      <Alert
        isOpen={this.state.passChangeSuccess}
        onClose={this._handleClose}
        handleSubmit={onClick}
        title="Password Reset"
        text={this.state.message}
        submitButtonText="Done"
      />
    )
  }

  _handleSubmit = ({
    currentPass,
    newPass,
    confirmPass,
    setSubmitting,
    resetForm,
  }) => {
    // fake async login
    setTimeout(async () => {
      axios.post(`/changePassword/${localStorage.userId}`, { currentPassword: currentPass ,newPassword: newPass })
        .then((data) => {
          console.log(data);
          setSubmitting(false)
          this.setState(() => ({
            ...this.state,
            passChangeSuccess: true,
            message: data.data.message
          }));
        resetForm()
      })
    }, 1000)
  }

  render() {
    const paperStyles={
      padding:20,
      height:'auto',
      width:300,
      margin:'20px auto'
    };
    return (
      <Formik
        initialValues={{
          currentPass: '',
          newPass: '',
          confirmPass: '',
        }}
        validationSchema={object().shape({
          currentPass: string().required('Current password is required'),
          newPass: string().required('New password is required'),
          confirmPass: string()
            .oneOf([ref('newPass')], 'Passwords do not match')
            .required('Password is required'),
        })}
        onSubmit={(
          { currentPass, newPass, confirmPass },
          { setSubmitting, resetForm }
        ) =>
          this._handleSubmit({
            currentPass,
            newPass,
            confirmPass,
            setSubmitting,
            resetForm,
          })
        }>
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting,
          } = props
          return isSubmitting ? (
            <Spinner />
          ) : (
            <Grid>
            <Paper className="form form--wrapper" elevation={10} style={paperStyles}>
              <h1>Reset Password</h1>
              <form className="form" onSubmit={handleSubmit}>
                  <FormControl fullWidth margin="dense">
                  <input type="text" autoComplete="username" hidden/>
                  <InputLabel
                    htmlFor="password-current"
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  >
                    {'Current Password'}
                  </InputLabel>
                  <Input
                    id="password-current"
                    name="currentPass"
                    type="password"
                    value={values.currentPass}
                    onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete = "current-password"
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  >
                    {touched.currentPass && errors.currentPass
                      ? errors.currentPass
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.newPass && errors.newPass)}
                >
                  <InputLabel
                    htmlFor="password-new"
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {'New Password'}
                  </InputLabel>
                  <Input
                    id="password-new"
                    name="newPass"
                    type="password"
                    value={values.newPass}
                    onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete = "new-password"
                    error={Boolean(touched.newPass && errors.newPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {touched.newPass && errors.newPass ? errors.newPass : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                >
                  <InputLabel
                    htmlFor="password-confirm"
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {'Confirm Password'}
                  </InputLabel>
                  <Input
                    id="password-confirm"
                    name="confirmPass"
                    type="password"
                    value={values.confirmPass}
                    onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete = "confirm-password"
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {touched.confirmPass && errors.confirmPass
                      ? errors.confirmPass
                      : ''}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={Boolean(!isValid || isSubmitting)}
                  style={{ margin: '16px' }}
                >
                  Reset Password
                </Button>
                
              </form>
              {this._renderModal()}
              </Paper>
              </Grid>
          )
        }}
        </Formik>
    )
  }
}
