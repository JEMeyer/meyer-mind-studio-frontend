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

export const getVideoURLFromPath = (path: string) =>  `${process.env.REACT_APP_MEYER_MIND_BACKEND_URL}${path}#t=0.001`;
export const getImageURLFromPath = (path: string) =>  `${process.env.REACT_APP_MEYER_MIND_BACKEND_URL}${path}`;
export const getShareURLFromVideoId = (videoId: string) => `${window.location.protocol}//${window.location.host}?videoId=${videoId}`
