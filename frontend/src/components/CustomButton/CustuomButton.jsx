
import { useState, useEffect } from 'react';
import { Button } from '@mui/material'

const CustomButton = (props) => {

    const [buttonText, setButtonText] = useState('');

    useEffect(() => {
        setButtonText(props.buttonText)
    }, []);

    return (
        <>
            <Button
                sx={[
                    {
                        width: {
                            xs: 300, // theme.breakpoints.up('xs')
                            sm: 200, // theme.breakpoints.up('sm')
                            md: 300, // theme.breakpoints.up('md')
                            lg: 400, // theme.breakpoints.up('lg')
                            xl: 500 // theme.breakpoints.up('xl')
                        },
                        m: 4,
                        backgroundColor: '#5A1AED',
                        borderRadius: '24px',
                    }

                ]}

                variant='contained'
                onClick={props.clickHandler}
                type={props.buttonType}
            >
                {buttonText}

            </Button>
        </>
    );
}



export default CustomButton;
