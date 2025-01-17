import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from 'react';
import { FileInputControlProps } from './FileInput.types';
import { FieldValues, useController } from 'react-hook-form';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Button, { buttonClasses } from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

const FileInputControl = <T extends FieldValues, K>(
  props: FileInputControlProps<T, K>,
): ReactNode => {
  const { field, fieldState } = useController(props);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const pickFile: MouseEventHandler = (e) => {
    fileInputRef.current?.click();
    e.stopPropagation();
    e.preventDefault();
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.length) {
      field.onChange(e.target.files[0]);
    } else {
      field.onChange(null);
    }
  };

  return (
    <FormControl sx={{ mt: 0.25, position: 'relative' }}>
      <InputLabel
        focused={focused}
        sx={(theme) => ({
          px: 0.75,
          ml: -0.5,
          backgroundColor: 'background.default',
          transformOrigin: 'top left',
          transform: 'translate(14px, -9px) scale(0.75)',

          color: fieldState.error?.message
            ? theme.palette.error.main
            : undefined,
        })}
      >
        <Typography>{props.label}</Typography>
      </InputLabel>
      <Button
        variant='outlined'
        color='inherit'
        onClick={pickFile}
        disableRipple
        endIcon={
          <FileUploadIcon
            sx={(theme) => ({
              color: fieldState.error
                ? theme.palette.error.main
                : theme.palette.grey[600],
            })}
          />
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={(theme) => ({
          py: 1,
          borderRadius: 1,
          outlineStyle: 'solid',
          outlineColor: focused ? theme.palette.primary.main : undefined,
          outlineWidth: focused ? 1 : undefined,
          borderColor: fieldState.error?.message
            ? theme.palette.error.main
            : focused
              ? theme.palette.primary.main
              : theme.palette.grey[400],
          justifyContent: 'space-between',
          backgroundColor: 'background.default',

          [`&.${buttonClasses.outlined}:hover`]: {
            borderColor: fieldState.error?.message
              ? theme.palette.error.main
              : theme.palette.common.black,
          },
        })}
      >
        {field.value?.name ? (
          <Typography>{field.value?.name}</Typography>
        ) : (
          <Typography color={fieldState.error ? 'error' : 'textSecondary'}>
            Choose a file
          </Typography>
        )}
      </Button>
      {props.description ||
        (fieldState.error && (
          <FormHelperText error={!!fieldState.error?.message}>
            {fieldState.error?.message ?? props.description}
          </FormHelperText>
        ))}
      <Box visibility='hidden' height={0}>
        <input type='file' onChange={onChange} ref={fileInputRef} />
      </Box>
    </FormControl>
  );
};

export default FileInputControl;
