import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import Adapter from 'enzyme-adapter-react-16';
import Paginator from 'src/components/Paginator';

Enzyme.configure({ adapter: new Adapter() });

//snapshot test
describe('testing header', () => {
    it('renders correctly', () => {
        const paginator = shallow(<Paginator totalCount={30} />);
        expect(paginator).toMatchSnapshot();
    });
});

//mock test
const fnChange = jest.fn();
//replacing onChange function with mock function.
describe('change event', () => {
    it('Page change should update offset value', () => {
        const pagination = shallow(<Pagination onChange={fnChange} />);
        pagination.simulate('change');
        expect(fnChange).toHaveBeenCalled();
    });
});
