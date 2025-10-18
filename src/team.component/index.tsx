import { useState, useRef, useEffect } from "react";

// Sample team data - replace with your actual data
const teamMembers = [
  {
    id: 1,
    firstName: "Suleiman",
    lastName: "Busari",
    nickname: "Asha",
    dateOfBirth: "29-07",
    imageUrl: "/football/busari.jpg",
  },
  {
    id: 2,
    firstName: "Femi",
    lastName: "Oki",
    nickname: "Legend/Veteran",
    dateOfBirth: "28-10",
    imageUrl: "/football/femi.jpg",
  },
  {
    id: 3,
    firstName: "Adetunde",
    lastName: "Adewumi",
    nickname: "Picco Keshi",
    dateOfBirth: "07-05",
    imageUrl: "/football/adetunde.jpg",
  },
  {
    id: 4,
    firstName: "Otunba Wale",
    lastName: "Alao",
    nickname: "Walata",
    dateOfBirth: "26-05",
    imageUrl: "/football/otunba.jpg",
  },
  {
    id: 5,
    firstName: "Lawrence C.",
    lastName: "Ilori",
    nickname: "Don",
    dateOfBirth: "10-08",
    imageUrl: "/football/ilori.jpg",
  },
  {
    id: 6,
    firstName: "Emmanuel",
    lastName: "Issah",
    nickname: "Platini",
    dateOfBirth: "13-12",
    imageUrl: "/football/emmanuel.jpg",
  },
  {
    id: 7,
    firstName: "Margaret",
    lastName: "Bonsra",
    nickname: "Lady Cheche",
    dateOfBirth: "23-06",
    imageUrl: "/football/bonsra.jpg",
  },
  {
    id: 8,
    firstName: "Anyeneke Helen",
    lastName: "Amoatwo",
    nickname: "Tubuleski",
    dateOfBirth: "16-10",
    imageUrl: "/football/amoatwo.jpg",
  },
  {
    id: 9,
    firstName: "Mavis Onome",
    lastName: "Akahoho",
    nickname: "Grateful Soul",
    dateOfBirth: "07-04",
    imageUrl: "/football/mavis.jpg",
  },
  {
    id: 10,
    firstName: "Gbemi Henry",
    lastName: "Ano-Edward",
    nickname: "Anorld",
    dateOfBirth: "06-04",
    imageUrl: "/football/ano-edward.jpg",
  },
];

const AUTO_PLAY_INTERVAL = 4000;

