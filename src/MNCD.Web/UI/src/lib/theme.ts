import { buttonClasses, createTheme } from '@mui/material';
import { yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 120, 212)',
    },
    secondary: {
      main: yellow['A700'],
    },
    background: {
      paper: '#f5f5f5',
    },
  },
  colorSchemes: {
    // light: true,
    // dark: true,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        subtitle1: {
          fontWeight: 500,
        },
        h5: {
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          [`a.link-button`]: {
            color: theme.palette.primary.contrastText,
            fontWeight: 'normal',
          },
          [`a.link-active`]: {
            fontWeight: 'bold',
          },
          [`a.${buttonClasses.root}:hover`]: {
            borderBottomWidth: 2,
            borderStyle: 'solid',
            borderRadius: 0,
            color: `${theme.palette.primary.contrastText} !important`,
          },
          ...theme.applyStyles('dark', {
            [`a.link-button`]: {
              color: `${theme.palette.primary.main} !important`,
            },
            [`a.${buttonClasses.root}:hover`]: {
              color: `${theme.palette.primary.main} !important`,
            },
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius / 0.25,

          [`&.link-button.${buttonClasses.contained}`]: {
            color: theme.palette.primary.contrastText,

            ':hover': {
              color: theme.palette.primary.contrastText,
            },
          },
          [`&.link-button.${buttonClasses.text}:hover`]: {
            color: theme.palette.primary.main,
          },
          [`&.link-button.${buttonClasses.outlined}:hover`]: {
            color: theme.palette.primary.main,
          },
          [`&.${buttonClasses.outlined}:hover`]: {
            borderColor: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});

export default theme;
