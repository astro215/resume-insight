import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faSearch, faDatabase } from '@fortawesome/free-solid-svg-icons';

const features = [
  { name: "Advanced Resume Parser", icon: faFileAlt },
  { name: "Easy Candidate Search", icon: faSearch },
  { name: "Resume Storage", icon: faDatabase }
];

function FeatureSection({ darkMode }) {
  return (
    <section className={`container mx-auto px-4 py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">
          Features
        </h2>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          Our platform offers a range of features to help recruiters find the best candidates quickly and efficiently.
        </p>
      </div>
      <div className="flex flex-wrap -mx-3">
        {features.map((feature, index) => (
          <div key={index} className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} p-6 rounded-lg shadow-md text-center`}>
              <FontAwesomeIcon icon={feature.icon} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                {feature.name}
              </h3>
              <p>
                Description specific to each feature.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
