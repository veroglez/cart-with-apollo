import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ConsumerData, ProviderData } from './context';
import { Price } from '../../Components';

Enzyme.configure({ adapter: new Adapter() });

describe('<Context>', () => {
  it('<ProviderData> renders', () => {
    const tree = renderer.create(<ProviderData />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<ConsumerData> renders', () => {
    const tree = renderer.create(
      <ConsumerData>
        { () => <Price price={10} /> }
      </ConsumerData>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<Context> renders', () => {
    const tree = renderer.create(
      <ProviderData>
        <ConsumerData>
          { context => Object.keys(context) }
        </ConsumerData>
      </ProviderData>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<ConsumerData> can get properties of context', () => {
    const tree = renderer.create(
      <ProviderData>
        <ConsumerData>
          { ({ total }) => <Price price={total} /> }
        </ConsumerData>
      </ProviderData>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onData method', () => {
    const wrapper = shallow(<ProviderData />);

    wrapper.instance().onData({ test: 'I am doing a test' });
    expect(wrapper.instance().state.test).toEqual('I am doing a test');
  });
});
