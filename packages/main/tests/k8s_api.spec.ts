import {test, expect} from 'vitest';
import {listAllPods} from '../src/api';

test('get k8s api version', async () => {
  const res = await listAllPods('volcano-system');
  expect(res.body.kind).toEqual('PodList');
  expect(res.body.apiVersion).toEqual('v1');
});
