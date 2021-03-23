import { Dimensions } from 'react-native';

export const { height, width } = Dimensions.get('window');

//const HOST = '192.168.0.100';
const HOST = '172.20.10.2';

export const HOST_WITH_PORT = `http://${HOST}:5000`;

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmUxYWI3M2I5Zjc3ZTZlYTRlOThhNjMiLCJpYXQiOjE2MTU0NTQwMjIsImV4cCI6MTYxNTQ5NzIyMn0.Fg0t72rbu_3xX6jwAuDpIM_D2qD2RPRr_SXTkhWDVbY';
