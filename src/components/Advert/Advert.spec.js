import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Advert from './Advert';


configure({ adapter: new Adapter() });

describe('Advert', () => {
  const defaultProps = {
    key: 'advert1',
    name: 'A name',
    price: 3999.99,
    type: 'buy',
    tags: ["lifestyle", "motor"],
    description: "A description",
    id: 'advert1',
    photo: 'string',
  };
  
  const render = props => shallow(<Advert.WrappedComponent
    key={defaultProps.id}
    name={defaultProps.name}
    price={defaultProps.price}
    type={defaultProps.type}
    tags={defaultProps.tags}
    description={defaultProps.description}
    id={defaultProps.id}
    photo={defaultProps.photo}
    history={{location:{pathname: "/advert/"}}}
     />);
  let wrapper;

  beforeEach(() => {
    wrapper = render();
  });


  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render 2 tags', () => {
      
    expect(wrapper.find('.badge-primary')).toHaveLength(2);
  });

});
