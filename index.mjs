import * as Carousel from "./Carousel.mjs";
// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_dKlPkCDWAAkHOLcyn8DR9NDXpUhsz7GbC2Bbk6wWPkF1lr1r6v8dUIzjwmoZuMN3";

const catUrl = "https://api.thecatapi.com/v1/breeds";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
async function initialLoad() {
  try {
    const response = await fetch(catUrl, {
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (response.ok) {
      console.log("Promise resolved and HTTP status is successful");
      // ...do something with the response
      const jsonData = await response.json();
      // console.log(jsonData);
      // Carousel.clear();
      for (let i of jsonData) {
        // console.log(i);
        let breedOptions = document.createElement("option");
        breedOptions.value = i.id;
        breedOptions.textContent = i.name;
        breedSelect.appendChild(breedOptions);
      }

      // Selecting the first breed of cats
      breedSelect.selectedIndex = 0;
      await handleSelect({ target: breedSelect });
    } else {
      console.error("Promise resolved but HTTP status failed");
    }
  } catch (err) {
    console.error(err);
    // console.error("Promise rejected");
  }
}
initialLoad();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

breedSelect.addEventListener("change", handleSelect);

async function handleSelect(event) {
  const breedId = event.target.value;
  // console.log(targetValue);
  Carousel.clear();
  try {
    const newCatUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=7`;
    //catUrl + "/" + targetValue
    const response2 = await fetch(newCatUrl, {
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
    });
    // `https://cdn2.thecatapi.com/images/jvg3XfEdC.jpg`;
    if (response2.ok) {
      console.log("Second Promise resolved and HTTP status is successful");
      const breedArrays = await response2.json();
      console.log(breedArrays);
      // console.log(breedArrays[0].breeds[0]);

      breedArrays.forEach((img) => {
        // console.log(img.breeds)
        if (img.url) {
          const carouselItem = Carousel.createCarouselItem(
            img.url,
            `Image of a(n) ${img.breeds[0].name}`,
            img.id
          );
          // Append the new carousel item
          Carousel.appendCarousel(carouselItem);
        } else {
          console.warn(`No image found for breed: ${img.breeds[0].name}`);
        }
      });

      const breedData = breedArrays[0].breeds[0];
      // console.log(breedData)
      // Update the information section
      infoDump.innerHTML = `
        <h2>${breedData.name}</h2>
        <p>Origin: ${breedData.origin}</p>
        <p>Lifespan: ${breedData.life_span}</p>
        <p>Temperament: ${breedData.temperament}</p>
        <p>Description: ${breedData.description}</p>
      `;

      // Restart carousel if needed
      Carousel.start();
    } else {
      console.error("Promise resolved but HTTP status failed");
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
