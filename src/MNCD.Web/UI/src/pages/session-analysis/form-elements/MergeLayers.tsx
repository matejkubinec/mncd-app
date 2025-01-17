import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  layers: string[];
}

const MergeLayers: FC<Props> = ({ layers }) => {
  const { setValue } = useFormContext();
  const [indices, setIndices] = useState<Record<number, boolean>>(
    layers.reduce(
      (res, _, idx) => ({
        ...res,
        [idx]: true,
      }),
      {},
    ),
  );

  useEffect(() => {
    const fieldName = 'flatteningAlgorithmParameters.layerIndices';
    const res = Object.keys(indices).filter((key) => indices[Number(key)]);
    setValue(fieldName, res);
  }, [indices, setValue]);

  const toggleLayer = (idx: number) => {
    setIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <FormControl component='fieldset' variant='standard'>
      <FormLabel component='legend'></FormLabel>
      <FormGroup>
        {layers.map((layer, idx) => (
          <>
            {indices[idx]}
            <FormControlLabel
              key={layer}
              control={
                <Checkbox
                  checked={indices[idx]}
                  onChange={() => toggleLayer(idx)}
                />
              }
              label={layer}
            />
          </>
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default MergeLayers;
