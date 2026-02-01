const COLOR_KEY = 'backgroundColor';

export const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
  localStorage.setItem(COLOR_KEY, color); 
};

export const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
  if (!colorPicker) return;

  const savedColor = localStorage.getItem(COLOR_KEY);
  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
    colorPicker.value = savedColor;
  }
  
  colorPicker.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;
    changeBackgroundColor(target.value);
  });
};