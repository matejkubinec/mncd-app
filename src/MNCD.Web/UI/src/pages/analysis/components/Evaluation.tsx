import { Card, CardContent, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import ValueRow from './ValueRow';
import { AnalysisResult } from '@lib/types/analysis';
import { Messages } from '../AnalysisPage.messages';

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
          <ValueRow
            label={Messages.averageVariety.name}
            tooltip={Messages.averageVariety.tooltip}
            value={averageVariety}
          />
          <ValueRow
            label={Messages.varieties.name}
            tooltip={Messages.varieties.tooltip}
            value={varieties}
          />
          <ValueRow
            label={Messages.averageExclusivity.name}
            tooltip={Messages.averageExclusivity.tooltip}
            value={averageExclusivity}
          />
          <ValueRow
            label={Messages.exclusivities.name}
            tooltip={Messages.exclusivities.tooltip}
            value={exclusivities}
          />
          <ValueRow
            label={Messages.averageHomogenity.name}
            tooltip={Messages.averageHomogenity.tooltip}
            value={averageHomogenity}
          />
          <ValueRow
            label={Messages.homogeneities.name}
            tooltip={Messages.homogeneities.tooltip}
            value={homogenities}
          />
          <ValueRow
            label={Messages.averageCoverage.name}
            tooltip={Messages.averageCoverage.tooltip}
            value={averageCoverage}
          />
          <ValueRow
            label={Messages.coverage.name}
            tooltip={Messages.coverage.tooltip}
            value={coverage}
          />
          <ValueRow
            label={Messages.coverages.name}
            tooltip={Messages.coverages.tooltip}
            value={coverages}
          />
          <ValueRow
            label={Messages.averagePerformance.name}
            tooltip={Messages.averagePerformance.tooltip}
            value={averagePerformance}
          />
          <ValueRow
            label={Messages.performance.name}
            tooltip={Messages.performance.tooltip}
            value={performance}
          />
          <ValueRow
            label={Messages.performances.name}
            tooltip={Messages.performances.tooltip}
            value={performances}
          />
          <ValueRow
            label={Messages.modularity.name}
            tooltip={Messages.modularity.tooltip}
            value={modularity}
          />
          <ValueRow
            label={Messages.modularities.name}
            tooltip={Messages.modularities.tooltip}
            value={modularities}
          />
          <ValueRow
            label={Messages.averageModularity.name}
            tooltip={Messages.averageModularity.tooltip}
            value={averageModularity}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Evaluation;
