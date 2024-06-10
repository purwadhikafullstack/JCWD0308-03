'use client';
import Wrapper from '../wrapper';
import CardDetail from './cardDetail';

export default function Transactions() {
  return (
    <Wrapper>
      <section className="sec text-black">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex w-1/2 flex-col">
            <div>
              <p className="text text-black py-10 text-2xl font-bold">
                Confirm and Pay
              </p>
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-transparent text-black hover:text-white">
                one of Stay Easy favorite homes, according to guests
              </button>
            </div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar py-10 text-black"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <p> Host : Doe</p>
          </div>
          <div className='flex w-1/2'>
            <CardDetail/>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
