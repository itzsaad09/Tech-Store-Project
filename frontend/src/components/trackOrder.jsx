import React from 'react';

// Main App component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <OrderStepper />
    </div>
  );
};

// OrderStepper component
const OrderStepper = () => {
  // Define the order statuses and their initial states
  // You can manage 'state' and 'time' dynamically in a real application
  const orderSteps = [
    { title: "Order Placed", status: "Completed", time: "May 28, 10:24 AM", state: "completed" },
    { title: "Order Confirmed", status: "In Progress", time: "May 29, 02:15 PM", state: "active" },
    { title: "Order Packed", status: "Pending", time: "Estimated: May 30", state: "pending" },
    { title: "Ready to Ship", status: "Pending", time: "Estimated: May 30", state: "pending" },
    { title: "Shipped", status: "Pending", time: "Estimated: May 31", state: "pending" },
    { title: "Rider Attempt to Deliver", status: "Pending", time: "Estimated: Jun 01", state: "pending" },
    { title: "Delivered", status: "Pending", time: "Estimated: Jun 01", state: "pending" },
  ];

  return (
    // Stepper Box Container
    <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-lg md:max-w-md lg:max-w-lg">
      {orderSteps.map((step, index) => (
        // Each Stepper Step
        <div
          key={index}
          className={`flex mb-8 relative
            ${index === orderSteps.length - 1 ? 'mb-0' : ''} /* No bottom margin for the last step */
          `}
        >
          {/* Stepper Line - Conditionally rendered for all but the last step */}
          {index < orderSteps.length - 1 && (
            <div className="absolute left-[19px] top-10 bottom-[-32px] w-0.5 bg-gray-200 z-10" />
          )}

          {/* Stepper Circle */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 z-20 flex-shrink-0
              ${step.state === "completed" ? 'bg-gray-900 text-white' : ''}
              ${step.state === "active" ? 'border-2 border-gray-900 text-gray-900' : ''}
              ${step.state === "pending" ? 'border-2 border-gray-200 text-gray-400' : ''}
            `}
          >
            {step.state === "completed" ? (
              // Checkmark SVG icon for completed steps
              <svg viewBox="0 0 16 16" className="bi bi-check-lg" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
              </svg>
            ) : (
              // Step number for active/pending steps
              index + 1
            )}
          </div>

          {/* Stepper Content */}
          <div className="flex-1">
            <div
              className={`font-semibold mb-1
                ${step.state === "completed" || step.state === "active" ? 'text-gray-900' : 'text-gray-500'}
              `}
            >
              {step.title}
            </div>
            <div
              className={`inline-block px-2 py-0.5 rounded-full text-xs
                ${step.state === "completed" ? 'bg-green-100 text-green-700' : ''}
                ${step.state === "active" ? 'bg-blue-100 text-blue-700' : ''}
                ${step.state === "pending" ? 'bg-gray-100 text-gray-600' : ''}
              `}
            >
              {step.status}
            </div>
            <div className="text-xs text-gray-500 mt-1">{step.time}</div>
          </div>
        </div>
      ))}

      {/* Stepper Controls */}
      <div className="flex justify-between mt-8">
        <button className="px-4 py-2 rounded-md border border-gray-200 bg-white cursor-pointer flex items-center gap-1.5 text-gray-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
          {/* Left Arrow SVG icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
          </svg>
          Previous
        </button>
        <button className="px-4 py-2 rounded-md border border-gray-900 bg-gray-900 text-white cursor-pointer flex items-center gap-1.5 hover:bg-gray-800 transition-colors duration-200 ease-in-out">
          Next
          {/* Right Arrow SVG icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;
