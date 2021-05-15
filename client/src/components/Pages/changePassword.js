import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import FormPasswordReset from './helper/formPasswordReset'

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
})

function App() {
  return (
    <div className="App">
      <FormPasswordReset />
    </div>
  )
}

export default function changePassword(){
  return (<MuiThemeProvider theme={theme}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </MuiThemeProvider>);
}