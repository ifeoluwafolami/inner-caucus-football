import { useState } from 'react';
import Marquee from 'react-marquee-slider';
import * as motion from "motion/react-client";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<{ id: number; url: string } | null>(null);

  // Gallery images - replace with your actual images
  const galleryImages = [
    { id: 1, url: '/gallery/IMG-20250923-WA0001.jpg' },
    { id: 2, url: '/gallery/IMG-20250923-WA0002.jpg' },
    { id: 3, url: '/gallery/IMG-20250923-WA0003.jpg' },
    { id: 4, url: '/gallery/IMG-20250923-WA0004.jpg' },
    { id: 5, url: '/gallery/IMG-20250923-WA0005.jpg' },
    { id: 6, url: '/gallery/IMG-20250923-WA0006.jpg' },
    { id: 7, url: '/gallery/IMG-20250923-WA0007.jpg' },
    { id: 8, url: '/gallery/IMG-20250923-WA0008.jpg' },
    { id: 9, url: '/gallery/IMG-20250923-WA0009.jpg' },
    { id: 10, url: '/gallery/IMG-20250923-WA0010.jpg' },
  ];

  // Split into two rows for alternating marquees
  const firstRow = galleryImages.filter((_, i) => i % 2 === 0);
  const secondRow = galleryImages.filter((_, i) => i % 2 !== 0);

  return (
    <div className="w-full py-16 md:py-20 overflow-hidden bg-gradient-to-b from-transparent to-[#042915]/20">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-4"
      >
        <h2 className="font-rock text-4xl md:text-5xl lg:text-6xl font-bold text-amber-700 mb-3">
          Gallery
          {/* <span className="text-[#F7F2DF] text-base md:text-lg block mt-3 font-normal font-mont uppercase tracking-wider">
            Moments That Define Our Legacy
          </span> */}
        </h2>
        {/* Call to Action */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-6"
        >
            <p className="text-[#F7F2DF] font-mont text-xs mb-2 uppercase">
            Click any image to view full size
            </p>
            {/* <p className="text-amber-700 font-mont text-xs uppercase tracking-widest">
            "Chill. Play. Relive."
            </p> */}
        </motion.div>

      {/* Modal for selected image */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#042915]/95 backdrop-blur-md flex items-center justify-center z-50 p-6 sm:p-20"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-18 sm:-top-12 right-0 text-[#F7F2DF] hover:text-amber-700 transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="flex justify-center rounded-lg overflow-hidden shadow-2xl">
              <img
                src={selectedImage.url}
                alt="Gallery"
                className="h-[20vh] w-full sm:h-[80vh]"
              />
            </div>
          </div>
        </motion.div>
      )}
      </motion.div>

      {/* Speed Control
      <div className="max-w-md mx-auto mb-8 px-4">
        <div className="bg-[#042915] border border-amber-700/30 rounded-lg p-4 backdrop-blur-sm">
          <label className="block text-[#F7F2DF] mb-2 font-mont text-sm">
            Scroll Speed: {speed}
          </label>
          <input
            type="range"
            min="15"
            max="60"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-2 bg-amber-700/30 rounded-lg appearance-none cursor-pointer accent-amber-700"
          />
        </div>
      </div> */}

      <div className='flex flex-col items-center justify-center'>
        {/* First Marquee Row - Right to Left */}
        <div style={{ height: "280px", maxWidth: "80vw", width: "100%", marginBottom: "12px" }}>
            <Marquee
            velocity={20}
            direction="rtl"
            scatterRandomly={false}
            resetAfterTries={200}
            onInit={() => null}
            onFinish={() => null}
            >
            {firstRow.map((img, index) => (
                <div
                key={`gallery-row1-${index}`}
                className="mx-3 cursor-pointer"
                onClick={() => setSelectedImage(img)}
                >
                <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-amber-700/40 bg-[#042915] transition-transform duration-300 hover:scale-105">
                    <div className="w-80 h-60 md:w-96 md:h-64 bg-gradient-to-br from-amber-900/20 to-[#042915] flex items-center justify-center">
                    {img.url ? (
                        <img
                        src={img.url}
                        alt="Gallery"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                            parent.innerHTML = `
                                <div class="flex items-center justify-center h-full text-amber-700">
                                <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                </svg>
                                </div>
                            `;
                            }
                        }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-amber-700">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            ))}
            </Marquee>
        </div>

        {/* Second Marquee Row - Right to Left */}
        {secondRow.length > 0 && (
            <div style={{ height: "280px", maxWidth: "80vw", width: "100%" }}>
            <Marquee
                velocity={20}
                direction="rtl"
                scatterRandomly={false}
                resetAfterTries={200}
                onInit={() => null}
                onFinish={() => null}
            >
                {secondRow.map((img, index) => (
                <div
                    key={`gallery-row2-${index}`}
                    className="mx-3 cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                >
                    <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-amber-700/40 bg-[#042915] transition-transform duration-300 hover:scale-105">
                    <div className="w-80 h-60 md:w-96 md:h-64 bg-gradient-to-br from-amber-900/20 to-[#042915] flex items-center justify-center">
                        {img.url ? (
                        <img
                            src={img.url}
                            alt="Gallery"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.parentElement) {
                                e.currentTarget.parentElement.innerHTML = `
                                <div class="flex items-center justify-center h-full text-amber-700">
                                    <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                `;
                            }
                            }}
                        />
                        ) : (
                        <div className="flex items-center justify-center h-full text-amber-700">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        )}
                    </div>
                    </div>
                </div>
                ))}
            </Marquee>
            </div>
        )}
      </div>

      

      
    </div>
  );
};

export default GallerySection;