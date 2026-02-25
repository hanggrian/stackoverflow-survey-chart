import {afterEach, expect} from 'vitest';
import * as matchers from 'vitest-dom/matchers';
import 'vitest-dom/extend-expect';
import {cleanup} from '@testing-library/react';

expect.extend(matchers);

afterEach(() => cleanup());
