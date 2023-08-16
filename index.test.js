import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('Image Carousel', () => {
  let dom;
  let document;
  let window;
  let nextImg;
  let previousImg;
  let carouselImage;
  let images;
  let currentIndex=0;
  let scheduleAutoSlide;
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
    window = dom.window;
    nextImg=window.nextImg
    previousImg=window.previousImg
    scheduleAutoSlide=window.scheduleAutoSlide
    
    carouselImage = document.getElementById('carouselImg');
     
    
    // Define the 'images' array for testing
    images = [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];
    jest.useFakeTimers(); // mock timers
  });

  afterEach(() => {
    jest.clearAllTimers(); // clear all timers after each test
   
  });

  test('the next button renders the next image', () => {
    // Trigger a click on the next button
    
    nextImg();
    
    // Calculate the expected index after clicking next
    const expectedIndex = (currentIndex + 1) % images.length;
  
    // Check if the image source has been updated correctly
    expect(carouselImage.src).toBe(images[expectedIndex]);
  });


  test('the previous button renders the previous image', () => {
    // Store the initial currentIndex
  
    // Trigger a click on the previous button
    previousImg();
  
    // Calculate the expected index after clicking previous
    const expectedIndex = (currentIndex - 1 + images.length) % images.length; 
    // Check if the image source has been updated correctly
    expect(carouselImage.src).toBe(images[expectedIndex]);
  });
  

  test('image should auto-slide every 2 seconds', () => {
    scheduleAutoSlide();
    const initialIndex = 0; // Based on your code's initial state
    const expectedIndexAfterOneSlide = (initialIndex + 1) % images.length;

    jest.advanceTimersByTime(2000); // simulating the passage of 2 seconds

    expect(carouselImage.src).toBe(images[expectedIndexAfterOneSlide]);
  });


  test('auto-slide should stop immediately when navigating images manually', () => {
    scheduleAutoSlide();
    const initialIndex = 0;
    const nextButton = document.getElementById('nextBtn');

    // Simulate manual image navigation
    nextButton.click();
    
    // The expected index after manually navigating to the next image
    const expectedIndexAfterClick = (initialIndex + 1) % images.length;
    console.log(expectedIndexAfterClick)
    expect(carouselImage.src).toBe(images[expectedIndexAfterClick]);

    jest.advanceTimersByTime(1500); // Advance timers by 1.5 seconds (less than the auto-slide interval)
    
    // The image shouldn't change since the auto-slide is halted upon manual navigation
    expect(carouselImage.src).toBe(images[expectedIndexAfterClick]);
  });

  test('auto-slide should restart after a delay when navigating images manually', () => {
    scheduleAutoSlide();
    const initialIndex = 0;
    const nextButton = document.getElementById('nextBtn');
  console.log(carouselImage.src)
    // Simulate manual image navigation
    nextButton.click();
console.log(carouselImage.src)
    const expectedIndexAfterClick = (initialIndex + 1) % images.length;
    console.log(expectedIndexAfterClick)
    expect(carouselImage.src).toBe(images[expectedIndexAfterClick]);
    console.log(carouselImage.src)
    jest.advanceTimersByTime(3000); // Advance timers by 3 seconds
     console.log(carouselImage.src)
    const expectedIndexAfterRestart = (expectedIndexAfterClick + 1) % images.length;

    // The image should change since the auto-slide is restarted after a 2-second delay post manual navigation
    expect(carouselImage.src).toBe(images[expectedIndexAfterRestart]);
  });

  
});





