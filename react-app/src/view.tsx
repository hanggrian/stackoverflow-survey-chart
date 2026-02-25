import {JSX} from 'react';
import LabelImpl from './label-impl';

export default function View(): JSX.Element {
  const impl =
    new LabelImpl({
      getWidth: () => 300,
      getHeight: () => 100,
    });
  return (
    <label>{`${impl.getSize()} pixels.`}</label>
  );
}
