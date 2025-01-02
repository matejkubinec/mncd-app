import { Image } from '@components/image';
import { VISUALIZATION_OPTIONS } from '@lib/constants';
import { AnalysisVisualization } from '@lib/types/analysis';
import { Visualization } from '@lib/types/images';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import ImageList from '@mui/material/ImageList';
import ImageListItem, {
  imageListItemClasses,
} from '@mui/material/ImageListItem';
import ImageListItemBar, {
  imageListItemBarClasses,
} from '@mui/material/ImageListItemBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC, useMemo, useState } from 'react';

interface Props {
  visualizations: AnalysisVisualization;
}

const Visualizations: FC<Props> = ({ visualizations }) => {
  const [type, setType] = useState<Visualization>(Visualization.MultiLayer);
  const images = useMemo(() => visualizations[type], [visualizations, type]);

  return (
    <Card>
      <CardContent>
        <Stack gap={1}>
          <Typography variant='h6'>Visualizations</Typography>
          <FormControl>
            <InputLabel id='visualization-select-label'>
              Visualization
            </InputLabel>
            <Select
              id='visualization-select'
              labelId='visualization-select-label'
              label='Communtiy'
              sx={{
                backgroundColor: 'background.default',
              }}
              value={type}
              onChange={(e) => setType(e.target.value as Visualization)}
            >
              {VISUALIZATION_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ImageList
            cols={2}
            gap={10}
            sx={{
              [`img.${imageListItemClasses.img}[alt]`]: {
                minHeight: 100,
                textAlign: 'center',
              },
              [`.${imageListItemBarClasses.root} > div`]: {
                p: 1,
              },
            }}
          >
            {images.map((image) => (
              <ImageListItem
                key={image.url}
                sx={(theme) => ({
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: theme.palette.divider,
                  borderRadius: theme.shape.borderRadius / 2,
                  backgroundColor: 'background.default',
                })}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  css={{
                    border: 'none',
                    height: '100%',
                  }}
                />
                <ImageListItemBar
                  title={image.title}
                  position='below'
                  sx={{
                    color: 'secondary.contrastText',
                    textAlign: 'center',
                    backgroundColor: 'secondary.main',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Visualizations;
