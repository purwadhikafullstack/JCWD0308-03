import Container from '../Container';
import Wrapper from '../wrapper';
import Logo from './Logo';
import { UserMenu } from './UserMenu';

export const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="border-b-[1px]">
        <Wrapper>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/* <Search /> */}
            <UserMenu />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};
