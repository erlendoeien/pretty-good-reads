import React from 'react';
import Header from 'src/components/Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchField from 'src/components/SearchField';

Enzyme.configure({ adapter: new Adapter() });

describe('testing header', () => {
    it('renders correctly', () => {
        const header = shallow(<Header />);
        expect(header).toMatchSnapshot();
    });

    it('contains h1', () => {
        const header = shallow(<Header />);
        expect(header.find('h1').text()).toEqual('What to read next.. ?');
    });

    it('contains search field', () => {
        const header = shallow(<Header />);
        expect(header.containsMatchingElement(<SearchField />)).toBeTruthy();
    });
});
