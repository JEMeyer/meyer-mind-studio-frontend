export function executeOnEnter(event: React.KeyboardEvent<HTMLElement>, callback: () => void) {
  if(event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      callback()
  } 
}

export const formatDate = (dateString:string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });
};

export const getVideoURLFromFilename = (filename: string) =>  `${process.env.REACT_APP_MEYER_MIND_BACKEND_URL}${filename}#t=0.001`;

export const getShareURLFromVideoId = (videoId: string) => `${window.location.protocol}//${window.location.host}?videoId=${videoId}`