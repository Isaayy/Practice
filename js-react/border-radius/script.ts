'use strict';

const radiusSettings = document.querySelectorAll('input');
const copyToClipboardBtn = document.querySelector('.copyBtn')!;
const resetBtn = document.querySelector('.resetBtn')!;
const box = document.querySelector('.shape') as HTMLDivElement;

let borderProperties = {};

// Check if inputed value has an unit
const isUnit = (inputValue: string) => {
  const units = ['px', 'in', 'pc', 'pt', 'em', 'rem', '%'];
  if (units.some(unit => inputValue.endsWith(unit))) return true;
  return false;
};

const setRadius = (direction: string, value: string) => {
  // If no unit or invalid unit use px as default
  if (!isUnit(value)) value = Number.parseInt(value) + 'px';

  //   Change and save border radius
  box.style[`border${direction.split('-').join('')}Radius`] = value;
  borderProperties[`border-${direction.toLowerCase()}-radius`] = `${value};`;
};

// Add eventlistener to inputs
radiusSettings.forEach(setting =>
  setting.addEventListener('blur', () => {
    if (!setting.value || !setting.dataset.direction) return;

    // change border radius for direction from dataset
    setRadius(setting.dataset.direction, setting.value);
  })
);

// Reset
resetBtn.addEventListener('click', () => {
  // clear input fields
  radiusSettings.forEach(setting => (setting.value = ''));

  // Reset borders of the preview box
  box.style.borderRadius = '0';

  // Empty saved properties
  borderProperties = {};
});

// Copy to clipboard
copyToClipboardBtn.addEventListener('click', () => {
  const el = document.createElement('textarea');

  for (const [property, value] of Object.entries(borderProperties)) {
    el.value += `${property}:${value}\n`;
  }

  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
});
