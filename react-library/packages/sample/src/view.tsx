import {JSX} from 'react';
import LabelExtImpl from '@library/library-extension/label-ext-impl';

export default function View(): JSX.Element {
  const impl =
      new LabelExtImpl({
        getX: () => 50,
        getY: () => 50,
        getWidth: () => 300,
        getHeight: () => 100,
      });
  return (
      <label>{`${impl.getSize()} pixels at ${impl.getPosition()}.`}</label>
  );
}
