'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface SimpleModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
}

export const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-4/5 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-auto">
          {/* CONTENT */}
          <div className={`
          translate
          duration-300 
          h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'} }
          ${showModal ? 'opacity-100' : 'opacity-0'} }
          `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-8 rounded-t justify-center relative">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9 "
                >
                  <IoMdClose size={24} color="#00a7c4" />
                </button>
                <div className="text-lg text-[#4a4a4a] font-semibold">
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
