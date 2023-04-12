export function executeOnEnter(event: React.KeyboardEvent<HTMLElement>, callback: () => void) {
  if(event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      callback()
  } 
}