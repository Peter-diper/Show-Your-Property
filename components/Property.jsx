import React from "react";

const Property = () => {
  return (
    <form>
      <h2 class="text-3xl text-center font-semibold mb-6">Add Property</h2>

      <div class="mb-4">
        <label for="type" class="block text-gray-700 font-bold mb-2">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          class="border rounded w-full py-2 px-3"
          required
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Listing Name</label>
        <input
          type="text"
          id="name"
          name="name"
          class="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
          required
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          class="border rounded w-full py-2 px-3"
          rows="4"
          placeholder="Add an optional description of your property"
        ></textarea>
      </div>

      <div class="mb-4 bg-blue-50 p-4">
        <label class="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          class="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
        />
        <input
          type="text"
          id="city"
          name="location.city"
          class="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
        />
        <input
          type="text"
          id="state"
          name="location.state"
          class="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          required
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          class="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
        />
      </div>

      <div class="mb-4 flex flex-wrap">
        <div class="w-full sm:w-1/3 pr-2">
          <label for="beds" class="block text-gray-700 font-bold mb-2">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            class="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div class="w-full sm:w-1/3 px-2">
          <label for="baths" class="block text-gray-700 font-bold mb-2">
            Baths
          </label>
          <input
            type="number"
            id="baths"
            name="baths"
            class="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div class="w-full sm:w-1/3 pl-2">
          <label for="square_feet" class="block text-gray-700 font-bold mb-2">
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            class="border rounded w-full py-2 px-3"
            required
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Amenities</label>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <input
              type="checkbox"
              id="amenity_wifi"
              name="amenities"
              value="Wifi"
              class="mr-2"
            />
            <label for="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              value="Full Kitchen"
              class="mr-2"
            />
            <label for="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              value="Washer & Dryer"
              class="mr-2"
            />
            <label for="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              value="Free Parking"
              class="mr-2"
            />
            <label for="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              value="Swimming Pool"
              class="mr-2"
            />
            <label for="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              value="Hot Tub"
              class="mr-2"
            />
            <label for="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              value="24/7 Security"
              class="mr-2"
            />
            <label for="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              value="Wheelchair Accessible"
              class="mr-2"
            />
            <label for="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              value="Elevator Access"
              class="mr-2"
            />
            <label for="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              value="Dishwasher"
              class="mr-2"
            />
            <label for="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              value="Gym/Fitness Center"
              class="mr-2"
            />
            <label for="amenity_gym_fitness_center">Gym/Fitness Center</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              value="Air Conditioning"
              class="mr-2"
            />
            <label for="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              value="Balcony/Patio"
              class="mr-2"
            />
            <label for="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              value="Smart TV"
              class="mr-2"
            />
            <label for="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              value="Coffee Maker"
              class="mr-2"
            />
            <label for="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>

      <div class="mb-4 bg-blue-50 p-4">
        <label class="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div class="flex items-center">
            <label for="weekly_rate" class="mr-2">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              class="border rounded w-full py-2 px-3"
            />
          </div>
          <div class="flex items-center">
            <label for="monthly_rate" class="mr-2">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              class="border rounded w-full py-2 px-3"
            />
          </div>
          <div class="flex items-center">
            <label for="nightly_rate" class="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              class="border rounded w-full py-2 px-3"
            />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label for="seller_name" class="block text-gray-700 font-bold mb-2">
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name."
          class="border rounded w-full py-2 px-3"
          placeholder="Name"
        />
      </div>
      <div class="mb-4">
        <label for="seller_email" class="block text-gray-700 font-bold mb-2">
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          class="border rounded w-full py-2 px-3"
          placeholder="Email address"
          required
        />
      </div>
      <div class="mb-4">
        <label for="seller_phone" class="block text-gray-700 font-bold mb-2">
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          class="border rounded w-full py-2 px-3"
          placeholder="Phone"
        />
      </div>

      <div class="mb-4">
        <label for="images" class="block text-gray-700 font-bold mb-2">
          Images (Select up to 4 images)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          class="border rounded w-full py-2 px-3"
          accept="image/*"
          multiple
        />
      </div>

      <div>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Property
        </button>
      </div>
    </form>
  );
};

export default Property;
