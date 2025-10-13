export function isSessionLive(session) {
  const now = new Date();
  const sessionDate = new Date(session.date);
  
  // Check if it's the correct date
  if (sessionDate.getDate() !== now.getDate() || 
      sessionDate.getMonth() !== now.getMonth() || 
      sessionDate.getFullYear() !== now.getFullYear()) {
    return false;
  }

  // Parse session times
  const [startHours, startMinutes] = session.startTime.split(':').map(Number);
  const [endHours, endMinutes] = session.endTime.split(':').map(Number);
  
  const sessionStart = new Date(now).setHours(startHours, startMinutes, 0, 0);
  const sessionEnd = new Date(now).setHours(endHours, endMinutes, 0, 0);
  
  // Check if current time is within session time
  return now.getTime() >= sessionStart && now.getTime() <= sessionEnd;
}

export function isUpcomingSession(session) {
  const now = new Date();
  const sessionDate = new Date(session.date);
  const [startHours, startMinutes] = session.startTime.split(':').map(Number);
  
  // Set the session start time
  sessionDate.setHours(startHours, startMinutes, 0, 0);
  
  // Session is upcoming if it's today but hasn't started yet, or it's in the future
  const isToday = sessionDate.getDate() === now.getDate() && 
                  sessionDate.getMonth() === now.getMonth() && 
                  sessionDate.getFullYear() === now.getFullYear();
                  
  if (isToday) {
    return now.getTime() < sessionDate.getTime();
  }
  
  return sessionDate.getTime() > now.getTime();
}

export function formatSessionTime(session) {
  // Convert 24h to 12h format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return `${formatTime(session.startTime)} - ${formatTime(session.endTime)}`;
}