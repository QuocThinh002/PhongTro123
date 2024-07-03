import React, { useState, useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import Button from '../Button';

const AnnounceClone = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem('hasSeenPopup', 'true');
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="relative bg-white px-10 py-6 rounded-lg text-center max-w-md mx-auto">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
            >
              <FaXmark size={24} />
            </button>
            <p>
              Chào mừng bạn đến với dự án học tập của mình!
              <br />
              Đây là bản clone của{' '}
              <a
                href="https://phongtro123.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                phongtro123.com
              </a>,
              <br />
              không phải trang web chính thức đâu nha!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnounceClone;
