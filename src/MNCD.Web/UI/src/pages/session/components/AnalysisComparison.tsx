import { SelectOption } from '@components/select';
import { Analysis } from '@lib/types/analysis';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC, useMemo, useState } from 'react';
import Request from '@pages/analysis/components/Request';
import ComparisonRow from './ComparisonRow';
import Evaluation from '@pages/analysis/components/Evaluation';
import CommunityDetails from '@pages/analysis/components/CommunityDetails';
import Visualizations from '@pages/analysis/components/Visualizations';

interface Props {
  analyzes: Analysis[];
}

const AnalysisComparison: FC<Props> = ({ analyzes }) => {
  const [analysisLeftIdx, setAnalysisLeftIdx] = useState<number>();
  const [analysisRightIdx, setAnalysisRightIdx] = useState<number>();
  const options = useMemo<SelectOption[]>(
    () =>
      analyzes.map((a, i) => ({
        label: 'Analysis ' + a.id,
        value: i,
      })),
    [analyzes],
  );
  const left = useMemo(
    () => (analysisLeftIdx !== undefined ? analyzes[analysisLeftIdx] : null),
    [analysisLeftIdx, analyzes],
  );
  const right = useMemo(
    () => (analysisRightIdx !== undefined ? analyzes[analysisRightIdx] : null),
    [analysisRightIdx, analyzes],
  );

  return (
    <Stack gap={1}>
      <Typography variant='subtitle1'>Compare</Typography>
      <Stack direction='row' gap={5}>
        <FormControl size='small' fullWidth>
          <InputLabel id='analysis-left-label'>Left</InputLabel>
          <Select
            labelId='analysis-left-label'
            id='analysis-left-select'
            label='Left'
            value={analysisLeftIdx}
            onChange={(e) => setAnalysisLeftIdx(Number(e.target.value))}
          >
            {options.map(({ value, label }) => (
              <MenuItem value={value}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size='small' fullWidth>
          <InputLabel id='analysis-right-label'>Right</InputLabel>
          <Select
            labelId='analysis-right-label'
            id='analysis-right-select'
            label='Right'
            value={analysisRightIdx}
            onChange={(e) => setAnalysisRightIdx(Number(e.target.value))}
          >
            {options.map(({ value, label }) => (
              <MenuItem value={value}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {left && right && left.id === right.id ? (
        <Typography align='center' mt={1}>
          Please select different analyses
        </Typography>
      ) : left && right ? (
        <Stack gap={2} mt={1}>
          <ComparisonRow>
            {left?.request && <Request {...left.request} />}
            {right?.request && <Request {...right.request} />}
          </ComparisonRow>
          <ComparisonRow>
            {left?.result && <Evaluation {...left.result} />}
            {right?.result && <Evaluation {...right.result} />}
          </ComparisonRow>
          <ComparisonRow>
            {left?.result && <CommunityDetails {...left.result} />}
            {right?.result && <CommunityDetails {...right.result} />}
          </ComparisonRow>
          <ComparisonRow>
            {left?.visualization && (
              <Visualizations visualizations={left.visualization} />
            )}
            {right?.visualization && (
              <Visualizations visualizations={right.visualization} />
            )}
          </ComparisonRow>
        </Stack>
      ) : (
        <Typography align='center' mt={1}>
          Please select analyses first
        </Typography>
      )}
    </Stack>
  );
};

export default AnalysisComparison;
