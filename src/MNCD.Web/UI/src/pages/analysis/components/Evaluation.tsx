import { Card, CardContent, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import ValueRow from './ValueRow';
import { AnalysisResult } from '@lib/types/analysis';

const Evaluation: FC<AnalysisResult> = ({
  averageVariety,
  varieties,
  averageExclusivity,
  exclusivities,
  averageHomogenity,
  homogenities,
  averageCoverage,
  coverages,
  averagePerformance,
  performances,
  averageModularity,
  modularities,
  coverage,
  performance,
  modularity,
}) => {
  return (
    <Card>
      <CardContent>
        <Stack gap={1}>
          <Typography variant='h6'>Evaluation</Typography>
          <ValueRow label='Average Variety' value={averageVariety} />
          <ValueRow label='Varieties' value={varieties} />
          <ValueRow label='Average Exclusivity' value={averageExclusivity} />
          <ValueRow label='Exclusivities' value={exclusivities} />
          <ValueRow label='Average Homogeneity' value={averageHomogenity} />
          <ValueRow label='Homogeneities' value={homogenities} />
          <ValueRow
            label='Average Coverage'
            tooltip='The coverage of a partition is the ratio of the number of intra-community edges to the total number of edges in the graph'
            value={averageCoverage}
          />
          <ValueRow label='Coverage' value={coverage} />
          <ValueRow label='Coverages' value={coverages} />
          <ValueRow label='Average Performance' value={averagePerformance} />
          <ValueRow label='Performance' value={performance} />
          <ValueRow label='Performances' value={performances} />
          <ValueRow label='Modularity' value={modularity} />
          <ValueRow label='Modularities' value={modularities} />
          <ValueRow label='Average Modularity' value={averageModularity} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Evaluation;
