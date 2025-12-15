import { useEffect, useState } from 'react'
import Loading from './Loading';

import AppContent from './AppContent';

function App() {
  const [loading, setLoading] = useState(true);
  
  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  

  return (
    <>
      {/* Loading (5 seconds) */}
      <div className={`z-10 absolute top-0 h-full bg-[#042915] w-full ${loading ? '' : 'hidden'}`}>
        <Loading />
      </div>
      
      {/* Main Page */}
      <div 
        className={`hidden sm:flex min-h-[500vh] w-full relative ${loading ? 'hidden' : ''}`}
        style={{
          backgroundImage: `url('/background.jpg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'top center',
        }}
      >
        <div className='z-5 bg-black/60 inset-0 w-full absolute'> 

        <AppContent />

        </div>
        
      </div>

      {/* Main Page */}
      <div 
        className={`flex sm:hidden min-h-[430vh] w-full relative ${loading ? 'hidden' : ''}`}
        style={{
          backgroundImage: `url('/background.jpg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className='z-5 bg-black/60 inset-0 w-full absolute'> 

        <AppContent />

        </div>
        
      </div>
    </>
  )
}

export default App