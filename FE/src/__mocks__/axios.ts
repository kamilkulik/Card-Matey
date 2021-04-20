import axios from 'axios';

const mockAxios = jest.createMockFromModule('axios') as jest.Mocked<typeof axios>;

mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
