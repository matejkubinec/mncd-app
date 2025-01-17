import { AnalysisResult } from '@lib/types/analysis';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';

const CommunityDetails: FC<AnalysisResult> = ({ communityDetails }) => {
  const [idx, setIdx] = useState(0);
  const details = communityDetails[idx];

  return (
    <Card>
      <CardContent>
        <Stack gap={1}>
          <Typography variant='h6'>Community Details</Typography>
          <FormControl>
            <InputLabel id='community-select-label'>Community</InputLabel>
            <Select
              id='community-select'
              labelId='community-select-label'
              label='Communtiy'
              sx={{
                backgroundColor: 'background.default',
              }}
              value={idx}
              onChange={(e) => setIdx(Number(e.target.value))}
            >
              {communityDetails.map((cd, idx) => (
                <MenuItem key={cd.name} value={idx}>
                  {cd.name} (Size: {cd.actorCount})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <List disablePadding>
            {details.actors.map((actor) => (
              <ListItem key={actor.idx} disableGutters disablePadding>
                <ListItemText>
                  {actor.idx} {actor.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CommunityDetails;
