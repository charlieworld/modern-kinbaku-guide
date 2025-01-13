import { useRecoilValue } from 'recoil';
import { UserState } from '../utils/atom';

export default function useUser() {
  return useRecoilValue(UserState);
}
