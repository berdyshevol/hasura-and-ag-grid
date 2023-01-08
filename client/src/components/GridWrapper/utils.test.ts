import { TRawData } from './types';
import { convertPropertyToArray } from './utils';

describe('convertPropertyToArray', () => {
  test('for property <coverage> convert it to array', () => {
    const object: TRawData = {
      id: 'hdhhdhdjdjdj',
      manufacture: 'RICOH',
      model: 'IM C3000',
      serial_number: '111111',
      ip_address: '0.0.0.0',
      assert_number: '383838383',
      erp_id: '383838383',
      level: 100,
      coverage: 10,
      yield: '???',
    };

    expect(
      // @ts-expect-error fixme: i dont know type
      convertPropertyToArray<TRawData, 'coverage'>('coverage')(object)
        ?.coverage?.[0],
    ).toBe(10);
  });
});