function MeetTheTeam() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // Check if today is someone's birthday
    // Check if today is someone's birthday
  const isBirthday = (dateOfBirth: string) => {
    const today = new Date();
    
    // Handle format "MM-DD" (e.g., "03-15")
    if (dateOfBirth.length <= 5 && dateOfBirth.includes('-')) {
      const [month, day] = dateOfBirth.split('-').map(Number);
      return today.getMonth() + 1 === month && today.getDate() === day;
    }
    
    // Handle full date format "YYYY-MM-DD"
    const dob = new Date(dateOfBirth);
    return today.getMonth() === dob.getMonth() && today.getDate() === dob.getDate();
  };

  // Format date of birth
  const formatDateOfBirth = (birthday: string) => {
    const [day, month] = birthday.split('-').map(Number);
    // Create a date with dummy year 2000 just for formatting
    const date = new Date(2000, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    };

  useEffect(() => {
    if (isAutoPlaying && teamMembers.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === teamMembers.length - 1 ? 0 : prev + 1
        );
      }, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % teamMembers.length;
    goToSlide(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = currentIndex === 0 ? teamMembers.length - 1 : currentIndex - 1;
    goToSlide(prevIdx);
  };

  const getWrappedIndex = (index: number) => {
    if (index < 0) return teamMembers.length + index;
    return index % teamMembers.length;
  };

  const prevIndex = getWrappedIndex(currentIndex - 1);
  const nextIndex = getWrappedIndex(currentIndex + 1);

  const getCardPosition = (position: "prev" | "current" | "next") => {
    const positions = {
      prev: { x: 200, scale: 0.85, opacity: 0.6, zIndex: 1 },
      current: { x: 0, scale: 1, opacity: 1, zIndex: 10 },
      next: { x: -200, scale: 0.85, opacity: 0.6, zIndex: 1 },
    };
    return positions[position];
  };

  const renderCard = (
    member: typeof teamMembers[0],
    position: "prev" | "current" | "next",
    onClick?: () => void
  ) => {
    const hasBirthday = isBirthday(member.dateOfBirth);

    return (
      <div
            key={`${member.id}-${position}`}
            className={`font-mont relative mx-auto transform transition-all duration-300 pointer-events-auto
                ${position === "current" ? "z-10" : "z-5"}
                ${position !== "current" ? "pointer-events-none hover:scale-90 hover:opacity-80" : ""}`}
            style={{ 
                cursor: "pointer",
                transform: `translateX(${position === 'prev' ? '200px' : position === 'next' ? '-200px' : '0'}) scale(${position === 'current' ? 1 : 0.85})`,
                opacity: position === 'current' ? 1 : 0.6,
                zIndex: position === 'current' ? 10 : 1
            }}
            onClick={onClick}
        >
        <div
          className={`flex flex-col rounded-4xl overflow-hidden transition-all duration-300 relative
          w-72 h-[360px] md:w-90 md:h-[480px] 
          ${hasBirthday && position === "current" 
            ? "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 shadow-2xl shadow-amber-500/50 ring-4 ring-amber-400 " 
            : "bg-[#042915]"
          }
          ${position === "current"
            ? "shadow-2xl hover:-translate-y-2 hover:shadow-3xl"
            : "brightness-90 shadow-lg hover:brightness-100 hover:-translate-y-1"
          }`}
        >
          {/* Birthday Badge */}
          {hasBirthday && position === "current" && (
            <div className="absolute top-4 right-4 z-20 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg animate-bounce">
              🎉 Birthday!
            </div>
          )}

          {/* Image Section */}
          <div className="relative w-full h-56 md:h-68 lg:h-76 overflow-hidden">
            {member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={`${member.firstName} ${member.lastName}`}
                className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-700 to-amber-900">
                <span className="text-2xl md:text-3xl lg:text-5xl font-semibold text-[#F7F2DF] uppercase">
                  {member.firstName.charAt(0)}
                  {member.lastName.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className={`p-4 md:p-5 lg:p-6 flex flex-col justify-center text-center ${hasBirthday && position === "current" ? "text-[#F7F2DF]" : "text-[#F7F2DF]"}`}>
            {/* Happy Birthday Message */}
            {/* {hasBirthday && position === "current" && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 500, damping: 15 }}
                className="text-center mb-2 text-amber-200 font-bold text-lg"
              >
                🎂 Happy Birthday! 🎂
              </motion.div>
            )} */}

            {/* Name with Nickname */}
            <h3 className="text-base md:text-lg  font-semibold mb-1 leading-tight">
              {member.firstName}{" "}{member.lastName}
            </h3>

            {/* Role */}
            <p className="text-xs md:text-sm text-amber-300 mb-2 uppercase tracking-widest font-medium">
              {member.nickname && 
              <span className={`${hasBirthday && position === "current" ?"text-amber-200" : "text-amber-700"}`}>"{member.nickname}"</span>}
            </p>

            {/* Date of Birth */}
            <p className={`text-xs md:text-sm sm:mb-2 ${hasBirthday && position === "current" ? "text-amber-200 font-semibold" : "text-[#F7F2DF/80] font-semibold"}`}>
              Birthday: {formatDateOfBirth(member.dateOfBirth)}
            </p>

            {/* Story */}
            {/* {member.story && (
              <article
                className="text-sm md:text-base font-light leading-relaxed text-[#F7F2DF]/90 flex-grow overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  textOverflow: "ellipsis",
                }}
              >
                {member.story}
              </article>
            )} */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-full mt-6 py-16 md:py-12 lg:py-20 overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="font-rock text-3xl md:text-5xl font-bold text-amber-700">
          Meet The Team
          <span className="text-[#F7F2DF] text-sm md:text-lg block mt-2 font-normal font-mont ">
            THE LEGENDS BEHIND THE LEGACY
          </span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="flex flex-col md:flex-row items-center justify-center relative w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-8">
        {/* Previous Button - Desktop */}
        <button
          onClick={prevSlide}
          aria-label="Previous"
          className="hidden md:flex absolute left-2 md:left-4 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full bg-amber-700 border-none text-[#F7F2DF] cursor-pointer transition-all duration-300 items-center justify-center shadow-lg hover:bg-amber-600 hover:scale-110"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Carousel Track */}
        <div className="flex items-center justify-center relative w-full max-w-xl  h-[360px] md:h-[480px] lg:h-[540px]">
          {teamMembers.length > 1 &&
            renderCard(teamMembers[prevIndex], "prev", prevSlide)}
          {renderCard(teamMembers[currentIndex], "current")}
          {teamMembers.length > 1 &&
            renderCard(teamMembers[nextIndex], "next", nextSlide)}
        </div>

        {/* Next Button - Desktop */}
        <button
          onClick={nextSlide}
          aria-label="Next"
          className="hidden md:flex absolute right-2 md:right-4 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full bg-amber-700 border-none text-[#F7F2DF] cursor-pointer transition-all duration-300 items-center justify-center shadow-lg hover:bg-amber-600 hover:scale-110"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden items-center justify-center gap-8 mt-6">
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="w-12 h-12 rounded-full bg-amber-700 border-none text-[#F7F2DF] cursor-pointer transition-all duration-300 flex items-center justify-center shadow-lg hover:bg-amber-600 active:scale-95"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next"
            className="w-12 h-12 rounded-full bg-amber-700 border-none text-[#F7F2DF] cursor-pointer transition-all duration-300 flex items-center justify-center shadow-lg hover:bg-amber-600 active:scale-95"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dots Indicator */}
      {/* {teamMembers.length > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8 relative z-15">
          {teamMembers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 
                ${
                  idx === currentIndex
                    ? "bg-amber-700 scale-125 shadow-lg ring-2 ring-amber-700/30"
                    : "bg-[#F7F2DF]/40 hover:bg-[#F7F2DF]/70 hover:scale-110"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )} */}
    </div>
  );
}

export default MeetTheTeam;