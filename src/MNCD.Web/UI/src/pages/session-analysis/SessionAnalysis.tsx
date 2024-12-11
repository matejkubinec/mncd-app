import { Page } from '@components/page';
import { useRouteSession } from '@hooks/route';
import { FC, useEffect } from 'react';
import DatasetStep from './steps/DatasetStep';
import ApproachStep from './steps/ApproachStep';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { AnalyzeFormValues } from '@lib/form/analyze.form';
import { AnalysisApproach } from '@lib/types/analysis';
import LayerSelectionStep from './steps/LayerSelectionStep';
import { Button, Stack } from '@mui/material';
import SingleLayerAlgorithmStep from './steps/SingleLayerAlgorithmStep';
import { useTriggerAnalysis } from '@hooks/api/analysis';
import { useSnackbar } from 'notistack';
import FlatteningStep from './steps/FlatteningStep';
import MultiLayerAlgorithmStep from './steps/MultiLayerAlgorithmStep';
import { Navigate } from 'react-router-dom';

export const SessionAnalysis: FC = () => {
  const { data: session, isLoading } = useRouteSession();
  const methods = useForm<AnalyzeFormValues>();
  const approach = useWatch({
    name: 'approach',
    control: methods.control,
  });
  const { mutateAsync, data, isSuccess } = useTriggerAnalysis();
  const { enqueueSnackbar } = useSnackbar();

  const onAnalyze = (values: AnalyzeFormValues) => {
    mutateAsync(values, {
      onSuccess: () =>
        enqueueSnackbar('Analysis successful', { variant: 'success' }),
      onError: (error) => enqueueSnackbar(error.message, { variant: 'error' }),
    });
  };

  useEffect(() => {
    if (session) {
      methods.setValue('sessionId', session.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, methods.setValue]);

  if (isSuccess) {
    return <Navigate to={`/session/${session?.id}/analysis/${data.id}`} />;
  }

  return (
    <Page
      title='Analyze'
      backTo={`/sessions/${session?.id}`}
      loading={isLoading}
    >
      <FormProvider {...methods}>
        <Stack
          component='form'
          gap={2}
          onSubmit={methods.handleSubmit(onAnalyze)}
        >
          <DatasetStep />
          <ApproachStep />
          {approach === AnalysisApproach.SingleLayerOnly && (
            <>
              <LayerSelectionStep />
              <SingleLayerAlgorithmStep />
            </>
          )}
          {approach === AnalysisApproach.SingleLayerFlattening && (
            <>
              <FlatteningStep />
              <SingleLayerAlgorithmStep />
            </>
          )}
          {approach === AnalysisApproach.MultiLayer && (
            <MultiLayerAlgorithmStep />
          )}
          <Stack alignSelf='flex-start' width={250}>
            <Button variant='contained' type='submit'>
              Analyze
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Page>
  );
};
