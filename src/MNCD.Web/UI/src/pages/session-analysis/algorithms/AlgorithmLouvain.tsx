import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const AlgorithmLouvain: FC = () => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue('analysisAlgorithmParameters', {});
  }, [setValue]);

  return null;
};

export default AlgorithmLouvain;
