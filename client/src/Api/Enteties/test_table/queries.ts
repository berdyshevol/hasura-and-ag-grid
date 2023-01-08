import { useQueryGraphql, gql } from '../../ApolloClient';

type TData = {
  payload: {
    id: number;
    manufacture: string;
    model: string;
    assert_number: number;
    serial_number: string;
    ip_address: string;
    erp_ip: string;
    level: number;
    coverage: number;
    yield: string;
  }[];
};

type TVariable = {};

const ALL = gql`
  query All {
    payload: test_table {
      id
      assert_number
      coverage
      erp_id
      ip_address
      level
      manufacture
      model
      serial_number
      yield
    }
  }
`;

export const useQueryAll = () => {
  const res = useQueryGraphql<TData, TVariable>(ALL, {});
  console.log(11111, res);
  return { res, payload: res.data?.payload };
};
