import { FC, useCallback, useEffect, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { usePickedDataset } from '../SessionAnalysis.hooks';
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const FIELD_NAME = 'flatteningAlgorithmParameters.relevances';

const LayerRelevances: FC = () => {
  const { register, control, setValue } = useFormContext();
  const { fields } = useFieldArray({ name: FIELD_NAME, control });
  const selectedLayers = useWatch({ name: FIELD_NAME, control });
  const dataset = usePickedDataset();
  const [relevances, setRelevances] = useState(1.0);

  const assignRelevances = useCallback(
    (value: number) => {
      const layers = (dataset?.layerNames || []).map(() => value);
      setValue(FIELD_NAME, layers);
    },
    [dataset?.layerNames, setValue],
  );

  useEffect(() => {
    if (dataset?.layerNames) {
      assignRelevances(1.0);
    }
  }, [dataset?.layerNames, assignRelevances]);

  return (
    <Stack gap={1}>
      <Typography variant='subtitle2'>All Layers</Typography>
      <Typography variant='caption'>
        Apply specific relevance to all layers
      </Typography>
      <Stack gap={1} direction='row'>
        <TextField
          type='number'
          value={relevances}
          onChange={(e) => setRelevances(Number(e.target.value))}
          slotProps={{
            htmlInput: {
              step: 0.1,
            },
          }}
        />
        <Button type='button' onClick={() => assignRelevances(relevances)}>
          Apply
        </Button>
      </Stack>
      <FormControl component='fieldset' variant='standard'>
        <FormLabel component='legend'>
          <Typography color='textPrimary' variant='subtitle2' mb={1}>
            Layer Relevances
          </Typography>
        </FormLabel>
        <FormGroup>
          <Stack gap={2}>
            {fields.map((field, idx) => (
              <TextField
                key={field.id}
                label={selectedLayers[idx].label}
                type='number'
                slotProps={{
                  htmlInput: {
                    step: 0.1,
                  },
                }}
                {...register(`${FIELD_NAME}[${idx}]`)}
              />
            ))}
          </Stack>
        </FormGroup>
      </FormControl>
    </Stack>
  );
};

export default LayerRelevances;
