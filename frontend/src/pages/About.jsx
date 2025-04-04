import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-10">
      {/* Header Section */}
      <div className="pt-24 text-center">
        <p className="font-semibold text-3xl md:text-4xl text-gray-800">About Us</p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 mt-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img className="w-full rounded-lg shadow-lg" src={assets.about_image} alt="About Us" />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-gray-700 space-y-4">
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ab suscipit commodi inventore in
            doloremque a! A nisi quaerat dolor impedit mollitia iure iusto unde distinctio dolores autem,
            praesentium voluptate alias ea expedita voluptates, in aliquam veniam quam aliquid harum sunt ad
            quas consequuntur eos. 
          </p>
          <p className="leading-relaxed">
            Corrupti commodi soluta obcaecati cumque placeat saepe sapiente, ad quisquam nihil quam
            reprehenderit neque! Quis nesciunt delectus nobis excepturi, ex iusto laudantium, optio a,
            fugiat odio officia blanditiis ut aliquam quam sed labore nam? Veniam!
          </p>
          <p className="leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, facere dolores ducimus maxime at iste quam magnam nobis!
          </p>
          <b className="text-gray-900 text-lg block mt-4">Our Vision</b>
        </div>
      </div>
    </div>
  );
};

export default About;
