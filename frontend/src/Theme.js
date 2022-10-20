
import { createTheme, experimental_sx as sx } from '@mui/material'
import { borderRadius } from '@mui/system'



export const theme = createTheme({
    // components: {
    //     MuiButtonBase: {
    //         defaultProps: {
    //             color: 'success'
    //         },
    //     },
    // },
    palette: {
        button: {
            main: '#5A1AED',
            contrastText: '#fff'
        }
    },
    typography: {
        fontFamily: [
            'Poppins'
        ]
    },
    shape: { borderRadius: 0 },
    // props: {
    //     Button: {
    //         variant: 'contained',
    //         color: 'error',
    //     }
    // }

})
